import { DynamoDB } from 'aws-sdk';
import omit from 'lodash/omit';
import merge from 'lodash/merge';

export default class DynamoConnector {
  constructor(defaultTableName, config) {
    this.tableName = defaultTableName;
    this.docClient = new DynamoDB.DocumentClient({
      ...config,
      httpOptions: { timeout: 1500 },
      convertEmptyValues: true,
    });
  }

  getByPartition(partitionKeyName, partitionKeyValue) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: '#keyName = :keyValue',
      ExpressionAttributeNames: {
        '#keyName': partitionKeyName,
      },
      ExpressionAttributeValues: {
        ':keyValue': partitionKeyValue,
      },
    };

    return this.docClient
      .query(params)
      .promise()
      .then((data) => {
        return data.Items;
      })
      .catch((err) => {
        console.log('ERROR in getByPartition: ', err);
        throw err;
      });
  }

  getByPartitionAndSort(
    partitionKeyName,
    partitionKeyValue,
    sortKeyName,
    sortKeyValue,
  ) {
    const params = {
      TableName: this.tableName,
      Key: {
        [partitionKeyName]: partitionKeyValue,
        [sortKeyName]: sortKeyValue,
      },
    };

    return this.docClient
      .get(params)
      .promise()
      .then((data) => data.Item)
      .catch((err) => {
        console.log('ERROR in getByPartitionAndSort: ', err);
        throw err;
      });
  }

  getByPartitionOnIndex(
    partitionKeyName,
    partitionKeyValue,
    indexName,
    options,
  ) {
    const params = {
      TableName: this.tableName,
      IndexName: indexName,
      KeyConditionExpression: '#keyName = :keyValue',
      ExpressionAttributeNames: {
        '#keyName': partitionKeyName,
      },
      ExpressionAttributeValues: {
        ':keyValue': partitionKeyValue,
      },
      ...options,
    };

    return this.docClient
      .query(params)
      .promise()
      .then((data) => {
        return data.Items;
      })
      .catch((err) => {
        console.log('ERROR in getByPartitionOnIndex: ', err);
        throw err;
      });
  }

  getByPartitionAndSortConditionOnIndex(
    partitionKeyName,
    partitionKeyValue,
    sortKeyName,
    sortKeyValues,
    condition,
    nextToken,
    indexName,
    tableName,
    limit,
    options,
  ) {
    // sortKeyValues must be an array
    const params = {
      TableName: tableName || this.tableName,
      ExclusiveStartKey: nextToken || null,
      ReturnConsumedCapacity: 'TOTAL',
      IndexName: indexName || null,
      KeyConditions: {
        [partitionKeyName]: {
          ComparisonOperator: 'EQ',
          AttributeValueList: [partitionKeyValue],
        },
        [sortKeyName]: {
          ComparisonOperator: condition,
          AttributeValueList: sortKeyValues,
        },
      },
      Limit: limit || null,
      ...options,
    };

    return this.docClient
      .query(params)
      .promise()
      .then((data) => data.Items);
  }

  saveAsUpdate(keys, input) {
    const keyValues = keys.reduce((acc, curValue) => {
      acc[curValue] = input[curValue];

      return acc;
    }, {});

    return this.update(keyValues, omit(input, keys));
  }

  async update(keyValues, bodyValues) {
    try {
      const params = {
        TableName: this.tableName,
        Key: keyValues,
        UpdateExpression: `SET ${Object.keys(bodyValues)
          .map((attrName) => `#${attrName} = :${attrName}`)
          .join(', ')}`,
        ExpressionAttributeNames: Object.keys(bodyValues)
          .map((attrName) => ({ [`#${attrName}`]: attrName }))
          .reduce(merge, {}),
        ExpressionAttributeValues: Object.keys(bodyValues)
          .map((attrName) => ({ [`:${attrName}`]: bodyValues[attrName] }))
          .reduce(merge, {}),
        ReturnValues: 'ALL_NEW',
      };
      return this.docClient
        .update(params)
        .promise()
        .then((item) => {
          return item.Attributes;
        })
        .catch((err) => {
          console.log('dynamo err', err);
          return Promise.reject(err);
        });
    } catch (e) /* istanbul ignore next */ {
      console.log('error in dynamo params', e);
      throw e;
    }
  }

  async deleteRecord(keyValues) {
    const params = {
      TableName: this.tableName,
      Key: keyValues,
    };
    return this.docClient.delete(params).promise();
  }
}

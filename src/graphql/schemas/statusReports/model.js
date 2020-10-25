class StatusReports {
  constructor(dynamoConnector) {
    this.dynamoConnector = dynamoConnector;
  }

  async createStatusReport(input) {
    const { id } = input;
    const transformedInput = {
      ...input,
      createTime: Date.now().toString(),
      id: id,
      pk: id,
      sk: 'REPORT',
      dataType: 'REPORT',
    };
    await this.dynamoConnector.saveAsUpdate(['pk', 'sk'], transformedInput);
    return {
      ...transformedInput,
      latestIncrement: null,
    };
  }

  async getCurrentStatus(id) {
    const response = await this.dynamoConnector.getByPartitionAndSortConditionOnIndex(
      'pk',
      id,
      'sk',
      ['REPORT'],
      `EQ`,
      null,
      null,
      null,
    );
    return response;
  }

  async getAllStatusReports() {
    const response = await this.dynamoConnector.getByPartitionOnIndex(
      'sk',
      'REPORT',
      process.env.SINGLE_TABLE_SK_DATA_INDEX,
      { ScanIndexForward: false },
    );
    return response;
  }
}

export default StatusReports;

(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/graphql/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/connectors/dynamo-connector.js":
/*!********************************************!*\
  !*** ./src/connectors/dynamo-connector.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return DynamoConnector; });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/omit */ \"lodash/omit\");\n/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_omit__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/merge */ \"lodash/merge\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nclass DynamoConnector {\n  constructor(defaultTableName, config) {\n    this.tableName = defaultTableName;\n    this.docClient = new aws_sdk__WEBPACK_IMPORTED_MODULE_0__[\"DynamoDB\"].DocumentClient({ ...config,\n      httpOptions: {\n        timeout: 1500\n      },\n      convertEmptyValues: true\n    });\n  }\n\n  getByPartition(partitionKeyName, partitionKeyValue) {\n    const params = {\n      TableName: this.tableName,\n      KeyConditionExpression: '#keyName = :keyValue',\n      ExpressionAttributeNames: {\n        '#keyName': partitionKeyName\n      },\n      ExpressionAttributeValues: {\n        ':keyValue': partitionKeyValue\n      }\n    };\n    return this.docClient.query(params).promise().then(data => {\n      return data.Items;\n    }).catch(err => {\n      console.log('ERROR in getByPartition: ', err);\n      throw err;\n    });\n  }\n\n  getByPartitionAndSort(partitionKeyName, partitionKeyValue, sortKeyName, sortKeyValue) {\n    const params = {\n      TableName: this.tableName,\n      Key: {\n        [partitionKeyName]: partitionKeyValue,\n        [sortKeyName]: sortKeyValue\n      }\n    };\n    return this.docClient.get(params).promise().then(data => data.Item).catch(err => {\n      console.log('ERROR in getByPartitionAndSort: ', err);\n      throw err;\n    });\n  }\n\n  getByPartitionOnIndex(partitionKeyName, partitionKeyValue, indexName, options) {\n    const params = {\n      TableName: this.tableName,\n      IndexName: indexName,\n      KeyConditionExpression: '#keyName = :keyValue',\n      ExpressionAttributeNames: {\n        '#keyName': partitionKeyName\n      },\n      ExpressionAttributeValues: {\n        ':keyValue': partitionKeyValue\n      },\n      ...options\n    };\n    return this.docClient.query(params).promise().then(data => {\n      return data.Items;\n    }).catch(err => {\n      console.log('ERROR in getByPartitionOnIndex: ', err);\n      throw err;\n    });\n  }\n\n  getByPartitionAndSortConditionOnIndex(partitionKeyName, partitionKeyValue, sortKeyName, sortKeyValues, condition, nextToken, indexName, tableName, limit, options) {\n    // sortKeyValues must be an array\n    const params = {\n      TableName: tableName || this.tableName,\n      ExclusiveStartKey: nextToken || null,\n      ReturnConsumedCapacity: 'TOTAL',\n      IndexName: indexName || null,\n      KeyConditions: {\n        [partitionKeyName]: {\n          ComparisonOperator: 'EQ',\n          AttributeValueList: [partitionKeyValue]\n        },\n        [sortKeyName]: {\n          ComparisonOperator: condition,\n          AttributeValueList: sortKeyValues\n        }\n      },\n      Limit: limit || null,\n      ...options\n    };\n    return this.docClient.query(params).promise().then(data => data.Items);\n  }\n\n  saveAsUpdate(keys, input) {\n    const keyValues = keys.reduce((acc, curValue) => {\n      acc[curValue] = input[curValue];\n      return acc;\n    }, {});\n    return this.update(keyValues, lodash_omit__WEBPACK_IMPORTED_MODULE_1___default()(input, keys));\n  }\n\n  async update(keyValues, bodyValues) {\n    try {\n      const params = {\n        TableName: this.tableName,\n        Key: keyValues,\n        UpdateExpression: `SET ${Object.keys(bodyValues).map(attrName => `#${attrName} = :${attrName}`).join(', ')}`,\n        ExpressionAttributeNames: Object.keys(bodyValues).map(attrName => ({\n          [`#${attrName}`]: attrName\n        })).reduce(lodash_merge__WEBPACK_IMPORTED_MODULE_2___default.a, {}),\n        ExpressionAttributeValues: Object.keys(bodyValues).map(attrName => ({\n          [`:${attrName}`]: bodyValues[attrName]\n        })).reduce(lodash_merge__WEBPACK_IMPORTED_MODULE_2___default.a, {}),\n        ReturnValues: 'ALL_NEW'\n      };\n      return this.docClient.update(params).promise().then(item => {\n        return item.Attributes;\n      }).catch(err => {\n        console.log('dynamo err', err);\n        return Promise.reject(err);\n      });\n    } catch (e)\n    /* istanbul ignore next */\n    {\n      console.log('error in dynamo params', e);\n      throw e;\n    }\n  }\n\n  async deleteRecord(keyValues) {\n    const params = {\n      TableName: this.tableName,\n      Key: keyValues\n    };\n    return this.docClient.delete(params).promise();\n  }\n\n}\n\n//# sourceURL=webpack:///./src/connectors/dynamo-connector.js?");

/***/ }),

/***/ "./src/graphql/index.js":
/*!******************************!*\
  !*** ./src/graphql/index.js ***!
  \******************************/
/*! exports provided: handle, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handle\", function() { return handle; });\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ \"apollo-server-lambda\");\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _connectors_dynamo_connector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../connectors/dynamo-connector */ \"./src/connectors/dynamo-connector.js\");\n/* harmony import */ var _schemas_statusReports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schemas/statusReports */ \"./src/graphql/schemas/statusReports/index.js\");\n/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schemas */ \"./src/graphql/schemas/index.js\");\n\n\n\n\n\nconst contextFn = async ({\n  event,\n  context\n}) => {\n  const dynamoConnector = new _connectors_dynamo_connector__WEBPACK_IMPORTED_MODULE_1__[\"default\"](process.env.SINGLE_TABLE_NAME);\n  return {\n    headers: event.headers,\n    event,\n    context,\n    models: {\n      StatusReports: new _schemas_statusReports__WEBPACK_IMPORTED_MODULE_2__[\"StatusReports\"](dynamoConnector)\n    }\n  };\n};\n\nconst handler = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__[\"ApolloServer\"]({ ..._schemas__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  uploads: false,\n  typeDefs: _schemas__WEBPACK_IMPORTED_MODULE_3__[\"default\"].typeDefs.map(each => apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__[\"gql\"]`\n        ${each}\n      `),\n  context: contextFn,\n  formatError:\n  /* istanbul ignore next */\n  error => {\n    console.log(error);\n    return error;\n  }\n}).createHandler({\n  cors: {\n    origin: '*',\n    credentials: true\n  }\n});\nconst handle = (event, context, cb) => handler(event, context, cb);\n/* harmony default export */ __webpack_exports__[\"default\"] = (handle);\n\n//# sourceURL=webpack:///./src/graphql/index.js?");

/***/ }),

/***/ "./src/graphql/schemas/index.js":
/*!**************************************!*\
  !*** ./src/graphql/schemas/index.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ \"lodash/merge\");\n/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _statusReports__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statusReports */ \"./src/graphql/schemas/statusReports/index.js\");\n\n\nconst query = `\n  type Query {\n    _empty: String\n  }\n`;\nconst mutation = `\n  type Mutation {\n    _empty: String\n  }\n`;\nconst schemaDefinition = `\n  schema {\n    query: Query\n    mutation: Mutation\n  }\n`;\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  typeDefs: [schemaDefinition, query, mutation, _statusReports__WEBPACK_IMPORTED_MODULE_1__[\"typedef\"]],\n  resolvers: lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()({}, _statusReports__WEBPACK_IMPORTED_MODULE_1__[\"resolvers\"])\n});\n\n//# sourceURL=webpack:///./src/graphql/schemas/index.js?");

/***/ }),

/***/ "./src/graphql/schemas/statusReports/index.js":
/*!****************************************************!*\
  !*** ./src/graphql/schemas/statusReports/index.js ***!
  \****************************************************/
/*! exports provided: typedef, resolvers, StatusReports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _typedef__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typedef */ \"./src/graphql/schemas/statusReports/typedef.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"typedef\", function() { return _typedef__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolvers */ \"./src/graphql/schemas/statusReports/resolvers.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"resolvers\", function() { return _resolvers__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model */ \"./src/graphql/schemas/statusReports/model.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"StatusReports\", function() { return _model__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n\n\n\n\n//# sourceURL=webpack:///./src/graphql/schemas/statusReports/index.js?");

/***/ }),

/***/ "./src/graphql/schemas/statusReports/model.js":
/*!****************************************************!*\
  !*** ./src/graphql/schemas/statusReports/model.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass StatusReports {\n  constructor(dynamoConnector) {\n    this.dynamoConnector = dynamoConnector;\n  }\n\n  async createStatusReport(input) {\n    const {\n      id\n    } = input;\n    const transformedInput = { ...input,\n      createTime: Date.now().toString(),\n      id: id,\n      pk: id,\n      sk: 'REPORT',\n      dataType: 'REPORT'\n    };\n    await this.dynamoConnector.saveAsUpdate(['pk', 'sk'], transformedInput);\n    return { ...transformedInput,\n      latestIncrement: null\n    };\n  }\n\n  async getCurrentStatus(id) {\n    const response = await this.dynamoConnector.getByPartitionAndSortConditionOnIndex('pk', id, 'sk', ['REPORT'], `EQ`, null, null, null);\n    return response;\n  }\n\n  async getAllStatusReports() {\n    const response = await this.dynamoConnector.getByPartitionOnIndex('sk', 'REPORT', process.env.SINGLE_TABLE_SK_DATA_INDEX, {\n      ScanIndexForward: false\n    });\n    return response;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (StatusReports);\n\n//# sourceURL=webpack:///./src/graphql/schemas/statusReports/model.js?");

/***/ }),

/***/ "./src/graphql/schemas/statusReports/resolvers.js":
/*!********************************************************!*\
  !*** ./src/graphql/schemas/statusReports/resolvers.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst resolvers = {\n  Query: {\n    getAllStatusReports(_, args, ctx) {\n      return ctx.models.StatusReports.getAllStatusReports();\n    },\n\n    getCurrentStatus(_, {\n      id\n    }, ctx) {\n      return ctx.models.StatusReports.getCurrentStatus(id);\n    }\n\n  },\n  Mutation: {\n    createStatusReport(_, {\n      input\n    }, ctx) {\n      return ctx.models.StatusReports.createStatusReport(input);\n    }\n\n  }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (resolvers);\n\n//# sourceURL=webpack:///./src/graphql/schemas/statusReports/resolvers.js?");

/***/ }),

/***/ "./src/graphql/schemas/statusReports/typedef.js":
/*!******************************************************!*\
  !*** ./src/graphql/schemas/statusReports/typedef.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst typedef = `\n  type StatusReport {\n    id: String\n    createTime: String\n    reportTime: String\n    temp: String\n    tempStatus: String\n    cap: String\n    capStatus: String\n  }\n\n\n  input CreateStatusReportInput {\n    id: String\n    reportTime: String\n    temp: String\n    tempStatus: String\n    cap: String\n    capStatus: String\n  }\n\n\n\n  extend type Query {\n    getAllStatusReports(nextToken: String): [StatusReport]\n    getCurrentStatus(id: String!): [StatusReport]\n  }\n\n  extend type Mutation {\n    createStatusReport(input: CreateStatusReportInput!): StatusReport\n  }\n`;\n/* harmony default export */ __webpack_exports__[\"default\"] = (typedef);\n\n//# sourceURL=webpack:///./src/graphql/schemas/statusReports/typedef.js?");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"apollo-server-lambda\");\n\n//# sourceURL=webpack:///external_%22apollo-server-lambda%22?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");\n\n//# sourceURL=webpack:///external_%22aws-sdk%22?");

/***/ }),

/***/ "lodash/merge":
/*!*******************************!*\
  !*** external "lodash/merge" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash/merge\");\n\n//# sourceURL=webpack:///external_%22lodash/merge%22?");

/***/ }),

/***/ "lodash/omit":
/*!******************************!*\
  !*** external "lodash/omit" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash/omit\");\n\n//# sourceURL=webpack:///external_%22lodash/omit%22?");

/***/ })

/******/ })));
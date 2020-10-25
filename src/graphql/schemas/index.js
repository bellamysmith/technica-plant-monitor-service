import merge from 'lodash/merge';
import {
  typedef as StatusReports,
  resolvers as statusReportsResolvers,
} from './statusReports';

import {
  typedef as Devices,
  resolvers as deviceResolvers,
} from "./devices";

const query = `
  type Query {
    _empty: String
  }
`;

const mutation = `
  type Mutation {
    _empty: String
  }
`;

const schemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default {
  typeDefs: [schemaDefinition, query, mutation, StatusReports, Devices],
  resolvers: merge({}, statusReportsResolvers, deviceResolvers),
};

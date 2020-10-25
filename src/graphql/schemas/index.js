import merge from 'lodash/merge';
import {
  typedef as StatusReports,
  resolvers as statusReportsResolvers,
} from './statusReports';

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
  typeDefs: [schemaDefinition, query, mutation, StatusReports],
  resolvers: merge({}, statusReportsResolvers),
};

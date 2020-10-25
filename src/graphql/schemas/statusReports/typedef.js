const typedef = `
  type StatusReport {
    id: String
    createTime: String
    reportTime: String
    temp: String
    tempStatus: String
    cap: String
    capStatus: String
  }

  input CreateStatusReportInput {
    id: String
    reportTime: String
    temp: String
    tempStatus: String
    cap: String
    capStatus: String
  }

  extend type Query {
    getAllStatusReports(nextToken: String): [StatusReport]
    getCurrentStatus(id: String!): [StatusReport]
  }

  extend type Mutation {
    createStatusReport(input: CreateStatusReportInput!): StatusReport
  }
`;

export default typedef;

const typedef = `
  type Device {
    id: String!
    createTime: String
    name: String
  }


  input CreateDeviceInput {
    id: String!
    name: String
  }

  extend type Query {
    getAllDevices(nextToken: String): [Device]
    getDeviceInfo(id: String!): [Device]
  }

  extend type Mutation {
    createDevice(input: CreateDeviceInput!): Device
  }
`;

export default typedef;

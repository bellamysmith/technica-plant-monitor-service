const resolvers = {
  Query: {
    getAllDevices(_, args, ctx) {
      return ctx.models.Devices.getAllDevices();
    },
    getDeviceInfo(_, { id }, ctx) {
      return ctx.models.Devices.getDeviceInfo(id);
    }
  },
  Mutation: {
    createDevice(_, { input }, ctx) {
      return ctx.models.Devices.createDevice(input);
    }
  },
};

export default resolvers;

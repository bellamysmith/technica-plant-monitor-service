const resolvers = {
  Query: {
    getAllStatusReports(_, args, ctx) {
      return ctx.models.StatusReports.getAllStatusReports();
    },
    getCurrentStatus(_, { id }, ctx) {
      return ctx.models.StatusReports.getCurrentStatus(id);
    }
  },
  Mutation: {
    createStatusReport(_, { input }, ctx) {
      return ctx.models.StatusReports.createStatusReport(input);
    }
  },
};

export default resolvers;

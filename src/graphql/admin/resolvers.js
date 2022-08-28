import { admin } from "@/models/admin";

export const resolvers = {
  Query: {
    getStatistics(_parent, _args, _context) {
      try {
        return admin.getStatistics(_parent, _args, _context);
      } catch (e) {
        console.log(e);
      }
    },
    getIncreaseAlerts(_parent, _args, _context) {
      return admin.increaseAlerts(_parent, _args, _context);
    },
  },
};

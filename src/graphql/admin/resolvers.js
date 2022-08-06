import { admin } from "@/models/admin";

export const resolvers = {
  Query: {
    getStatistics(_parent, _args, _context) {
      return admin.getStatistics(_parent, _args, _context);
    },
  },
};

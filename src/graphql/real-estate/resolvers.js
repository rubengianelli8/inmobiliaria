import { realEstate } from "@/models/real-estate";

export const resolvers = {
  Query: {
    getRealEstate(_parent, _args, _context) {
      return realEstate.getRealState(_parent, _args, _context);
    },
  },
  Mutation: {
    addRealEstate(_parent, _args, _context) {
      return realEstate.addRealState(_parent, _args, _context);
    },
    deleteRealEstate(_parent, _args, _context) {
      return realEstate.deleteRealState(_parent, _args, _context);
    },
  },
};

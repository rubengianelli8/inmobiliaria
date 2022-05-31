import { estate } from "@/models/estate";

export const resolvers = {
  Query: {
    getEstate(_parent, _args, _context) {
      return estate.getEstate(_parent, _args, _context);
    },
    getAllEstates(_parent, _args, _context) {
      return estate.getAllEstates(_parent, _args, _context);
    },
  },

  Mutation: {
    addEstate(_parent, _args, _context) {
      return estate.addEstate(_parent, _args, _context);
    },
    updateEstate(_parent, _args, _context) {
      return estate.updateEstate(_parent, _args, _context);
    },
    deleteEstate(_parent, _args, _context) {
      return estate.deleteEstate(_parent, _args, _context);
    },
  },
};

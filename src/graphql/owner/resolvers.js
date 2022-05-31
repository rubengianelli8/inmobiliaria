import { owner } from "@/models/owner";

export const resolvers = {
  Query: {
    getOwner(_parent, _args, _context) {
      return owner.getOwner(_parent, _args, _context);
    },
    getAllOwners(_parent, _args, _context) {
      return owner.getAllOwners(_parent, _args, _context);
    },
  },
  Mutation: {
    addOwner(_parent, _args, _context) {
      return owner.addOwner(_parent, _args, _context);
    },
    updateOwner(_parent, _args, _context) {
      return owner.updateOwner(_parent, _args, _context);
    },
    deleteOwner(_parent, _args, _context) {
      return owner.deleteOwner(_parent, _args, _context);
    },
  },
};

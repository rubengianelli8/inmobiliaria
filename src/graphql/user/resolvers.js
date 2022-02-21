import { user } from "@/models/user";

export const resolvers = {
  Query: {
    getUser(_parent, _args, _context) {
      return user.getUser(_parent, _args, _context);
    },
  },
  Mutation: {
    addUser(_parent, _args, _context) {
      return user.addUser(_parent, _args, _context);
    },
    deleteUser(_parent, _args, _context) {
      return user.deleteUser(_parent, _args, _context);
    },
  },
};

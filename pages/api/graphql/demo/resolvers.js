import { demo } from "@/models/demo";

export const resolvers = {
  Query: {
    getDemos: (_parent, _args, _context) => {
      return demo.getDemos(_parent, _args, _context);
    },
    getDemo: (_parent, { id, name, description }, _context) => {
      return demo.getDemo(_parent, { id, name, description }, _context);
    },
  },
  Mutation: {
    addDemo: (_parent, _args, _context) => {
      return demo.addDemo(_parent, _args, _context);
    },
    deleteDemo: (_parent, { id }, _context) => {
      return demo.deleteDemo(_parent, { id }, _context);
    },
  },
};

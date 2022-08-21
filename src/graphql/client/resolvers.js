import { client } from "@/models/client";

export const resolvers = {
  Query: {
    getClient(_parent, { id_client }, _context) {
      return client.getClient(_parent, { id_client }, _context);
    },
    getAllClients(_parent, data, _context) {
      return client.getAllClients(_parent, data, _context);
    },
    totalClients(_parent, data, _context) {
      return client.totalClients(_parent, data, _context);
    },
  },
  Mutation: {
    addClient(_parent, _args, _context) {
      return client.addClient(_parent, _args, _context);
    },
    updateClient(_parent, _args, _context) {
      return client.updateClient(_parent, _args, _context);
    },
    deleteClient(_parent, { id }, _context) {
      return client.deleteClient(_parent, { id }, _context);
    },
  },
};

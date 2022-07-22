import { receipt } from "@/models/receipt";

export const resolvers = {
  Query: {
    getReceipt(_parent, _args, _context) {
      return receipt.getReceipt(_parent, _args, _context);
    },
    getAllReceipts(_parent, _args, _context) {
      return receipt.getAllReceipts(_parent, _args, _context);
    },
    countReceiptByClient(_parent, _args, _context) {
      return receipt.countReceiptByClient(_parent, _args, _context);
    },
  },
  Mutation: {
    addReceipt(_parent, _args, _context) {
      return receipt.addReceipt(_parent, _args, _context);
    },
    deleteReceipt(_parent, _args, _context) {
      return receipt.deleteReceipt(_parent, _args, _context);
    },
  },
};

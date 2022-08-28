import { estate } from "@/models/estate";

export const resolvers = {
  Query: {
    getPaymentPlan(_parent, _args, _context) {
      return estate.getPaymentPlan(_parent, _args, _context);
    },
  },

  Mutation: {
    addPaymentPlan(_parent, _args, _context) {
      try {
        return estate.addPaymentPlan(_parent, _args, _context);
      } catch (e) {
        console.log(e);
      }
    },
    updatePaymentPlan(_parent, _args, _context) {
      try {
        return estate.updatePaymentPlan(_parent, _args, _context);
      } catch (e) {
        console.log(e);
      }
    },
    deletePaymentPlan(_parent, _args, _context) {
      return estate.deletePaymentPlan(_parent, _args, _context);
    },
  },
};

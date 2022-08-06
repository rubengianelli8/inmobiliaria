import { expense } from "@/models/expense";

export const resolvers = {
  Query: {
    getExpense: async (parent, args, _context) => {
      return expense.getExpense(parent, args, _context);
    },
    getAllExpenses: async (parent, args, _context) => {
      return expense.getAllExpenses(parent, args, _context);
    },
  },

  Mutation: {
    addExpense: async (parent, args, _context) => {
      return expense.addExpense(parent, args, _context);
    },
    deleteExpense: async (parent, args, _context) => {
      return expense.deleteExpense(parent, args, _context);
    },
  },
};

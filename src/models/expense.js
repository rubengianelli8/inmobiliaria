import { prisma } from "@/prisma/client";

export const expense = {
  async addExpense(parent, args, _context) {
    try {
      const { amount, note, month } = args;

      const expense = await prisma.inm_expense.create({
        data: {
          amount,
          note,
          month: new Date(month),
        },
      });
      return expense;
    } catch (e) {
      console.log(e);
    }
  },
  async getExpense(parent, args, _context) {
    const { id } = args;
    const expense = await prisma.inm_expense.findUnique({
      where: {
        id,
      },
    });
    return expense;
  },
  async getAllExpenses(parent, args, _context) {
    try {
      let date;
      if (args.month) date = new Date(args.month);
      else date = new Date();

      let lessthan = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let greaterthan = new Date(date.getFullYear(), date.getMonth(), 0);

      const expenses = await prisma.inm_expense.findMany({
        where: {
          month: {
            gte: greaterthan,
            lte: lessthan,
          },
        },
      });

      const total = await prisma.inm_expense.count({
        where: {
          month: {
            gte: greaterthan,
            lte: lessthan,
          },
        },
      });
      return { expenses, total };
    } catch (e) {
      console.log(e);
    }
  },
  async deleteExpense(parent, args, _context) {
    const { id } = args;
    const expense = await prisma.inm_expense.delete({
      where: {
        id,
      },
    });
    return expense;
  },
};

import { prisma } from "@/prisma/client";

export const expense = {
  async addExpense(parent, args, _context) {
    const { amount, note, month } = args;
    console.log("created month", new Date(month));
    const expense = await prisma.inm_expense.create({
      data: {
        amount,
        note,
        month: new Date(month),
      },
    });
    return expense;
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
    const expenses = await prisma.inm_expense.findMany({});
    console.log(expenses);
    const total = await prisma.inm_expense.count();
    return { expenses, total };
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

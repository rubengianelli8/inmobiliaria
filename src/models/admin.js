import { prisma } from "@/prisma/client";

export const admin = {
  async getStatistics(_parent, _args, _context) {
    let date;
    if (_args.start_date) date = new Date(_args.start_date);
    else date = new Date();
    let lessthan = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let greaterthan = new Date(date.getFullYear(), date.getMonth(), 0);

    const liquidationsOfTheMonth = await prisma.inm_liquidation.groupBy({
      by: ["deleted"],
      where: {
        deleted: false,
        month: {
          gte: greaterthan,
          lte: lessthan,
        },
      },
      _sum: {
        total_profit: true,
        rental_amount: true,
        api: true,
        total_amount: true,
        rate: true,
      },
    });
    let expensesToReturn = 0;
    const expenses = await prisma.inm_expense.findMany({
      select: {
        amount: true,
      },
    });
    expenses.map((expense) => {
      expensesToReturn += expense.amount;
    });

    return {
      profit: liquidationsOfTheMonth[0]._sum.total_profit,
      billing:
        liquidationsOfTheMonth[0]._sum.rental_amount +
        liquidationsOfTheMonth[0]._sum.api +
        liquidationsOfTheMonth[0]._sum.rate,
      liquidated: liquidationsOfTheMonth[0]._sum.total_amount,
      expenses: expensesToReturn,
      net_earnings:
        liquidationsOfTheMonth[0]._sum.total_profit - expensesToReturn,
    };
  },
};

import { prisma } from "@/prisma/client";

export const admin = {
  async getStatistics(_parent, _args, _context) {
    try {
      let date;
      if (_args.start_date) date = new Date(_args.start_date);
      else date = new Date();

      let lessthan = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let greaterthan = new Date(date.getFullYear(), date.getMonth(), 0);
      let liquidationsOfTheMonth = await prisma.inm_liquidation.groupBy({
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
        where: {
          month: {
            gte: greaterthan,
            lte: lessthan,
          },
        },
      });
      expenses.map((expense) => {
        expensesToReturn += expense.amount;
      });
      if (liquidationsOfTheMonth.length === 0) {
        liquidationsOfTheMonth[0] = {
          _sum: {
            total_profit: 0,
            rental_amount: 0,
            api: 0,
            total_amount: 0,
            rate: 0,
          },
        };
      }
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
    } catch (e) {
      console.log(e);
    }
  },

  async increaseAlerts(_parent, _args, _context) {
    try {
      let query = `
      SELECT i.id, i.id_estate, i.last_increase, e.address, e.address_number, e.city, i.increases_every, e.province, u.full_name
      FROM inmobiliaria.inm_payment_plan i 
      join inmobiliaria.inm_estate e on e.id = i.id_estate 
      join inmobiliaria.inm_client c on c.id = i.id_client
      join inmobiliaria.inm_user u on u.id = c.id_user
      where date_add(now(), interval 4 day) > date_add(i.last_increase, interval i.increases_every month) and i.deleted = 0;
      `;
      const payments_plans = await prisma.$queryRawUnsafe(query);
      return payments_plans;
    } catch (e) {
      return e;
    }
  },
};

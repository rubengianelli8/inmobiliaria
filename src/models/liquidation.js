import { prisma } from "@/prisma/client";

export const liquidation = {
  async getLiquidation(_parent, { id }, _context) {
    return await prisma.inm_liquidation.findUnique({
      where: { id },
      include: {
        owner: {
          include: {
            user: {
              select: {
                first_name: true,
                last_name: true,
              },
            },
          },
        },
      },
    });
  },
  async getAllLiquidations(_parent, _args, _context) {
    let page = _args.page || 1;
    if (page > 0) page = page - 1;
    const liquidations = await prisma.inm_liquidation.findMany({
      take: _args.page_size || 10,
      skip: page * (_args.page_size || 10),
      include: {
        owner: {
          include: {
            user: {
              select: { first_name: true, last_name: true },
            },
          },
        },
      },
    });
    const countLiquidation = await prisma.inm_liquidation.count();
    return { results: liquidations, total: countLiquidation };
  },
  async addLiquidation(_parent, data, _context) {
    return await prisma.inm_liquidation.create({ data });
  },
  async deleteLiquidation(_parent, { id }, _context) {
    return await prisma.inm_liquidation.delete({ where: { id } });
  },
};

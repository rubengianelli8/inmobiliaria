import { prisma } from "@/prisma/client";

export const receipt = {
  async getReceipt(_parent, { id }, _context) {
    return await prisma.inm_receipt.findUnique({
      where: { id },
      include: {
        client: {
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
  async getAllReceipts(_parent, _args, _context) {
    const { full_name, month } = _args;
    let page = _args.page || 1;
    if (page > 0) page = page - 1;
    let filters = {};
    if (full_name) {
      filters.full_name = {
        contains: full_name,
      };
    }
    if (month) {
      filters.month = month;
    }
    const receipts = await prisma.inm_receipt.findMany({
      take: _args.page_size || 10,
      skip: page * (_args.page_size || 10),
      where: {
        ...filters,
      },
      include: {
        client: {
          include: {
            user: {
              select: { first_name: true, last_name: true },
            },
          },
        },
      },
    });
    const countReceipt = await prisma.inm_receipt.count();
    return { results: receipts, total: countReceipt };
  },
  async addReceipt(_parent, data, _context) {
    return await prisma.inm_receipt.create({ data });
  },
  async deleteReceipt(_parent, { id }, _context) {
    return await prisma.inm_receipt.delete({ where: { id } });
  },
  async countReceiptByClient(_parent, { id_client }, _context) {
    return await prisma.inm_receipt.count({
      where: { id_client },
    });
  },
};

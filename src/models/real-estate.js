import { prisma } from "@/prisma/client";

export const realEstate = {
  async getRealState(_parent, { id }, _context) {
    return await prisma.inm_real_estate.findUnique({ where: { id } });
  },
  async addRealState(_parent, data, _context) {
    return await prisma.inm_real_estate.create({ data });
  },
  async deleteRealState(_parent, { id }, _context) {
    return await prisma.inm_real_estate.delete({ where: { id } });
  },
};

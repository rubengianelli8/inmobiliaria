import { prisma } from "@/prisma/client";

export const owner = {
  async getOwner(_parent, { id }, _context) {
    return await prisma.inm_owner.findUnique({
      where: { id },
      include: { user: true },
    });
  },
  async addOwner(_parent, data, _context) {
    return await prisma.inm_owner.create({ data });
  },
  async updateOwner(_parent, data, _context) {
    return await prisma.inm_owner.update({ where: { id: data.id }, data });
  },
  async deleteOwner(_parent, { id }, _context) {
    return await prisma.inm_owner.delete({ where: { id } });
  },
  async getAllOwners(_parent, data, _context) {
    return await prisma.inm_owner.findMany({
      include: { user: true },
    });
  },
};

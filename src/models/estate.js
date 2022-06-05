import { prisma } from "@/prisma/client";

export const estate = {
  async getEstate(_parent, { id }, _context) {
    return await prisma.inm_estate.findUnique({
      where: { id },
    });
  },
  async getAllEstates(_parent, data, _context) {
    return await prisma.inm_estate.findMany({});
  },
  async addEstate(_parent, data, _context) {
    try {
      return await prisma.inm_estate.create({ data });
    } catch (e) {
      console.log(e);
    }
  },
  async updateEstate(_parent, data, _context) {
    try {
      return await prisma.inm_estate.update({ where: { id: data.id }, data });
    } catch (e) {
      console.log(e);
    }
  },
  async deleteEstate(_parent, { id }, _context) {
    return await prisma.inm_estate.delete({ where: { id } });
  },
};

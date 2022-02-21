import { prisma } from "@/prisma/client";

export const user = {
  async getUser(_parent, { id }, _context) {
    return await prisma.inm_user.findUnique({
      where: { id },
      include: { real_estate: true },
    });
  },
  async addUser(_parent, data, _context) {
    return await prisma.inm_user.create({ data });
  },
  async updateUser(_parent, data, _context) {
    return await prisma.inm_user.update({ where: { id: data.id }, data });
  },
  async deleteUser(_parent, { id }, _context) {
    return await prisma.inm_user.delete({ where: { id } });
  },
};

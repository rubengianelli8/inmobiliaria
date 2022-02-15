import { prisma } from "@/prisma/client";

export const user = {
  async getUser(_parent, { id }, _context) {
    return await prisma.inm_user.findUnique({ where: { id } });
  },
  async getUsers(_parent, _args_, _context) {
    return await prisma.inm_user.findMany();
  },
  async addUser(_parent, data, _context) {
    return await prisma.inm_user.create(data);
  },
};

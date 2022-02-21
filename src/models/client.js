import { prisma } from "@/prisma/client";

export const client = {
  async getClient(_parent, { id }, _context) {
    return await prisma.inm_client.findUnique({
      where: { id },
      include: { user: true, billing: true },
    });
  },
  async addClient(_parent, data, _context) {
    return await prisma.inm_client.create({ data });
  },
  async updateClient(_parent, data, _context) {
    return await prisma.inm_client.update({ where: { id: data.id }, data });
  },
  async deleteClient(_parent, { id }, _context) {
    return await prisma.inm_client.delete({ where: { id } });
  },
};

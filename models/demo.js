import { prisma } from "@/prisma/client";

export const demo = {
  getDemo(_parent, { id, name }, _context) {
    if (id) return prisma.demo.findUnique({ where: { id } });
    return prisma.demo.findUnique({ where: { name } });
  },
  getDemos(_parent, _args, _context) {
    return prisma.demo.findMany();
  },
  addDemo(_parent, data, _context) {
    return prisma.demo.create({ data });
  },
  deleteDemo(_parent, { id }, _context) {
    return prisma.demo.delete({ where: { id } });
  },
};

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
    return await prisma.inm_owner.update({
      where: { id: data.id },
      data: {
        user: {
          update: {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            dni: data.dni,
            personal_address: data.personal_address,
            work_address: data.work_address,
            phone: data.phone,
            cell_phone: data.cell_phone,
          },
        },
      },
    });
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

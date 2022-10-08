import { prisma } from "@/prisma/client";

export const owner = {
  async getOwner(_parent, { id }, _context) {
    return await prisma.inm_owner.findFirst({
      where: { id, deleted: false },
      include: { user: true },
    });
  },
  async addOwner(_parent, data, _context) {
    return await prisma.inm_owner.create({ data });
  },
  async updateOwner(_parent, data, _context) {
    const { cbu, alias_cbu, bank, number_account } = data;
    return await prisma.inm_owner.update({
      where: { id: data.id },
      data: {
        cbu,
        alias_cbu,
        bank,
        number_account,
        user: {
          update: {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            full_name: data.first_name + " " + data.last_name,
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
    const owner_ = await prisma.inm_owner.findUnique({
      where: { id },
      select: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
    return await prisma.inm_owner.update({
      where: { id },
      data: {
        deleted: true,
        user: {
          update: {
            email: owner_.user.email + new Date(),
          },
        },
      },
    });
  },
  async getAllOwners(_parent, data, _context) {
    try {
      let filters = { user: {} };
      if (data.dni) {
        Object.assign(filters.user, { dni: data.dni });
      }
      if (data.name) {
        Object.assign(filters.user, { full_name: { contains: data.name } });
      }
      let page = data.page || 0;
      page = page > 0 ? page - 1 : page;

      const owners = await prisma.inm_owner.findMany({
        where: {
          ...{ ...filters },
          deleted: false,
        },
        skip: page * data.page_size,
        take: data.page_size,
        include: { user: true },
      });

      const total = await prisma.inm_owner.count({
        where: {
          ...{ ...filters },
          deleted: false,
        },
      });

      return { results: owners, total };
    } catch (e) {
      console.log("er...", e);
    }
  },
  async totalOwners(_parent, data, _context) {
    return await prisma.inm_owner.count();
  },
};

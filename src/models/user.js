import { prisma } from "@/prisma/client";

export const user = {
  async getUser(_parent, { id, id_owner, id_client }, _context) {
    try {
      if (id)
        return await prisma.inm_user.findUnique({
          where: { id },
          include: { real_estate: true },
        });
      let user_;
      if (id_owner)
        user_ = await prisma.inm_user.findFirst({
          where: {
            owner: {
              some: {
                id: id_owner,
              },
            },
          },
        });
      if (id_client) {
        user_ = await prisma.inm_user.findFirst({
          where: {
            client: {
              some: {
                id: id_client,
              },
            },
          },
        });
      }

      return user_;
    } catch (e) {
      console.log("err.....", e);
    }
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

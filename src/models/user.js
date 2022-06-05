import { prisma } from "@/prisma/client";

export const user = {
  async getUser(_parent, { id, id_owner }, _context) {
    try {
      if (id)
        return await prisma.inm_user.findUnique({
          where: { id },
          include: { real_estate: true },
        });
      const user_ = await prisma.inm_user.findMany({
        where: {
          owner: {
            every: {
              id: id_owner,
            },
          },
        },
      });
      console.log("user", user_[0]);
      return user_[0];
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

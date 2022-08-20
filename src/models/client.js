import { prisma } from "@/prisma/client";

export const client = {
  async getClient(_parent, { id_client }, _context) {
    const user_ = await prisma.inm_user.findFirst({
      where: {
        client: {
          some: {
            id: id_client,
          },
        },
      },
      include: {
        client: true,
      },
    });
    return user_;
  },
  async getAllClients(_parent, data, _context) {
    try {
      let filters = { user: {} };
      if (data.dni) {
        Object.assign(filters.user, { dni: data.dni });
      }
      if (data.name) {
        Object.assign(filters.user, { first_name: { contains: data.name } });
      }
      console.log(filters);
      const clients = await prisma.inm_client.findMany({
        where: {
          ...{ ...filters },
        },
        skip: data.page * data.page_size,
        take: data.page_size,
        include: { user: true, estate: true },
      });
      console.log(clients);
      return clients;
    } catch (e) {
      console.log("error", e);
    }
  },
  async totalClients(_parent, data, _context) {
    let filters = { user: {} };
    if (data.dni) {
      Object.assign(filters.user, { dni: data.dni });
    }
    if (data.name) {
      Object.assign(filters.user, { first_name: data.name });
    }
    return await prisma.inm_client.count({
      where: {
        ...{ ...filters },
      },
    });
  },
  async addClient(_parent, data, _context) {
    try {
      const client_ = await prisma.inm_client.create({
        data: {
          user: {
            create: { ...data },
          },
        },
      });
      return client_;
    } catch (err) {
      console.log(err);
    }
  },
  async updateClient(_parent, data, _context) {
    try {
      let id = data.id_client;
      delete data.id_client;
      const client_ = await prisma.inm_client.update({
        where: {
          id,
        },
        data: {
          user: {
            update: { ...data },
          },
        },
      });

      return client_.user;
    } catch (err) {
      console.log("err...", err);
    }
  },
  async deleteClient(_parent, { id }, _context) {
    return await prisma.inm_client.delete({ where: { id } });
  },
};

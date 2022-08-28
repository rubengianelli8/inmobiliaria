import { prisma } from "@/prisma/client";

export const client = {
  async getClient(_parent, { id_client }, _context) {
    const user_ = await prisma.inm_user.findFirst({
      where: {
        client: {
          some: {
            id: id_client,
            deleted: false,
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
      let page = data.page || 0;
      let page_size = data.page_size || 10;
      if (page > 0) page -= 1;

      let filters = { user: {} };
      if (data.dni) {
        Object.assign(filters.user, { dni: data.dni });
      }
      if (data.name) {
        Object.assign(filters.user, { full_name: { contains: data.name } });
      }

      const clients = await prisma.inm_client.findMany({
        where: {
          ...{ ...filters },
          deleted: false,
        },
        skip: page * page_size,
        take: page_size,
        include: {
          user: true,
          estate: {
            where: {
              deleted: false,
            },
          },
        },
      });

      const total = prisma.inm_client.count({
        where: {
          ...{ ...filters },
          deleted: false,
        },
      });
      return { results: clients, total };
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
        deleted: false,
      },
    });
  },
  async addClient(_parent, data, _context) {
    try {
      const client_ = await prisma.inm_client.create({
        data: {
          user: {
            create: {
              ...data,
              full_name: `${data.first_name} ${data.last_name}`,
            },
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
            update: {
              ...data,
              full_name: `${data.first_name} ${data.last_name}`,
            },
          },
        },
      });

      return client_.user;
    } catch (err) {
      console.log("err...", err);
    }
  },
  async deleteClient(_parent, { id }, _context) {
    return await prisma.inm_client.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
  },
};

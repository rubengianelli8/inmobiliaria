import { prisma } from "@/prisma/client";

export const estate = {
  async getEstate(_parent, { id }, _context) {
    return await prisma.inm_estate.findFirst({
      where: { id, deleted: false },
      include: {
        owner: { include: { user: true } },
      },
    });
  },
  async getAllEstatesByOwner(_parent, data, _context) {
    try {
      if (data.owner_id) {
        const estates = await prisma.inm_estate.findMany({
          where: { owner: { id: data.owner_id }, deleted: false },
          include: {
            owner: { include: { user: true } },
            client: {
              include: { user: true },
            },
            payment_plan: {
              where: {
                deleted: false,
              },
            },
          },
        });
        return { results: estates, total: estates.length };
      }

      if (data.client_id) {
        const estates = await prisma.inm_estate.findMany({
          where: {
            id_client: data.client_id,
            deleted: false,
          },
          include: {
            owner: { include: { user: true } },
            client: {
              include: { user: true },
            },
            payment_plan: {
              where: {
                deleted: false,
              },
            },
          },
        });
        return { results: estates, total: estates.length };
      }
      let filters = {};
      if (
        data.search?.until &&
        data.search?.since >= 0 &&
        data.search?.since < data.search?.until
      ) {
        Object.assign(filters, {
          price: {
            gte: parseInt(data.search?.since),
            lte: parseInt(data.search?.until),
          },
        });
      }
      let { page, page_size } = data;
      page = page || 0;
      page_size = page_size || 10;
      if (page > 0) page -= 1;

      if (data.search?.status && data.search?.status !== "all") {
        Object.assign(filters, {
          status: data.search.status,
        });
      }
      if (data.search?.full_name) {
        filters.owner = {
          user: {
            full_name: { contains: data.search.full_name },
          },
        };
      }
      if (data.search?.address) {
        filters.address = {
          contains: data.search.address,
        };
      }

      if (data.search?.address_number) {
        filters.address_number = {
          contains: data.search.address_number,
        };
      }

      console.log("data", data.search);
      const estates = await prisma.inm_estate.findMany({
        take: page_size,
        skip: page_size * page,
        where: {
          deleted: false,
          neighborhood: {
            contains: data.search?.neighborhood,
          },
          domain: {
            contains: data.search?.domain,
          },
          ...filters,
        },
        include: {
          owner: { include: { user: true } },
          payment_plan: {
            where: {
              deleted: false,
            },
          },
        },
      });

      const total = await prisma.inm_estate.count({
        where: {
          deleted: false,
          neighborhood: {
            contains: data.neighborhood,
          },
          domain: {
            contains: data.domain,
          },
          ...filters,
        },
      });
      return { results: estates, total };
    } catch (e) {
      console.log("ee.", e);
    }
  },
  async getTotalEstates(_parent, data, _context) {
    let filters = {};
    if (data.until && data.since >= 0 && data.since < data.until) {
      Object.assign(filters, {
        price: {
          gte: data.since,
          lte: data.until,
        },
      });
    }
    if (data.status === "Disponibles") {
      Object.assign(filters, {
        AND: [{ status: { not: "Alquilada" } }, { status: { not: "Vendida" } }],
      });
    }
    return await prisma.inm_estate.count({
      where: {
        deleted: false,
        neighborhood: {
          contains: data.neighborhood,
        },
        domain: {
          contains: data.domain,
        },
        ...filters,
      },
    });
  },
  async addEstate(_parent, data, _context) {
    try {
      return await prisma.inm_estate.create({ data });
    } catch (e) {
      console.log(e);
    }
  },
  async updateEstate(_parent, data, _context) {
    try {
      if (data.is_increase || data.price) {
        const payment_plan_ = await prisma.inm_payment_plan.findFirst({
          where: {
            id_estate: data.id,
          },
          select: { price: true },
        });
        if (payment_plan_.price < data.price || data.is_increase) {
          await prisma.inm_payment_plan.updateMany({
            where: {
              deleted: false,
              id_estate: data.id,
            },
            data: {
              last_increase: new Date(),
              price: data.price,
            },
          });
        }
        if (payment_plan_.price <= data.price && !data.is_increase) {
          await prisma.inm_payment_plan.updateMany({
            where: {
              deleted: false,
              id_estate: data.id,
            },
            data: {
              price: data.price,
            },
          });
        }
      }
      delete data.is_increase;
      return await prisma.inm_estate.update({ where: { id: data.id }, data });
    } catch (e) {
      console.log(e);
    }
  },
  async deleteEstate(_parent, { id }, _context) {
    return await prisma.inm_estate.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
  },

  async addPaymentPlan(_parent, data, _context) {
    try {
      const paymentPlan_ = await prisma.inm_payment_plan.create({
        data: {
          ...data,
          last_increase: data.entry,
        },
      });
      return paymentPlan_;
    } catch (e) {
      console.log(e);
    }
  },
  async updatePaymentPlan(_parent, data, _context) {
    return await prisma.inm_payment_plan.update({
      where: { id: data.id },
      data,
    });
  },
  async deletePaymentPlan(_parent, { id }, _context) {
    const paymentPlan = await prisma.inm_payment_plan.update({
      where: { id },
      data: { deleted: true },
    });
    await prisma.inm_estate.update({
      where: { id: paymentPlan.id_estate },
      data: {
        status: "Disponible",
        id_client: null,
      },
    });
    return paymentPlan;
  },
  async getPaymentPlan(_parent, { id }, _context) {
    const response = await prisma.inm_payment_plan.findFirst({
      where: { id_estate: id, deleted: false },
      include: {
        estate: {
          include: {
            owner: {
              include: {
                user: true,
              },
            },
          },
        },
        client: {
          include: {
            user: true,
          },
        },
      },
    });
    return response;
  },
};

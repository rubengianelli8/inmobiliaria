import { prisma } from "@/prisma/client";

export const estate = {
  async getEstate(_parent, { id }, _context) {
    return await prisma.inm_estate.findUnique({
      where: { id },
      include: {
        owner: { include: { user: true } },
      },
    });
  },
  async getAllEstatesByOwner(_parent, data, _context) {
    try {
      if (data.owner_id)
        return await prisma.inm_estate.findMany({
          where: { owner: { id: data.owner_id } },
          include: {
            owner: { include: { user: true } },
            client: {
              include: { user: true },
            },
          },
        });

      if (data.client_id)
        return await prisma.inm_estate.findMany({
          where: {
            id_client: data.client_id,
          },
          include: {
            owner: { include: { user: true } },
            client: {
              include: { user: true },
            },
          },
        });
      let filters = {};
      if (data.until && data.since >= 0 && data.since < data.until) {
        Object.assign(filters, {
          price: {
            gte: data.since,
            lte: data.until,
          },
        });
      }
      let { page, page_size } = data;
      page = page || 0;
      page_size = page_size || 10;

      if (data.status === "Disponible") {
        Object.assign(filters, {
          AND: [
            { status: { not: "Alquilada" } },
            { status: { not: "Vendida" } },
          ],
        });
      }
      console.log("data", data);
      const estates = await prisma.inm_estate.findMany({
        take: page_size,
        skip: page_size * page,
        where: {
          neighborhood: {
            contains: data.neighborhood,
          },
          domain: {
            contains: data.domain,
          },
          ...filters,
        },
        include: {
          owner: { include: { user: true } },
        },
      });

      return estates;
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
      return await prisma.inm_estate.update({ where: { id: data.id }, data });
    } catch (e) {
      console.log(e);
    }
  },
  async deleteEstate(_parent, { id }, _context) {
    return await prisma.inm_estate.delete({ where: { id } });
  },

  async addPaymentPlan(_parent, data, _context) {
    try {
      console.log("llega al model", data);
      const paymentPlan_ = await prisma.inm_payment_plan.create({ data });
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
    const paymentPlan = await prisma.inm_payment_plan.delete({ where: { id } });
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
    return await prisma.inm_payment_plan.findFirst({
      where: { id_estate: id },
      include: {
        estate: true,
        client: {
          include: {
            user: true,
          },
        },
      },
    });
  },
};

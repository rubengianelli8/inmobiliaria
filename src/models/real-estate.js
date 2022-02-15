import { prisma } from "@/prisma/client";

export const realState = {
  async getRealState(_parent, { id }, _context) {
    return await prisma.inm_real_state.findUnique({ where: { id } });
  },
  async addRealState(_parent, data, _context) {
    return await prisma.inm_real_state.create(data);
  },
  async deleteRealState(_parent, { id }, _context) {
    return await prisma.inm_real_state.delete({ where: { id } });
  },
};

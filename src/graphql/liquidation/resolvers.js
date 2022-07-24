import { liquidation } from "@/models/liquidation";

export const resolvers = {
  Query: {
    getLiquidation(_parent, _args, _context) {
      return liquidation.getLiquidation(_parent, _args, _context);
    },
    getAllLiquidations(_parent, _args, _context) {
      return liquidation.getAllLiquidations(_parent, _args, _context);
    },
  },
  Mutation: {
    addLiquidation(_parent, _args, _context) {
      return liquidation.addLiquidation(_parent, _args, _context);
    },
    deleteLiquidation(_parent, _args, _context) {
      return liquidation.deleteLiquidation(_parent, _args, _context);
    },
  },
};

import { PrismaClient } from '@prisma/client';

export const prisma = global.prisma || new PrismaClient();
/*new PrismaClient({
    log: ['query'],
  });*/

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

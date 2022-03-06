import { prisma } from "@/prisma/client";

export const auth = async ({ email, password }) => {
  const user = await prisma.inm_real_estate.findUnique({ where: { email } });

  if (user && user.password === password) {
    return { email: user.email };
  }
  return false;
};

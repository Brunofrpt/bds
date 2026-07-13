import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import prisma from "@/lib/prisma";

const betterAuthUrl = process.env.BETTER_AUTH_URL;
const betterAuthSecret = process.env.BETTER_AUTH_SECRET;

if (!betterAuthUrl) {
  throw new Error(
    "La variable d'environnement BETTER_AUTH_URL est manquante.",
  );
}

if (!betterAuthSecret) {
  throw new Error(
    "La variable d'environnement BETTER_AUTH_SECRET est manquante.",
  );
}

export const auth = betterAuth({
  baseURL: betterAuthUrl,
  secret: betterAuthSecret,
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

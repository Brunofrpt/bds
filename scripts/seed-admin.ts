import "dotenv/config";
import { auth } from "../src/lib/auth";
import prisma from "../src/lib/prisma";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? "Admin";

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL et ADMIN_PASSWORD doivent être définis dans .env");
  }

  const normalizedEmail = adminEmail.trim().toLowerCase();

  const existingAdmin = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingAdmin) {
    console.log(`Le compte admin existe déjà : ${normalizedEmail}`);
    return;
  }

  await auth.api.signUpEmail({
    body: {
      name: adminName,
      email: normalizedEmail,
      password: adminPassword,
    },
  });

  console.log(`Compte admin créé : ${normalizedEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
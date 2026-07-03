import prisma from "@/lib/prisma";

export async function getTechnologies() {
  const technologies = await prisma.technology.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return technologies;
}

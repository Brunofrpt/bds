import prisma from "@/lib/prisma";

export async function getTechnologyById(id: string) {
  const technology = await prisma.technology.findUnique({
    where: {
      id,
    },
  });

  return technology;
}

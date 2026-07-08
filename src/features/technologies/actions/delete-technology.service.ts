import prisma from "@/lib/prisma";

export async function deleteTechnologyService(id: string) {
  const technology = await prisma.technology.findUnique({
    where: {
      id,
    },
  });

  if (!technology) {
    throw new Error("La technologie est introuvable.");
  }

  await prisma.technology.delete({
    where: {
      id,
    },
  });

  return technology;
}

import prisma from "@/lib/prisma";

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      technologies: {
        include: {
          technology: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      images: {
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });

  return project;
}

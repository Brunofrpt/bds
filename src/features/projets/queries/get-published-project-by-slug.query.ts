import prisma from "@/lib/prisma";

export async function getPublishedProjectBySlug(slug: string) {
  const project = await prisma.project.findFirst({
    where: {
      slug,
      isPublished: true,
    },
    include: {
      technologies: {
        include: {
          technology: true,
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

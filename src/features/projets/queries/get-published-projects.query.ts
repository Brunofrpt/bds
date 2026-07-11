import prisma from "@/lib/prisma";

export async function getPublishedProjects() {
  const projects = await prisma.project.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    select: {
      id: true,
      heroImageUrl: true,
      heroImageAlt: true,
      title: true,
      shortDescription: true,
      year: true,
      publishedAt: true,
      slug: true,
      technologies: {
        select: {
          technology: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return projects;
}

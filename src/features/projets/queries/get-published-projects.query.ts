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
      title: true,
      slug: true,
      shortDescription: true,
      year: true,
      publishedAt: true,
    },
  });

  return projects;
}

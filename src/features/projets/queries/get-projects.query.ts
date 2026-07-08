import prisma from "@/lib/prisma";

export async function getProjects() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return projects;
}

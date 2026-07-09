import prisma from "@/lib/prisma";
import {
  projectSchema,
  type ProjectGalleryImageValues,
  type ProjectFormValues,
} from "@/features/projets/schemas/project.schema";

type UpdateProjectServiceInput = ProjectFormValues & {
  id: string;
  galleryImages?: ProjectGalleryImageValues[];
};

export async function updateProjectService(rawData: UpdateProjectServiceInput) {
  const { id, galleryImages, ...projectData } = rawData;

  const validatedData = projectSchema.parse(projectData);

  const existingProjectBySlug = await prisma.project.findFirst({
    where: {
      slug: validatedData.slug,
      NOT: {
        id,
      },
    },
  });

  if (existingProjectBySlug) {
    throw new Error("Un autre projet avec ce slug existe deja.");
  }

  const updatedProject = await prisma.project.update({
    where: {
      id,
    },
    data: {
      title: validatedData.title,
      slug: validatedData.slug,
      year: validatedData.year,
      shortDescription: validatedData.shortDescription,
      context: validatedData.context,
      objectives: validatedData.objectives,
      technicalStackDescription: validatedData.technicalStackDescription,
      developedSkills: validatedData.developedSkills,
      results: validatedData.results,
      improvements: validatedData.improvements,
      seoTitle: validatedData.seoTitle,
      seoDescription: validatedData.seoDescription,
      canonicalUrl: validatedData.canonicalUrl || null,
      ogImageUrl: validatedData.ogImageUrl || null,
      githubUrl: validatedData.githubUrl || null,
      demoUrl: validatedData.demoUrl || null,
      videoUrl: validatedData.videoUrl || null,
      heroImageUrl: validatedData.heroImageUrl,
      heroImageAlt: validatedData.heroImageAlt,
      isPublished: validatedData.isPublished,
      publishedAt: validatedData.isPublished ? new Date() : null,
      technologies: {
        deleteMany: {},
        create: validatedData.technologyIds.map((technologyId) => ({
          technology: {
            connect: {
              id: technologyId,
            },
          },
        })),
      },
      ...(galleryImages
        ? {
            images: {
              deleteMany: {},
              create: galleryImages.map((image) => ({
                imageUrl: image.imageUrl,
                altText: image.altText,
                displayOrder: image.displayOrder,
              })),
            },
          }
        : {}),
    },
  });

  return updatedProject;
}

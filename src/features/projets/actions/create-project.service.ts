import prisma from "@/lib/prisma";
import {
  projectSchema,
  type ProjectGalleryImageValues,
  type ProjectFormValues,
} from "@/features/projets/schemas/project.schema";

type CreateProjectServiceInput = ProjectFormValues & {
  galleryImages?: ProjectGalleryImageValues[];
};

export async function createProjectService(rawData: CreateProjectServiceInput) {
  const validatedData = projectSchema.parse(rawData);

  const existingProjectBySlug = await prisma.project.findUnique({
    where: {
      slug: validatedData.slug,
    },
  });

  if (existingProjectBySlug) {
    throw new Error("Un projet avec ce slug existe deja.");
  }

  const project = await prisma.project.create({
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
        create: validatedData.technologyIds.map((technologyId) => ({
          technology: {
            connect: {
              id: technologyId,
            },
          },
        })),
      },
      images: {
        create:
          rawData.galleryImages?.map((image) => ({
            imageUrl: image.imageUrl,
            altText: image.altText,
            displayOrder: image.displayOrder,
          })) ?? [],
      },
    },
  });

  return project;
}

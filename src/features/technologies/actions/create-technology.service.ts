import prisma from "@/lib/prisma";
import {
  technologySchema,
  type TechnologyFormValues,
} from "@/features/technologies/schemas/technology.schema";

export async function createTechnologyService(rawData: TechnologyFormValues) {
  const validatedData = technologySchema.parse(rawData);

  const existingTechnologyByName = await prisma.technology.findUnique({
    where: {
      name: validatedData.name,
    },
  });

  if (existingTechnologyByName) {
    throw new Error("Une technologie avec ce nom existe deja.");
  }

  const existingTechnologyBySlug = await prisma.technology.findUnique({
    where: {
      slug: validatedData.slug,
    },
  });

  if (existingTechnologyBySlug) {
    throw new Error("Une technologie avec ce slug existe deja.");
  }

  const technology = await prisma.technology.create({
    data: {
      name: validatedData.name,
      slug: validatedData.slug,
      logoUrl: validatedData.logoUrl || null,
    },
  });

  return technology;
}

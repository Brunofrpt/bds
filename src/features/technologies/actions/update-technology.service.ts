import prisma from "@/lib/prisma";
import {
  technologySchema,
  type TechnologyFormValues,
} from "@/features/technologies/schemas/technology.schema";

type UpdateTechnologyServiceInput = TechnologyFormValues & {
  id: string;
};

export async function updateTechnologyService(
  rawData: UpdateTechnologyServiceInput,
) {
  const { id, ...technologyData } = rawData;

  const validatedData = technologySchema.parse(technologyData);

  const existingTechnologyByName = await prisma.technology.findFirst({
    where: {
      name: validatedData.name,
      NOT: {
        id,
      },
    },
  });

  if (existingTechnologyByName) {
    throw new Error("Une autre technologie avec ce nom existe deja.");
  }

  const existingTechnologyBySlug = await prisma.technology.findFirst({
    where: {
      slug: validatedData.slug,
      NOT: {
        id,
      },
    },
  });

  if (existingTechnologyBySlug) {
    throw new Error("Une autre technologie avec ce slug existe deja.");
  }

  const updatedTechnology = await prisma.technology.update({
    where: {
      id,
    },
    data: {
      name: validatedData.name,
      slug: validatedData.slug,
      logoUrl: validatedData.logoUrl || null,
    },
  });

  return updatedTechnology;
}

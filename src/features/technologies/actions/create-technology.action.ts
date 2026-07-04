"use server";

import { ZodError } from "zod";
import type { TechnologyFormValues } from "@/features/technologies/schemas/technology.schema";
import { createTechnologyService } from "@/features/technologies/actions/create-technology.service";

export type CreateTechnologyActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: {
    name?: string[];
    slug?: string[];
    logoUrl?: string[];
  };
};

export async function createTechnologyAction(
  rawData: TechnologyFormValues,
): Promise<CreateTechnologyActionResult> {
  try {
    await createTechnologyService(rawData);

    return {
      success: true,
      message: "La technologie a bien ete creee.",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        message: "Le formulaire contient des erreurs.",
        fieldErrors: error.flatten().fieldErrors,
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Une erreur inattendue est survenue.",
    };
  }
}

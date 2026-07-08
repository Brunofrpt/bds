"use server";

import { deleteTechnologyService } from "@/features/technologies/actions/delete-technology.service";

export type DeleteTechnologyActionResult = {
  success: boolean;
  message: string;
};

export async function deleteTechnologyAction(
  id: string,
): Promise<DeleteTechnologyActionResult> {
  try {
    const technology = await deleteTechnologyService(id);

    return {
      success: true,
      message: `La technologie ${technology.name} a bien ete supprimee.`,
    };
  } catch (error) {
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

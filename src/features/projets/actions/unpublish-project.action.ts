"use server";

import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin-session";

export type UnpublishProjectActionResult = {
  success: boolean;
  message: string;
};

export async function unpublishProjectAction(
  id: string,
): Promise<UnpublishProjectActionResult> {
  try {
    await requireAdminSession();

    const currentProject = await prisma.project.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
      },
    });

    if (!currentProject) {
      throw new Error("Le projet a ete introuvable.");
    }

    const unpublishedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        isPublished: false,
      },
    });

    return {
      success: true,
      message: `Le projet ${unpublishedProject.title} est repasse en brouillon.`,
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

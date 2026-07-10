"use server";

import prisma from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin-session";

export type PublishProjectActionResult = {
  success: boolean;
  message: string;
};

export async function publishProjectAction(
  id: string,
): Promise<PublishProjectActionResult> {
  try {
    await requireAdminSession();

    const currentProject = await prisma.project.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        publishedAt: true,
      },
    });

    if (!currentProject) {
      throw new Error("Le projet a ete introuvable.");
    }

    const publishedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        isPublished: true,
        publishedAt: currentProject.publishedAt ?? new Date(),
      },
    });

    return {
      success: true,
      message: `Le projet ${publishedProject.title} est maintenant publie.`,
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

"use server";

import { ZodError } from "zod";
import { createTechnologyService } from "@/features/technologies/actions/create-technology.service";
import { uploadTechnologyLogoService } from "@/features/technologies/services/upload-technology-logo.service";
import { requireAdminSession } from "@/lib/require-admin-session";

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
  formData: FormData,
): Promise<CreateTechnologyActionResult> {
  try {
    await requireAdminSession();

    const name = String(formData.get("name") ?? "");
    const slug = String(formData.get("slug") ?? "");
    const logo = formData.get("logo");

    let logoUrl = "";

    if (logo instanceof File && logo.size > 0) {
      const uploadedLogo = await uploadTechnologyLogoService(logo);
      logoUrl = uploadedLogo.secure_url;
    }

    await createTechnologyService({
      name,
      slug,
      logoUrl,
    });

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

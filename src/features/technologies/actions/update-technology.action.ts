"use server";

import { ZodError } from "zod";
import { updateTechnologyService } from "@/features/technologies/actions/update-technology.service";
import { uploadTechnologyLogoService } from "@/features/technologies/services/upload-technology-logo.service";

export type UpdateTechnologyActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: {
    name?: string[];
    slug?: string[];
    logoUrl?: string[];
  };
};

export async function updateTechnologyAction(
  id: string,
  currentLogoUrl: string | null,
  formData: FormData,
): Promise<UpdateTechnologyActionResult> {
  try {
    const name = String(formData.get("name") ?? "");
    const slug = String(formData.get("slug") ?? "");
    const logo = formData.get("logo");

    let logoUrl = currentLogoUrl ?? "";

    if (logo instanceof File && logo.size > 0) {
      const uploadedLogo = await uploadTechnologyLogoService(logo);
      logoUrl = uploadedLogo.secure_url;
    }

    await updateTechnologyService({
      id,
      name,
      slug,
      logoUrl,
    });

    return {
      success: true,
      message: "La technologie a bien ete modifiee.",
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

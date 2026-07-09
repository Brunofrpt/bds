"use server";

import { ZodError } from "zod";
import { updateProjectService } from "@/features/projets/actions/update-project.service";
import { uploadProjectHeroImageService } from "@/features/projets/services/upload-project-hero-image.service";
import { uploadProjectGalleryImagesService } from "@/features/projets/services/upload-project-gallery-images.service";
import { requireAdminSession } from "@/lib/require-admin-session";

export type UpdateProjectActionResult = {
  success: boolean;
  message: string;
  fieldErrors?: {
    title?: string[];
    slug?: string[];
    year?: string[];
    shortDescription?: string[];
    context?: string[];
    objectives?: string[];
    technicalStackDescription?: string[];
    developedSkills?: string[];
    results?: string[];
    improvements?: string[];
    seoTitle?: string[];
    seoDescription?: string[];
    canonicalUrl?: string[];
    ogImageUrl?: string[];
    githubUrl?: string[];
    demoUrl?: string[];
    videoUrl?: string[];
    heroImageUrl?: string[];
    heroImageAlt?: string[];
    isPublished?: string[];
    technologyIds?: string[];
  };
};

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function updateProjectAction(
  id: string,
  currentHeroImageUrl: string,
  formData: FormData,
): Promise<UpdateProjectActionResult> {
  try {
    await requireAdminSession();

    const title = String(formData.get("title") ?? "");
    const slug = String(formData.get("slug") ?? "");
    const yearValue = String(formData.get("year") ?? "").trim();
    const shortDescription = String(formData.get("shortDescription") ?? "");
    const context = String(formData.get("context") ?? "");
    const objectives = parseLines(String(formData.get("objectives") ?? ""));
    const technicalStackDescription = String(
      formData.get("technicalStackDescription") ?? "",
    );
    const developedSkills = parseLines(
      String(formData.get("developedSkills") ?? ""),
    );
    const results = parseLines(String(formData.get("results") ?? ""));
    const improvementsValue = String(formData.get("improvements") ?? "");
    const seoTitle = String(formData.get("seoTitle") ?? "");
    const seoDescription = String(formData.get("seoDescription") ?? "");
    const canonicalUrl = String(formData.get("canonicalUrl") ?? "");
    const ogImageUrl = String(formData.get("ogImageUrl") ?? "");
    const githubUrl = String(formData.get("githubUrl") ?? "");
    const demoUrl = String(formData.get("demoUrl") ?? "");
    const videoUrl = String(formData.get("videoUrl") ?? "");
    const heroImage = formData.get("heroImageUrl");
    const heroImageAlt = String(formData.get("heroImageAlt") ?? "");
    const isPublished = formData.get("isPublished") === "on";
    const technologyIds = formData
      .getAll("technologyIds")
      .map((value) => String(value).trim())
      .filter(Boolean);
    const galleryImageFiles = formData
      .getAll("galleryImages")
      .filter(
        (value): value is File => value instanceof File && value.size > 0,
      );
    const galleryImageAltTexts = formData
      .getAll("galleryImageAltTexts")
      .map((value) => String(value).trim())
      .filter(Boolean);
    const galleryImageDisplayOrders = formData
      .getAll("galleryImageDisplayOrders")
      .map((value) => Number(value));
    const existingGalleryImageUrls = formData
      .getAll("existingGalleryImageUrls")
      .map((value) => String(value).trim())
      .filter(Boolean);
    const existingGalleryImageAltTexts = formData
      .getAll("existingGalleryImageAltTexts")
      .map((value) => String(value).trim())
      .filter(Boolean);
    const existingGalleryImageDisplayOrders = formData
      .getAll("existingGalleryImageDisplayOrders")
      .map((value) => Number(value));

    let heroImageUrl = currentHeroImageUrl;

    if (heroImage instanceof File && heroImage.size > 0) {
      const uploadedHeroImage = await uploadProjectHeroImageService(heroImage);
      heroImageUrl = uploadedHeroImage.secure_url;
    }

    let galleryImages:
      | {
          imageUrl: string;
          altText: string;
          displayOrder: number;
        }[]
      | undefined;

    if (
      existingGalleryImageAltTexts.length !== existingGalleryImageUrls.length
    ) {
      throw new Error(
        "Chaque image de galerie existante doit garder un texte alternatif.",
      );
    }

    if (
      existingGalleryImageDisplayOrders.length !==
      existingGalleryImageUrls.length
    ) {
      throw new Error("L'ordre des images de galerie existantes est invalide.");
    }

    const keptExistingGalleryImages = existingGalleryImageUrls.map(
      (imageUrl, index) => ({
        imageUrl,
        altText: existingGalleryImageAltTexts[index],
        displayOrder: existingGalleryImageDisplayOrders[index],
      }),
    );

    if (galleryImageFiles.length > 0) {
      if (galleryImageAltTexts.length !== galleryImageFiles.length) {
        throw new Error(
          "Chaque image de galerie doit avoir un texte alternatif.",
        );
      }

      if (galleryImageDisplayOrders.length !== galleryImageFiles.length) {
        throw new Error("L'ordre des images de galerie est invalide.");
      }

      const uploadedGalleryImages =
        await uploadProjectGalleryImagesService(galleryImageFiles);

      if (uploadedGalleryImages.length !== galleryImageFiles.length) {
        throw new Error(
          "Une ou plusieurs images de galerie n'ont pas pu etre televersees.",
        );
      }

      galleryImages = uploadedGalleryImages.map((image, index) => ({
        imageUrl: image.secure_url,
        altText: galleryImageAltTexts[index],
        displayOrder: galleryImageDisplayOrders[index],
      }));
    }

    const mergedGalleryImages = [
      ...keptExistingGalleryImages,
      ...(galleryImages ?? []),
    ]
      .sort(
        (firstImage, secondImage) =>
          firstImage.displayOrder - secondImage.displayOrder,
      )
      .map((image, index) => ({
        ...image,
        displayOrder: index,
      }));

    await updateProjectService({
      id,
      title,
      slug,
      year: yearValue ? Number(yearValue) : undefined,
      shortDescription,
      context,
      objectives,
      technicalStackDescription,
      developedSkills,
      results,
      improvements: improvementsValue
        ? parseLines(improvementsValue)
        : undefined,
      seoTitle,
      seoDescription,
      canonicalUrl,
      ogImageUrl,
      githubUrl,
      demoUrl,
      videoUrl,
      heroImageUrl,
      heroImageAlt,
      isPublished,
      technologyIds,
      galleryImages: mergedGalleryImages,
    });

    return {
      success: true,
      message: "Le projet a bien ete modifie.",
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

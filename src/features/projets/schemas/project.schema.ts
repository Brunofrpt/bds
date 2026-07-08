import { z } from "zod";

const optionalUrlField = z
  .string()
  .trim()
  .url("Ce champ doit contenir une URL valide.")
  .optional()
  .or(z.literal(""));

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Le titre du projet est obligatoire."),

  slug: z.string().trim().min(1, "Le slug du projet est obligatoire."),

  year: z
    .number()
    .int("L'annee doit etre un nombre entier.")
    .min(1900, "L'annee doit etre superieure ou egale a 1900.")
    .max(2100, "L'annee doit etre inferieure ou egale a 2100.")
    .optional(),

  shortDescription: z
    .string()
    .trim()
    .min(1, "La description courte est obligatoire."),

  context: z.string().trim().min(1, "Le contexte du projet est obligatoire."),

  objectives: z
    .array(z.string().trim().min(1))
    .min(1, "Au moins un objectif est obligatoire."),

  technicalStackDescription: z
    .string()
    .trim()
    .min(1, "La description de la stack technique est obligatoire."),

  developedSkills: z
    .array(z.string().trim().min(1))
    .min(1, "Au moins une competence developpee est obligatoire."),

  results: z
    .array(z.string().trim().min(1))
    .min(1, "Au moins un resultat est obligatoire."),

  improvements: z.array(z.string().trim().min(1)).optional(),

  seoTitle: z.string().trim().min(1, "Le titre SEO est obligatoire."),

  seoDescription: z
    .string()
    .trim()
    .min(1, "La description SEO est obligatoire."),

  canonicalUrl: optionalUrlField,
  ogImageUrl: optionalUrlField,
  githubUrl: optionalUrlField,
  demoUrl: optionalUrlField,
  videoUrl: optionalUrlField,

  heroImageUrl: z.string().trim().min(1, "L'image hero est obligatoire."),

  heroImageAlt: z
    .string()
    .trim()
    .min(1, "La description de l'image hero est obligatoire."),

  isPublished: z.boolean(),

  technologyIds: z
    .array(z.string().trim().min(1))
    .min(1, "Selectionnez au moins une technologie."),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

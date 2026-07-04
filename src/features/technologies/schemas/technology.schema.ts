import { z } from "zod";

export const technologySchema = z.object({
  name: z.string().trim().min(1, "Le nom de la technologie est obligatoire."),
  slug: z.string().trim().min(1, "Le slug est obligatoire."),
  logoUrl: z.string().trim().optional(),
});

export type TechnologyFormValues = z.infer<typeof technologySchema>;

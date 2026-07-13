import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Le nom est obligatoire.")
    .min(2, "Le nom doit contenir au moins 2 caractères."),

  email: z
    .string()
    .trim()
    .min(1, "L'email est obligatoire.")
    .email("Le format de l'email est invalide."),

  message: z
    .string()
    .trim()
    .min(1, "Le message est obligatoire.")
    .min(10, "Le message doit contenir au moins 10 caractères."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

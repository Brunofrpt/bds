"use server";

import { sendContactEmailService } from "@/features/contact/services/send-contact-email.service";
import {
  contactSchema,
  type ContactFormValues,
} from "@/features/contact/schemas/contact.schema";
import { verifyTurnstileToken } from "@/lib/turnstile";

type SubmitContactResult =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      message: string;
      fieldErrors?: Partial<Record<keyof ContactFormValues, string>>;
    };

export async function submitContactAction(
  formData: FormData,
): Promise<SubmitContactResult> {
  const honeypot = String(formData.get("company") ?? "").trim();
  const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");

  if (honeypot) {
    return {
      success: true,
      message: "Votre message a bien été envoyé.",
    };
  }

  const rawData = {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsedData = contactSchema.safeParse(rawData);

  if (!parsedData.success) {
    const fieldErrors = parsedData.error.flatten().fieldErrors;

    return {
      success: false,
      message: "Le formulaire contient des erreurs.",
      fieldErrors: {
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  try {
    if (!turnstileToken) {
      return {
        success: false,
        message: "La vérification anti-spam a échoué. Veuillez réessayer.",
      };
    }

    const turnstileResult = await verifyTurnstileToken(turnstileToken);

    if (!turnstileResult.success) {
      console.error("Échec de vérification Turnstile :", {
        errorCodes: turnstileResult.errorCodes,
      });

      return {
        success: false,
        message: "La vérification anti-spam a échoué. Veuillez réessayer.",
      };
    }

    await sendContactEmailService(parsedData.data);

    return {
      success: true,
      message: "Votre message a bien été envoyé.",
    };
  } catch (error) {
    console.error("Erreur lors de l'envoi du formulaire de contact :", error);

    return {
      success: false,
      message:
        "Une erreur serveur est survenue. Veuillez réessayer dans quelques instants.",
    };
  }
}

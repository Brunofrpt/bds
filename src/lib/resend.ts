import { Resend } from "resend";

export function getResendClient(): Resend {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error(
      "La variable d'environnement RESEND_API_KEY est manquante.",
    );
  }

  return new Resend(resendApiKey);
}

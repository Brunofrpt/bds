import type { ContactFormValues } from "@/features/contact/schemas/contact.schema";
import { getResendClient } from "@/lib/resend";

export async function sendContactEmailService(
  contactData: ContactFormValues,
): Promise<void> {
  const contactRecipient = process.env.CONTACT_TO_EMAIL;
  const contactSender = process.env.RESEND_FROM_EMAIL;

  if (!contactRecipient || !contactSender) {
    throw new Error(
      "Les variables CONTACT_TO_EMAIL ou RESEND_FROM_EMAIL sont manquantes.",
    );
  }

  const resend = getResendClient();

  const { error } = await resend.emails.send({
    from: contactSender,
    to: contactRecipient,
    replyTo: contactData.email,
    subject: `Nouveau message de contact - ${contactData.fullName}`,
    text: [
      `Nom : ${contactData.fullName}`,
      `Email : ${contactData.email}`,
      "",
      "Message :",
      contactData.message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }
}

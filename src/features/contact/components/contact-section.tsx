"use client";

import Link from "next/link";
import Script from "next/script";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { submitContactAction } from "@/features/contact/actions/submit-contact.action";
import {
  contactSchema,
  type ContactFormValues,
} from "@/features/contact/schemas/contact.schema";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export default function ContactSection() {
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileScriptReadyTick, setTurnstileScriptReadyTick] = useState(0);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  function resetTurnstileWidget() {
    if (window.turnstile && turnstileWidgetIdRef.current) {
      window.turnstile.reset(turnstileWidgetIdRef.current);
      setTurnstileToken("");
    }
  }

  useEffect(() => {
    if (!turnstileSiteKey) {
      return;
    }

    if (!window.turnstile) {
      return;
    }

    if (!turnstileContainerRef.current) {
      return;
    }

    if (turnstileWidgetIdRef.current) {
      return;
    }

    const widgetId = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: turnstileSiteKey,
      callback: (token) => {
        setTurnstileToken(token);
        setErrorMessage("");
      },
      "expired-callback": () => {
        setTurnstileToken("");
      },
      "error-callback": () => {
        setTurnstileToken("");
        setErrorMessage(
          "La vérification anti-spam a échoué. Veuillez réessayer.",
        );
      },
    });

    turnstileWidgetIdRef.current = widgetId;
  }, [turnstileSiteKey, turnstileScriptReadyTick]);

  useEffect(() => {
    return () => {
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }

      if (turnstileContainerRef.current) {
        turnstileContainerRef.current.innerHTML = "";
      }
    };
  }, []);

  function handleFormChange() {
    if (errorMessage) {
      setErrorMessage("");
    }

    if (successMessage) {
      setSuccessMessage("");
    }

    if (Object.keys(fieldErrors).length > 0) {
      setFieldErrors({});
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const rawData = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    setFieldErrors({});

    const parsedData = contactSchema.safeParse(rawData);

    if (!parsedData.success) {
      const clientErrors = parsedData.error.flatten().fieldErrors;

      setFieldErrors({
        fullName: clientErrors.fullName?.[0],
        email: clientErrors.email?.[0],
        message: clientErrors.message?.[0],
      });
      setErrorMessage("Le formulaire contient des erreurs.");
      setIsLoading(false);
      return;
    }

    if (!turnstileToken) {
      setErrorMessage("Veuillez valider la vérification anti-spam.");
      setIsLoading(false);
      return;
    }

    const result = await submitContactAction(formData);

    if (!result.success) {
      setFieldErrors(result.fieldErrors ?? {});
      setErrorMessage(result.message);
      resetTurnstileWidget();
      setIsLoading(false);
      return;
    }

    setSuccessMessage(result.message);
    form.reset();
    resetTurnstileWidget();
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
    setIsLoading(false);
  }

  return (
    <section className="home__contact" id="contact">
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => {
            setTurnstileScriptReadyTick((currentTick) => currentTick + 1);
          }}
        />
      )}

      <header className="home__contact-header">
        <h2 className="home__contact-title title-public">
          Parlons de votre
          <br />
          prochain projet<span className="home__contact-dot">.</span>
        </h2>
        <p className="home__contact-description paragraphe">
          Prêt à booster vos performances ? Contactez-moi pour un audit ou une
          collaboration.
        </p>
      </header>

      <nav className="home__contact-socials" aria-label="Liens de contact">
        <Link
          className="home__contact-social link-description"
          href="https://www.linkedin.com/in/bruno-da-silva-1107a23b5"
        >
          LINKEDIN
        </Link>
        <Link
          className="home__contact-social link-description"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          GITHUB
        </Link>
      </nav>

      <form
        className="home__contact-form"
        onSubmit={handleSubmit}
        onChange={handleFormChange}
        noValidate
      >
        <div className="home__honeypot" aria-hidden="true">
          <label htmlFor="company">Entreprise</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <label className="home__sr-only" htmlFor="fullName">
          Nom complet
        </label>
        <input
          className="home__contact-input"
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Nom complet"
          aria-invalid={Boolean(fieldErrors.fullName)}
          aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
        />
        {fieldErrors.fullName && (
          <p className="home__contact-error" id="fullName-error" role="alert">
            {fieldErrors.fullName}
          </p>
        )}

        <label className="home__sr-only" htmlFor="email">
          E-mail
        </label>
        <input
          className="home__contact-input"
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "email-error" : undefined}
        />
        {fieldErrors.email && (
          <p className="home__contact-error" id="email-error" role="alert">
            {fieldErrors.email}
          </p>
        )}

        <label className="home__sr-only" htmlFor="message">
          Votre message
        </label>
        <textarea
          className="home__contact-textarea"
          id="message"
          name="message"
          placeholder="Votre message"
          rows={5}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
        />
        {fieldErrors.message && (
          <p className="home__contact-error" id="message-error" role="alert">
            {fieldErrors.message}
          </p>
        )}

        {turnstileSiteKey ? (
          <>
            <div
              className="home__contact-turnstile"
              ref={turnstileContainerRef}
            />
            <input
              type="hidden"
              name="cf-turnstile-response"
              value={turnstileToken}
            />
          </>
        ) : (
          <p className="home__contact-feedback" role="alert">
            La protection anti-spam n&apos;est pas configurée.
          </p>
        )}

        {errorMessage && (
          <p className="home__contact-feedback" role="alert">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p className="home__contact-success" role="status">
            {successMessage}
          </p>
        )}

        <button
          className="home__contact-submit button button--primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "ENVOI EN COURS" : "ENVOYER LE MESSAGE"}
        </button>
      </form>
    </section>
  );
}

"use client";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      setErrorMessage("Les champs du formulaire sont invalides.");
      setIsLoading(false);
      return;
    }

    const { error } = await authClient.signIn.email({
      email: email.trim().toLocaleLowerCase(),
      password,
    });

    if (error) {
      setErrorMessage("Identifiants incorrects.");
      setIsLoading(false);
      return;
    }
    router.push("/admin/dashboard");
  }

  return (
    <form className="admin-login__form" onSubmit={handleSubmit}>
      <div className="admin-login__field">
        <label className="admin-login__label description" htmlFor="email">
          ADRESSE E-MAIL
        </label>
        <input
          className="admin-login__input"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="adresse@email.com"
        />
      </div>
      <div className="admin-login__field">
        <label className="admin-login__label description" htmlFor="password">
          MOT DE PASSE
        </label>
        <input
          className="admin-login__input"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      {errorMessage && (
        <p className="admin-login__error" role="alert">
          {errorMessage}
        </p>
      )}
      <button
        disabled={isLoading}
        className="admin-login__button button button--primary"
        type="submit"
      >
        {isLoading ? "CONNEXION..." : "SE CONNECTER"}
      </button>
    </form>
  );
}

"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createTechnologyAction } from "../actions/create-technology.action";

export default function TechnologyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(form);

    const rawData = {
      name: String(formData.get("name") ?? ""),
      slug: String(formData.get("slug") ?? ""),
      logoUrl: String(formData.get("logoUrl") ?? ""),
    };

    const result = await createTechnologyAction(rawData);

    if (!result.success) {
      setErrorMessage(result.message);
      setIsLoading(false);
      return;
    }

    setSuccessMessage(result.message);
    form.reset();

    setTimeout(() => {
      router.push("/admin/technologies");
      router.refresh();
    }, 800);
  }
  return (
    <form className="techno-form" onSubmit={handleSubmit}>
      <div className="techno-form__field">
        <label className="techno-form__label" htmlFor="name">
          NOM DE LA TECHNO
        </label>
        <input
          className="techno-form__input"
          id="name"
          name="name"
          type="text"
          placeholder="ex: react, wordPress, php..."
          required
        />
      </div>
      <div className="techno-form__field">
        <label className="techno-form__label" htmlFor="slug">
          SLUG
        </label>
        <input
          className="techno-form__input"
          id="slug"
          name="slug"
          type="text"
          placeholder="ex: next-js, react-native..."
          required
        />
      </div>
      <div className="techno-form__field">
        <label className="techno-form__label" htmlFor="logoUrl">
          IMAGE
        </label>
        <input
          className="techno-form__input"
          id="logoUrl"
          name="logoUrl"
          type="url"
        />
      </div>
      {errorMessage && (
        <p className="techno-form__error" role="alert">
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p className="techno-form__success" role="status">
          {successMessage}
        </p>
      )}

      <button
        className="techno-form__validation"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "EN COURS" : "CREER LA TECHNO"}
      </button>
      <Link className="techno-form__annulation" href="/admin/technologies">
        ANNULER
      </Link>
    </form>
  );
}

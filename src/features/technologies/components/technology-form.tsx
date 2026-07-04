"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";

export default function TechnologyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    try {
      //branchement
    } finally {
      setIsLoading(false);
    }
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

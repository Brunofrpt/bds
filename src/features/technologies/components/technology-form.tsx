"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createTechnologyAction } from "../actions/create-technology.action";
import { updateTechnologyAction } from "../actions/update-technology.action";

// initialData est fourni uniquement en mode modification depuis la page d'édition
type TechnologyFormProps = {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
  };
};

export default function TechnologyForm({ initialData }: TechnologyFormProps) {
  // Etats du formulaire + detection du mode creation/modification.
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const editMode = Boolean(initialData);
  const buttonTextDynamique = isLoading
    ? editMode
      ? "MODIFICATION..."
      : "CREATION..."
    : editMode
      ? "MODIFIER LA TECHNO"
      : "CREER LA TECHNO";

  // Soumission commune : on choisit l'action create ou update selon le mode.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    // FormData lit les valeurs actuelles du formulaire, y compris le fichier choisi.
    const formData = new FormData(form);

    let result;

    if (editMode && initialData) {
      result = await updateTechnologyAction(
        initialData.id,
        initialData.logoUrl,
        formData,
      );
    } else {
      result = await createTechnologyAction(formData);
    }

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
      {/* Les champs texte sont pre-remplis en mode modification via initialData. */}
      <div className="techno-form__field">
        <label className="techno-form__label label" htmlFor="name">
          NOM DE LA TECHNO
        </label>
        <input
          className="techno-form__input"
          id="name"
          name="name"
          type="text"
          placeholder="ex: react, wordPress, php..."
          defaultValue={initialData?.name ?? ""}
          required
        />
      </div>
      <div className="techno-form__field">
        <label className="techno-form__label label" htmlFor="slug">
          SLUG
        </label>
        <input
          className="techno-form__input"
          id="slug"
          name="slug"
          type="text"
          placeholder="ex: next-js, react-native..."
          defaultValue={initialData?.slug ?? ""}
          required
        />
      </div>

      {initialData?.logoUrl && (
        <img
          src={initialData?.logoUrl}
          alt={"logo de la technologie ${initialData?.name}"}
          className="techno-form__prévisualisation"
        />
      )}

      <div className="techno-form__field">
        <label className="techno-form__label label" htmlFor="logo">
          IMAGE
        </label>
        <input
          className="techno-form__input"
          id="logo"
          name="logo"
          type="file"
          accept="image/png, image/jpeg, image/webp, image/svg+xml"
        />
      </div>
      {/* Messages de retour utilisateur + actions du formulaire. */}
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
      <div className="techno-form__buttons">
        <button
          className="techno-form__validation button button--primary"
          type="submit"
          disabled={isLoading}
        >
          {buttonTextDynamique}
        </button>
        <Link
          className="techno-form__annulation button button--secondary"
          href="/admin/technologies"
        >
          ANNULER
        </Link>
      </div>
    </form>
  );
}

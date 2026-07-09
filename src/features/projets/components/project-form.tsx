"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { createProjectAction } from "../actions/create-project.action";
import { updateProjectAction } from "../actions/update-project.action";
import { useRouter } from "next/navigation";
import type { ProjectInitialData } from "../types/project-initial-data";
import PreviewHeroImageForm from "./preview-hero-image-form";
import ProjectGalleryImagesInput from "./project-gallery-images-input";
import ProjectTechnologiesSelect, {
  type TechnologyOption,
} from "./project-technologies-select";

type ProjectFormProps = {
  technologies: TechnologyOption[];
  initialData?: ProjectInitialData;
};

function formatLinesForTextarea(values: unknown) {
  if (!Array.isArray(values)) {
    return "";
  }

  return values.join("\n");
}

export default function ProjectForm({
  technologies,
  initialData,
}: ProjectFormProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [heroPreviewUrl, setHeroPreviewUrl] = useState<string | null>(null);
  const editMode = Boolean(initialData);
  const buttonText = isLoading
    ? editMode
      ? "MODIFICATION EN COURS..."
      : "CREATION EN COURS..."
    : editMode
      ? "MODIFIER LE PROJET"
      : "CREER LE PROJET";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(form);
    let result;

    if (editMode && initialData) {
      result = await updateProjectAction(
        initialData.id,
        initialData.heroImageUrl,
        formData,
      );
    } else {
      result = await createProjectAction(formData);
    }

    if (!result.success) {
      setErrorMessage(result.message);
      setIsLoading(false);
      return;
    } else {
      setSuccessMessage(result.message);
      form.reset();
      setHeroPreviewUrl(null);

      setTimeout(() => {
        router.push("/admin/projets");
        router.refresh();
      }, 800);
    }
  }

  function handleHeroImageChange(event: FormEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) {
      setHeroPreviewUrl(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setHeroPreviewUrl(previewUrl);
  }

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      {/* ---------------- Informations générales ---------------- */}
      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="title">
          TITRE*
        </label>
        <input
          className="project-form__input"
          id="title"
          name="title"
          type="text"
          defaultValue={initialData?.title}
          required
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="year">
          ANNÉE
        </label>
        <input
          className="project-form__input"
          id="year"
          name="year"
          type="number"
          defaultValue={initialData?.year ?? new Date().getFullYear()}
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="slug">
          SLUG (URL)*
        </label>
        <input
          className="project-form__input"
          id="slug"
          name="slug"
          type="text"
          defaultValue={initialData?.slug}
          required
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="shortDescription">
          COURTE DESCRIPTION*
        </label>
        <textarea
          className="project-form__input"
          id="shortDescription"
          name="shortDescription"
          defaultValue={initialData?.shortDescription}
          required
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="context">
          CONTEXTE DU PROJET*
        </label>
        <textarea
          className="project-form__input"
          id="context"
          name="context"
          defaultValue={initialData?.context}
          required
        />
      </div>

      {/* ---------------- Contenu du projet ---------------- */}
      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="objectives">
          OBJECTIFS*
        </label>
        <textarea
          className="project-form__input"
          id="objectives"
          name="objectives"
          placeholder="Un objectif par ligne"
          defaultValue={formatLinesForTextarea(initialData?.objectives)}
          required
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="developedSkills">
          COMPÉTENCES DÉVELOPPÉES*
        </label>
        <textarea
          className="project-form__input"
          id="developedSkills"
          name="developedSkills"
          placeholder="Une compétence par ligne"
          defaultValue={formatLinesForTextarea(initialData?.developedSkills)}
          required
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="results">
          RÉSULTATS*
        </label>
        <textarea
          className="project-form__input"
          id="results"
          name="results"
          placeholder="Un résultat par ligne"
          defaultValue={formatLinesForTextarea(initialData?.results)}
          required
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="improvements">
          AMÉLIORATIONS POSSIBLES
        </label>
        <textarea
          className="project-form__input"
          id="improvements"
          name="improvements"
          placeholder="Une amélioration par ligne"
          defaultValue={formatLinesForTextarea(initialData?.improvements)}
        />
      </div>

      <div className="project-form__field">
        <label
          className="project-form__label label"
          htmlFor="technicalStackDescription"
        >
          STACK UTILISÉE*
        </label>
        <textarea
          className="project-form__input"
          id="technicalStackDescription"
          name="technicalStackDescription"
          placeholder="Exemple: Application développée avec Next.js, Prisma et MySQL, authentification Better Auth."
          defaultValue={initialData?.technicalStackDescription}
          required
        />
      </div>

      <ProjectTechnologiesSelect
        technologies={technologies}
        initialSelectedTechnologies={
          initialData?.technologies.map((projectTechnology) => ({
            id: projectTechnology.technology.id,
            name: projectTechnology.technology.name,
          })) ?? []
        }
      />

      {/* ---------------- SEO ---------------- */}
      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="seoTitle">
          TITRE SEO*
        </label>
        <input
          className="project-form__input"
          id="seoTitle"
          name="seoTitle"
          type="text"
          placeholder="Ex: Tes cours d'espagnol - Site de réservation pour cours d'espagnol"
          defaultValue={initialData?.seoTitle}
          required
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="seoDescription">
          DESCRIPTION SEO*
        </label>
        <textarea
          className="project-form__input"
          id="seoDescription"
          name="seoDescription"
          placeholder="Résumé clair du projet pour les moteurs de recherche et les réseaux sociaux"
          defaultValue={initialData?.seoDescription}
          required
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="canonicalUrl">
          URL CANONIQUE
        </label>
        <input
          className="project-form__input"
          id="canonicalUrl"
          name="canonicalUrl"
          type="url"
          defaultValue={initialData?.canonicalUrl ?? ""}
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="ogImageUrl">
          OG IMAGE URL
        </label>
        <input
          className="project-form__input"
          id="ogImageUrl"
          name="ogImageUrl"
          type="url"
          placeholder="URL de l'image pour les réseaux sociaux"
          defaultValue={initialData?.ogImageUrl ?? ""}
        />
      </div>

      {/* ---------------- Liens ---------------- */}
      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="githubUrl">
          URL GITHUB
        </label>
        <input
          className="project-form__input"
          id="githubUrl"
          name="githubUrl"
          type="url"
          placeholder="https://..."
          defaultValue={initialData?.githubUrl ?? ""}
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="demoUrl">
          URL DU PROJET
        </label>
        <input
          className="project-form__input"
          id="demoUrl"
          name="demoUrl"
          type="url"
          placeholder="https://..."
          defaultValue={initialData?.demoUrl ?? ""}
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="videoUrl">
          VIDÉO URL
        </label>
        <input
          className="project-form__input"
          id="videoUrl"
          name="videoUrl"
          type="url"
          defaultValue={initialData?.videoUrl ?? ""}
        />
      </div>

      {/* ---------------- Média et publication ---------------- */}
      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="heroImageUrl">
          IMAGE DE COUVERTURE*
        </label>
        <input
          className="project-form__input"
          id="heroImageUrl"
          name="heroImageUrl"
          type="file"
          onChange={handleHeroImageChange}
          required={!editMode}
        />
        <PreviewHeroImageForm
          previewUrl={heroPreviewUrl ?? initialData?.heroImageUrl ?? null}
        />
      </div>

      <div className="project-form__field">
        <label className="project-form__label label" htmlFor="heroImageAlt">
          DESCRIPTION DE L&apos;IMAGE DE COUVERTURE*
        </label>
        <input
          className="project-form__input"
          id="heroImageAlt"
          name="heroImageAlt"
          type="text"
          placeholder="Description du hero image"
          defaultValue={initialData?.heroImageAlt}
          required
        />
      </div>

      <ProjectGalleryImagesInput initialImages={initialData?.images} />

      <div className="project-form__field project-form__field--checkbox">
        <label className="project-form__label label" htmlFor="isPublished">
          PUBLIER LE PROJET
        </label>
        <input
          className="project-form__checkbox"
          id="isPublished"
          name="isPublished"
          type="checkbox"
          defaultChecked={initialData?.isPublished ?? false}
        />
      </div>
      {errorMessage && (
        <p className="project-form__error" role="alert">
          {errorMessage}
        </p>
      )}

      {successMessage && (
        <p className="project-form__success" role="status">
          {successMessage}
        </p>
      )}
      <div className="project-form__boutons">
        <button
          className="project-form__validation button button--primary"
          type="submit"
          disabled={isLoading}
        >
          {buttonText}
        </button>
        <Link
          className="project-form__annulation button button--secondary"
          href="/admin/projets"
        >
          ANNULER
        </Link>
      </div>
    </form>
  );
}

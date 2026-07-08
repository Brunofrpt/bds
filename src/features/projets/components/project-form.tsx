"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProjectForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  return (
    <form className="project-form">
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
          defaultValue={new Date().getFullYear()}
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
          placeholder="Tapez le nom d'une téchno"
          required
        />
      </div>

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
          required
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
          required
        />
      </div>

      <div className="project-form__field project-form__field--checkbox">
        <label className="project-form__label label" htmlFor="isPublished">
          PUBLIER LE PROJET
        </label>
        <input
          className="project-form__checkbox"
          id="isPublished"
          name="isPublished"
          type="checkbox"
          defaultChecked={false}
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
        >
          CRÉER LE PROJET
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

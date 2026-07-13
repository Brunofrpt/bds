import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales | Bruno Da Silva",
  description:
    "Consultez les mentions légales du site de Bruno Da Silva : éditeur, hébergement, contact et informations juridiques essentielles.",
};

export default function MentionsLegalesPage() {
  return (
    <section className="mentions-legales">
      <p className="mentions-legales__page-infos link-description">
        / MENTIONS LÉGALES
      </p>

      <header className="mentions-legales__header">
        <h1 className="mentions-legales__title title-public">
          Mentions légales
        </h1>
        <p className="mentions-legales__intro paragraphe">
          Vous trouverez sur cette page les informations légales relatives à
          l&apos;édition, à l&apos;hébergement et à l&apos;utilisation du site
          brunods.fr.
        </p>
      </header>

      <div className="mentions-legales__sections">
        <section className="mentions-legales__section admin-section-card">
          <h2 className="mentions-legales__section-title subsubtitle">
            Éditeur du site
          </h2>
          <dl className="mentions-legales__list">
            <div className="mentions-legales__item">
              <dt className="mentions-legales__label label">Nom</dt>
              <dd className="mentions-legales__value">Bruno Da Silva</dd>
            </div>
            <div className="mentions-legales__item">
              <dt className="mentions-legales__label label">Site</dt>
              <dd className="mentions-legales__value">https://brunods.fr</dd>
            </div>
            <div className="mentions-legales__item">
              <dt className="mentions-legales__label label">Statut</dt>
              <dd className="mentions-legales__value">
                Activité indépendante / freelance en cours de lancement
              </dd>
            </div>
            <div className="mentions-legales__item">
              <dt className="mentions-legales__label label">Adresse</dt>
              <dd className="mentions-legales__value">Paris 9e, France</dd>
            </div>
            <div className="mentions-legales__item">
              <dt className="mentions-legales__label label">SIRET / SIREN</dt>
              <dd className="mentions-legales__value">
                Non communiqué à ce jour
              </dd>
            </div>
          </dl>
        </section>

        <section className="mentions-legales__section admin-section-card">
          <h2 className="mentions-legales__section-title subsubtitle">
            Directeur de la publication
          </h2>
          <p className="mentions-legales__paragraph paragraphe-public">
            Le directeur de la publication du site brunods.fr est Bruno Da
            Silva.
          </p>
        </section>

        <section className="mentions-legales__section admin-section-card">
          <h2 className="mentions-legales__section-title subsubtitle">
            Hébergement
          </h2>
          <dl className="mentions-legales__list">
            <div className="mentions-legales__item">
              <dt className="mentions-legales__label label">Hébergeur</dt>
              <dd className="mentions-legales__value">o2switch</dd>
            </div>
            <div className="mentions-legales__item">
              <dt className="mentions-legales__label label">Adresse</dt>
              <dd className="mentions-legales__value">
                Chemin des Pardiaux, 63000 Clermont-Ferrand, France
              </dd>
            </div>
            <div className="mentions-legales__item">
              <dt className="mentions-legales__label label">Téléphone</dt>
              <dd className="mentions-legales__value">04 44 44 60 40</dd>
            </div>
          </dl>
        </section>

        <section className="mentions-legales__section admin-section-card">
          <h2 className="mentions-legales__section-title subsubtitle">
            Contact
          </h2>
          <ul className="mentions-legales__contact-list">
            <li className="mentions-legales__contact-item paragraphe-public">
              Formulaire de contact :{" "}
              <Link href="/#contact" className="mentions-legales__link">
                brunods.fr/#contact
              </Link>
            </li>
            <li className="mentions-legales__contact-item paragraphe-public">
              LinkedIn :{" "}
              <Link
                href="https://www.linkedin.com/in/bruno-da-silva-1107a23b5"
                className="mentions-legales__link"
              >
                profil Bruno Da Silva
              </Link>
            </li>
          </ul>
        </section>

        <section className="mentions-legales__section admin-section-card">
          <h2 className="mentions-legales__section-title subsubtitle">
            Propriété intellectuelle
          </h2>
          <p className="mentions-legales__paragraph paragraphe-public">
            L&apos;ensemble des contenus présents sur ce site, incluant sans
            limitation les textes, visuels, maquettes, éléments graphiques,
            codes source et réalisations, est protégé par le droit
            d&apos;auteur. Sauf mention contraire, ces contenus sont la
            propriété de Bruno Da Silva.
          </p>
          <p className="mentions-legales__paragraph paragraphe-public">
            Toute reproduction, représentation, adaptation ou exploitation,
            totale ou partielle, sans autorisation préalable, est interdite.
          </p>
        </section>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Bruno Da Silva",
  description:
    "Consultez la politique de confidentialité du site de Bruno Da Silva : données collectées, finalités, durée de conservation et droits des utilisateurs.",
};

export default function PolitiqueDeConfidentialitePage() {
  return (
    <section className="politique-confidentialite">
      <p className="politique-confidentialite__page-infos link-description">
        / CONFIDENTIALITÉ
      </p>

      <header className="politique-confidentialite__header">
        <h1 className="politique-confidentialite__title title-public">
          Politique de confidentialité
        </h1>
        <p className="politique-confidentialite__intro paragraphe">
          Cette page explique quelles données peuvent être traitées lors de
          l&apos;utilisation du site brunods.fr, dans quel but, pendant combien
          de temps et quels sont vos droits.
        </p>
      </header>

      <div className="politique-confidentialite__sections">
        <section className="politique-confidentialite__section admin-section-card">
          <h2 className="politique-confidentialite__section-title subsubtitle">
            Responsable du traitement
          </h2>
          <p className="politique-confidentialite__paragraph paragraphe-public">
            Le responsable du traitement des données est Bruno Da Silva, éditeur
            du site brunods.fr.
          </p>
        </section>

        <section className="politique-confidentialite__section admin-section-card">
          <h2 className="politique-confidentialite__section-title subsubtitle">
            Données susceptibles d&apos;être collectées
          </h2>
          <ul className="politique-confidentialite__list">
            <li className="politique-confidentialite__list-item paragraphe-public">
              données d&apos;identification envoyées volontairement via le
              formulaire de contact : nom, adresse e-mail, message ;
            </li>
            <li className="politique-confidentialite__list-item paragraphe-public">
              données techniques minimales liées à la sécurité et à la
              prévention du spam, notamment les vérifications anti-abus ;
            </li>
            <li className="politique-confidentialite__list-item paragraphe-public">
              journaux techniques temporaires en cas d&apos;erreur ou
              d&apos;incident de traitement.
            </li>
          </ul>
        </section>

        <section className="politique-confidentialite__section admin-section-card">
          <h2 className="politique-confidentialite__section-title subsubtitle">
            Finalités du traitement
          </h2>
          <ul className="politique-confidentialite__list">
            <li className="politique-confidentialite__list-item paragraphe-public">
              répondre aux demandes envoyées via le formulaire de contact ;
            </li>
            <li className="politique-confidentialite__list-item paragraphe-public">
              assurer la sécurité du formulaire et limiter les soumissions
              automatisées ou abusives ;
            </li>
            <li className="politique-confidentialite__list-item paragraphe-public">
              maintenir le bon fonctionnement technique du site.
            </li>
          </ul>
        </section>

        <section className="politique-confidentialite__section admin-section-card">
          <h2 className="politique-confidentialite__section-title subsubtitle">
            Durée de conservation
          </h2>
          <p className="politique-confidentialite__paragraph paragraphe-public">
            Les données issues du formulaire de contact sont conservées pendant
            la durée nécessaire au traitement de la demande et aux échanges qui
            en découlent. Elles ne sont pas conservées plus longtemps que
            nécessaire au regard de leur finalité.
          </p>
          <p className="politique-confidentialite__paragraph paragraphe-public">
            Les éventuels journaux techniques liés à la sécurité ou aux erreurs
            sont conservés de manière limitée et uniquement dans un objectif de
            maintenance, de sécurité et de diagnostic.
          </p>
        </section>

        <section className="politique-confidentialite__section admin-section-card">
          <h2 className="politique-confidentialite__section-title subsubtitle">
            Droits des utilisateurs
          </h2>
          <p className="politique-confidentialite__paragraph paragraphe-public">
            Conformément à la réglementation applicable, vous pouvez demander
            l&apos;accès, la rectification ou la suppression des données
            personnelles vous concernant, ainsi que la limitation du traitement
            lorsque cela est applicable.
          </p>
          <p className="politique-confidentialite__paragraph paragraphe-public">
            Pour exercer ces droits, vous pouvez utiliser le{" "}
            <Link href="/#contact" className="politique-confidentialite__link">
              formulaire de contact
            </Link>{" "}
            du site ou passer par le profil{" "}
            <Link
              href="https://www.linkedin.com/in/bruno-da-silva-1107a23b5"
              className="politique-confidentialite__link"
            >
              LinkedIn
            </Link>
            .
          </p>
        </section>

        <section className="politique-confidentialite__section admin-section-card">
          <h2 className="politique-confidentialite__section-title subsubtitle">
            Traitement du formulaire de contact
          </h2>
          <p className="politique-confidentialite__paragraph paragraphe-public">
            Le formulaire disponible sur la page d&apos;accueil permet
            d&apos;envoyer une demande de contact à Bruno Da Silva.
          </p>
          <h3 className="politique-confidentialite__subsection-title label">
            Données collectées
          </h3>
          <ul className="politique-confidentialite__list">
            <li className="politique-confidentialite__list-item paragraphe-public">
              nom ;
            </li>
            <li className="politique-confidentialite__list-item paragraphe-public">
              adresse e-mail ;
            </li>
            <li className="politique-confidentialite__list-item paragraphe-public">
              contenu du message ;
            </li>
            <li className="politique-confidentialite__list-item paragraphe-public">
              données techniques liées à la protection anti-spam.
            </li>
          </ul>
          <h3 className="politique-confidentialite__subsection-title label">
            Finalité
          </h3>
          <p className="politique-confidentialite__paragraph paragraphe-public">
            Ces données sont utilisées uniquement pour recevoir, analyser et
            traiter votre demande, ainsi que pour échanger avec vous si une
            réponse est nécessaire.
          </p>
          <h3 className="politique-confidentialite__subsection-title label">
            Modalités de suppression
          </h3>
          <p className="politique-confidentialite__paragraph paragraphe-public">
            Vous pouvez demander la suppression des données transmises via le
            formulaire une fois votre demande traitée, en utilisant à nouveau le{" "}
            <Link href="/#contact" className="politique-confidentialite__link">
              formulaire de contact
            </Link>
            .
          </p>
          <h3 className="politique-confidentialite__subsection-title label">
            Prestataires impliqués
          </h3>
          <p className="politique-confidentialite__paragraph paragraphe-public">
            Le formulaire utilise des services tiers strictement liés à son
            fonctionnement, notamment Resend pour la transmission des e-mails et
            Cloudflare Turnstile pour la protection anti-spam.
          </p>
        </section>
      </div>
    </section>
  );
}

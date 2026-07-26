import type { Metadata } from "next";
import PublicCta from "@/components/UI/public-cta";

export const metadata: Metadata = {
  title: "Blog | Bruno Da Silva",
  description:
    "Articles, conseils et réflexions autour du développement web, des outils métiers, du SEO technique, de la performance et de l’accessibilité.",
};

export default function Blog() {
  return (
    <section className="blog">
      <p className="blog__page-infos link-description">/ BLOG</p>

      <header className="blog__header">
        <h1 className="blog__title title-public">Des articles utiles,</h1>
        <span className="blog__span title-public">bientot en ligne.</span>
        <p className="blog__introduction paragraphe">
          Le blog est en preparation. Les premiers contenus arriveront
          prochainement autour du developpement web, du SEO technique, de la
          performance et de l&apos;accessibilite.
        </p>
      </header>

      <section className="blog__coming-soon" aria-labelledby="blog-coming-soon">
        <div className="blog__hero-card admin-section-card">
          <p className="blog__hero-label link-description">A VENIR</p>
          <h2 id="blog-coming-soon" className="blog__hero-title subtitle">
            Aucun article n&apos;est publie pour le moment.
          </h2>
          <p className="blog__hero-text paragraphe-public">
            Cette section accueillera bientot des retours d&apos;experience, des
            conseils concrets et des articles pour mieux concevoir, optimiser et
            faire evoluer un site web.
          </p>
        </div>

        <ul className="blog__topics" aria-label="Themes d'articles a venir">
          <li className="blog__topic admin-section-card">
            <p className="blog__topic-label link-description">THEME 01</p>
            <h3 className="blog__topic-title subsubtitle">SEO technique</h3>
            <p className="blog__topic-text paragraphe-public">
              Structure, metadata, performances et bonnes pratiques pour mieux
              indexer un site.
            </p>
          </li>
          <li className="blog__topic admin-section-card">
            <p className="blog__topic-label link-description">THEME 02</p>
            <h3 className="blog__topic-title subsubtitle">Accessibilite</h3>
            <p className="blog__topic-text paragraphe-public">
              Interfaces plus claires, plus inclusives et plus confortables a
              utiliser au quotidien.
            </p>
          </li>
          <li className="blog__topic admin-section-card">
            <p className="blog__topic-label link-description">THEME 03</p>
            <h3 className="blog__topic-title subsubtitle">Outils metier</h3>
            <p className="blog__topic-text paragraphe-public">
              Organisation, automatisation et solutions concretes pour gagner du
              temps.
            </p>
          </li>
        </ul>
      </section>

      <PublicCta
        title="Une question ou un sujet a explorer ?"
        description="Je publierai ici des contenus utiles, mais on peut deja en parler ensemble."
        buttonLabel="ME CONTACTER"
        buttonHref="/#contact"
        backLabel="RETOUR A L'ACCUEIL"
        backHref="/"
      />
    </section>
  );
}

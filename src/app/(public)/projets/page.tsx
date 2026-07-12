import Link from "next/link";
import { getPublishedProjects } from "@/features/projets/queries/get-published-projects.query";
import Image from "next/image";
import PublicCta from "@/components/UI/public-cta";

export default async function Portfolio() {
  const projects = await getPublishedProjects();

  return (
    <section className="portfolio">
      <p className="portfolio__page-infos link-description">/ PROJETS</p>
      <header className="portfolio__header">
        <h1 className="portfolio__title title-public"> Tous les Projets </h1>
        <span className="portfolio__span title-public">sélectionnés.</span>
        <p className="portfolio__présentation paragraphe">
          Vous trouverez ici une sélection de mes projets.
          {/* Filtrez par technologie pour trouver ceux qui correspondent à votre besoin. */}
        </p>
      </header>
      {projects.length === 0 ? (
        <p className="portfolio__not">Aucun projet publié pour le moment.</p>
      ) : (
        <ul className="portfolio__list">
          {projects.map((project) => (
            <li key={project.id} className="portfolio__item">
              <article className="portfolio__article admin-section-card">
                <figure className="portfolio__image-wrapper">
                  <Image
                    src={project.heroImageUrl}
                    alt={project.heroImageAlt}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="portfolio__image"
                  />
                </figure>
                <header className="portfolio__header-list">
                  <h2 className="portfolio__project-title subsubtitle">
                    {project.title}
                  </h2>
                  <span className="portfolio__year">{project.year}</span>
                </header>
                <p className="paragraphe-public">{project.shortDescription}</p>
                <ul className="portfolio__technologies">
                  {project.technologies.map((projectTechnologys) => (
                    <li
                      key={projectTechnologys.technology.id}
                      className="portfolio__technology link-description"
                    >
                      {projectTechnologys.technology.name}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/projets/${project.slug}`}
                  className="button button--primary portfolio__button"
                >
                  Voir le projet →
                </Link>
              </article>
            </li>
          ))}
        </ul>
      )}
      <PublicCta />
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

type PublicProjectsListProps = {
  projects: {
    id: string;
    heroImageUrl: string;
    heroImageAlt: string;
    title: string;
    shortDescription: string;
    year: number | null;
    slug: string;
    technologies: {
      technology: {
        id: string;
        name: string;
      };
    }[];
  }[];
};

export default function PublicProjectsList({
  projects,
}: PublicProjectsListProps) {
  return projects.length === 0 ? (
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
              {project.year && (
                <span className="portfolio__year">{project.year}</span>
              )}
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
  );
}

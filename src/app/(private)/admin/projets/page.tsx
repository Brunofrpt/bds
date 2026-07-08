import { getProjects } from "@/features/projets/queries/get-projects.query";
import Link from "next/link";

export default async function ProjectsPage() {
  const projets = await getProjects();

  return (
    <section className="projets technos">
      <header className="projets__header">
        <p className="projets__page-infos link-description">/ PROJETS</p>
        <div className="projets__intro">
          <h1 className="projets__page-title title">
            Projets
            <span className="projets__count">({projets.length})</span>
          </h1>
          <Link
            href="/admin/projets/create"
            className="projets__new button button--primary"
          >
            + NOUVEAU
          </Link>
        </div>
      </header>

      {projets.length === 0 ? (
        <p className="projets__not">Aucun projet pour le moment.</p>
      ) : (
        <ul className="projets__list">
          {projets.map((project) => (
            <li key={project.id} className="projets__item">
              <div className="projets__description">
                <p className="projets__project-title list-admin-title">
                  {project.title}
                </p>
                <p className="projets__meta">
                  <span className="projets__slug">{project.slug}</span>
                  {project.year && (
                    <span className="projets__year">{project.year}</span>
                  )}
                </p>
              </div>

              <div className="projets__actions">
                <Link
                  href={`/admin/projets/${project.id}/modifier`}
                  className="projets__modifier-button"
                  aria-label={`Modifier le projet ${project.title}`}
                >
                  ÉDITER
                </Link>
                <button type="button" className="projets__supprimer-button">
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

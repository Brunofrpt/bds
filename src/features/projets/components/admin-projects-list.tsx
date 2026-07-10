import Link from "next/link";

type AdminProjectListProps = {
  projets: {
    id: string;
    title: string;
    slug: string;
    year: number | null;
    isPublished: boolean;
  }[];
};

export default function AdminProjectList({ projets }: AdminProjectListProps) {
  return projets.length === 0 ? (
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
            <p
              className={
                project.isPublished
                  ? "projets__status projets__status--published"
                  : "projets__status projets__status--draft"
              }
            >
              {project.isPublished ? "PUBLIÉ" : "BROUILLON"}
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
  );
}

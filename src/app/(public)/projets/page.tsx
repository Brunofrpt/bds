import Link from "next/link";
import { getPublishedProjects } from "@/features/projets/queries/get-published-projects.query";

export default async function Projets() {
  const projects = await getPublishedProjects();

  return (
    <section className="projets">
      <h1 className="projets__page-title title">Projets</h1>

      {projects.length === 0 ? (
        <p className="projets__not">Aucun projet publie pour le moment.</p>
      ) : (
        <ul className="projets__list">
          {projects.map((project) => (
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
                <p>{project.shortDescription}</p>
              </div>

              <Link href={`/projets/${project.slug}`}>Voir le projet</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

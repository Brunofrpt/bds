import { getProjects } from "@/features/projets/queries/get-projects.query";
import Link from "next/link";
import AdminProjectList from "@/features/projets/components/admin-projects-list";

export default async function ProjectsPage() {
  const projets = await getProjects();

  return (
    <section className="projets technos">
      <header className="projets__header">
        <p className="projets__page-infos link-description">/ PROJETS</p>
        <div className="projets__intro">
          <h1 className="projets__page-title title-admin">
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
      <AdminProjectList projets={projets} />
    </section>
  );
}

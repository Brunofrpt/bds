import AdminProjectList from "@/features/projets/components/admin-projects-list";
import { getProjects } from "@/features/projets/queries/get-projects.query";
import { getTechnologies } from "@/features/technologies/queries/get-technologies";
import Link from "next/link";

export default async function AdminDashboard() {
  const projets = await getProjects();
  const technologies = await getTechnologies();

  return (
    <div className="dashboard">
      <section className="dashboard__home">
        <header className="dashboard__header">
          <p className="dashboard__page-infos link-description">/ DASHBOARD</p>
          <h1 className="dashboard__title title-admin title text-with-dot">
            Bonjour Bruno
          </h1>
        </header>
      </section>

      <section className="dashboard__projets admin-section-card">
        <header className="dashboard__projets-header">
          <h2 className="dashboard__projets-title subtitle-admin">
            Projets
            <span className="dashboard__count">({projets.length})</span>
          </h2>
          <div className="dashboard__wrapper-button">
            <Link
              href="/admin/projets/create"
              className="dashboard__projets-button button button--primary"
            >
              + NOUVEAU
            </Link>
          </div>
        </header>
        <AdminProjectList projets={projets} />
      </section>

      <section className="dashboard__technologies admin-section-card">
        <header className="dashboard__technologies-header">
          <h2 className="dashboard__technologies-title subtitle-admin">
            Technologies
            <span className="dashboard__count">({technologies.length})</span>
          </h2>
        </header>
        <div className="dashboard__technologies-buttons">
          <Link
            href="/admin/technologies"
            className="dashboard__technologies-button button button--secondary"
          >
            GÉRER
          </Link>
          <Link
            href="/admin/technologies/create"
            className="dashboard__technologies-button button button--primary"
          >
            NOUVELLE
          </Link>
        </div>
        <p className="dashboard__technologies-description">
          Les tags sélectionnables dans le formulaire de création de projet.
        </p>
      </section>

      <section className="dashboard__blog admin-section-card">
        <header className="dashboard__blog-header">
          <h2 className="dashboard__blog-title subtitle-admin">
            Articles de Blog
          </h2>
          <Link
            href="#"
            className="dashboard__blog-button button button--primary"
          >
            + NOUVEAU
          </Link>
        </header>
        <p className="dashboard__blog-description">
          Aucun article. La zone blog se remplira au fur et à mesure de tes
          publications.
        </p>
      </section>
    </div>
  );
}

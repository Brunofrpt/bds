import Link from "next/link";
import { getTechnologies } from "@/features/technologies/queries/get-technologies";
import DeleteButtonTechnologie from "@/features/technologies/components/delete-button";

export default async function TechnologiesPage() {
  const technologies = await getTechnologies();
  return (
    <>
      <section className="technologies technos">
        <header className="technologies__header">
          <p className="technologies__page-infos link-description">/ TECHNOS</p>
          <div className="technologies__intro">
            <h1 className="technologies__title title-admin">
              Technologies
              <span className="technologies__count">
                ({technologies.length})
              </span>
            </h1>
            <Link
              href="/admin/technologies/create"
              className="technologies__new button button--primary"
            >
              + NOUVELLE
            </Link>
          </div>
        </header>
        {technologies.length === 0 ? (
          <p className="technologies__not">aucune technologie pour le moment</p>
        ) : (
          <ul className="technologies__schedule">
            {technologies.map((technos) => (
              <li key={technos.id} className="technologies__techno">
                <div className="technologies__description">
                  <p className="technologies__name list-admin-title">
                    {technos.name}
                  </p>
                  <p className="technologies__slug">{technos.slug}</p>
                </div>
                <div className="technologies__actions">
                  <Link
                    href={`/admin/technologies/${technos.id}/modifier`}
                    className="technologies__modifier-button"
                  >
                    ÉDITER
                  </Link>
                  <DeleteButtonTechnologie
                    id={technos.id}
                    name={technos.name}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

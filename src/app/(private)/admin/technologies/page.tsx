import Link from "next/link";
import { getTechnologies } from "@/features/technologies/queries/get-technologies";

export default async function TechnologiesPage() {
  const technologies = await getTechnologies();
  return (
    <>
      <section className="technologies">
        <header className="technologies__header">
          <p className="technologies__page-infos link-description">/ TECHNOS</p>
          <div className="technologies__intro">
            <h1 className="technologies__title title">
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
          <ul>
            {technologies.map((technos) => (
              <li key={technos.id}>
                <p>{technos.name}</p>
                <p>{technos.slug}</p>
                <Link href={`/admin/technologies/${technos.id}/modifier`}>
                  modifier
                </Link>
                <button>supprimer</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

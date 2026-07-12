import { getPublishedProjects } from "@/features/projets/queries/get-published-projects.query";
import PublicCta from "@/components/UI/public-cta";
import PublicProjectsList from "@/features/projets/components/public-projects-list";

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
      <PublicProjectsList projects={projects} />
      <PublicCta />
    </section>
  );
}

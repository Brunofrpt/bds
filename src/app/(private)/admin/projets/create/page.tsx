import ProjectForm from "@/features/projets/components/project-form";
import { getTechnologies } from "@/features/technologies/queries/get-technologies";

export default async function CreateProjectsPage() {
  const technologies = await getTechnologies();
  return (
    <section className="create-projects technos">
      <header className="create-projects__header">
        <p className="create-projects__page-infos link-description">
          / NOUVEAU PROJET
        </p>
        <h1 className="create-projects__title title">Ajouter un projet</h1>
      </header>
      <ProjectForm technologies={technologies} />
    </section>
  );
}

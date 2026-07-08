import ProjectForm from "@/features/projets/components/project-form";

export default function CreateProjectsPage() {
  return (
    <section className="create-projects technos">
      <header className="create-projects__header">
        <p className="create-projects__page-infos link-description">
          / NOUVEAU PROJET
        </p>
        <h1 className="create-projects__title title">Ajouter un projet</h1>
      </header>
      <ProjectForm />
    </section>
  );
}

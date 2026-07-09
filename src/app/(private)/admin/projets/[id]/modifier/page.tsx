import ProjectForm from "@/features/projets/components/project-form";
import { getProjectById } from "@/features/projets/queries/get-project-by-id.query";
import { notFound } from "next/navigation";
import { getTechnologies } from "@/features/technologies/queries/get-technologies";

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);
  const technologies = await getTechnologies();

  if (!project) {
    notFound();
  }

  return (
    <section className="create-projects technos">
      <header className="create-projects__header">
        <p className="create-projects__page-infos link-description">
          / MODIFIER UN PROJET
          <span className="projects__count">({project.title})</span>
        </p>
        <h1 className="create-projects__title title">Modifier un projet</h1>
      </header>

      <ProjectForm technologies={technologies} initialData={project} />
    </section>
  );
}

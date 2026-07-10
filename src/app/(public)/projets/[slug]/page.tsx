import { notFound } from "next/navigation";
import { getPublishedProjectBySlug } from "@/features/projets/queries/get-published-project-by-slug.query";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="projets">
      <h1 className="projets__page-title title">{project.title}</h1>
      <p>{project.shortDescription}</p>
      <p>{project.context}</p>
    </section>
  );
}

import TechnologyForm from "@/features/technologies/components/technology-form";
import { getTechnologyById } from "@/features/technologies/queries/get-technology-by-id";
import { notFound } from "next/navigation";

type EditTechnologyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTechnologyPage({
  params,
}: EditTechnologyPageProps) {
  const { id } = await params;
  const technology = await getTechnologyById(id);
  if (!technology) {
    notFound();
  }

  return (
    <section className="create-technos">
      <header className="create-technos__header">
        <p className="create-technos__page-infos link-description">
          / MODIFIER TECHNO
          {<span className="technologies__count">( {technology.name} )</span>}
        </p>
        <h1 className="create-technos__title title">Modifier une techno</h1>
      </header>

      <TechnologyForm initialData={technology} />
    </section>
  );
}

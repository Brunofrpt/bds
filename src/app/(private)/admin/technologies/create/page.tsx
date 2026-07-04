import TechnologyForm from "@/features/technologies/components/technology-form";

export default function createTechnologiesPage() {
  return (
    <section className="create-technos">
      <header className="create-technos__header">
        <p className="create-technos__page-infos link-description">
          / NOUVELLE TECHNO
        </p>
        <h1 className="create-technos__title title">Ajouter une techno</h1>
      </header>
      <TechnologyForm />
    </section>
  );
}

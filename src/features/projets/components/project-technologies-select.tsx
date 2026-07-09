"use client";

import { useMemo, useState } from "react";

export type TechnologyOption = {
  id: string;
  name: string;
};

type ProjectTechnologiesSelectProps = {
  technologies: TechnologyOption[];
};

export default function ProjectTechnologiesSelect({
  technologies,
}: ProjectTechnologiesSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechnologies, setSelectedTechnologies] = useState<
    TechnologyOption[]
  >([]);

  const hasSearchTerm = searchTerm.trim() !== "";

  function handleAddTechnology(technology: TechnologyOption) {
    setSelectedTechnologies((currentTechnologies) => [
      ...currentTechnologies,
      technology,
    ]);
    setSearchTerm("");
  }

  function handleRemoveTechnology(technologyId: string) {
    setSelectedTechnologies((currentTechnologies) =>
      currentTechnologies.filter(
        (technology) => technology.id !== technologyId,
      ),
    );
  }

  const filteredTechnologies = useMemo(() => {
    return technologies.filter((technology) => {
      const normalizedSearchTerm = searchTerm.trim().toLowerCase();
      const matchesSearch = technology.name
        .toLowerCase()
        .includes(normalizedSearchTerm);

      const alreadySelected = selectedTechnologies.some(
        (selectedTechnology) => selectedTechnology.id === technology.id,
      );

      return matchesSearch && !alreadySelected;
    });
  }, [technologies, searchTerm, selectedTechnologies]);

  return (
    <div className="project-technologies-select">
      <div className="project-technologies-select__field">
        <label
          className="project-technologies-select__label label"
          htmlFor="technology-search"
        >
          STACK TECHNIQUE*
        </label>

        <div className="project-technologies-select__selected-list">
          {selectedTechnologies.map((technology) => (
            <button
              key={technology.id}
              type="button"
              className="project-technologies-select__tag"
              onClick={() => handleRemoveTechnology(technology.id)}
              aria-label={`Retirer ${technology.name} de la selection`}
            >
              <span>{technology.name}</span>
              <span aria-hidden="true">x</span>
            </button>
          ))}
        </div>

        {selectedTechnologies.length === 0 && (
          <p className="project-technologies-select__helper">
            Selectionne au moins une technologie pour ce projet.
          </p>
        )}

        {selectedTechnologies.map((technology) => (
          <input
            key={technology.id}
            type="hidden"
            name="technologyIds"
            value={technology.id}
          />
        ))}

        <input
          className="project-technologies-select__search project-form__input"
          id="technology-search"
          name="technology-search"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          placeholder="Rechercher une technologie"
          autoComplete="off"
        />

        {hasSearchTerm && (
          <div className="project-technologies-select__dropdown">
            {filteredTechnologies.length > 0 ? (
              <ul className="project-technologies-select__options">
                {filteredTechnologies.map((technology) => (
                  <li
                    key={technology.id}
                    className="project-technologies-select__option-item"
                  >
                    <button
                      type="button"
                      className="project-technologies-select__option-button"
                      onClick={() => handleAddTechnology(technology)}
                    >
                      {technology.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="project-technologies-select__empty">
                Aucune technologie ne correspond a ta recherche.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

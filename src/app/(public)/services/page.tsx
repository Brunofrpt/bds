import type { Metadata } from "next";
import ServicesList from "@/components/UI/services-list";
import Methodologie from "../a-propos/methodologie";
import PublicCta from "@/components/UI/public-cta";

export const metadata: Metadata = {
  title: "Services | Bruno Da Silva",
  description:
    "Développement d’outils sur mesure, automatisation, intégration, maintenance et accompagnement pour créer des solutions web adaptées à votre activité.",
};

export default function Services() {
  return (
    <>
      <section className="services">
        <p className="services__page-infos link-description">/ SERVICES</p>
        <header className="services__header">
          <h1 className="services__title title-public">
            Des services pour {""}
            <span className="services__span title-public">
              vous simplifier
            </span>{" "}
            {""}
            la vie.
          </h1>
          <p className="services__présentation paragraphe">
            Je vous accompagne afin de trouver l&apos;application web qui vous
            facilitera la vie
          </p>
        </header>
        <section className="services__proposition">
          <h2 className="servives__proposition-title subtitle text-with-dot">
            Ce que je propose
          </h2>
          <ServicesList />
        </section>
        <section className="services__methodologie">
          <h2 className="servives__methodologie-title subtitle text-with-dot">
            Ma façon de travailler
          </h2>
          <Methodologie />
        </section>
        <PublicCta />
      </section>
    </>
  );
}

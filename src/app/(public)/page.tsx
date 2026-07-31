import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ServicesList from "@/components/UI/services-list";
import PublicProjectsList from "@/features/projets/components/public-projects-list";
import { getPublishedProjects } from "@/features/projets/queries/get-published-projects.query";
import Methodologie from "./a-propos/methodologie";
import ContactSection from "@/features/contact/components/contact-section";

export const metadata: Metadata = {
  title: "Bruno Da Silva | Solutions web sur mesure",
  description:
    "Des outils web sur mesure pour aider les entreprises à gagner du temps, automatiser leurs tâches et simplifier leur quotidien.",
};

export default async function Home() {
  const projects = await getPublishedProjects();

  return (
    <>
      <section className="home__hero">
        <header className="home__hero-header">
          <h1 className="home__hero-title title-public">
            Des outils web <br />
            <span className="home__hero-span-txt">
              qui vous simplifient
            </span>{" "}
            <br />
            la vie
          </h1>
          <p className="home__hero-description paragraphe">
            Je conçois des applications et des outils web sur mesure qui
            permettent aux entreprises de gagner du temps, d&apos;automatiser leurs
            tâches et de simplifier leur organisation.
          </p>
        </header>
        <Link
          className="home__hero-link-cta button button--primary"
          href="#contact"
        >
          DISCUTONS DE VOTRE PROJET
        </Link>
        <Link
          className="home__hero-link-projets button button--secondary"
          href="/projets"
        >
          VOIR MES PROJETS
        </Link>
      </section>

      <section className="home__a-propos">
        <figure className="home__a-propos-figure">
          <div className="home__image-wrapper">
            <Image
              src="/moi.webp"
              alt="photo de face de Bruno Da Silva"
              width={1240}
              height={1650}
              className="home__a-propos-image"
              priority
            />
          </div>
          <figcaption className="home__a-propos-description">
            <h2 className="home__a-propos-title subtitle">Bruno Da Silva</h2>
            <p className="home__a-propos-intro paragraphe">
              Passionné par le web depuis de nombreuses années, j&apos;ai
              découvert le développement en autodidacte à l&apos;époque du Site
              du Zéro. Après un parcours riche dans différents secteurs
              d&apos;activité et plusieurs années à construire et maintenir des
              projets web personnels, j&apos;ai choisi de transformer cette
              passion de longue date en métier. Aujourd&apos;hui, je développe
              des solutions web avec une obsession: vous simplifier la vie...
            </p>
            <Link
              className="home__a-propos-link button button--primary"
              href="/a-propos"
            >
              En savoir plus
            </Link>
          </figcaption>
        </figure>
      </section>

      <section className="home__services">
        <h2 className="home__services-title subtitle text-with-dot">
          {" "}
          Services
        </h2>
        <ServicesList />
      </section>

      <section className="home__methodologie">
        <h2 className="home__methodologie-title subtitle text-with-dot">
          Ma façon de travailler
        </h2>
        <Methodologie />
      </section>

      <section className="home__projets">
        <h2 className="home__projets-title subtitle text-with-dot">Projets</h2>
        <PublicProjectsList projects={projects} />
      </section>

      <ContactSection />
    </>
  );
}
export const dynamic = "force-dynamic";

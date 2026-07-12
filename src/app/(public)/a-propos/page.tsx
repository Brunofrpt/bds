import Image from "next/image";
import Link from "next/link";
import Methodologie from "./methodologie";
import PublicCta from "@/components/UI/public-cta";

export default function AProposPage() {
  return (
    <>
      <section className="a-propos">
        <p className="a-propos__page-infos link-description">/ À PROPOS&quot;</p>
        <header className="a-propos__header">
          <h1 className="a-propos__title title-public">
            Bruno Da Silva developpeur <br />
            <span className="a-propos__span title-public">
              de solutions
            </span>{" "}
            <br />
            au quotidien
          </h1>
        </header>
        <figure className="a-propos__figure">
          <div className="a-propos__image-wrapper">
            <Image
              src="/oim.webp"
              alt="photo de face de Bruno Da Silva"
              width={1240}
              height={1650}
              className="a-propos__image"
            />
          </div>
          <figcaption className="a-propos__description">
            <div className="a-propos__links-wrapper">
              <Link
                className="a-propos__link"
                href="https://www.linkedin.com/in/bruno-da-silva-1107a23b5"
              >
                LINKEDIN
              </Link>
              <Link
                className="a-propos__link"
                href="https://github.com/Brunofrpt"
              >
                GITHUB
              </Link>
            </div>
            <div className="a-propos__description-wrapper">
              <p className="a-propos__description paragraphe">
                Passionné par le web depuis de nombreuses années, j&apos;ai
                découvert le développement en autodidacte à l&apos;époque du
                Site du Zéro. Après un parcours riche dans différents secteurs
                d&apos;activité et plusieurs années à construire et maintenir
                des projets web personnels, j&apos;ai choisi de transformer
                cette passion de longue date en métier. Aujourd&apos;hui, je
                développe des solutions web avec une obsession: vous simplifier
                la vie...
              </p>
            </div>
          </figcaption>
        </figure>
      </section>

      <section className="a-propos__stack">
        <p className="a-propos__stack-page-infos link-description">
          / À PROPOS&quot;
        </p>
        <header className="a-propos__stack-header">
          <h2 className="a-propos__stack-title subtitle">
            Les téchnologies que je manie au quotidien
          </h2>
        </header>
        <div className="a-propos__stack-grid">
          <section className="a-propos__stack-section">
            <h3 className="a-propos__stack-subsubtitle">FRONT-END</h3>
            <ul className="a-propos__stack-list">
              <li className="a-propos__stack-item">HTML</li>
              <li className="a-propos__stack-item">CSS</li>
              <li className="a-propos__stack-item">SCSS</li>
              <li className="a-propos__stack-item">HTML</li>
              <li className="a-propos__stack-item">Java Script</li>
              <li className="a-propos__stack-item">React</li>
              <li className="a-propos__stack-item">Next.JS</li>
            </ul>
          </section>
          <section className="a-propos__stack-section">
            <h3 className="a-propos__stack-subsubtitle">UI / UX</h3>
            <ul className="a-propos__stack-list">
              <li className="a-propos__stack-item">Figma</li>
              <li className="a-propos__stack-item">Responsive Design</li>
              <li className="a-propos__stack-item">Accessibilitée web</li>
            </ul>
          </section>
          <section className="a-propos__stack-section">
            <h3 className="a-propos__stack-subsubtitle">CMS</h3>
            <ul className="a-propos__stack-list">
              <li className="a-propos__stack-item">
                Joomla (thèmes sur mesure)
              </li>
              <li className="a-propos__stack-item">
                Word Press (thèmes sur mesure)
              </li>
            </ul>
          </section>
          <section className="a-propos__stack-section">
            <h3 className="a-propos__stack-subsubtitle">
              BASE DE DONNÉES ET AUTH
            </h3>
            <ul className="a-propos__stack-list">
              <li className="a-propos__stack-item">My SQL</li>
              <li className="a-propos__stack-item">Mongo DB</li>
              <li className="a-propos__stack-item">Postgre</li>
              <li className="a-propos__stack-item">Prisma</li>
              <li className="a-propos__stack-item">Betther Auth</li>
              <li className="a-propos__stack-item">
                Firebase Authentification
              </li>
            </ul>
          </section>
          <section className="a-propos__stack-section">
            <h3 className="a-propos__stack-subsubtitle">SEO & VISIBILITÉ</h3>
            <ul className="a-propos__stack-list">
              <li className="a-propos__stack-item">Lighthouse</li>
              <li className="a-propos__stack-item">Core Web Vitals</li>
              <li className="a-propos__stack-item">Open Graph</li>
              <li className="a-propos__stack-item">Données structurées</li>
            </ul>
          </section>
          <section className="a-propos__stack-section">
            <h3 className="a-propos__stack-subsubtitle">APPROCHE CRÉATIVE</h3>
            <ul className="a-propos__stack-list">
              <li className="a-propos__stack-item">Vibe coding</li>
              <li className="a-propos__stack-item">Exploration rapide</li>
              <li className="a-propos__stack-item">Prototypage d&apos;idées</li>
            </ul>
          </section>
        </div>
      </section>

      <section className="a-propos__methodologie">
        <p className="a-propos__methodologie-page-infos link-description">
          / PROJETS
        </p>
        <h2 className="a-propos__methodologie-title subtitle text-with-dot">
          Ma façon de travailler.
        </h2>
        <Methodologie />
      </section>

      <section className="a-propos__promesses">
        <section className="a-propos__promesses-qualitées">
          <p className="a-propos__methodologie-page-infos link-description">
            / APPROCHE
          </p>
          <h2 className="a-propos__promesses-title subtitle">
            Ce qui me distingue
          </h2>
          <p className="a-propod__promesses-description paragraphe">
            Chaque besoin est différent. Avant de coder, je cherche a comprendre
            votre activité et son fonctionnement. Pourquoi pas même passer une
            journée avec vous au bureau pour réellement voir comment vous aider
            afin de créer un outil réellement utile, simple à utiliser et pensé
            pour durer.
          </p>
        </section>
        <section className="a-propos__promesses-qualitées">
          <p className="a-propos__methodologie-page-infos link-description">
            / MA PHILOSOPHIE
          </p>
          <h2 className="a-propos__promesses-title subtitle">
            Une solution doit faire gagner du temps.
          </h2>
          <p className="a-propos__promesses-description paragraphe">
            Pas simplement être jolie.
            <br />
            Je conçois des application faciles à utiliser, qui éliminent les
            tâches répétitives, simplifient le quotidien des équipes et
            s&apos;intègrent naturellement dans votre façon de travailler.
          </p>
        </section>
      </section>

      <section className="a-propos__promesses--deux">
        <section className="a-propos__promesses-qualitées">
          <p className="a-propos__methodologie-page-infos link-description">
            / CE QUE VOUS GAGNEZ
          </p>
          <h2 className="a-propos__promesses-title subtitle">
            Des outils pensés pour votre quotidien
          </h2>
          <p className="a-propos__promesses-description paragraphe">
            <span className="a-propos__promesses-span">✓</span> moins de
            ressaisie <br />
            <span className="a-propos__promesses-span">✓</span> moins d&apos;erreurs{" "}
            <br />
            <span className="a-propos__promesses-span">✓</span> gain de temps{" "}
            <br />
            <span className="a-propos__promesses-span">✓</span> un quotidien
            plus simple pour vous et vos équipes <br />
          </p>
        </section>
        <section className="a-propos__promesses-qualitées">
          <p className="a-propos__methodologie-page-infos link-description">
            / MA PROMESSE
          </p>
          <h2 className="a-propos__promesses-title subtitle">
            Un outil qui évolue avec votre entreprise.
          </h2>
          <p className="a-propod__promesses-description paragraphe">
            Votre activité change.
            <br />
            Votre outil doit pouvoir évoluer sans devoir tout reconstruire à
            chaque fois.
            <br />
            Mes solutions sont construites pour être évolutives, maintenables et
            anticiper vos besoins futurs et votre croissance.
          </p>
        </section>
      </section>
      <PublicCta />
    </>
  );
}

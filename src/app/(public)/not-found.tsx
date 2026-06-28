import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <section className="not-found-hero not-found__flex-gap">
        <header className="not-found-hero__header">
          <h1 className="not-found-hero__title title text-with-dot">404</h1>
          <h2 className="subtitle">
            Page{" "}
            <span className="not-found-hero__second-color">introuvable</span>
          </h2>
        </header>
        <p className="not-found-hero__description paragraphe">
          Oups! La page que vous recherchez n&apos;éxiste pas ou a été déplacée.
          Mais pas de panique, reprenons la bonne route.
        </p>
        <nav
          className="not-found-hero__panel"
          aria-label="navigation de secours"
        >
          <div className="not-found-hero__visual">
            <Image
              className="not-found-hero__coeur"
              src="/ilustrations/not-found/coeur1.png"
              alt="fond vert"
              loading="eager"
              width={792}
              height={632}
            />
            <Image
              className="not-found-hero__grande-plante"
              src="/ilustrations/not-found/grande_plante.png"
              alt="plante verte"
              width={106}
              height={106}
            />
            <Image
              className="not-found-hero__petite-plante"
              src="/ilustrations/not-found/petite_plante.png"
              alt="petite plante verte"
              width={70}
              height={87}
            />
            <div className="not-found-hero__baton" />
          </div>
          <ul className="not-found-hero__panel-links">
            <li>
              <Link
                className="not-found-hero__panel-link not-found-hero__panel-link--accueil not-found-hero__panel-link--left"
                href="/"
              >
                ACCUEIL
              </Link>
            </li>
            <li>
              <Link
                className="not-found-hero__panel-link not-found-hero__panel-link--right"
                href="/projets"
              >
                PROJETS
              </Link>
            </li>
            <li>
              <Link
                className="not-found-hero__panel-link not-found-hero__panel-link--left"
                href="/a-propos"
              >
                À PROPOS
              </Link>
            </li>
            <li>
              <Link
                className="not-found-hero__panel-link not-found-hero__panel-link--right"
                href="/services"
              >
                SERVICES
              </Link>
            </li>
            <li>
              <Link
                className="not-found-hero__panel-link not-found-hero__panel-link--left"
                href="/#contact"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
        <aside className="not-found-hero__aside">
          <p className="subsubtitle"> Que souhaitez vous faire ?</p>
          <ul className="not-found-hero__list">
            <li>
              <Link href="/" className="button button--primary">
                RETOUR À L&apos;ACCUEIL
              </Link>
            </li>
            <li>
              <Link href="/projets" className="button button--secondary">
                DÉCOUVRIR MES PROJETS
              </Link>
            </li>
          </ul>
        </aside>
        <footer className="not-found-hero__footer">
          <p className="not-found-hero__footer-content description">
            <span className="not-found-hero__footer-span">
              Besoin d&apos;aide pour trouver quelque chose ?
            </span>
            Discutons de votre projet je serais ravis de vous orienter
            <Link href="/#contact" className="not-found-hero__footer-link">
              ME CONTACTER --&gt;
            </Link>
          </p>
        </footer>
      </section>
    </>
  );
}

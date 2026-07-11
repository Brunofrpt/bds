import Link from "next/link";

type PublicCtaProps = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  backLabel?: string;
  backHref?: string;
};

export default function PublicCta({
  title = "Vous avez un projet en tete ?",
  description = "Parlons-en et voyons ensemble comment le concretiser.",
  buttonLabel = "ME CONTACTER",
  buttonHref = "/contact",
  backLabel = "RETOUR A L'ACCUEIL",
  backHref = "/",
}: PublicCtaProps) {
  return (
    <section className="public-cta" aria-labelledby="public-cta-title">
      <div className="public-cta__card">
        <h2 id="public-cta-title" className="public-cta__title">
          {title}
        </h2>
        <p className="public-cta__description paragraphe-public">
          {description}
        </p>
        <Link
          href={buttonHref}
          className="public-cta__button button button--primary"
        >
          {buttonLabel}
        </Link>
      </div>

      <Link href={backHref} className="public-cta__back-link link-description">
        {backLabel}
      </Link>
    </section>
  );
}

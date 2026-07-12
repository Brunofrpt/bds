import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="home__contact" id="contact">
      <header className="home__contact-header">
        <h2 className="home__contact-title title-public">
          Parlons de votre
          <br />
          prochain projet<span className="home__contact-dot">.</span>
        </h2>
        <p className="home__contact-description paragraphe">
          Prêt à booster vos performances ? Contactez-moi pour un audit ou une
          collaboration.
        </p>
      </header>

      <nav className="home__contact-socials" aria-label="Liens de contact">
        <Link
          className="home__contact-social link-description"
          href="https://www.linkedin.com"
        >
          LINKEDIN
        </Link>
        <Link
          className="home__contact-social link-description"
          href="https://github.com"
        >
          GITHUB
        </Link>
      </nav>

      <form className="home__contact-form">
        <label className="home__sr-only" htmlFor="fullName">
          Nom complet
        </label>
        <input
          className="home__contact-input"
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Nom complet"
        />

        <label className="home__sr-only" htmlFor="email">
          E-mail
        </label>
        <input
          className="home__contact-input"
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
        />

        <label className="home__sr-only" htmlFor="message">
          Votre message
        </label>
        <textarea
          className="home__contact-textarea"
          id="message"
          name="message"
          placeholder="Votre message"
          rows={5}
        />

        <button
          className="home__contact-submit button button--primary"
          type="submit"
        >
          ENVOYER LE MESSAGE
        </button>
      </form>
    </section>
  );
}

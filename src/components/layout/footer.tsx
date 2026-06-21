import Link from "next/link";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__bar">
        <nav className="footer__links" aria-label="Liens du footer">
          <a
            href="https://www.linkedin.com/in/bruno-da-silva-1107a23b5"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN
          </a>
          <a
            href="https://github.com/Brunofrpt"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB
          </a>
          <Link href="/mentions-legales">MENTIONS LÉGALES</Link>
          <Link href="/politique-de-confidentialite">CONFIDENTIALITÉ</Link>
        </nav>
        <nav className="footer__link-private" aria-label="Administration">
          <Link href="/admin">ADMIN</Link>
        </nav>
      </Container>
      <Container>
        <section className="footer__copyright">
          <p>
            <span>©</span> BRUNO DA SILVA - TOUS DROITS RÉSERVÉS.
          </p>
        </section>
      </Container>
    </footer>
  );
}

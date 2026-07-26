"use client";
import { useState } from "react";
import { Container } from "./container";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { publicNavigationLinks } from "./header-links";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="header">
      <nav className="header__nav" aria-label="Navigation principale">
        <Container className="header__bar">
          <Link
            href="/"
            className="header__logo text-with-dot"
            aria-label="Retour à l'accueil"
          >
            <span className="header__logo-text">B.DS</span>
          </Link>

          {/* Bouton qui ouvre et ferme le menu mobile de navigation. */}
          <button
            className="header__menu-button"
            type="button"
            aria-label={
              isMenuOpen
                ? "Fermer le menu de navigation"
                : "Ouvrir le menu de navigation"
            }
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "FERMER" : "MENU"}
          </button>

          {/* 
            Panneau "rideau" :
            il ne contient pas directement le style visuel du menu,
            il sert surtout a reserver puis animer la hauteur
            comme un rideau qui se deroule et se replie.
          */}
          <div
            className={`header__menu-panel ${isMenuOpen ? "header__menu-panel--open" : ""}`}
          >
            {/* Interieur masque pendant l'animation pour couper proprement le contenu. */}
            <div className="header__menu-panel-inner">
              {/* Trait de separation visible quand le rideau commence a se derouler. */}
              <div className="header__separator" aria-hidden="true" />

              {/* 
                Liste des liens publics.
                Les liens eux-memes sont definis a part dans `header-links.ts`
                pour garder le composant plus lisible et plus facile a maintenir.
              */}
              <ul
                id="main-menu"
                className={`header__menu ${isMenuOpen ? "header__menu--open" : ""}`}
                aria-hidden={!isMenuOpen}
              >
                {publicNavigationLinks.map((link) => {
                  // Un lien est actif si on est exactement sur sa page
                  // ou sur une sous-route qui commence par ce chemin.
                  let isActive = false;
                  if (link.href === "/") {
                    isActive = pathname === "/";
                  } else {
                    isActive =
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`);
                  }
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={
                          isActive ? "header__menu-link--active" : undefined
                        }
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}

                {/* Lien d'ancre garde ici car il ne fait pas partie du fichier de routes. */}
                <li>
                  <Link
                    href="/#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="header__contact"
                  >
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}

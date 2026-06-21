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
          <div
            className={`header__menu-panel ${isMenuOpen ? "header__menu-panel--open" : ""}`}
          >
            <div className="header__menu-panel-inner">
              <div className="header__separator" aria-hidden="true" />

              <ul
                id="main-menu"
                className={`header__menu ${isMenuOpen ? "header__menu--open" : ""}`}
                aria-hidden={!isMenuOpen}
              >
                {publicNavigationLinks.map((link) => {
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

                <li>
                  <a
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="header__contact"
                  >
                    CONTACT
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}

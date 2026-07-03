"use client";
import { useState } from "react";
import { SignOutButton } from "../auth/sign-out-button";
import Link from "next/link";
import { Container } from "./container";
import { usePathname } from "next/navigation";
import { adminNavigationLinks } from "./admin-header-links";

export function AdminHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <section className="admin-header">
      <nav className="admin-header__nav" aria-label="Navigation admin">
        <Container className="admin-header__bar">
          {/* Bouton qui ouvre et ferme le menu mobile de l'administration. */}
          <button
            className="admin-header__menu-button"
            type="button"
            aria-label={
              isMenuOpen
                ? "Fermer le menu d'administration"
                : "Ouvrir le menu d'administration"
            }
            aria-expanded={isMenuOpen}
            aria-controls="admin-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="admin-header__icon-burger" aria-hidden="true" />
            <span className="admin-header__label">
              {isMenuOpen ? "FERMER" : "MENU"}
            </span>
          </button>

          {/* Action de deconnexion, separee du menu pour rester visible en permanence. */}
          <SignOutButton />

          {/* Panneau repliable : il reserve et anime l'espace vertical du menu. */}
          <div
            className={`admin-header__menu-panel ${isMenuOpen ? "admin-header__menu-panel--open" : ""}`}
          >
            {/* Interieur masque : il coupe proprement le contenu pendant l'animation. */}
            <div className="admin-header__menu-panel-inner">
              {/* Trait de separation affiche uniquement quand le menu mobile se deroule. */}
              <div className="admin-header__separator" aria-hidden="true" />

              {/*
                Liste des liens admin.
                Les liens eux-memes sont definis a part dans `admin-header-links.tsx`
                pour garder ce composant concentre sur l'affichage et le comportement du menu.
              */}
              <ul
                id="admin-menu"
                className={`admin-header__menu ${isMenuOpen ? "admin-header__menu--open" : ""}`}
                aria-hidden={!isMenuOpen}
              >
                {adminNavigationLinks.map((link) => {
                  // Un lien est actif si on est exactement sur sa page
                  // ou sur une sous-route qui commence par ce chemin.
                  const isActive =
                    pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={
                          isActive
                            ? "admin-header__menu-link admin-header__menu-link--active"
                            : "admin-header__menu-link"
                        }
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    </section>
  );
}

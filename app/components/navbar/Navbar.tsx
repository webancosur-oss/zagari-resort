"use client";

import {
  ArrowRight,
  List,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useState,
} from "react";

import styles from "./Navbar.module.css";

/*==================================================
  ENLACES
==================================================*/

const navigationItems = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Proyecto",
    href: "/#proyecto",
  },
  {
    label: "Lotes",
    href: "/lotes",
  },
  {
    label: "Experiencias",
    href: "/#experiencia",
  },
  {
    label: "Amenidades",
    href: "/#amenidades",
  },
  {
    label: "Ubicación",
    href: "/#ubicacion",
  },
] as const;

/*==================================================
  COMPONENTE
==================================================*/

export default function Navbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  /*================================================
    DETECTAR SCROLL
  ================================================*/

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(
        window.scrollY > 90,
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  /*================================================
    CERRAR AL CAMBIAR DE RUTA
  ================================================*/

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  /*================================================
    BLOQUEAR SCROLL AL ABRIR MENÚ
  ================================================*/

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.removeProperty(
        "overflow",
      );

      return;
    }

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.removeProperty(
        "overflow",
      );
    };
  }, [isMenuOpen]);

  /*================================================
    CERRAR CON ESCAPE
  ================================================*/

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ): void => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  /*================================================
    ESTADO ACTIVO
  ================================================*/

  const isActive = (
    href: string,
  ): boolean => {
    if (href === "/") {
      return pathname === "/";
    }

    const route =
      href.split("#")[0];

    if (!route || route === "/") {
      return false;
    }

    return pathname.startsWith(route);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`${styles.header} ${
          isScrolled
            ? styles.headerScrolled
            : styles.headerTop
        }`}
      >
        <div className={styles.container}>
          {/* =========================================
              LOGO
          ========================================== */}

          <Link
            href="/"
            className={styles.logo}
            aria-label="Ir al inicio de Zagari Resort Club"
          >
            <Image
              src="/assets/brand/zagari-logo-light.svg"
              alt="Zagari Resort Club"
              width={168}
              height={58}
              priority
              className={styles.logoImage}
            />
          </Link>

          {/* =========================================
              NAVEGACIÓN COMPLETA
              SOLO ARRIBA Y EN DESKTOP
          ========================================== */}

          <nav
            className={`${styles.navigation} ${
              isScrolled
                ? styles.navigationHidden
                : styles.navigationVisible
            }`}
            aria-label="Navegación principal"
          >
            <div className={styles.glassPanel}>
              <div
                className={
                  styles.navigationLinks
                }
              >
                {navigationItems.map(
                  (item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${styles.navigationLink} ${
                        isActive(
                          item.href,
                        )
                          ? styles.activeLink
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>

              <Link
                href="/contacto"
                className={
                  styles.contactButton
                }
              >
                <span>
                  Solicitar información
                </span>

                <span
                  className={
                    styles.contactIcon
                  }
                >
                  <ArrowRight
                    size={15}
                    weight="bold"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </div>
          </nav>

          {/* =========================================
              HAMBURGUESA
              SCROLL + TABLET + MÓVIL
          ========================================== */}

          <button
            type="button"
            className={`${styles.menuButton} ${
              isScrolled
                ? styles.menuButtonVisible
                : ""
            }`}
            aria-label={
              isMenuOpen
                ? "Cerrar menú"
                : "Abrir menú"
            }
            aria-expanded={isMenuOpen}
            aria-controls="zagari-menu-panel"
            onClick={() =>
              setIsMenuOpen(
                (current) => !current,
              )
            }
          >
            {isMenuOpen ? (
              <X
                size={22}
                weight="bold"
                aria-hidden="true"
              />
            ) : (
              <List
                size={23}
                weight="bold"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </header>

      {/* =====================================================
          FONDO DEL MENÚ
      ====================================================== */}

      <button
        type="button"
        className={`${styles.backdrop} ${
          isMenuOpen
            ? styles.backdropVisible
            : ""
        }`}
        aria-label="Cerrar menú"
        tabIndex={
          isMenuOpen ? 0 : -1
        }
        onClick={closeMenu}
      />

      {/* =====================================================
          PANEL DEL MENÚ
      ====================================================== */}

      <aside
        id="zagari-menu-panel"
        className={`${styles.menuPanel} ${
          isMenuOpen
            ? styles.menuPanelOpen
            : ""
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className={
            styles.menuPanelHeader
          }
        >
          <Link
            href="/"
            className={
              styles.panelLogo
            }
            onClick={closeMenu}
          >
            <Image
              src="/assets/brand/zagari-logo-light.svg"
              alt="Zagari Resort Club"
              width={150}
              height={52}
              className={
                styles.panelLogoImage
              }
            />
          </Link>

          <button
            type="button"
            className={
              styles.closeButton
            }
            aria-label="Cerrar menú"
            onClick={closeMenu}
          >
            <X
              size={21}
              weight="bold"
              aria-hidden="true"
            />
          </button>
        </div>

        <div
          className={
            styles.menuPanelContent
          }
        >
          <span
            className={
              styles.menuEyebrow
            }
          >
            Explora Zagari
          </span>

          <nav
            className={
              styles.panelNavigation
            }
            aria-label="Menú de navegación"
          >
            {navigationItems.map(
              (item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={
                    isActive(item.href)
                      ? styles.panelActiveLink
                      : ""
                  }
                >
                  <span
                    className={
                      styles.linkNumber
                    }
                  >
                    {String(
                      index + 1,
                    ).padStart(2, "0")}
                  </span>

                  <strong>
                    {item.label}
                  </strong>

                  <ArrowRight
                    size={19}
                    weight="bold"
                    aria-hidden="true"
                  />
                </Link>
              ),
            )}
          </nav>

          <Link
            href="/contacto"
            className={
              styles.panelContactButton
            }
            onClick={closeMenu}
          >
            <span>
              Solicitar información
            </span>

            <span
              className={
                styles.panelContactIcon
              }
            >
              <ArrowRight
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>

        <div
          className={
            styles.menuPanelFooter
          }
        >
          <span>
            San Ramón · Selva Central
          </span>

          <span>
            Zagari Resort Club
          </span>
        </div>
      </aside>
    </>
  );
}
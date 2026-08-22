"use client";

import {
  ArrowRight,
  ArrowUp,
  List,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./Navbar.module.css";

/* ==========================================================
   NAVIGATION
========================================================== */

const leftNavigation = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Proyecto",
    href: "/proyecto",
  },
  {
    label: "Lotes",
    href: "/lotes",
  },
] as const;

const rightNavigation = [
  {
    label: "Nosotros",
    href: "/nosotros",
  },
  {
    label: "Ubicación",
    href: "/#ubicacion",
  },
] as const;

const navigationItems = [
  ...leftNavigation,
  ...rightNavigation,
] as const;

/* ==========================================================
   COMPONENT
========================================================== */

export default function Navbar() {
  const pathname =
    usePathname();

  const frameRef =
    useRef<number | null>(
      null
    );

  const [
    isScrolled,
    setIsScrolled,
  ] = useState(false);

  const [
    isMenuOpen,
    setIsMenuOpen,
  ] = useState(false);

  const [
    activeHash,
    setActiveHash,
  ] = useState("");

  const [
    isFooterDocked,
    setIsFooterDocked,
  ] = useState(false);

  /* ========================================================
     WHATSAPP
  ======================================================== */

  const whatsappNumber =
    process.env
      .NEXT_PUBLIC_ZAGARI_WHATSAPP ||
    "519XXXXXXXX";

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}` +
    `?text=${encodeURIComponent(
      "Hola Zagari Resort Club, quisiera recibir más información."
    )}`;

  /* ========================================================
     NORMAL SCROLL
  ======================================================== */

  useEffect(() => {
    const update = () => {
      setIsScrolled(
        window.scrollY > 70
      );
    };

    update();

    window.addEventListener(
      "scroll",
      update,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        update
      );
    };
  }, []);

  /* ========================================================
     FOOTER DOCK

     IMPORTANTE:

     El navbar NO SE MUEVE.

     El footer sube normalmente.

     Cuando el top del footer llega
     prácticamente al top del viewport,
     cambiamos el diseño del navbar.
  ======================================================== */

  useEffect(() => {
    const updateFooterDock =
      () => {
        const footer =
          document.querySelector<HTMLElement>(
            "[data-zagari-footer]"
          );

        if (!footer) {
          setIsFooterDocked(
            false
          );

          return;
        }

        const rect =
          footer.getBoundingClientRect();

        /*
         * 12 px evita problemas de
         * subpíxeles / zoom del navegador.
         */

        const reachedTop =
          rect.top <= 12;

        const footerVisible =
          rect.bottom > 0;

        setIsFooterDocked(
          reachedTop &&
            footerVisible
        );
      };

    const requestUpdate =
      () => {
        if (
          frameRef.current !==
          null
        ) {
          cancelAnimationFrame(
            frameRef.current
          );
        }

        frameRef.current =
          requestAnimationFrame(
            updateFooterDock
          );
      };

    updateFooterDock();

    window.addEventListener(
      "scroll",
      requestUpdate,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    return () => {
      if (
        frameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          frameRef.current
        );
      }

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );
    };
  }, []);

  /* ========================================================
     HASH
  ======================================================== */

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(
        window.location.hash
      );
    };

    updateHash();

    window.addEventListener(
      "hashchange",
      updateHash
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        updateHash
      );
    };
  }, []);

  /* ========================================================
     ROUTE
  ======================================================== */

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  /* ========================================================
     BODY LOCK
  ======================================================== */

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.removeProperty(
        "overflow"
      );

      return;
    }

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.removeProperty(
        "overflow"
      );
    };
  }, [isMenuOpen]);

  /* ========================================================
     ESC
  ======================================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key ===
        "Escape"
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /* ========================================================
     ACTIVE
  ======================================================== */

  const isActive = (
    href: string
  ) => {
    const [
      route,
      hash,
    ] = href.split("#");

    if (href === "/") {
      return (
        pathname === "/" &&
        !activeHash
      );
    }

    if (
      hash &&
      (
        !route ||
        route === "/"
      )
    ) {
      return (
        pathname === "/" &&
        activeHash ===
          `#${hash}`
      );
    }

    if (route) {
      return pathname.startsWith(
        route
      );
    }

    return false;
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const showFooterNav =
    isFooterDocked &&
    !isMenuOpen;

  return (
    <>
      <header
        className={`${styles.header} ${
          isScrolled
            ? styles.headerScrolled
            : styles.headerTop
        } ${
          showFooterNav
            ? styles.footerDocked
            : ""
        }`}
      >
        <div
          className={
            styles.notch
          }
        >
          {/* =================================
              FOOTER NAVBAR
          ================================== */}

          {showFooterNav ? (
            <div
              className={
                styles.footerNav
              }
            >
              {/* ===========================
                  LOGO
              ============================ */}

              <Link
                href="/"
                className={
                  styles.footerNavLogo
                }
                aria-label="Zagari Resort Club"
              >
                <Image
                  src="/assets/brand/zagari-logo-dark.svg"
                  alt="Zagari Resort Club"
                  width={150}
                  height={50}
                  className={
                    styles.footerNavLogoImage
                  }
                />
              </Link>

              {/* ===========================
                  MESSAGE
              ============================ */}

              <div
                className={
                  styles.footerNavMessage
                }
              >
                <span>
                  Zagari Resort Club
                </span>

                <strong>
                  Vive diferente.
                </strong>

                <small>
                  San Ramón ·
                  Selva Central
                </small>
              </div>

              {/* ===========================
                  ACTIONS
              ============================ */}

              <div
                className={
                  styles.footerNavActions
                }
              >
                <a
                  href={
                    whatsappUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    styles.footerWhatsapp
                  }
                >
                  <WhatsappLogo
                    size={17}
                    weight="fill"
                  />

                  <span>
                    Hablar por WhatsApp
                  </span>
                </a>

                <button
                  type="button"
                  className={
                    styles.footerTop
                  }
                  aria-label="Volver arriba"
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior:
                        "smooth",
                    });
                  }}
                >
                  <ArrowUp
                    size={16}
                    weight="bold"
                  />
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* =================================
                  NORMAL LEFT
              ================================== */}

              <nav
                className={
                  styles.leftNavigation
                }
                aria-label="Navegación principal"
              >
                {leftNavigation.map(
                  (item) => {
                    const active =
                      isActive(
                        item.href
                      );

                    return (
                      <Link
                        key={
                          item.href
                        }
                        href={
                          item.href
                        }
                        className={`${styles.navLink} ${
                          active
                            ? styles.navLinkActive
                            : ""
                        }`}
                      >
                        {
                          item.label
                        }

                        <span
                          className={
                            styles.navLine
                          }
                        />
                      </Link>
                    );
                  }
                )}
              </nav>

              {/* =================================
                  NORMAL LOGO
              ================================== */}

              <Link
                href="/"
                className={
                  styles.logo
                }
                aria-label="Zagari Resort Club"
              >
                <Image
                  src="/assets/brand/zagari-logo-dark.svg"
                  alt="Zagari Resort Club"
                  width={160}
                  height={54}
                  priority
                  className={
                    styles.logoImage
                  }
                />
              </Link>

              {/* =================================
                  NORMAL RIGHT
              ================================== */}

              <div
                className={
                  styles.rightArea
                }
              >
                <nav
                  className={
                    styles.rightNavigation
                  }
                  aria-label="Secciones"
                >
                  {rightNavigation.map(
                    (item) => {
                      const active =
                        isActive(
                          item.href
                        );

                      return (
                        <Link
                          key={
                            item.href
                          }
                          href={
                            item.href
                          }
                          className={`${styles.navLink} ${
                            active
                              ? styles.navLinkActive
                              : ""
                          }`}
                        >
                          {
                            item.label
                          }

                          <span
                            className={
                              styles.navLine
                            }
                          />
                        </Link>
                      );
                    }
                  )}
                </nav>

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
                    />
                  </span>
                </Link>
              </div>

              {/* =================================
                  MOBILE BUTTON
              ================================== */}

              <button
                type="button"
                className={
                  styles.menuButton
                }
                aria-label={
                  isMenuOpen
                    ? "Cerrar menú"
                    : "Abrir menú"
                }
                aria-expanded={
                  isMenuOpen
                }
                aria-controls="zagari-menu"
                onClick={() => {
                  setIsMenuOpen(
                    (current) =>
                      !current
                  );
                }}
              >
                {isMenuOpen ? (
                  <X
                    size={20}
                  />
                ) : (
                  <List
                    size={22}
                  />
                )}
              </button>
            </>
          )}
        </div>
      </header>

      {/* =====================================
          BACKDROP
      ====================================== */}

      <button
        type="button"
        className={`${styles.backdrop} ${
          isMenuOpen
            ? styles.backdropVisible
            : ""
        }`}
        aria-label="Cerrar menú"
        onClick={
          closeMenu
        }
        tabIndex={
          isMenuOpen
            ? 0
            : -1
        }
      />

      {/* =====================================
          MOBILE MENU
      ====================================== */}

      <aside
        id="zagari-menu"
        className={`${styles.mobileMenu} ${
          isMenuOpen
            ? styles.mobileMenuOpen
            : ""
        }`}
        aria-hidden={
          !isMenuOpen
        }
      >
        <div
          className={
            styles.mobileHeader
          }
        >
          <Link
            href="/"
            className={
              styles.mobileLogo
            }
            onClick={
              closeMenu
            }
          >
            <Image
              src="/assets/brand/zagari-logo-light.svg"
              alt="Zagari Resort Club"
              width={140}
              height={50}
              className={
                styles.mobileLogoImage
              }
            />
          </Link>

          <button
            type="button"
            className={
              styles.closeButton
            }
            onClick={
              closeMenu
            }
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <div
          className={
            styles.mobileIntro
          }
        >
          <span>
            Zagari Resort Club
          </span>

          <h2>
            Vive diferente
            en San Ramón.
          </h2>

          <p>
            Naturaleza, descanso,
            lotes y experiencias
            en la Selva Central.
          </p>
        </div>

        <nav
          className={
            styles.mobileNavigation
          }
        >
          {navigationItems.map(
            (
              item,
              index
            ) => (
              <Link
                key={
                  item.href
                }
                href={
                  item.href
                }
                onClick={
                  closeMenu
                }
                className={`${styles.mobileLink} ${
                  isActive(
                    item.href
                  )
                    ? styles.mobileLinkActive
                    : ""
                }`}
              >
                <span
                  className={
                    styles.mobileIndex
                  }
                >
                  {String(
                    index + 1
                  ).padStart(
                    2,
                    "0"
                  )}
                </span>

                <strong>
                  {
                    item.label
                  }
                </strong>

                <span
                  className={
                    styles.mobileArrow
                  }
                >
                  <ArrowRight
                    size={17}
                  />
                </span>
              </Link>
            )
          )}
        </nav>

        <Link
          href="/contacto"
          className={
            styles.mobileContact
          }
          onClick={
            closeMenu
          }
        >
          <span>
            Solicitar información
          </span>

          <span
            className={
              styles.mobileContactIcon
            }
          >
            <ArrowRight
              size={17}
              weight="bold"
            />
          </span>
        </Link>

        <div
          className={
            styles.mobileFooter
          }
        >
          <span>
            San Ramón ·
            Selva Central
          </span>

          <span>
            Zagari Resort Club
          </span>
        </div>
      </aside>
    </>
  );
}
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

import {
  usePathname,
} from "next/navigation";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./Navbar.module.css";

/* ==========================================================
   DESKTOP NAVIGATION
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
  // {
  //   label: "Lotes",
  //   href: "/lotes",
  // },
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

/* ==========================================================
   MOBILE NAVIGATION

   Independiente del desktop para controlar
   orden y páginas visibles en mobile.
========================================================== */

const mobileNavigation = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Proyecto",
    href: "/proyecto",
  },
  {
    label: "Nosotros",
    href: "/nosotros",
  },
  {
    label: "Ubicación",
    href: "/#ubicacion",
  },
  {
    label: "Preguntas frecuentes",
    href: "/faq",
  },
] as const;

/* ==========================================================
   COMPONENT
========================================================== */

export default function Navbar() {
  const pathname =
    usePathname();

  const frameRef =
    useRef<number | null>(
      null,
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
    "971069763";

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}` +
    `?text=${encodeURIComponent(
      "Hola Zagari Resort Club, quisiera recibir más información.",
    )}`;

  /* ========================================================
     NORMAL SCROLL
  ======================================================== */

  useEffect(() => {
    const update = () => {
      setIsScrolled(
        window.scrollY > 70,
      );
    };

    update();

    window.addEventListener(
      "scroll",
      update,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        update,
      );
    };
  }, []);

  /* ========================================================
     FOOTER DOCK
  ======================================================== */

  useEffect(() => {
    const updateFooterDock =
      () => {
        const footer =
          document.querySelector<HTMLElement>(
            "[data-zagari-footer]",
          );

        if (!footer) {
          setIsFooterDocked(
            false,
          );

          return;
        }

        const rect =
          footer.getBoundingClientRect();

        const reachedTop =
          rect.top <= 12;

        const footerVisible =
          rect.bottom > 0;

        setIsFooterDocked(
          reachedTop &&
            footerVisible,
        );
      };

    const requestUpdate =
      () => {
        if (
          frameRef.current !==
          null
        ) {
          cancelAnimationFrame(
            frameRef.current,
          );
        }

        frameRef.current =
          requestAnimationFrame(
            updateFooterDock,
          );
      };

    updateFooterDock();

    window.addEventListener(
      "scroll",
      requestUpdate,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      requestUpdate,
    );

    return () => {
      if (
        frameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          frameRef.current,
        );
      }

      window.removeEventListener(
        "scroll",
        requestUpdate,
      );

      window.removeEventListener(
        "resize",
        requestUpdate,
      );
    };
  }, []);

  /* ========================================================
     HASH
  ======================================================== */

  useEffect(() => {
    const updateHash = () => {
      setActiveHash(
        window.location.hash,
      );
    };

    updateHash();

    window.addEventListener(
      "hashchange",
      updateHash,
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        updateHash,
      );
    };
  }, []);

  /* ========================================================
     CLOSE MENU WHEN ROUTE CHANGES
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

  /* ========================================================
     ESC
  ======================================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
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
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  /* ========================================================
     ACTIVE
  ======================================================== */

  const isActive = (
    href: string,
  ) => {
    const [
      route,
      hash,
    ] = href.split("#");

    /* -----------------------------------------
       HOME
    ------------------------------------------ */

    if (
      href === "/"
    ) {
      return (
        pathname === "/" &&
        !activeHash
      );
    }

    /* -----------------------------------------
       HASH HOME
       /#ubicacion
    ------------------------------------------ */

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

    /* -----------------------------------------
       NORMAL ROUTE
    ------------------------------------------ */

    if (
      route
    ) {
      return (
        pathname ===
          route ||
        pathname.startsWith(
          `${route}/`,
        )
      );
    }

    return false;
  };

  /* ========================================================
     HELPERS
  ======================================================== */

  const closeMenu =
    () => {
      setIsMenuOpen(
        false,
      );
    };

  const showFooterNav =
    isFooterDocked &&
    !isMenuOpen;

  /* ========================================================
     RENDER
  ======================================================== */

  return (
    <>
      {/* ===================================================
          NAVBAR
      ==================================================== */}

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
          {showFooterNav ? (
            /* ===============================================
               FOOTER NAVBAR MODE
            ================================================ */

            <div
              className={
                styles.footerNav
              }
            >
              {/* LOGO */}

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

              {/* MESSAGE */}

              <div
                className={
                  styles.footerNavMessage
                }
              >
              </div>

              {/* ACTIONS */}

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

                {/* <button
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
                </button> */}
              </div>
            </div>
          ) : (
            <>
              {/* =============================================
                  DESKTOP LEFT
              ============================================== */}

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
                        item.href,
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
                        {item.label}

                        <span
                          className={
                            styles.navLine
                          }
                        />
                      </Link>
                    );
                  },
                )}
              </nav>

              {/* =============================================
                  LOGO CENTER
              ============================================== */}

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

              {/* =============================================
                  DESKTOP RIGHT
              ============================================== */}

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
                          item.href,
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
                          {item.label}

                          <span
                            className={
                              styles.navLine
                            }
                          />
                        </Link>
                      );
                    },
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

              {/* =============================================
                  MOBILE BUTTON
              ============================================== */}

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
                      !current,
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

      {/* ===================================================
          BACKDROP
      ==================================================== */}

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

      {/* ===================================================
          MOBILE MENU
      ==================================================== */}

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
        {/* ===============================================
            MOBILE HEADER
        ================================================ */}

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
            aria-label="Ir al inicio"
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
            <X
              size={20}
            />
          </button>
        </div>

        {/* ===============================================
            MOBILE INTRO
        ================================================ */}

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

        {/* ===============================================
            MOBILE NAVIGATION
        ================================================ */}

        <nav
          className={
            styles.mobileNavigation
          }
          aria-label="Navegación móvil"
        >
          {mobileNavigation.map(
            (
              item,
              index,
            ) => {
              const active =
                isActive(
                  item.href,
                );

              return (
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
                    active
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
                      index + 1,
                    ).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <strong>
                    {item.label}
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
              );
            },
          )}
        </nav>

        {/* ===============================================
            MOBILE CONTACT CTA
        ================================================ */}

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

        {/* ===============================================
            MOBILE WHATSAPP
        ================================================ */}

        <a
          href={
            whatsappUrl
          }
          target="_blank"
          rel="noopener noreferrer"
          className={
            styles.mobileWhatsapp
          }
          onClick={
            closeMenu
          }
        >
          <WhatsappLogo
            size={18}
            weight="fill"
          />

          <span>
            Hablar por WhatsApp
          </span>
        </a>

        {/* ===============================================
            MOBILE FOOTER
        ================================================ */}

        <div
          className={
            styles.mobileFooter
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
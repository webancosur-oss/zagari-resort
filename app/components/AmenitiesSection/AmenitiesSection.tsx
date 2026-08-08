"use client";

import Image from "next/image";

import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";
import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  Barbell,
  Campfire,
  CookingPot,
  FlowerLotus,
  ForkKnife,
  GameController,
  Leaf,
  Mountains,
  PersonSimpleRun,
  ShoppingBag,
  Sparkle,
  SwimmingPool,
  Tree,
  UsersThree,
  Volleyball,
  Waves,
} from "@phosphor-icons/react";


import styles from "./AmenitiesSection.module.css";
import ActionButton from "../buttons/ActionButton/ActionButton";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   AMENITIES
============================================================ */

const amenities = [
  {
    id: "01",
    title: "Piscina infinita",
    category: "Agua · Descanso",
    image:
      "/assets/amenities/piscina-infinity.png",
    icon: SwimmingPool,
  },

  {
    id: "02",
    title: "Bar piscina",
    category: "Agua · Experiencia",
    image:
      "/assets/amenities/bar-piscina.png",
    icon: Waves,
  },

  {
    id: "03",
    title: "Spa",
    category: "Bienestar",
    image:
      "/assets/amenities/spa.png",
    icon: FlowerLotus,
  },

  {
    id: "04",
    title: "Yoga",
    category: "Bienestar · Aire",
    image:
      "/assets/amenities/yoga.png",
    icon: FlowerLotus,
  },

  {
    id: "05",
    title: "Gimnasio",
    category: "Deporte",
    image:
      "/assets/amenities/gimnasio.png",
    icon: Barbell,
  },

  {
    id: "06",
    title: "Camping",
    category: "Naturaleza",
    image:
      "/assets/amenities/camping.png",
    icon: Campfire,
  },

  {
    id: "07",
    title: "Zona de niños",
    category: "Familia",
    image:
      "/assets/amenities/zona-ninos.png",
    icon: GameController,
  },

  {
    id: "08",
    title: "Mirador",
    category: "Naturaleza · Aire",
    image:
      "/assets/amenities/mirador.png",
    icon: Mountains,
  },

  {
    id: "09",
    title: "Biohuerto",
    category: "Naturaleza · Tierra",
    image:
      "/assets/amenities/biohuerto.png",
    icon: Leaf,
  },

  {
    id: "10",
    title: "Frontón",
    category: "Deporte",
    image:
      "/assets/amenities/fronton.png",
    icon: PersonSimpleRun,
  },

  {
    id: "11",
    title: "Zona de parrillas",
    category: "Gastronomía",
    image:
      "/assets/amenities/parrillas.png",
    icon: CookingPot,
  },

  {
    id: "12",
    title: "Mini golf",
    category: "Entretenimiento",
    image:
      "/assets/amenities/mini-golf.png",
    icon: Sparkle,
  },

  {
    id: "13",
    title: "Muro escalable",
    category: "Aventura",
    image:
      "/assets/amenities/muro-escalable.png",
    icon: Mountains,
  },

  {
    id: "14",
    title: "Market Zagari",
    category: "Servicios",
    image:
      "/assets/amenities/market-zagari.png",
    icon: ShoppingBag,
  },

  {
    id: "15",
    title: "Zona instagrameable",
    category: "Experiencia",
    image:
      "/assets/amenities/zona-instagram.png",
    icon: Sparkle,
  },

  {
    id: "16",
    title: "Zona espiritual",
    category: "Conexión · Fuego",
    image:
      "/assets/amenities/zona-espiritual.png",
    icon: Tree,
  },

  {
    id: "17",
    title: "Explanada de eventos",
    category: "Eventos",
    image:
      "/assets/amenities/explanada-eventos.png",
    icon: UsersThree,
  },

  {
    id: "18",
    title: "Restaurante Bar",
    category: "Gastronomía",
    image:
      "/assets/amenities/restaurante-bar.png",
    icon: ForkKnife,
  },

  {
    id: "19",
    title: "Fútbol y vóley",
    category: "Deporte",
    image:
      "/assets/amenities/futbol-voley.png",
    icon: Volleyball,
  },

  {
    id: "20",
    title: "Mini tenis",
    category: "Deporte",
    image:
      "/assets/amenities/mini-tenis.png",
    icon: PersonSimpleRun,
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function AmenitiesSection() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const listRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const previewRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const rowRefs =
    useRef<
      Array<HTMLButtonElement | null>
    >([]);

  const [activeIndex, setActiveIndex] =
    useState<number | null>(
      null
    );

  const [mobileOpen, setMobileOpen] =
    useState<number | null>(
      null
    );

  /* ==========================================================
     GSAP ENTRY
  =========================================================== */

  useLayoutEffect(() => {
    const section =
      sectionRef.current;

    if (!section) return;

    const mm =
      gsap.matchMedia();

    const ctx =
      gsap.context(() => {
        /* ====================================================
           DESKTOP / TABLET
        ===================================================== */

        mm.add(
          "(min-width: 768px)",
          () => {
            const heading =
              section.querySelector(
                "[data-heading]"
              );

            const description =
              section.querySelector(
                "[data-description]"
              );

            if (heading) {
              gsap.fromTo(
                heading,
                {
                  opacity: 0,
                  y: 30,
                },
                {
                  opacity: 1,
                  y: 0,

                  duration: 0.85,

                  ease:
                    "power3.out",

                  scrollTrigger: {
                    trigger:
                      section,

                    start:
                      "top 75%",

                    once: true,
                  },
                }
              );
            }

            if (description) {
              gsap.fromTo(
                description,
                {
                  opacity: 0,
                  y: 22,
                },
                {
                  opacity: 1,
                  y: 0,

                  duration: 0.8,

                  delay: 0.05,

                  ease:
                    "power3.out",

                  scrollTrigger: {
                    trigger:
                      section,

                    start:
                      "top 75%",

                    once: true,
                  },
                }
              );
            }

            rowRefs.current.forEach(
              (
                row,
                index
              ) => {
                if (!row) return;

                gsap.fromTo(
                  row,
                  {
                    opacity: 0,
                    y: 16,
                  },
                  {
                    opacity: 1,
                    y: 0,

                    duration: 0.5,

                    delay:
                      Math.min(
                        index *
                          0.018,
                        0.18
                      ),

                    ease:
                      "power2.out",

                    scrollTrigger: {
                      trigger:
                        row,

                      start:
                        "top 94%",

                      once: true,
                    },
                  }
                );
              }
            );
          }
        );

        /* ====================================================
           MOBILE
        ===================================================== */

        mm.add(
          "(max-width: 767px)",
          () => {
            rowRefs.current.forEach(
              (
                row,
                index
              ) => {
                if (!row) return;

                gsap.fromTo(
                  row,
                  {
                    opacity: 0,
                    y: 14,
                  },
                  {
                    opacity: 1,
                    y: 0,

                    duration:
                      0.55,

                    delay:
                      Math.min(
                        index *
                          0.015,
                        0.12
                      ),

                    ease:
                      "power2.out",

                    scrollTrigger: {
                      trigger:
                        row,

                      start:
                        "top 94%",

                      once: true,
                    },
                  }
                );
              }
            );
          }
        );
      }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  /* ==========================================================
     DESKTOP PREVIEW
  =========================================================== */

  const handleEnter = (
    index: number
  ) => {
    setActiveIndex(index);

    const preview =
      previewRef.current;

    if (!preview) return;

    gsap.killTweensOf(
      preview
    );

    gsap.set(preview, {
      visibility:
        "visible",
    });

    gsap.fromTo(
      preview,
      {
        opacity: 0,
        scale: 0.88,
      },
      {
        opacity: 1,
        scale: 1,

        duration: 0.35,

        ease:
          "power3.out",
      }
    );
  };

  const handleLeave =
    () => {
      const preview =
        previewRef.current;

      if (!preview) {
        setActiveIndex(
          null
        );

        return;
      }

      gsap.to(preview, {
        opacity: 0,
        scale: 0.93,

        duration: 0.2,

        ease:
          "power2.out",

        onComplete: () => {
          setActiveIndex(
            null
          );
        },
      });
    };

  /* ==========================================================
     CURSOR FOLLOW
  =========================================================== */

  const handlePointerMove = (
    event:
      React.PointerEvent<HTMLDivElement>
  ) => {
    if (
      activeIndex === null
    ) {
      return;
    }

    const list =
      listRef.current;

    const preview =
      previewRef.current;

    if (
      !list ||
      !preview
    ) {
      return;
    }

    const bounds =
      list.getBoundingClientRect();

    const previewWidth =
      preview.offsetWidth;

    const previewHeight =
      preview.offsetHeight;

    const x =
      event.clientX -
      bounds.left -
      previewWidth *
        0.48;

    const y =
      event.clientY -
      bounds.top -
      previewHeight *
        0.52;

    const safeX =
      Math.max(
        70,
        Math.min(
          x,
          bounds.width -
            previewWidth -
            60
        )
      );

    const safeY =
      Math.max(
        8,
        Math.min(
          y,
          bounds.height -
            previewHeight -
            8
        )
      );

    gsap.to(preview, {
      x: safeX,
      y: safeY,

      duration: 0.45,

      ease:
        "power3.out",

      overwrite:
        "auto",
    });
  };

  /* ==========================================================
     MOBILE
  =========================================================== */

  const toggleMobile = (
    index: number
  ) => {
    setMobileOpen(
      mobileOpen === index
        ? null
        : index
    );
  };

  return (
    <section
      ref={sectionRef}
      className={
        styles.section
      }
    >
      {/* ====================================================
          MOBILE STICKY BAR

          Solo aparece en móvil.
      ===================================================== */}

      <div
        className={
          styles.mobileSticky
        }
      >
        <div
          className={
            styles.mobileStickyInner
          }
        >
          <div>
            <span>
              04
            </span>

            <strong>
              Amenidades
            </strong>
          </div>

          <div
            className={
              styles.mobileStickyRight
            }
          >
            <span>
              +20
            </span>

            <i />
          </div>
        </div>

        <div
          className={
            styles.mobileColorLine
          }
        />
      </div>

      {/* ====================================================
          MAIN
      ===================================================== */}

      <div
        className={
          styles.inner
        }
      >
        {/* ==================================================
            STICKY LEFT
        =================================================== */}

        <aside
          className={
            styles.headingColumn
          }
        >
          <div
            className={
              styles.desktopMeta
            }
          >
            <span>
              04 — Amenidades
            </span>

            <span>
              Zagari Resort Club
            </span>
          </div>

          <div
            data-heading
            className={
              styles.stickyContent
            }
          >
            <span
              className={
                styles.eyebrow
              }
            >
              Resort Club
            </span>

            <h2>
              Amenidades
              <span>
                para cada
                momento.
              </span>
            </h2>

            <p
              className={
                styles.leftDescription
              }
            >
              Espacios que
              transforman cada
              estadía en una
              experiencia de
              descanso, conexión,
              diversión y
              naturaleza.
            </p>

            <div
              className={
                styles.count
              }
            >
              <strong>
                +20
              </strong>

              <span>
                amenidades y
                experiencias
              </span>
            </div>

            <div
              className={
                styles.zagariLine
              }
            />
          </div>
        </aside>

        {/* ==================================================
            CONTENT
        =================================================== */}

        <div
          className={
            styles.content
          }
        >
          {/* =================================================
              INTRO
          ================================================== */}

          <div
            data-description
            className={
              styles.contentIntro
            }
          >
            <span>
              Todo dentro de
              Zagari
            </span>

            <p>
              Empieza el día
              contemplando el paisaje,
              disfruta la piscina,
              conecta con tu bienestar,
              practica deporte o
              comparte una experiencia
              gastronómica. En Zagari,
              cada momento tiene su
              propio espacio.
            </p>
          </div>

          {/* =================================================
              LIST
          ================================================== */}

          <div
            ref={listRef}
            className={
              styles.list
            }
            onPointerMove={
              handlePointerMove
            }
            onPointerLeave={
              handleLeave
            }
          >
            <div
              className={
                styles.listHeader
              }
            >
              <span>
                Nº
              </span>

              <span>
                Experiencia
              </span>

              <span>
                Amenidad
              </span>

              <span />
            </div>

            {amenities.map(
              (
                amenity,
                index
              ) => {
                const Icon =
                  amenity.icon;

                const active =
                  activeIndex ===
                  index;

                const open =
                  mobileOpen ===
                  index;

                return (
                  <button
                    key={
                      amenity.id
                    }
                    ref={(
                      node
                    ) => {
                      rowRefs.current[
                        index
                      ] = node;
                    }}
                    type="button"
                    className={`${styles.row} ${
                      active
                        ? styles.rowActive
                        : ""
                    } ${
                      open
                        ? styles.rowOpen
                        : ""
                    }`}
                    onPointerEnter={() =>
                      handleEnter(
                        index
                      )
                    }
                    onClick={() =>
                      toggleMobile(
                        index
                      )
                    }
                    aria-expanded={
                      open
                    }
                  >
                    {/* =============================
                        NUMBER
                    ============================== */}

                    <span
                      className={
                        styles.number
                      }
                    >
                      {
                        amenity.id
                      }
                    </span>

                    {/* =============================
                        CATEGORY
                    ============================== */}

                    <span
                      className={
                        styles.category
                      }
                    >
                      {
                        amenity.category
                      }
                    </span>

                    {/* =============================
                        NAME
                    ============================== */}

                    <span
                      className={
                        styles.name
                      }
                    >
                      {
                        amenity.title
                      }
                    </span>

                    {/* =============================
                        ICON
                    ============================== */}

                    <span
                      className={
                        styles.icon
                      }
                    >
                      <Icon
                        size={18}
                        weight="light"
                        aria-hidden={
                          true
                        }
                      />
                    </span>

                    {/* =============================
                        MOBILE CONTENT
                    ============================== */}

                    <span
                      className={`${styles.mobileReveal} ${
                        open
                          ? styles.mobileRevealOpen
                          : ""
                      }`}
                    >
                      <span
                        className={
                          styles.mobileVisual
                        }
                      >
                        <Image
                          src={
                            amenity.image
                          }
                          alt={
                            amenity.title
                          }
                          fill
                          sizes="calc(100vw - 30px)"
                          className={
                            styles.mobileImage
                          }
                        />

                        <span
                          className={
                            styles.mobileShade
                          }
                        />

                        <span
                          className={
                            styles.mobileVisualTop
                          }
                        >
                          <span>
                            Zagari
                          </span>

                          <span>
                            {
                              amenity.id
                            }
                          </span>
                        </span>

                        <span
                          className={
                            styles.mobileVisualBottom
                          }
                        >
                          <span>
                            {
                              amenity.category
                            }
                          </span>

                          <strong>
                            {
                              amenity.title
                            }
                          </strong>
                        </span>
                      </span>
                    </span>
                  </button>
                );
              }
            )}

            {/* =================================================
                DESKTOP FLOATING IMAGE
            ================================================== */}

            <div
              ref={previewRef}
              className={
                styles.preview
              }
              aria-hidden="true"
            >
              {activeIndex !==
                null && (
                <>
                  <Image
                    key={
                      amenities[
                        activeIndex
                      ].image
                    }
                    src={
                      amenities[
                        activeIndex
                      ].image
                    }
                    alt=""
                    fill
                    sizes="240px"
                    className={
                      styles.previewImage
                    }
                  />

                  <div
                    className={
                      styles.previewShade
                    }
                  />

                  <div
                    className={
                      styles.previewTop
                    }
                  >
                    <span>
                      {
                        amenities[
                          activeIndex
                        ].id
                      }
                    </span>

                    <span>
                      Zagari
                    </span>
                  </div>

                  <div
                    className={
                      styles.previewBottom
                    }
                  >
                    {
                      amenities[
                        activeIndex
                      ].title
                    }
                  </div>
                </>
              )}
            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================== */}

          <div
            className={
              styles.footer
            }
          >
            <div
              className={
                styles.footerText
              }
            >
              <span>
                Vive diferente
              </span>

              <p>
                Espacios creados para
                disfrutar cada momento
                de tu experiencia en
                Zagari.
              </p>
            </div>

            <ActionButton
              href="#contacto"
              variant="primary"
              size="md"
              icon={
                ArrowUpRight
              }
              iconPosition="right"
            >
              Conocer Zagari
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
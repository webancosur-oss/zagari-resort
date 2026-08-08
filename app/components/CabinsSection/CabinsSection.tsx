"use client";

import Image from "next/image";
import {
  CSSProperties,
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import {
  ScrollTrigger,
} from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
} from "@phosphor-icons/react";


import styles from "./CabinsSection.module.css";
import ActionButton from "../buttons/ActionButton/ActionButton";

gsap.registerPlugin(
  ScrollTrigger
);

/* ============================================================
   DATA
============================================================ */

const cabins = [
  {
    id: "01",

    title:
      "Cabaña de 1 habitación",

    eyebrow:
      "Privacidad · Naturaleza · Descanso",

    description:
      "Un refugio íntimo integrado al paisaje natural de San Ramón, pensado para desconectarte de la rutina y disfrutar una estadía diferente.",

    experience:
      "Descansa rodeado de naturaleza y vive Zagari desde un espacio creado para disfrutar tranquilidad, paisaje y experiencias dentro del Resort Club.",

    image:
      "/assets/cabins/cabana-1.png",

    rooms:
      "1 habitación",

    accent:
      "pink",
  },

  {
    id: "02",

    title:
      "Cabaña de 2 habitaciones",

    eyebrow:
      "Conexión · Comodidad · Experiencias",

    description:
      "Una propuesta con mayor espacio para compartir y disfrutar del entorno sin perder privacidad, calma y conexión con la naturaleza.",

    experience:
      "Una escapada diferente para compartir momentos especiales y descubrir todo lo que Zagari Resort Club tiene preparado para ti.",

    image:
      "/assets/cabins/cabana-2.png",

    rooms:
      "2 habitaciones",

    accent:
      "orange",
  },

  {
    id: "03",

    title:
      "Cabaña de 3 habitaciones",

    eyebrow:
      "Familia · Amigos · Naturaleza",

    description:
      "Una alternativa amplia para disfrutar Zagari en familia o con amigos, rodeado de naturaleza y espacios creados para compartir.",

    experience:
      "Más espacio para descansar, conectar y convertir cada visita a San Ramón en una experiencia para recordar.",

    image:
      "/assets/cabins/cabana-3.png",

    rooms:
      "3 habitaciones",

    accent:
      "green",
  },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function CabinsSection() {
  const rootRef =
    useRef<HTMLElement | null>(
      null
    );

  const stageRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const panelRefs =
    useRef<
      Array<HTMLDivElement | null>
    >([]);

  useLayoutEffect(() => {
    const root =
      rootRef.current;

    const stage =
      stageRef.current;

    if (
      !root ||
      !stage
    ) {
      return;
    }

    const ctx =
      gsap.context(() => {
        const panels =
          panelRefs.current.filter(
            Boolean
          ) as HTMLDivElement[];

        if (
          panels.length < 2
        ) {
          return;
        }

        /* ====================================================
           INITIAL STATE
        ===================================================== */

        panels.forEach(
          (
            panel,
            index
          ) => {
            gsap.set(
              panel,
              {
                yPercent:
                  index === 0
                    ? 0
                    : 100,

                zIndex:
                  index + 1,

                opacity: 1,

                visibility:
                  "visible",
              }
            );

            const image =
              panel.querySelector(
                "[data-image]"
              );

            if (image) {
              gsap.set(
                image,
                {
                  scale:
                    1.055,
                }
              );
            }
          }
        );

        /* ====================================================
           MAIN SCROLL TIMELINE
        ===================================================== */

        const timeline =
          gsap.timeline({
            scrollTrigger: {
              trigger: root,

              start:
                "top top",

              end: () =>
                `+=${
                  window.innerHeight *
                  (
                    panels.length -
                    1
                  )
                }`,

              scrub: 1,

              pin: stage,

              pinSpacing:
                true,

              anticipatePin: 1,

              invalidateOnRefresh:
                true,
            },
          });

        /* ====================================================
           PANELS
        ===================================================== */

        panels
          .slice(1)
          .forEach(
            (
              panel,
              index
            ) => {
              const position =
                index;

              const image =
                panel.querySelector(
                  "[data-image]"
                );

              /*
               * La nueva section
               * sube desde abajo.
               */

              timeline.to(
                panel,
                {
                  yPercent: 0,

                  duration: 1,

                  ease: "none",
                },
                position
              );

              /*
               * Movimiento sutil
               * de fotografía.
               */

              if (image) {
                timeline.fromTo(
                  image,

                  {
                    scale:
                      1.075,

                    yPercent:
                      -1.5,
                  },

                  {
                    scale:
                      1.025,

                    yPercent:
                      1.5,

                    duration: 1,

                    ease: "none",
                  },

                  position
                );
              }
            }
          );

        /* ====================================================
           REFRESH
        ===================================================== */

        const raf =
          requestAnimationFrame(
            () => {
              ScrollTrigger.refresh();
            }
          );

        return () => {
          cancelAnimationFrame(
            raf
          );
        };
      }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={
        styles.section
      }
    >
      <div
        ref={stageRef}
        className={
          styles.stage
        }
      >
        {cabins.map(
          (
            cabin,
            index
          ) => {
            const accent =
              cabin.accent ===
              "pink"
                ? "var(--zagari-pink)"
                : cabin.accent ===
                    "orange"
                  ? "var(--zagari-orange)"
                  : "var(--zagari-green)";

            return (
              <div
                key={
                  cabin.id
                }
                ref={(node) => {
                  panelRefs.current[
                    index
                  ] = node;
                }}
                className={
                  styles.panel
                }
                style={
                  {
                    "--accent":
                      accent,
                  } as CSSProperties
                }
              >
                {/* ==========================================
                    MULTICOLOR BRAND LINE
                =========================================== */}

                <div
                  className={
                    styles.brandLine
                  }
                  aria-hidden="true"
                />

                <div
                  className={
                    styles.panelInner
                  }
                >
                  {/* ========================================
                      CONTENT
                  ========================================= */}

                  <div
                    className={
                      styles.content
                    }
                  >
                    {/* META */}

                    <div
                      className={
                        styles.meta
                      }
                    >
                      <span>
                        {
                          cabin.id
                        }
                      </span>

                      <span>
                        Zagari Resort
                        Club
                      </span>
                    </div>

                    {/* COPY */}

                    <div
                      className={
                        styles.copy
                      }
                    >
                      <span
                        className={
                          styles.eyebrow
                        }
                      >
                        {
                          cabin.eyebrow
                        }
                      </span>

                      <h2>
                        {
                          cabin.title
                        }
                      </h2>

                      <p
                        className={
                          styles.description
                        }
                      >
                        {
                          cabin.description
                        }
                      </p>

                      <p
                        className={
                          styles.experience
                        }
                      >
                        {
                          cabin.experience
                        }
                      </p>
                    </div>

                    {/* ========================================
                        INFO
                    ========================================= */}

                    <div
                      className={
                        styles.info
                      }
                    >
                      <div>
                        <span>
                          Cabaña
                        </span>

                        <strong>
                          {
                            cabin.rooms
                          }
                        </strong>
                      </div>

                      <div>
                        <span>
                          Concepto
                        </span>

                        <strong>
                          Tipo Lodge
                        </strong>
                      </div>

                      <div>
                        <span>
                          Experiencia
                        </span>

                        <strong>
                          Resort Club
                        </strong>
                      </div>
                    </div>

                    {/* ========================================
                        AMENITIES + CTA
                    ========================================= */}

                    <div
                      className={
                        styles.bottomContent
                      }
                    >
                      <div
                        className={
                          styles.amenities
                        }
                      >
                        <div
                          className={
                            styles.amenitiesTitle
                          }
                        >
                          <strong>
                            +20
                          </strong>

                          <span>
                            amenidades
                          </span>
                        </div>

                        <p>
                          Piscina
                          infinita,
                          bar piscina,
                          spa, yoga,
                          gimnasio,
                          camping,
                          mirador,
                          biohuerto,
                          mini golf,
                          parrillas,
                          restaurante
                          bar y más.
                        </p>
                      </div>

                      {/* ======================================
                          ACTION BUTTON
                      ======================================= */}

                      <div
                        className={
                          styles.actionWrap
                        }
                      >
                        <ActionButton
                          variant="primary"
                          size="md"
                          icon={
                            ArrowUpRight
                          }
                          iconPosition="right"
                          ariaLabel={`Conocer ${cabin.title}`}
                        >
                          Conocer
                          cabaña
                        </ActionButton>
                      </div>
                    </div>
                  </div>

                  {/* ========================================
                      VISUAL SIDE
                  ========================================= */}

                  <div
                    className={
                      styles.visualArea
                    }
                  >
                    <div
                      className={
                        styles.visualHeader
                      }
                    >
                      <span>
                        {
                          cabin.id
                        }{" "}
                        / 03
                      </span>

                      <span>
                        San Ramón
                      </span>
                    </div>

                    {/* ======================================
                        SMALLER IMAGE
                    ======================================= */}

                    <div
                      className={
                        styles.visual
                      }
                    >
                      <Image
                        data-image
                        src={
                          cabin.image
                        }
                        alt={`${cabin.title} - Zagari Resort Club`}
                        fill
                        priority={
                          index ===
                          0
                        }
                        sizes="
                          (max-width: 767px)
                          100vw,
                          43vw
                        "
                        className={
                          styles.image
                        }
                      />

                      <div
                        className={
                          styles.overlay
                        }
                      />

                      <div
                        className={
                          styles.imageTop
                        }
                      >
                        <span>
                          Zagari
                        </span>

                        <span>
                          Cabaña
                          Lodge
                        </span>
                      </div>

                      <div
                        className={
                          styles.imageBottom
                        }
                      >
                        <div
                          className={
                            styles.imageBrandLine
                          }
                        />

                        <div
                          className={
                            styles.imageBottomMeta
                          }
                        >
                          <span>
                            Vive
                            diferente
                          </span>

                          <span>
                            {
                              cabin.rooms
                            }
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ======================================
                        BELOW IMAGE
                    ======================================= */}

                    <div
                      className={
                        styles.visualFooter
                      }
                    >
                      <span>
                        Naturaleza
                      </span>

                      <span
                        className={
                          styles.visualFooterLine
                        }
                      />

                      <span>
                        Resort Club
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
}
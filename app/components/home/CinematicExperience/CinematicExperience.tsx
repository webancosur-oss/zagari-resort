"use client";

import {
  Fire,
  Leaf,
  Waves,
  Wind,
} from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import styles from "./CinematicExperience.module.css";

gsap.registerPlugin(
  ScrollTrigger,
  useGSAP,
);

type ExperienceTheme =
  | "air"
  | "fire"
  | "earth"
  | "water";

type ExperienceItem = {
  id: string;
  number: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  theme: ExperienceTheme;
};

const experiences: ExperienceItem[] = [
  {
    id: "aire",
    number: "01",
    name: "Aire",
    eyebrow: "Libertad y contemplación",
    title:
      "Respira la tranquilidad de la Selva Central",
    description:
      "Miradores, senderos y espacios abiertos conectan cada momento con los paisajes de San Ramón. Un entorno creado para detenerte, respirar y recuperar la calma.",
    image:
      "/assets/concept/aire.png",
    alt:
      "Mirador natural de Zagari Resort Club representando el aire",
    theme: "air",
  },
  {
    id: "fuego",
    number: "02",
    name: "Fuego",
    eyebrow: "Energía y conexión",
    title:
      "Encuentros que permanecen en la memoria",
    description:
      "El fuego representa la energía de compartir. Espacios cálidos y noches bajo las estrellas crean experiencias para reconectar con quienes más importan.",
    image:
      "/assets/concept/fuego.png",
    alt:
      "Espacio de reunión con fuego en Zagari Resort Club",
    theme: "fire",
  },
  {
    id: "tierra",
    number: "03",
    name: "Tierra",
    eyebrow: "Origen y estabilidad",
    title:
      "Un lugar para construir nuevas raíces",
    description:
      "La tierra representa pertenencia, equilibrio y crecimiento. La arquitectura de Zagari se integra al paisaje y respeta la identidad natural del entorno.",
    image:
      "/assets/concept/tierra.png",
    alt:
      "Experiencia natural que representa la tierra en Zagari Resort Club",
    theme: "earth",
  },
  {
    id: "agua",
    number: "04",
    name: "Agua",
    eyebrow: "Renovación y bienestar",
    title:
      "Fluye hacia una nueva forma de descansar",
    description:
      "Piscinas y espacios de contemplación invitan a renovar el cuerpo, despejar la mente y disfrutar el presente en contacto con la naturaleza.",
    image:
      "/assets/concept/agua.png",
    alt:
      "Piscina y zona social de Zagari Resort Club representando el agua",
    theme: "water",
  },
];

const icons = {
  air: Wind,
  fire: Fire,
  earth: Leaf,
  water: Waves,
};

const themeClasses = {
  air: styles.air,
  fire: styles.fire,
  earth: styles.earth,
  water: styles.water,
};

export default function CinematicExperience() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const context =
        gsap.matchMedia();

      context.add(
        "(min-width: 769px)",
        () => {
          const scenes =
            gsap.utils.toArray<HTMLElement>(
              `.${styles.scene}`,
              section,
            );

          const images =
            gsap.utils.toArray<HTMLElement>(
              `.${styles.image}`,
              section,
            );

          const copies =
            gsap.utils.toArray<HTMLElement>(
              `.${styles.copy}`,
              section,
            );

          const progressItems =
            gsap.utils.toArray<HTMLElement>(
              `.${styles.progressItem}`,
              section,
            );

          const introduction =
            section.querySelector<HTMLElement>(
              `.${styles.introduction}`,
            );

          const handoff =
            section.querySelector<HTMLElement>(
              `.${styles.handoff}`,
            );

          const handoffContent =
            section.querySelector<HTMLElement>(
              `.${styles.handoffContent}`,
            );

          if (
            scenes.length !==
            experiences.length
          ) {
            return;
          }

          /* =========================================
             ESTADO INICIAL
          ========================================== */

          gsap.set(scenes, {
            autoAlpha: 0,
            clipPath:
              "inset(100% 0% 0% 0% round 32px)",
          });

          gsap.set(scenes[0], {
            autoAlpha: 1,
            clipPath:
              "inset(0% 0% 0% 0% round 32px)",
          });

          gsap.set(images, {
            scale: 1.14,
          });

          gsap.set(images[0], {
            scale: 1.03,
          });

          gsap.set(copies, {
            autoAlpha: 0,
            y: 64,
          });

          gsap.set(copies[0], {
            autoAlpha: 1,
            y: 0,
          });

          gsap.set(progressItems, {
            opacity: 0.34,
          });

          gsap.set(progressItems[0], {
            opacity: 1,
          });

          gsap.set(handoff, {
            yPercent: 100,
          });

          gsap.set(handoffContent, {
            autoAlpha: 0,
            y: 45,
          });

          /* =========================================
             TIMELINE
          ========================================== */

          const timeline =
            gsap.timeline({
              defaults: {
                ease: "none",
              },

              scrollTrigger: {
                trigger: section,
                start: "top top",

                /*
                 * Aproximadamente una pantalla
                 * de recorrido por escena y una
                 * adicional para la transición.
                 */
                end: () =>
                  `+=${
                    window.innerHeight *
                    4.8
                  }`,

                pin: true,
                pinSpacing: true,

                scrub: 0.9,
                anticipatePin: 1,

                invalidateOnRefresh:
                  true,
              },
            });

          /* =========================================
             ENTRADA DE AIRE
          ========================================== */

          timeline.to(
            images[0],
            {
              scale: 1,
              duration: 1,
            },
            0,
          );

          timeline.to(
            introduction,
            {
              autoAlpha: 0,
              y: -35,
              duration: 0.38,
            },
            0.16,
          );

          /* =========================================
             CAMBIO DE ESCENAS
          ========================================== */

          experiences
            .slice(1)
            .forEach(
              (
                _experience,
                relativeIndex,
              ) => {
                const nextIndex =
                  relativeIndex + 1;

                const previousIndex =
                  nextIndex - 1;

                const start =
                  nextIndex * 1.25;

                timeline
                  .to(
                    copies[
                      previousIndex
                    ],
                    {
                      autoAlpha: 0,
                      y: -46,
                      duration: 0.3,
                    },
                    start,
                  )

                  .to(
                    images[
                      previousIndex
                    ],
                    {
                      scale: 1.09,
                      filter:
                        "brightness(0.55) blur(3px)",
                      duration: 0.75,
                    },
                    start,
                  )

                  .fromTo(
                    scenes[nextIndex],
                    {
                      autoAlpha: 1,
                      clipPath:
                        "inset(100% 0% 0% 0% round 32px)",
                    },
                    {
                      autoAlpha: 1,
                      clipPath:
                        "inset(0% 0% 0% 0% round 32px)",
                      duration: 0.82,
                    },
                    start,
                  )

                  .fromTo(
                    images[nextIndex],
                    {
                      scale: 1.15,
                      filter:
                        "brightness(1) blur(0px)",
                    },
                    {
                      scale: 1.03,
                      filter:
                        "brightness(1) blur(0px)",
                      duration: 0.95,
                    },
                    start,
                  )

                  .fromTo(
                    copies[nextIndex],
                    {
                      autoAlpha: 0,
                      y: 60,
                    },
                    {
                      autoAlpha: 1,
                      y: 0,
                      duration: 0.46,
                    },
                    start + 0.3,
                  )

                  .to(
                    progressItems[
                      previousIndex
                    ],
                    {
                      opacity: 0.34,
                      duration: 0.18,
                    },
                    start,
                  )

                  .to(
                    progressItems[
                      nextIndex
                    ],
                    {
                      opacity: 1,
                      duration: 0.18,
                    },
                    start,
                  );
              },
            );

          /* =========================================
             TRANSICIÓN SIN ESPACIO BLANCO
          ========================================== */

          const finalIndex =
            experiences.length - 1;

          timeline
            .to(
              copies[finalIndex],
              {
                autoAlpha: 0,
                y: -35,
                duration: 0.3,
              },
              "+=0.5",
            )

            .to(
              images[finalIndex],
              {
                scale: 1.07,
                filter:
                  "brightness(0.65)",
                duration: 0.58,
              },
              "<",
            )

            /*
             * Esta capa sube y ocupa toda la
             * pantalla antes de liberar el pin.
             * Es del mismo color que LotsSection.
             */
            .to(
              handoff,
              {
                yPercent: 0,
                duration: 0.8,
                ease:
                  "power2.inOut",
              },
              "-=0.15",
            )

            .to(
              handoffContent,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.42,
              },
              "-=0.3",
            )

            /*
             * Pequeña pausa final para que
             * la sección de Lotes continúe
             * sin un salto perceptible.
             */
            .to(
              {},
              {
                duration: 0.28,
              },
            );

          return () => {
            timeline.kill();
          };
        },
      );

      return () => {
        context.revert();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="experience-title"
    >
      <div className={styles.viewport}>
        {/* =========================================
            INTRODUCCIÓN
        ========================================== */}

        <header
          className={styles.introduction}
        >
          <span>
            Conecta con lo esencial
          </span>

          <h2 id="experience-title">
            Cuatro elementos.
            <br />
            Una experiencia.
          </h2>

          <p>
            Aire, fuego, tierra y agua
            inspiran cada espacio de Zagari
            Resort Club.
          </p>
        </header>

        {/* =========================================
            ESCENAS
        ========================================== */}

        <div className={styles.scenes}>
          {experiences.map(
            (
              experience,
              index,
            ) => {
              const Icon =
                icons[experience.theme];

              return (
                <article
                  key={experience.id}
                  className={`${styles.scene} ${
                    themeClasses[
                      experience.theme
                    ]
                  }`}
                  style={{
                    zIndex: index + 1,
                  }}
                  aria-labelledby={`${experience.id}-experience-title`}
                >
                  <Image
                    src={experience.image}
                    alt={experience.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className={styles.image}
                  />

                  <div
                    className={styles.overlay}
                    aria-hidden="true"
                  />

                  <div
                    className={styles.ambient}
                    aria-hidden="true"
                  />

                  <div
                    className={styles.content}
                  >
                    <div
                      className={styles.top}
                    >
                      <div
                        className={
                          styles.counter
                        }
                      >
                        <span>
                          {
                            experience.number
                          }
                        </span>

                        <i />

                        <span>04</span>
                      </div>

                      <div
                        className={
                          styles.badge
                        }
                      >
                        <Icon
                          size={20}
                          weight="light"
                          aria-hidden="true"
                        />

                        <span>
                          {experience.name}
                        </span>
                      </div>
                    </div>

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
                          experience.eyebrow
                        }
                      </span>

                      <h3
                        id={`${experience.id}-experience-title`}
                      >
                        {experience.title}
                      </h3>

                      <p>
                        {
                          experience.description
                        }
                      </p>
                    </div>

                    <div
                      className={
                        styles.footer
                      }
                    >
                      <span>
                        Zagari Resort Club
                      </span>

                      <span>
                        San Ramón · Selva
                        Central
                      </span>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>

        {/* =========================================
            INDICADORES
        ========================================== */}

        <div
          className={styles.progress}
          aria-hidden="true"
        >
          {experiences.map(
            (experience) => (
              <div
                key={experience.id}
                className={`${styles.progressItem} ${
                  themeClasses[
                    experience.theme
                  ]
                }`}
              >
                <span>
                  {experience.number}
                </span>

                <strong>
                  {experience.name}
                </strong>
              </div>
            ),
          )}
        </div>

        {/* =========================================
            PUENTE HACIA LOTES
        ========================================== */}

        <div
          className={styles.handoff}
          aria-hidden="true"
        >
          <div
            className={
              styles.handoffContent
            }
          >
            <span>
              Segunda etapa · Preventa
            </span>

            <strong>
              Un espacio propio en la
              Selva Central
            </strong>

            <i />
          </div>
        </div>
      </div>

      {/* =========================================
          MOBILE
      ========================================== */}

      <div
        className={
          styles.mobileExperience
        }
      >
        <header
          className={styles.mobileHeader}
        >
          <span>
            Conecta con lo esencial
          </span>

          <h2>
            Cuatro elementos.
            <br />
            Una experiencia.
          </h2>

          <p>
            Aire, fuego, tierra y agua
            inspiran cada espacio de Zagari
            Resort Club.
          </p>
        </header>

        <div
          className={styles.mobileList}
        >
          {experiences.map(
            (experience) => {
              const Icon =
                icons[experience.theme];

              return (
                <article
                  key={experience.id}
                  className={`${styles.mobileCard} ${
                    themeClasses[
                      experience.theme
                    ]
                  }`}
                >
                  <div
                    className={
                      styles.mobileMedia
                    }
                  >
                    <Image
                      src={experience.image}
                      alt={experience.alt}
                      fill
                      sizes="100vw"
                      className={
                        styles.image
                      }
                    />

                    <div
                      className={
                        styles.mobileOverlay
                      }
                      aria-hidden="true"
                    />

                    <div
                      className={
                        styles.mobileTop
                      }
                    >
                      <span>
                        {
                          experience.number
                        }
                      </span>

                      <div>
                        <Icon
                          size={18}
                          weight="light"
                          aria-hidden="true"
                        />

                        {
                          experience.name
                        }
                      </div>
                    </div>

                    <div
                      className={
                        styles.mobileCopy
                      }
                    >
                      <span>
                        {
                          experience.eyebrow
                        }
                      </span>

                      <h3>
                        {
                          experience.title
                        }
                      </h3>

                      <p>
                        {
                          experience.description
                        }
                      </p>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
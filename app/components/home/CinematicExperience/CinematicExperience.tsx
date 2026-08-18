"use client";

import {
  ArrowRightIcon,
  CheckCircle,
  Fire,
  Leaf,
  Sparkle,
  Waves,
  Wind,
} from "@phosphor-icons/react";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./CinematicExperience.module.css";

/* =========================================================
   TIPOS
========================================================= */

type ExperienceTheme =
  | "air"
  | "fire"
  | "earth"
  | "water";

type ExperienceItem = {
  id: string;

  name: string;

  eyebrow: string;

  title: string;

  description: string;

  image: string;

  alt: string;

  href: string;

  theme: ExperienceTheme;

  amenities: string[];
};

/* =========================================================
   DATA
========================================================= */

const experiences: ExperienceItem[] = [
  {
    id: "aire",

    name: "Aire",

    eyebrow:
      "Libertad y contemplación",

    title:
      "Respira la tranquilidad de la Selva Central",

    description:
      "Espacios abiertos y recorridos naturales para contemplar el paisaje, respirar con calma y disfrutar de una conexión auténtica con San Ramón.",

    image:
      "/assets/concept/aire.png",

    alt:
      "Mirador natural de Zagari Resort Club representando el elemento aire",

    href:
      "/amenidades#aire",

    theme: "air",

    amenities: [
      "Mirador panorámico",
      "Senderos naturales",
      "Domo de contemplación",
      "Zonas abiertas de descanso",
    ],
  },

  {
    id: "fuego",

    name: "Fuego",

    eyebrow:
      "Energía y encuentro",

    title:
      "Momentos que permanecen en la memoria",

    description:
      "Ambientes cálidos y sociales creados para compartir, celebrar y disfrutar noches especiales con familia y amigos.",

    image:
      "/assets/concept/fuego.png",

    alt:
      "Zona social con fuego de Zagari Resort Club",

    href:
      "/amenidades#fuego",

    theme: "fire",

    amenities: [
      "Zona de fogatas",
      "Área de parrillas",
      "Espacios para reuniones",
      "Zona social nocturna",
    ],
  },

  {
    id: "tierra",

    name: "Tierra",

    eyebrow:
      "Origen y conexión",

    title:
      "Un entorno para construir nuevas raíces",

    description:
      "La arquitectura, los jardines y los espacios de aventura se integran al paisaje para conservar la esencia natural del proyecto.",

    image:
      "/assets/concept/tierra.png",

    alt:
      "Naturaleza y espacios de aventura de Zagari Resort Club",

    href:
      "/amenidades#tierra",

    theme: "earth",

    amenities: [
      "Jardines naturales",
      "Circuito de aventura",
      "Áreas recreativas",
      "Zonas para cabañas lodge",
    ],
  },

  {
    id: "agua",

    name: "Agua",

    eyebrow:
      "Renovación y bienestar",

    title:
      "Fluye hacia una nueva forma de descansar",

    description:
      "Piscinas y espacios de relajación diseñados para refrescarte, recuperar energía y disfrutar cada momento.",

    image:
      "/assets/concept/agua.png",

    alt:
      "Piscina y zona de bienestar de Zagari Resort Club",

    href:
      "/amenidades#agua",

    theme: "water",

    amenities: [
      "Piscina principal",
      "Piscina para niños",
      "Zona de descanso",
      "Espacios de bienestar",
    ],
  },
];

/* =========================================================
   ICONOS
========================================================= */

const icons = {
  air: Wind,

  fire: Fire,

  earth: Leaf,

  water: Waves,
};

/* =========================================================
   CLASES
========================================================= */

const themeClasses = {
  air: styles.air,

  fire: styles.fire,

  earth: styles.earth,

  water: styles.water,
};

/* =========================================================
   COMPONENTE
========================================================= */

export default function CinematicExperience() {
  const [
    activeId,
    setActiveId,
  ] = useState("aire");

  const activeExperience =
    experiences.find(
      (experience) =>
        experience.id ===
        activeId
    ) ?? experiences[0];

  const ActiveIcon =
    icons[
      activeExperience.theme
    ];

  return (
    <section
      id="experiencia"
      className={styles.section}
      aria-labelledby="experience-title"
    >
      <div
        className={styles.container}
      >
        {/* =====================================
            HEADER
        ====================================== */}

        <header
          className={styles.header}
        >
          <div>
            <span
              className={
                styles.mainEyebrow
              }
            >
              Experiencias Zagari
            </span>

            <h2
              id="experience-title"
            >
              Cuatro elementos que
              inspiran una forma
              diferente de descansar.
            </h2>
          </div>

          <div
            className={
              styles.headerAside
            }
          >
            <p>
              Aire, fuego, tierra y
              agua se integran a los
              espacios de Zagari para
              crear experiencias que
              conectan con la
              naturaleza.
            </p>

            <Link
              href="/amenidades"
              className={
                styles.headerLink
              }
            >
              <Sparkle
                size={17}
                weight="fill"
                aria-hidden="true"
              />

              <span>
                Ver todas las
                amenidades
              </span>

              <ArrowRightIcon
                size={16}
                weight="regular"
                aria-hidden="true"
              />
            </Link>
          </div>
        </header>

        {/* =====================================
            DESKTOP + TABLET
        ====================================== */}

        <div
          className={`${styles.experience} ${
            themeClasses[
              activeExperience.theme
            ]
          }`}
        >
          {/* ===================================
              SELECTOR
          ==================================== */}

          <nav
            className={styles.selector}
            aria-label="Elementos de Zagari"
          >
            {experiences.map(
              (experience) => {
                const Icon =
                  icons[
                    experience.theme
                  ];

                const active =
                  experience.id ===
                  activeId;

                return (
                  <button
                    key={
                      experience.id
                    }
                    type="button"
                    className={`${styles.selectorItem} ${
                      themeClasses[
                        experience.theme
                      ]
                    } ${
                      active
                        ? styles.selectorActive
                        : ""
                    }`}
                    onClick={() =>
                      setActiveId(
                        experience.id
                      )
                    }
                    aria-pressed={
                      active
                    }
                  >
                    <span
                      className={
                        styles.selectorIcon
                      }
                    >
                      <Icon
                        size={20}
                        weight="fill"
                        aria-hidden="true"
                      />
                    </span>

                    <span
                      className={
                        styles.selectorText
                      }
                    >
                      {
                        experience.name
                      }
                    </span>
                  </button>
                );
              }
            )}
          </nav>

          {/* ===================================
              INFORMACIÓN
          ==================================== */}

          <div
            key={
              activeExperience.id
            }
            className={
              styles.information
            }
          >
            <div
              className={
                styles.elementIdentity
              }
            >
              <span
                className={
                  styles.elementIcon
                }
              >
                <ActiveIcon
                  size={22}
                  weight="fill"
                  aria-hidden="true"
                />
              </span>

              <span>
                {
                  activeExperience.name
                }
              </span>
            </div>

            <span
              className={
                styles.eyebrow
              }
            >
              {
                activeExperience.eyebrow
              }
            </span>

            <h3>
              {
                activeExperience.title
              }
            </h3>

            <p
              className={
                styles.description
              }
            >
              {
                activeExperience.description
              }
            </p>

            {/* =================================
                AMENIDADES
            ================================== */}

            <div
              className={
                styles.amenities
              }
            >
              <span
                className={
                  styles.amenitiesLabel
                }
              >
                Puedes encontrar
              </span>

              <ul>
                {activeExperience.amenities.map(
                  (
                    amenity
                  ) => (
                    <li
                      key={
                        amenity
                      }
                    >
                      <CheckCircle
                        size={17}
                        weight="fill"
                        aria-hidden="true"
                      />

                      <span>
                        {amenity}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            <Link
              href={
                activeExperience.href
              }
              className={
                styles.elementLink
              }
            >
              <span>
                Conocer {
                  activeExperience.name
                }
              </span>

              <ArrowRightIcon
                size={16}
                weight="regular"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* ===================================
              IMAGEN
          ==================================== */}

          <div
            className={
              styles.media
            }
          >
            {experiences.map(
              (
                experience
              ) => (
                <Image
                  key={
                    experience.id
                  }
                  src={
                    experience.image
                  }
                  alt={
                    experience.alt
                  }
                  fill
                  priority={
                    experience.id ===
                    "aire"
                  }
                  sizes="
                    (max-width: 700px) 100vw,
                    (max-width: 1100px) 50vw,
                    48vw
                  "
                  className={`${styles.image} ${
                    experience.id ===
                    activeId
                      ? styles.imageActive
                      : ""
                  }`}
                />
              )
            )}

            <div
              className={
                styles.mediaShade
              }
              aria-hidden="true"
            />

            <div
              className={
                styles.mediaCaption
              }
            >
              <span>
                Zagari Resort Club
              </span>

              <strong>
                San Ramón · Selva
                Central
              </strong>
            </div>
          </div>
        </div>

        {/* =====================================
            MOBILE
        ====================================== */}

        <div
          className={
            styles.mobileExperience
          }
        >
          {experiences.map(
            (
              experience
            ) => {
              const Icon =
                icons[
                  experience.theme
                ];

              return (
                <article
                  key={
                    experience.id
                  }
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
                      src={
                        experience.image
                      }
                      alt={
                        experience.alt
                      }
                      fill
                      sizes="100vw"
                      className={
                        styles.mobileImage
                      }
                    />

                    <div
                      className={
                        styles.mobileShade
                      }
                    />

                    <span
                      className={
                        styles.mobileIcon
                      }
                    >
                      <Icon
                        size={20}
                        weight="fill"
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <div
                    className={
                      styles.mobileBody
                    }
                  >
                    <div
                      className={
                        styles.mobileHeading
                      }
                    >
                      <span>
                        {
                          experience.eyebrow
                        }
                      </span>

                      <strong>
                        {
                          experience.name
                        }
                      </strong>
                    </div>

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

                    <ul
                      className={
                        styles.mobileAmenities
                      }
                    >
                      {experience.amenities
                        .slice(
                          0,
                          3
                        )
                        .map(
                          (
                            amenity
                          ) => (
                            <li
                              key={
                                amenity
                              }
                            >
                              <CheckCircle
                                size={
                                  16
                                }
                                weight="fill"
                                aria-hidden="true"
                              />

                              <span>
                                {
                                  amenity
                                }
                              </span>
                            </li>
                          )
                        )}
                    </ul>

                    <Link
                      href={
                        experience.href
                      }
                      className={
                        styles.mobileLink
                      }
                    >
                      <span>
                        Ver amenidades
                      </span>

                      <ArrowRightIcon
                        size={16}
                        weight="regular"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </article>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
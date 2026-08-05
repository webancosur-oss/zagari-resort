"use client";

import {
  ArrowRightIcon,
  CaretDown,
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
  number: string;
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
   INFORMACIÓN
========================================================= */

const experiences: ExperienceItem[] = [
  {
    id: "aire",
    number: "01",
    name: "Aire",
    eyebrow: "Libertad y contemplación",
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
    theme:
      "air",
    amenities: [
      "Mirador panorámico",
      "Senderos naturales",
      "Domo de contemplación",
      "Zonas abiertas de descanso",
    ],
  },
  {
    id: "fuego",
    number: "02",
    name: "Fuego",
    eyebrow: "Energía y encuentro",
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
    theme:
      "fire",
    amenities: [
      "Zona de fogatas",
      "Área de parrillas",
      "Espacios para reuniones",
      "Zona social nocturna",
    ],
  },
  {
    id: "tierra",
    number: "03",
    name: "Tierra",
    eyebrow: "Origen y conexión",
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
    theme:
      "earth",
    amenities: [
      "Jardines naturales",
      "Circuito de aventura",
      "Áreas recreativas",
      "Zonas para cabañas lodge",
    ],
  },
  {
    id: "agua",
    number: "04",
    name: "Agua",
    eyebrow: "Renovación y bienestar",
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
    theme:
      "water",
    amenities: [
      "Piscina principal",
      "Piscina para niños",
      "Zona de descanso",
      "Espacios de bienestar",
    ],
  },
];

/* =========================================================
   ICONOS Y ESTILOS
========================================================= */

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

/* =========================================================
   COMPONENTE
========================================================= */

export default function CinematicExperience() {
  const [activeId, setActiveId] =
    useState("aire");

  const activeExperience =
    experiences.find(
      (experience) =>
        experience.id === activeId,
    ) ?? experiences[0];

  const ActiveIcon =
    icons[activeExperience.theme];

  return (
    <section
      id="experiencia"
      className={styles.section}
      aria-labelledby="experience-title"
    >
      {/* ===================================================
          ENCABEZADO
      ==================================================== */}

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <span className={styles.mainEyebrow}>
              Experiencias Zagari
            </span>

            <h2 id="experience-title">
              Cuatro elementos.
              <br />
              Más de veinte amenidades.
            </h2>
          </div>

          <div className={styles.headerAside}>
            <p>
              Descubre cómo el aire, el fuego, la tierra y el agua
              inspiran cada espacio de Zagari Resort Club.
            </p>

            <Link
              href="/amenidades"
              className={styles.headerButton}
            >
              <Sparkle
                size={19}
                weight="fill"
                aria-hidden="true"
              />

              <span>
                Ver todas las amenidades
              </span>

              <ArrowRightIcon
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </Link>
          </div>
        </header>

        {/* ===================================================
            DISEÑO DE ESCRITORIO Y TABLET
        ==================================================== */}

        <div className={styles.desktopExperience}>
          {/* IMAGEN PRINCIPAL */}

          <div
            className={`${styles.media} ${
              themeClasses[
                activeExperience.theme
              ]
            }`}
          >
            {experiences.map(
              (experience) => (
                <Image
                  key={experience.id}
                  src={experience.image}
                  alt={experience.alt}
                  fill
                  priority={
                    experience.id === "aire"
                  }
                  sizes="
                    (max-width: 1024px) 100vw,
                    65vw
                  "
                  className={`${styles.image} ${
                    experience.id ===
                    activeId
                      ? styles.imageActive
                      : ""
                  }`}
                />
              ),
            )}

            <div
              className={styles.mediaOverlay}
              aria-hidden="true"
            />

            <div className={styles.mediaTop}>
              <span>
                {activeExperience.number}
                {" / "}
                04
              </span>

              <div className={styles.activeBadge}>
                <span className={styles.activeBadgeIcon}>
                  <ActiveIcon
                    size={22}
                    weight="fill"
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <small>
                    Elemento
                  </small>

                  <strong>
                    {activeExperience.name}
                  </strong>
                </div>
              </div>
            </div>

            <div className={styles.mediaCaption}>
              <span>
                Zagari Resort Club
              </span>

              <strong>
                San Ramón · Selva Central
              </strong>
            </div>
          </div>

          {/* INFORMACIÓN LATERAL */}

          <div
            className={`${styles.information} ${
              themeClasses[
                activeExperience.theme
              ]
            }`}
          >
            <nav
              className={styles.tabs}
              aria-label="Elementos de Zagari Resort Club"
            >
              {experiences.map(
                (experience) => {
                  const Icon =
                    icons[
                      experience.theme
                    ];

                  const isActive =
                    experience.id ===
                    activeId;

                  return (
                    <button
                      key={experience.id}
                      type="button"
                      className={`${styles.tab} ${
                        themeClasses[
                          experience.theme
                        ]
                      } ${
                        isActive
                          ? styles.tabActive
                          : ""
                      }`}
                      onClick={() =>
                        setActiveId(
                          experience.id,
                        )
                      }
                      aria-pressed={
                        isActive
                      }
                    >
                      <span
                        className={
                          styles.tabIcon
                        }
                      >
                        <Icon
                          size={19}
                          weight="fill"
                          aria-hidden="true"
                        />
                      </span>

                      <span
                        className={
                          styles.tabText
                        }
                      >
                        <small>
                          {
                            experience.number
                          }
                        </small>

                        <strong>
                          {
                            experience.name
                          }
                        </strong>
                      </span>
                    </button>
                  );
                },
              )}
            </nav>

            <div
              key={activeExperience.id}
              className={styles.activeContent}
            >
              <span className={styles.eyebrow}>
                {activeExperience.eyebrow}
              </span>

              <h3>
                {activeExperience.title}
              </h3>

              <p className={styles.description}>
                {
                  activeExperience.description
                }
              </p>

              <div className={styles.amenitiesBlock}>
                <span className={styles.amenitiesTitle}>
                  Amenidades de este elemento
                </span>

                <ul className={styles.amenitiesList}>
                  {activeExperience.amenities.map(
                    (amenity) => (
                      <li key={amenity}>
                        <CheckCircle
                          size={19}
                          weight="fill"
                          aria-hidden="true"
                        />

                        <span>
                          {amenity}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <Link
                href={activeExperience.href}
                className={styles.elementButton}
              >
                <span>
                  Ver amenidades de{" "}
                  {activeExperience.name}
                </span>

                <ArrowRightIcon
                  size={18}
                  weight="bold"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* ===================================================
            DISEÑO MÓVIL
        ==================================================== */}

        <div className={styles.mobileExperience}>
          {experiences.map(
            (experience) => {
              const Icon =
                icons[
                  experience.theme
                ];

              const isOpen =
                activeId ===
                experience.id;

              return (
                <article
                  key={experience.id}
                  className={`${styles.mobileCard} ${
                    themeClasses[
                      experience.theme
                    ]
                  } ${
                    isOpen
                      ? styles.mobileCardOpen
                      : ""
                  }`}
                >
                  <button
                    type="button"
                    className={styles.mobileTrigger}
                    onClick={() =>
                      setActiveId(
                        experience.id,
                      )
                    }
                    aria-expanded={isOpen}
                    aria-controls={`${experience.id}-mobile-content`}
                  >
                    <span className={styles.mobileTriggerIcon}>
                      <Icon
                        size={21}
                        weight="fill"
                        aria-hidden="true"
                      />
                    </span>

                    <span className={styles.mobileTriggerText}>
                      <small>
                        Elemento{" "}
                        {experience.number}
                      </small>

                      <strong>
                        {experience.name}
                      </strong>
                    </span>

                    <CaretDown
                      size={19}
                      weight="bold"
                      aria-hidden="true"
                      className={styles.caret}
                    />
                  </button>

                  <div
                    id={`${experience.id}-mobile-content`}
                    className={styles.mobileContent}
                  >
                    <div className={styles.mobileMedia}>
                      <Image
                        src={experience.image}
                        alt={experience.alt}
                        fill
                        sizes="100vw"
                        className={styles.mobileImage}
                      />

                      <div
                        className={styles.mobileOverlay}
                        aria-hidden="true"
                      />

                      <span>
                        Zagari Resort Club
                      </span>
                    </div>

                    <div className={styles.mobileInformation}>
                      <span className={styles.eyebrow}>
                        {
                          experience.eyebrow
                        }
                      </span>

                      <h3>
                        {experience.title}
                      </h3>

                      <p>
                        {
                          experience.description
                        }
                      </p>

                      <div className={styles.amenitiesBlock}>
                        <span className={styles.amenitiesTitle}>
                          Amenidades
                        </span>

                        <ul className={styles.amenitiesList}>
                          {experience.amenities.map(
                            (amenity) => (
                              <li key={amenity}>
                                <CheckCircle
                                  size={18}
                                  weight="fill"
                                  aria-hidden="true"
                                />

                                <span>
                                  {amenity}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      <Link
                        href={experience.href}
                        className={styles.elementButton}
                      >
                        <span>
                          Ver amenidades de{" "}
                          {experience.name}
                        </span>

                        <ArrowRightIcon
                          size={18}
                          weight="bold"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            },
          )}

          <Link
            href="/amenidades"
            className={styles.mobileAllButton}
          >
            <Sparkle
              size={19}
              weight="fill"
              aria-hidden="true"
            />

            <span>
              Explorar las +20 amenidades
            </span>

            <ArrowRightIcon
              size={18}
              weight="bold"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
"use client";

import {
  ArrowRight,
  Fire,
  Leaf,
  Waves,
  Wind,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import {
  useState,
  type FocusEvent,
  type MouseEvent,
} from "react";

import styles from "./AmenitiesSection.module.css";

/*==================================================
  TIPOS
==================================================*/

type AmenityTheme =
  | "air"
  | "fire"
  | "earth"
  | "water";

type AmenityItem = {
  id: string;
  number: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  theme: AmenityTheme;
};

/*==================================================
  DATOS
==================================================*/

const amenities: AmenityItem[] = [
  {
    id: "aire",
    number: "01",
    name: "Aire",
    eyebrow: "Contemplación",
    title: "Miradores y senderos",
    description:
      "Recorre caminos rodeados de naturaleza, contempla el paisaje de San Ramón y encuentra espacios creados para respirar, caminar y desconectarte.",
    image:
      "/assets/amenities/domo.png",
    alt:
      "Mirador y senderos naturales de Zagari Resort Club",
    href: "/amenidades#aire",
    theme: "air",
  },
  {
    id: "fuego",
    number: "02",
    name: "Fuego",
    eyebrow: "Encuentro",
    title: "Fogatas y zonas sociales",
    description:
      "Comparte noches especiales alrededor del fuego en espacios diseñados para conversar, celebrar y crear recuerdos con familia y amigos.",
    image:
      "/assets/amenities/fogata-zona-social.png",
    alt:
      "Zona de fogata y encuentro social de Zagari Resort Club",
    href: "/amenidades#fuego",
    theme: "fire",
  },
  {
    id: "tierra",
    number: "03",
    name: "Tierra",
    eyebrow: "Conexión",
    title: "Naturaleza y aventura",
    description:
      "Vive experiencias integradas al paisaje mediante jardines, circuitos naturales y ambientes que respetan la identidad de la Selva Central.",
    image:
      "/assets/amenities/naturaleza-aventura.png",
    alt:
      "Espacios naturales y de aventura de Zagari Resort Club",
    href: "/amenidades#tierra",
    theme: "earth",
  },
  {
    id: "agua",
    number: "04",
    name: "Agua",
    eyebrow: "Bienestar",
    title: "Piscinas y descanso",
    description:
      "Disfruta piscinas, zonas de relajación y espacios de bienestar creados para refrescarte, descansar y vivir el presente.",
    image:
      "/assets/amenities/piscinas-descanso.png",
    alt:
      "Piscinas y espacios de descanso de Zagari Resort Club",
    href: "/amenidades#agua",
    theme: "water",
  },
];

/*==================================================
  ICONOS Y TEMAS
==================================================*/

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

/*==================================================
  COMPONENTE
==================================================*/

export default function AmenitiesSection() {
  const [activeId, setActiveId] =
    useState<string>("aire");

  const activatePanel = (
    id: string,
  ): void => {
    setActiveId(id);
  };

  const handleMouseEnter = (
    event: MouseEvent<HTMLElement>,
    id: string,
  ): void => {
    event.currentTarget.focus({
      preventScroll: true,
    });

    activatePanel(id);
  };

  const handleFocus = (
    _event: FocusEvent<HTMLElement>,
    id: string,
  ): void => {
    activatePanel(id);
  };

  return (
    <section
      id="amenidades"
      className={styles.section}
      aria-labelledby="amenities-title"
    >
      {/*================================================
        CABECERA
      ================================================*/}

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.mainEyebrow}>
            Experiencias Zagari
          </span>

          <h2 id="amenities-title">
            Amenidades inspiradas
            <br />
            en los cuatro elementos
          </h2>
        </div>

        <div className={styles.headerAside}>
          <p>
            Espacios creados para contemplar,
            compartir, conectar con la naturaleza
            y renovar tu bienestar.
          </p>

          <span className={styles.interactionHint}>
            Explora cada experiencia
          </span>
        </div>
      </header>

      {/*================================================
        PANELES
      ================================================*/}

      <div className={styles.panels}>
        {amenities.map((amenity) => {
          const Icon =
            icons[amenity.theme];

          const isActive =
            activeId === amenity.id;

          return (
            <article
              key={amenity.id}
              className={`${styles.panel} ${
                themeClasses[amenity.theme]
              } ${
                isActive
                  ? styles.panelActive
                  : ""
              }`}
              tabIndex={0}
              onMouseEnter={(event) =>
                handleMouseEnter(
                  event,
                  amenity.id,
                )
              }
              onFocus={(event) =>
                handleFocus(
                  event,
                  amenity.id,
                )
              }
              onClick={() =>
                activatePanel(amenity.id)
              }
              aria-labelledby={`${amenity.id}-amenity-title`}
            >
              {/*========================================
                IMAGEN
              ========================================*/}

              <Image
                src={amenity.image}
                alt={amenity.alt}
                fill
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1100px) 50vw,
                  35vw
                "
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

              {/*========================================
                CONTENIDO SUPERIOR
              ========================================*/}

              <div className={styles.panelTop}>
                <span className={styles.number}>
                  {amenity.number}
                </span>

                <div className={styles.elementBadge}>
                  <Icon
                    size={18}
                    weight="light"
                    aria-hidden="true"
                  />

                  <span>{amenity.name}</span>
                </div>
              </div>

              {/*========================================
                CONTENIDO PRINCIPAL
              ========================================*/}

              <div className={styles.panelContent}>
                <span className={styles.eyebrow}>
                  {amenity.eyebrow}
                </span>

                <h3
                  id={`${amenity.id}-amenity-title`}
                >
                  {amenity.title}
                </h3>

                <div
                  className={
                    styles.revealContent
                  }
                >
                  <p>
                    {amenity.description}
                  </p>

                  <Link
                    href={amenity.href}
                    className={styles.panelLink}
                    aria-label={`Conocer más sobre ${amenity.title}`}
                  >
                    <span>
                      Conocer experiencia
                    </span>

                    <span
                      className={
                        styles.linkIcon
                      }
                    >
                      <ArrowRight
                        size={17}
                        weight="bold"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </div>
              </div>

              {/*========================================
                LÍNEA INFERIOR
              ========================================*/}

              <div
                className={styles.progress}
                aria-hidden="true"
              >
                <span />
              </div>
            </article>
          );
        })}
      </div>

      {/*================================================
        PIE
      ================================================*/}

      <footer className={styles.footer}>
        <span>
          Zagari Resort Club
        </span>

        <Link
          href="/amenidades"
          className={styles.allAmenitiesLink}
        >
          <span>
            Descubre todas las amenidades
          </span>

          <ArrowRight
            size={17}
            weight="bold"
            aria-hidden="true"
          />
        </Link>

        <span>
          San Ramón · Selva Central
        </span>
      </footer>
    </section>
  );
}
"use client";

import {
  ArrowUpRight,
  MapPin,
} from "@phosphor-icons/react";
import Image from "next/image";

import styles from "./LocationSection.module.css";

/* =========================================================
   TIPOS
========================================================= */

type Attraction = {
  name: string;
  category: string;
  description: string;
  image: string;
  featured?: boolean;
};

/* =========================================================
   ATRACTIVOS / REFERENCIAS CERCANAS
========================================================= */

const attractions: Attraction[] = [
  {
    name: "Plaza San Ramón",
    category: "Punto de referencia",
    description:
      "Uno de los principales puntos urbanos de referencia para llegar hacia Zagari Resort Club.",
    image:
      "/assets/location/attractions/plaza-san-ramon.webp",
    featured: true,
  },
  {
    name: "Ingreso a Chincana",
    category: "Acceso",
    description:
      "Ingreso principal hacia Chincana y conexión con la ruta que conduce al proyecto.",
    image:
      "/assets/location/attractions/ingreso-chincana.webp",
    featured: true,
  },
  {
    name: "Fundo Selenita",
    category: "Referencia local",
    description:
      "Punto de referencia ubicado dentro del recorrido hacia Zagari Resort Club.",
    image:
      "/assets/location/attractions/fundo-selenita.webp",
  },
  {
    name: "Iglesia Chincana",
    category: "Chincana",
    description:
      "Referencia reconocible dentro de la localidad de Chincana durante el recorrido.",
    image:
      "/assets/location/attractions/iglesia-chincana.webp",
  },
  {
    name: "Escuela Chincana",
    category: "Chincana",
    description:
      "Punto de referencia cercano a la ruta de acceso hacia el proyecto.",
    image:
      "/assets/location/attractions/escuela-chincana.webp",
  },
  {
    name: "Mirador El Mishasho",
    category: "Naturaleza",
    description:
      "Uno de los atractivos naturales próximos al entorno de Zagari Resort Club.",
    image:
      "/assets/location/attractions/mirador-mishasho.webp",
  },
];

/* =========================================================
   COMPONENTE
========================================================= */

export default function LocationSection() {
  return (
    <section
      className={styles.section}
      id="ubicacion"
      aria-labelledby="zagari-location-title"
    >
      <div className={styles.container}>
        {/* =================================================
            HEADER
        ================================================== */}

        <header className={styles.header}>
          <div className={styles.headerMain}>
            <span className={styles.eyebrow}>
              Ubicación
            </span>

            <h2 id="zagari-location-title">
              Cerca de todo.
              <span>
                {" "}
                Lejos de lo cotidiano.
              </span>
            </h2>
          </div>

          <div className={styles.headerAside}>
            <p>
              Zagari Resort Club se integra al entorno de
              Chincana y se conecta con importantes puntos de
              referencia de la zona.
            </p>

            <div className={styles.locationTag}>
              <MapPin
                size={17}
                weight="fill"
              />

              <span>
                Chincana · San Ramón
              </span>
            </div>
          </div>
        </header>

        {/* =================================================
            MAPA
        ================================================== */}

        <div className={styles.mapBlock}>
          <div className={styles.mapTop}>
            <div>
              <span className={styles.mapLabel}>
                Cómo llegar
              </span>

              <strong>
                Ruta hacia Zagari Resort Club
              </strong>
            </div>

            <span className={styles.mapMeta}>
              Mapa referencial
            </span>
          </div>

          <div className={styles.mapViewport}>
            <div className={styles.mapCanvas}>
              <Image
                src="/assets/location/ubicacion.webp"
                alt="Mapa referencial de la ruta hacia Zagari Resort Club desde Plaza San Ramón"
                fill
                priority
                sizes="
                  (max-width: 700px) 900px,
                  (max-width: 1200px) 100vw,
                  1480px
                "
                className={styles.mapImage}
              />
            </div>
          </div>

          <p className={styles.mapHint}>
            Desliza horizontalmente para recorrer el mapa
            completo.
          </p>
        </div>

        {/* =================================================
            LUGARES CERCANOS
        ================================================== */}

        <section
          className={styles.nearby}
          aria-labelledby="nearby-title"
        >
          <div className={styles.nearbyHeader}>
            <div>
              <span className={styles.nearbyEyebrow}>
                Alrededores
              </span>

              <h3 id="nearby-title">
                Lugares que forman parte
                <span> del recorrido.</span>
              </h3>
            </div>

            <p>
              Conoce algunos de los principales puntos de
              referencia y atractivos que encontrarás en el
              entorno de Zagari.
            </p>
          </div>

          <div className={styles.attractionsGrid}>
            {attractions.map(
              (attraction, index) => (
                <article
                  key={attraction.name}
                  className={`${styles.attractionCard} ${
                    attraction.featured
                      ? styles.attractionFeatured
                      : ""
                  }`}
                >
                  <div
                    className={
                      styles.attractionImage
                    }
                  >
                    <Image
                      src={attraction.image}
                      alt={attraction.name}
                      fill
                      sizes="
                        (max-width: 700px) 85vw,
                        (max-width: 1100px) 50vw,
                        33vw
                      "
                      className={
                        styles.attractionPhoto
                      }
                    />

                    <div
                      className={
                        styles.attractionShade
                      }
                    />

                    <span
                      className={
                        styles.attractionIndex
                      }
                    >
                      {String(
                        index + 1,
                      ).padStart(2, "0")}
                    </span>

                    <div
                      className={
                        styles.attractionOverlay
                      }
                    >
                      <span
                        className={
                          styles.attractionCategory
                        }
                      >
                        {attraction.category}
                      </span>

                      <div
                        className={
                          styles.attractionTitleRow
                        }
                      >
                        <h4>
                          {attraction.name}
                        </h4>

                        <span
                          className={
                            styles.attractionArrow
                          }
                        >
                          <ArrowUpRight
                            size={18}
                            weight="bold"
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <p>
                    {attraction.description}
                  </p>
                </article>
              ),
            )}
          </div>
        </section>

        {/* =================================================
            CIERRE
        ================================================== */}

        <div className={styles.bottomStatement}>
          <span className={styles.bottomNumber}>
            Z
          </span>

          <p>
            Naturaleza, tranquilidad y conexión con el entorno
            en un mismo lugar.
          </p>

          <strong>
            Zagari Resort Club
          </strong>
        </div>
      </div>
    </section>
  );
}
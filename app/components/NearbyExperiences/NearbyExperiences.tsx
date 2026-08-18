"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./NearbyExperiences.module.css";

type Experience = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: string;
  detail: string;
};

const experiences: Experience[] = [
  {
    id: "tirol",
    number: "01",
    title: "Catarata El Tirol",
    category: "Naturaleza",
    description:
      "Una de las experiencias naturales más emblemáticas de San Ramón, entre senderos, vegetación tropical y aguas cristalinas.",
    image:
      "/assets/experiences/1.jpg",
    detail:
      "Selva alta · San Ramón",
  },

  {
    id: "encantada",
    number: "02",
    title: "La Encantada",
    category: "Explorar",
    description:
      "Un rincón natural rodeado de vegetación, paisaje y el sonido del agua para descubrir la esencia de la Selva Central.",
    image:
      "/assets/experiences/2.jpg",
    detail:
      "Naturaleza · San Ramón",
  },

  {
    id: "pampa-hermosa",
    number: "03",
    title: "Pampa Hermosa",
    category: "Conexión",
    description:
      "Bosques, biodiversidad y paisajes que invitan a caminar sin prisa y reconectar con un entorno extraordinario.",
    image:
      "/assets/experiences/3.jpg",
    detail:
      "Bosque · Selva Central",
  },

  {
    id: "cafe",
    number: "04",
    title: "Ruta del café",
    category: "Sabores",
    description:
      "Descubre aromas, historias y sabores nacidos en uno de los territorios cafeteros más representativos de la Selva Central.",
    image:
      "/assets/experiences/4.jpg",
    detail:
      "Café · Chanchamayo",
  },
];

export default function NearbyExperiences() {
  const [activeId, setActiveId] =
    useState(experiences[0].id);

  const activeExperience =
    experiences.find(
      (experience) =>
        experience.id === activeId
    ) ?? experiences[0];

  return (
    <section
      className={styles.section}
      aria-labelledby="nearby-title"
    >
      {/* ========================================
          CABECERA
      ======================================== */}

      <div className={styles.header}>
        <span className={styles.eyebrow}>
          MÁS ALLÁ DE ZAGARI
        </span>

        <h2
          id="nearby-title"
          className={styles.title}
        >
          La Selva Central
          <span> empieza aquí.</span>
        </h2>

        <p className={styles.intro}>
          Naturaleza, agua, bosque y sabores
          forman parte de una experiencia que
          continúa más allá de tu estadía.
          Descubre algunos de los lugares que
          hacen especial a San Ramón.
        </p>
      </div>

      {/* ========================================
          GALERÍA PRINCIPAL
      ======================================== */}

      <div className={styles.gallery}>
        {experiences.map(
          (experience) => {
            const isActive =
              experience.id === activeId;

            return (
              <button
                key={experience.id}
                type="button"
                className={`${styles.galleryItem} ${
                  isActive
                    ? styles.galleryItemActive
                    : ""
                }`}
                onMouseEnter={() =>
                  setActiveId(
                    experience.id
                  )
                }
                onFocus={() =>
                  setActiveId(
                    experience.id
                  )
                }
                onClick={() =>
                  setActiveId(
                    experience.id
                  )
                }
                aria-label={`Ver ${experience.title}`}
              >
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  sizes="
                    (max-width: 767px) 82vw,
                    (max-width: 1100px) 45vw,
                    30vw
                  "
                  className={
                    styles.galleryImage
                  }
                />

                <span
                  className={
                    styles.imageOverlay
                  }
                />

                <span
                  className={
                    styles.galleryContent
                  }
                >
                  <small>
                    {experience.category}
                  </small>

                  <strong>
                    {experience.title}
                  </strong>
                </span>
              </button>
            );
          }
        )}
      </div>

      {/* ========================================
          DETALLE
      ======================================== */}

      <div className={styles.detail}>
        <div
          className={
            styles.detailHeading
          }
        >
          <div>
            <small>
              {
                activeExperience.category
              }
            </small>

            <h3>
              {activeExperience.title}
            </h3>
          </div>
        </div>

        <div className={styles.detailText}>
          <p>
            {
              activeExperience.description
            }
          </p>

          <span>
            {activeExperience.detail}
          </span>
        </div>
      </div>

      {/* ========================================
          EXPERIENCIAS / BENEFICIOS
      ======================================== */}

      <div className={styles.divider}>
        <span />

        <p>
          Un destino. Muchas formas
          de vivirlo.
        </p>

        <span />
      </div>

      <div className={styles.features}>
        <Feature
          icon="⌁"
          title="Cataratas"
          text="Agua y naturaleza"
        />

        <Feature
          icon="△"
          title="Senderos"
          text="Explora la selva"
        />

        <Feature
          icon="☼"
          title="Clima tropical"
          text="Vive al aire libre"
        />

        <Feature
          icon="◌"
          title="Café"
          text="Sabores de origen"
        />

        <Feature
          icon="◇"
          title="Bosques"
          text="Conecta con lo natural"
        />
      </div>

      {/* ========================================
          CIERRE
      ======================================== */}

      <div className={styles.footer}>
        <span className={styles.footerLine} />

        <p>
          SAN RAMÓN
          <strong> · </strong>
          SELVA CENTRAL
        </p>

        <span className={styles.footerLine} />
      </div>
    </section>
  );
}

/* ============================================
   FEATURE
============================================ */

function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className={styles.feature}>
      <span className={styles.featureIcon}>
        {icon}
      </span>

      <strong>{title}</strong>

      <small>{text}</small>
    </div>
  );
}
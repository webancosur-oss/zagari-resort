"use client";

import {
  ArrowDown,
  ArrowRight,
  MapPin,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

import styles from "./HomeHero.module.css";

const projectInformation = [
  {
    id: "project",
    label: "Proyecto",
    value: "Zagari Resort Club",
    detail: "Conecta con lo esencial",
  },
  {
    id: "stage",
    label: "Etapa",
    value: "Segunda etapa",
    detail: "Preventa de lotes",
  },
  {
    id: "location",
    label: "Ubicación",
    value: "San Ramón",
    detail: "Selva Central",
  },
  {
    id: "areas",
    label: "Áreas",
    value: "234 – 525 m²",
    detail: "Lotes disponibles",
  },
];

export default function HomeHero() {
  return (
    <section
      className={styles.hero}
      aria-labelledby="zagari-home-title"
    >
      {/* =====================================================
          IMÁGENES
      ====================================================== */}

      <div className={styles.imageLayer}>
        <Image
          src="/assets/hero/zagari-hero-desktop.png"
          alt="Piscina, naturaleza y áreas de descanso de Zagari Resort Club en San Ramón"
          fill
          priority
          sizes="100vw"
          className={`${styles.image} ${styles.desktopImage}`}
        />

        <Image
          src="/assets/hero/zagari-hero-desktop.png"
          alt="Naturaleza y espacios de Zagari Resort Club en San Ramón"
          fill
          priority
          sizes="100vw"
          className={`${styles.image} ${styles.mobileImage}`}
        />

        <div
          className={styles.imageOverlay}
          aria-hidden="true"
        />

        <div
          className={styles.mobileImageLabel}
          aria-hidden="true"
        >
          <MapPin
            size={15}
            weight="fill"
          />

          <span>
            San Ramón · Selva Central
          </span>
        </div>
      </div>

      <div
        className={styles.overlay}
        aria-hidden="true"
      />

      <div
        className={styles.texture}
        aria-hidden="true"
      />

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <MapPin
              size={14}
              weight="fill"
              aria-hidden="true"
            />

            <span>
              San Ramón · Selva Central
            </span>
          </div>

          <h1
            id="zagari-home-title"
            className={styles.title}
          >
            Donde la naturaleza se convierte en una nueva forma
            de vivir
          </h1>

          <p className={styles.description}>
            Una experiencia que une naturaleza, descanso e
            inversión en la segunda etapa de Zagari Resort Club.
          </p>

          <div className={styles.actions}>
            <Link
              href="/lotes"
              className={styles.primaryButton}
            >
              <span>
                Conoce nuestros lotes
              </span>

              <ArrowRight
                size={17}
                weight="bold"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="#experiencia"
              className={styles.secondaryButton}
            >
              <span>
                Descubre la experiencia
              </span>

              <ArrowDown
                size={17}
                weight="bold"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* ===================================================
            INFORMACIÓN INFERIOR
        ==================================================== */}

        <div
          className={styles.meta}
          aria-label="Información de Zagari Resort Club"
        >
          {projectInformation.map((item) => (
            <article
              key={item.id}
              className={styles.metaItem}
            >
              <span className={styles.metaLabel}>
                {item.label}
              </span>

              <strong className={styles.metaValue}>
                {item.value}
              </strong>

              <small className={styles.metaDetail}>
                {item.detail}
              </small>
            </article>
          ))}
        </div>
      </div>

      {/* =====================================================
          INDICADOR DE SCROLL
      ====================================================== */}

      <a
        href="#experiencia"
        className={styles.scrollIndicator}
        aria-label="Deslizar para descubrir Zagari Resort Club"
      >
        <span>
          Desliza para descubrir
        </span>

        <i aria-hidden="true" />

        <ArrowDown
          size={15}
          weight="bold"
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
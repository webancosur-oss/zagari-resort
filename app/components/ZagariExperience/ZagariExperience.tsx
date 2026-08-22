"use client";

import {
  ArrowUpRight,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

import styles from "./ZagariExperience.module.css";

const cards = [
  {
    image:
      "/assets/amenities/element-aire-mirador.webp",
    title:
      "Descubrir",
    subtitle:
      "Naturaleza",
    className:
      "cardOne",
  },

  {
    image:
      "/assets/amenities/element-tierra-biohuerto-mandarina.webp",
    title:
      "Conectar",
    subtitle:
      "Origen",
    className:
      "cardTwo",
  },

  {
    image:
      "/assets/amenities/element-agua-piscina-borde-infinito.webp",
    title:
      "Disfrutar",
    subtitle:
      "Bienestar",
    className:
      "cardThree",
  },

  {
    image:
      "/assets/amenities/element-fuego-camping.webp",
    title:
      "Vivir",
    subtitle:
      "Experiencias",
    className:
      "cardFour",
  },
] as const;

export default function ZagariExperience() {
  return (
    <section
      className={styles.section}
      aria-labelledby="zagari-experience-title"
    >
      <div className={styles.container}>
        {/* =====================================
            COPY
        ====================================== */}

        <div className={styles.copyColumn}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>
              <span
                className={styles.eyebrowLine}
                aria-hidden="true"
              />

              VIVE ZAGARI
            </span>

            <h2
              id="zagari-experience-title"
              className={styles.title}
            >
              Más que
              <br />
              una estadía,

              <span>
                una forma
                <br />
                diferente
                <br />
                de vivir la
                <br />
                naturaleza.
              </span>
            </h2>

            <p className={styles.description}>
              Zagari reúne descanso,
              naturaleza y experiencias en
              un entorno pensado para
              desconectarte de la rutina y
              reconectar con lo esencial.
            </p>
          </div>
        </div>

        {/* =====================================
            GALERÍA
        ====================================== */}

        <div
          className={styles.gallery}
          aria-label="Experiencias Zagari"
        >
          <div
            className={styles.galleryGlow}
            aria-hidden="true"
          />

          {cards.map((card) => (
            <article
              key={card.title}
              className={`${styles.card} ${
                styles[card.className]
              }`}
            >
              <div
                className={
                  styles.imageWrap
                }
              >
                <Image
                  src={card.image}
                  alt={`${card.title} en Zagari Resort Club`}
                  fill
                  sizes="
                    (max-width: 767px) 92vw,
                    (max-width: 1100px) 40vw,
                    27vw
                  "
                  className={
                    styles.image
                  }
                />

                <div
                  className={
                    styles.imageOverlay
                  }
                  aria-hidden="true"
                />

                <div
                  className={
                    styles.cardMeta
                  }
                >
                  <div
                    className={
                      styles.cardCopy
                    }
                  >
                    <small>
                      {card.subtitle}
                    </small>

                    <strong>
                      {card.title}
                    </strong>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
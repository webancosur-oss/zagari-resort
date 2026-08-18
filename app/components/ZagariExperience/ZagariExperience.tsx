"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./ZagariExperience.module.css";

const cards = [
  {
    id: "01",
    image:
      "/assets/amenities/bar-piscina.png",
    title:
      "Descubrir",
    subtitle:
      "Naturaleza",
    className:
      "cardOne",
  },
  {
    id: "02",
    image:
      "/assets/amenities/biohuerto-mandarina.png",
    title:
      "Conectar",
    subtitle:
      "Experiencias",
    className:
      "cardTwo",
  },
  {
    id: "03",
    image:
      "/assets/amenities/camping.png",
    title:
      "Disfrutar",
    subtitle:
      "Momentos",
    className:
      "cardThree",
  },
  {
    id: "04",
    image:
      "/assets/amenities/portico.png",
    title:
      "Vivir",
    subtitle:
      "Zagari",
    className:
      "cardFour",
  },
];

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

            <Link
              href="#amenidades"
              className={styles.button}
            >
              <span
                className={
                  styles.buttonInner
                }
              >
                <span>
                  Descubrir Zagari
                </span>

                <span
                  className={
                    styles.buttonArrow
                  }
                  aria-hidden="true"
                >
                  ↗
                </span>
              </span>
            </Link>
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

          {cards.map(
            (card) => (
              <article
                key={card.id}
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
                    alt={`${card.title} en Zagari Resort`}
                    fill
                    sizes="
                      (max-width: 767px) 92vw,
                      (max-width: 1100px) 40vw,
                      27vw
                    "
                    className={styles.image}
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
                    <span
                      className={
                        styles.cardNumber
                      }
                    >
                      {card.id}
                    </span>

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
            )
          )}
        </div>
      </div>
    </section>
  );
}
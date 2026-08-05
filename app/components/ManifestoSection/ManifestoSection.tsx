"use client";

import {
  Buildings,
  Leaf,
  Sparkle,
  TrendUp,
} from "@phosphor-icons/react";
import {
  useEffect,
  useRef,
} from "react";

import styles from "./ManifestoSection.module.css";

const timelineItems = [
  {
    id: "naturaleza",
    number: "01",
    eyebrow: "El origen",
    title: "Naturaleza que transforma",
    description:
      "Zagari Resort Club nace en San Ramón, rodeado de vegetación, clima privilegiado y paisajes que invitan a vivir con mayor tranquilidad.",
    icon: Leaf,
  },
  {
    id: "arquitectura",
    number: "02",
    eyebrow: "Tu espacio",
    title: "Diseña una vida a tu manera",
    description:
      "Adquiere tu lote y construye una cabaña tipo lodge integrada al entorno, pensada para descansar, compartir y crear una conexión auténtica con la naturaleza.",
    icon: Buildings,
  },
  {
    id: "experiencias",
    number: "03",
    eyebrow: "Resort Club",
    title: "Experiencias para recordar",
    description:
      "Disfruta de más de veinte amenidades creadas para el bienestar, la aventura, la recreación y los momentos especiales en familia.",
    icon: Sparkle,
  },
  {
    id: "inversion",
    number: "04",
    eyebrow: "El futuro",
    title: "Una inversión con propósito",
    description:
      "Invierte en un destino con potencial turístico y proyección de valorización, mientras construyes un patrimonio para disfrutar hoy y en el futuro.",
    icon: TrendUp,
  },
];

export default function ManifestoSection() {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const items =
      section.querySelectorAll<HTMLElement>(
        `.${styles.timelineItem}`,
      );

    const progress =
      section.querySelector<HTMLElement>(
        `.${styles.progress}`,
      );

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    if (reduceMotion) {
      items.forEach((item) => {
        item.classList.add(
          styles.visible,
        );
      });

      if (progress) {
        progress.style.transform =
          "scaleY(1)";
      }

      return;
    }

    const itemObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  styles.visible,
                );

                itemObserver.unobserve(
                  entry.target,
                );
              }
            },
          );
        },
        {
          threshold: 0.24,
          rootMargin:
            "0px 0px -8% 0px",
        },
      );

    items.forEach((item) => {
      itemObserver.observe(item);
    });

    const updateProgress = () => {
      if (!progress) {
        return;
      }

      const rect =
        section.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const travelDistance =
        rect.height +
        viewportHeight * 0.35;

      const traveled =
        viewportHeight * 0.72 -
        rect.top;

      const percentage =
        Math.min(
          Math.max(
            traveled /
              travelDistance,
            0,
          ),
          1,
        );

      progress.style.transform =
        `scaleY(${percentage})`;
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      updateProgress,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateProgress,
    );

    return () => {
      itemObserver.disconnect();

      window.removeEventListener(
        "scroll",
        updateProgress,
      );

      window.removeEventListener(
        "resize",
        updateProgress,
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className={styles.section}
      aria-labelledby="manifesto-title"
    >
      <div
        className={styles.decoration}
        aria-hidden="true"
      />

      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>
            ANCOSUR TERRA
          </span>

          <h2 id="manifesto-title">
            Un camino hacia una nueva forma de vivir
          </h2>

          <p>
            Descubre cómo naturaleza, arquitectura,
            experiencias e inversión se unen para
            crear Zagari Resort Club.
          </p>
        </header>

        <div className={styles.timeline}>
          <div
            className={styles.line}
            aria-hidden="true"
          >
            <span
              className={styles.progress}
            />
          </div>

          {timelineItems.map(
            (item, index) => {
              const Icon =
                item.icon;

              return (
                <article
                  key={item.id}
                  className={`${styles.timelineItem} ${
                    index % 2 === 0
                      ? styles.left
                      : styles.right
                  }`}
                >
                  <div
                    className={styles.marker}
                    aria-hidden="true"
                  >
                    <span>
                      <Icon
                        size={23}
                        weight="duotone"
                      />
                    </span>
                  </div>

                  <div
                    className={
                      styles.content
                    }
                  >
                    <div
                      className={
                        styles.contentTop
                      }
                    >
                      <span
                        className={
                          styles.number
                        }
                      >
                        {item.number}
                      </span>

                      <span
                        className={
                          styles.itemEyebrow
                        }
                      >
                        {item.eyebrow}
                      </span>
                    </div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {
                        item.description
                      }
                    </p>
                  </div>
                </article>
              );
            },
          )}
        </div>

        <footer className={styles.closing}>
          <span>
            Zagari Resort Club
          </span>

          <p>
            Un proyecto donde puedes invertir,
            construir y disfrutar de una experiencia
            conectada con lo esencial.
          </p>
        </footer>
      </div>
    </section>
  );
}
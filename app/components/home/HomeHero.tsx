"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./HomeHero.module.css";

const cabins = [
  {
    id: "01",
    title: "Cabaña",
    highlight: "1 Habitación",
    eyebrow: "SEGUNDA ETAPA",
    description:
      "Un refugio íntimo rodeado de naturaleza, diseñado para desconectarte y vivir la selva de una manera diferente.",
    image: "/assets/cabins/cabania-1-habitacion.png",
  },
  {
    id: "02",
    title: "Cabaña",
    highlight: "2 Habitaciones",
    eyebrow: "SEGUNDA ETAPA",
    description:
      "Espacios que conectan comodidad, naturaleza y descanso para compartir una experiencia inolvidable.",
    image: "/assets/cabins/cabania-2-habitaciones.png",
  },
  {
    id: "03",
    title: "Cabaña",
    highlight: "3 Habitaciones",
    eyebrow: "SEGUNDA ETAPA",
    description:
      "Más espacio para disfrutar juntos. Una experiencia premium integrada al paisaje natural de San Ramón.",
    image: "/assets/cabins/cabania-3-habitaciones.png",
  },
];

const CHANGE_TIME = 6500;

export default function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cabins.length);
    }, CHANGE_TIME);

    return () => window.clearInterval(interval);
  }, []);

  const handleChange = (index: number) => {
    setActiveIndex(index);
  };

  const activeCabin = cabins[activeIndex];

  return (
    <section className={styles.hero}>
      {/* =====================================
          BACKGROUND SLIDES
      ====================================== */}

      <div className={styles.background}>
        {cabins.map((cabin, index) => (
          <div
            key={cabin.id}
            className={`${styles.slide} ${
              index === activeIndex ? styles.slideActive : ""
            }`}
          >
            <Image
              src={cabin.image}
              alt={`${cabin.title} ${cabin.highlight}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className={styles.image}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className={styles.overlay} />

      {/* =====================================
          DECORACIÓN
      ====================================== */}

      <div className={styles.noise} />

      {/* =====================================
          CONTENIDO
      ====================================== */}

      <div className={styles.container}>
        <div className={styles.content}>
          <span
            key={`eyebrow-${activeIndex}`}
            className={styles.eyebrow}
          >
            {activeCabin.eyebrow}
          </span>

          <div
            key={`title-${activeIndex}`}
            className={styles.titleWrapper}
          >
            <h1 className={styles.title}>
              <span>{activeCabin.title}</span>

              <strong>
                {activeCabin.highlight}
              </strong>
            </h1>
          </div>

          <p
            key={`description-${activeIndex}`}
            className={styles.description}
          >
            {activeCabin.description}
          </p>

          <div className={styles.actions}>
            <Link
              href="/cabanas"
              className={styles.primaryButton}
            >
              <span>Descubrir cabañas</span>

              <span
                className={styles.buttonArrow}
                aria-hidden="true"
              >
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* =====================================
            SELECTOR DE CABAÑAS
        ====================================== */}

        <div className={styles.navigation}>
          <div className={styles.navigationLine} />

          <div className={styles.navigationItems}>
            {cabins.map((cabin, index) => {
              const isActive =
                index === activeIndex;

              return (
                <button
                  key={cabin.id}
                  type="button"
                  onClick={() =>
                    handleChange(index)
                  }
                  className={`${styles.navItem} ${
                    isActive
                      ? styles.navItemActive
                      : ""
                  }`}
                  aria-label={`Ver cabaña de ${
                    index + 1
                  } habitación${
                    index === 0 ? "" : "es"
                  }`}
                >

                  <span
                    className={
                      styles.navLabel
                    }
                  >
                    {cabin.highlight}
                  </span>

                  <span
                    className={
                      styles.progress
                    }
                  >
                    <span
                      className={
                        styles.progressBar
                      }
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================
            SCROLL INDICATOR
        ====================================== */}

        <div className={styles.scroll}>
          <span>Scroll</span>

          <div className={styles.scrollLine}>
            <span />
          </div>
        </div>
      </div>

      {/* =====================================
          NÚMERO GRANDE
      ====================================== */}

      <div
        key={`number-${activeIndex}`}
        className={styles.bigNumber}
        aria-hidden="true"
      >
        {activeCabin.id}
      </div>
    </section>
  );
}
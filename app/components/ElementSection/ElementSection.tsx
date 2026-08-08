"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ElementsSection.module.css";

const elements = [
  {
    id: "01",
    name: "Tierra",
    subtitle: "Estabilidad y raíces",
    description:
      "Conecta con la naturaleza, encuentra equilibrio y vuelve a lo esencial en un entorno pensado para vivir diferente.",
    image: "/assets/elements/elemento-tierra.png",
  },
  {
    id: "02",
    name: "Agua",
    subtitle: "Renueva cuerpo y mente",
    description:
      "Déjate llevar por espacios creados para descansar, refrescarte y disfrutar cada momento en plena naturaleza.",
    image: "/assets/elements/elemento-agua.png",
  },
  {
    id: "03",
    name: "Aire",
    subtitle: "Tranquilidad en cada instante",
    description:
      "Respira, contempla y disfruta la sensación de libertad que solo un entorno natural puede ofrecer.",
    image: "/assets/elements/elemento-aire.png",
  },
  {
    id: "04",
    name: "Fuego",
    subtitle: "Energía y conexión",
    description:
      "Un espacio para reconectar contigo, compartir momentos especiales y renovar tu energía.",
    image: "/assets/elements/elemento-fuego.png",
  },
];

export default function ElementsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeElement = elements[activeIndex];

  const nextElement = () => {
    setActiveIndex((current) => (current + 1) % elements.length);
  };

  const previousElement = () => {
    setActiveIndex(
      (current) => (current - 1 + elements.length) % elements.length
    );
  };

  return (
    <section className={styles.section}>
      {/* ================================
          CABECERA
      ================================= */}

      <div className={styles.header}>
        <div className={styles.headerTop}>
          <span className={styles.kicker}>02 — La experiencia</span>

          <span className={styles.location}>San Ramón · Perú</span>
        </div>

        <div className={styles.headerContent}>
          <h2 className={styles.heading}>
            Conecta
            <span>con los elementos.</span>
          </h2>

          <p className={styles.headerDescription}>
            Una experiencia donde naturaleza, descanso y conexión se
            encuentran para crear una forma diferente de vivir.
          </p>
        </div>
      </div>

      {/* ================================
          EXPERIENCE
      ================================= */}

      <div className={styles.experience}>
        {/* ==============================
            IZQUIERDA
        =============================== */}

        <div className={styles.contentPanel}>
          <div className={styles.elementsNav}>
            {elements.map((element, index) => {
              const active = activeIndex === index;

              return (
                <button
                  key={element.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`${styles.elementButton} ${
                    active ? styles.elementButtonActive : ""
                  }`}
                >
                  <span className={styles.elementNumber}>
                    {element.id}
                  </span>

                  <span className={styles.elementName}>
                    {element.name}
                  </span>

                  <span className={styles.elementArrow}>
                    {active ? "↗" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          {/* TEXTO ACTIVO */}

          <div
            key={`info-${activeIndex}`}
            className={styles.activeInfo}
          >
            <span className={styles.activeSubtitle}>
              {activeElement.subtitle}
            </span>

            <p className={styles.activeDescription}>
              {activeElement.description}
            </p>
          </div>

          {/* FOOTER IZQUIERDO */}

          <div className={styles.panelFooter}>
            <div className={styles.counter}>
              <span>{activeElement.id}</span>

              <span className={styles.counterLine} />

              <span>04</span>
            </div>

            <div className={styles.mobileArrows}>
              <button
                type="button"
                onClick={previousElement}
                aria-label="Elemento anterior"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextElement}
                aria-label="Siguiente elemento"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* ==============================
            IMAGEN DERECHA
        =============================== */}

        <div className={styles.visual}>
          {elements.map((element, index) => (
            <div
              key={element.id}
              className={`${styles.imageLayer} ${
                index === activeIndex
                  ? styles.imageLayerActive
                  : ""
              }`}
            >
              <Image
                src={element.image}
                alt={`${element.name} - Zagari Resort Club`}
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className={styles.image}
                priority={index === 0}
              />

              <div className={styles.imageOverlay} />
            </div>
          ))}

          {/* TOP LABEL */}

          <div className={styles.imageTop}>
            <span className={styles.circleNumber}>
              {activeElement.id}
            </span>

            <span className={styles.imageTopName}>
              {activeElement.name}
            </span>
          </div>

          {/* PALABRA GRANDE */}

          <div
            key={`word-${activeIndex}`}
            className={styles.bigWord}
          >
            {activeElement.name}
          </div>

          {/* BOTONES FLOTANTES */}

          <div className={styles.imageControls}>
            <button
              type="button"
              onClick={previousElement}
              aria-label="Elemento anterior"
            >
              ←
            </button>

            <button
              type="button"
              onClick={nextElement}
              aria-label="Siguiente elemento"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
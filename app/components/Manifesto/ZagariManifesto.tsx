"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import styles from "./ZagariManifesto.module.css";

/* ==========================================================
   DATA
========================================================== */

const manifesto = [
  {
    id: "01",
    word: "RESPIRA",
    category: "Naturaleza",
    description:
      "Respira profundo y vuelve a conectar con la naturaleza en el corazón de la Selva Central.",
  },
  {
    id: "02",
    word: "CONECTA",
    category: "Experiencia",
    description:
      "Conecta contigo, con quienes más quieres y con un entorno creado para compartir momentos diferentes.",
  },
  {
    id: "03",
    word: "VIVE",
    category: "Zagari Resort Club",
    description:
      "Vive naturaleza, bienestar y experiencias que convierten cada momento en un recuerdo.",
  },
] as const;

/* ==========================================================
   TYPES
========================================================== */

type ManifestoItem =
  (typeof manifesto)[number];

type PinMode =
  | "before"
  | "fixed"
  | "after";

type SceneProps = {
  item: ManifestoItem;
  index: number;
  progress: MotionValue<number>;
};

/* ==========================================================
   SCROLL SCENE

   Cada palabra responde DIRECTAMENTE
   al scroll.

   No usa timers.
   No usa AnimatePresence.
========================================================== */

function ScrollScene({
  item,
  index,
  progress,
}: SceneProps) {
  /* ========================================================
     RESPIRA
  ======================================================== */

  const opacityFirst =
    useTransform(
      progress,
      [
        0,
        0.20,
        0.31,
      ],
      [
        1,
        1,
        0,
      ],
      {
        clamp: true,
      }
    );

  const yFirst =
    useTransform(
      progress,
      [
        0,
        0.20,
        0.31,
      ],
      [
        0,
        0,
        -90,
      ],
      {
        clamp: true,
      }
    );

  /* ========================================================
     CONECTA
  ======================================================== */

  const opacityMiddle =
    useTransform(
      progress,
      [
        0.23,
        0.34,
        0.53,
        0.64,
      ],
      [
        0,
        1,
        1,
        0,
      ],
      {
        clamp: true,
      }
    );

  const yMiddle =
    useTransform(
      progress,
      [
        0.23,
        0.34,
        0.53,
        0.64,
      ],
      [
        90,
        0,
        0,
        -90,
      ],
      {
        clamp: true,
      }
    );

  /* ========================================================
     VIVE
  ======================================================== */

  const opacityLast =
    useTransform(
      progress,
      [
        0.56,
        0.69,
        1,
      ],
      [
        0,
        1,
        1,
      ],
      {
        clamp: true,
      }
    );

  const yLast =
    useTransform(
      progress,
      [
        0.56,
        0.69,
        1,
      ],
      [
        90,
        0,
        0,
      ],
      {
        clamp: true,
      }
    );

  /* ========================================================
     SCALE
  ======================================================== */

  const scaleFirst =
    useTransform(
      progress,
      [
        0,
        0.21,
        0.31,
      ],
      [
        1,
        1,
        0.975,
      ],
      {
        clamp: true,
      }
    );

  const scaleMiddle =
    useTransform(
      progress,
      [
        0.23,
        0.34,
        0.53,
        0.64,
      ],
      [
        0.975,
        1,
        1,
        0.975,
      ],
      {
        clamp: true,
      }
    );

  const scaleLast =
    useTransform(
      progress,
      [
        0.56,
        0.69,
        1,
      ],
      [
        0.975,
        1,
        1,
      ],
      {
        clamp: true,
      }
    );

  const opacity =
    index === 0
      ? opacityFirst
      : index === 1
        ? opacityMiddle
        : opacityLast;

  const y =
    index === 0
      ? yFirst
      : index === 1
        ? yMiddle
        : yLast;

  const scale =
    index === 0
      ? scaleFirst
      : index === 1
        ? scaleMiddle
        : scaleLast;

  return (
    <motion.article
      className={
        styles.scene
      }
      style={{
        opacity,
        y,
        scale,
      }}
    >
      {/* =================================
          CATEGORY
      ================================== */}

      <div
        className={
          styles.category
        }
      >
        <span
          className={
            styles.categoryLine
          }
        />

        <span>
          {item.category}
        </span>

        <span
          className={
            styles.categoryLine
          }
        />
      </div>

      {/* =================================
          WORD
      ================================== */}

      <h2
        className={
          styles.word
        }
        aria-label={
          item.word
        }
      >
        {item.word
          .split("")
          .map(
            (
              letter,
              index
            ) => (
              <span
                key={`${item.id}-${index}`}
                className={
                  styles.letterMask
                }
                aria-hidden="true"
              >
                <span
                  className={
                    styles.letter
                  }
                >
                  {letter}
                </span>
              </span>
            )
          )}
      </h2>

      {/* =================================
          DESCRIPTION
      ================================== */}

      <p
        className={
          styles.description
        }
      >
        {item.description}
      </p>
    </motion.article>
  );
}

/* ==========================================================
   COMPONENT
========================================================== */

export default function ZagariManifesto() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null
    );

  const frameRef =
    useRef<number | null>(
      null
    );

  const activeRef =
    useRef(0);

  const progress =
    useMotionValue(0);

  const [
    pinMode,
    setPinMode,
  ] =
    useState<PinMode>(
      "before"
    );

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    mounted,
    setMounted,
  ] = useState(false);

  /* ========================================================
     MOUNT
  ======================================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ========================================================
     SCROLL ENGINE

     ESTA ES LA PARTE IMPORTANTE.

     No usamos sticky.

     BEFORE:
     escenario dentro de la sección.

     FIXED:
     escenario se mueve al BODY
     mediante createPortal.

     AFTER:
     vuelve al final de la sección.

     De esa manera ningún padre puede
     romper el position fixed.
  ======================================================== */

  useEffect(() => {
    const update = () => {
      const section =
        sectionRef.current;

      if (!section) {
        return;
      }

      const rect =
        section.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const scrollDistance =
        Math.max(
          section.offsetHeight -
            viewportHeight,
          1
        );

      /* =====================================
         BEFORE
      ====================================== */

      if (rect.top > 0) {
        progress.set(0);

        if (
          activeRef.current !==
          0
        ) {
          activeRef.current = 0;

          setActiveIndex(0);
        }

        setPinMode(
          (current) =>
            current ===
            "before"
              ? current
              : "before"
        );

        return;
      }

      /* =====================================
         AFTER
      ====================================== */

      if (
        rect.bottom <=
        viewportHeight
      ) {
        progress.set(1);

        if (
          activeRef.current !==
          2
        ) {
          activeRef.current = 2;

          setActiveIndex(2);
        }

        setPinMode(
          (current) =>
            current ===
            "after"
              ? current
              : "after"
        );

        return;
      }

      /* =====================================
         FIXED
      ====================================== */

      setPinMode(
        (current) =>
          current === "fixed"
            ? current
            : "fixed"
      );

      const travelled =
        Math.min(
          Math.max(
            -rect.top,
            0
          ),
          scrollDistance
        );

      const nextProgress =
        travelled /
        scrollDistance;

      progress.set(
        nextProgress
      );

      /* =====================================
         ACTIVE INDEX

         Solo para indicadores.

         Las palabras NO dependen de esto.
      ====================================== */

      let nextIndex = 0;

      if (
        nextProgress >=
        0.66
      ) {
        nextIndex = 2;
      } else if (
        nextProgress >=
        0.33
      ) {
        nextIndex = 1;
      }

      if (
        activeRef.current !==
        nextIndex
      ) {
        activeRef.current =
          nextIndex;

        setActiveIndex(
          nextIndex
        );
      }
    };

    const requestUpdate =
      () => {
        if (
          frameRef.current !==
          null
        ) {
          cancelAnimationFrame(
            frameRef.current
          );
        }

        frameRef.current =
          requestAnimationFrame(
            update
          );
      };

    update();

    window.addEventListener(
      "scroll",
      requestUpdate,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      requestUpdate
    );

    window.addEventListener(
      "orientationchange",
      requestUpdate
    );

    return () => {
      if (
        frameRef.current !==
        null
      ) {
        cancelAnimationFrame(
          frameRef.current
        );
      }

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      window.removeEventListener(
        "orientationchange",
        requestUpdate
      );
    };
  }, [progress]);

  /* ========================================================
     BACKGROUND SCROLL
  ======================================================== */

  const backgroundTwoOpacity =
    useTransform(
      progress,
      [
        0.20,
        0.36,
        0.53,
        0.67,
      ],
      [
        0,
        1,
        1,
        0,
      ],
      {
        clamp: true,
      }
    );

  const backgroundThreeOpacity =
    useTransform(
      progress,
      [
        0.55,
        0.70,
        1,
      ],
      [
        0,
        1,
        1,
      ],
      {
        clamp: true,
      }
    );

  const glowX =
    useTransform(
      progress,
      [
        0,
        1,
      ],
      [
        "-5%",
        "7%",
      ],
      {
        clamp: true,
      }
    );

  const glowY =
    useTransform(
      progress,
      [
        0,
        1,
      ],
      [
        "-3%",
        "6%",
      ],
      {
        clamp: true,
      }
    );

  const ringsRotate =
    useTransform(
      progress,
      [
        0,
        1,
      ],
      [
        -5,
        7,
      ],
      {
        clamp: true,
      }
    );

  const active =
    manifesto[activeIndex];

  /* ========================================================
     VISUAL
  ======================================================== */

  const visual = (
    <div
      className={`${styles.visual} ${
        pinMode === "fixed"
          ? styles.visualFixed
          : pinMode === "after"
            ? styles.visualAfter
            : styles.visualBefore
      }`}
    >
      {/* ==================================================
          BACKGROUND
      =================================================== */}

      <div
        className={
          styles.background
        }
        aria-hidden="true"
      >
        <div
          className={
            styles.backgroundOne
          }
        />

        <motion.div
          className={
            styles.backgroundTwo
          }
          style={{
            opacity:
              backgroundTwoOpacity,
          }}
        />

        <motion.div
          className={
            styles.backgroundThree
          }
          style={{
            opacity:
              backgroundThreeOpacity,
          }}
        />

        <motion.div
          className={
            styles.glow
          }
          style={{
            x: glowX,
            y: glowY,
          }}
        />

        <motion.div
          className={
            styles.rings
          }
          style={{
            rotate:
              ringsRotate,
          }}
        />

        <div
          className={
            styles.leafLeft
          }
        />

        <div
          className={
            styles.leafRight
          }
        />

        <div
          className={
            styles.noise
          }
        />

        <div
          className={
            styles.vignette
          }
        />
      </div>

      {/* ==================================================
          TOP
      =================================================== */}

      <div
        className={
          styles.top
        }
      >
        <div
          className={
            styles.brand
          }
        >
          <span
            className={
              styles.brandDot
            }
          />

          <span>
            Zagari Resort Club
          </span>
        </div>

        <div
          className={
            styles.topCounter
          }
        >
          <strong>
            {active.id}
          </strong>

          <span />

          <small>
            03
          </small>
        </div>
      </div>

      {/* ==================================================
          CENTER
      =================================================== */}

      <div
        className={
          styles.stage
        }
      >
        {manifesto.map(
          (
            item,
            index
          ) => (
            <ScrollScene
              key={
                item.id
              }
              item={
                item
              }
              index={
                index
              }
              progress={
                progress
              }
            />
          )
        )}
      </div>

      {/* ==================================================
          SIDE
      =================================================== */}

      <div
        className={
          styles.sideText
        }
        aria-hidden="true"
      >
        <span>
          San Ramón
        </span>

        <i />

        <span>
          Selva Central
        </span>
      </div>

      {/* ==================================================
          BOTTOM
      =================================================== */}

      <div
        className={
          styles.bottom
        }
      >
        <div
          className={
            styles.scrollHint
          }
        >
          <span
            className={
              styles.mouse
            }
            aria-hidden="true"
          >
            <i />
          </span>

          <span>
            Desliza para descubrir
          </span>
        </div>

        <div
          className={
            styles.dots
          }
        >
          {manifesto.map(
            (
              item,
              index
            ) => (
              <span
                key={
                  item.id
                }
                className={`${styles.dot} ${
                  index ===
                  activeIndex
                    ? styles.dotActive
                    : ""
                }`}
              />
            )
          )}
        </div>

        <div
          className={
            styles.bottomCounter
          }
        >
          <strong>
            {active.id}
          </strong>

          <span />

          <small>
            03
          </small>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={
        styles.section
      }
      aria-label="Esencia de Zagari Resort Club"
    >
      {/* =====================================
          FIXED → BODY PORTAL
      ====================================== */}

      {mounted &&
      pinMode === "fixed"
        ? createPortal(
            visual,
            document.body
          )
        : visual}
    </section>
  );
}
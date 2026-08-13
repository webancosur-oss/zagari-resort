"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./HomeHero.module.css";

const cabins = [
  {
    id: "01",
    title: "Cabaña",
    highlight: "1 Habitación",
    eyebrow: "SEGUNDA ETAPA",
    description:
      "Un refugio íntimo rodeado de naturaleza, diseñado para desconectarte y vivir la selva de una manera diferente.",
    image:
      "/assets/cabins/cabania-1-habitacion.png",
  },
  {
    id: "02",
    title: "Cabaña",
    highlight: "2 Habitaciones",
    eyebrow: "SEGUNDA ETAPA",
    description:
      "Espacios que conectan comodidad, naturaleza y descanso para compartir una experiencia inolvidable.",
    image:
      "/assets/cabins/cabania-2-habitaciones.png",
  },
  {
    id: "03",
    title: "Cabaña",
    highlight: "3 Habitaciones",
    eyebrow: "SEGUNDA ETAPA",
    description:
      "Más espacio para disfrutar juntos. Una experiencia premium integrada al paisaje natural de San Ramón.",
    image:
      "/assets/cabins/cabania-3-habitaciones.png",
  },
];

const CHANGE_TIME = 6500;

const SWIPE_THRESHOLD = 55;

const MAX_DRAG = 180;

type SlideDirection =
  | "next"
  | "previous";

export default function HomeHero() {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    isDragging,
    setIsDragging,
  ] = useState(false);

  const [
    dragX,
    setDragX,
  ] = useState(0);

  const [
    direction,
    setDirection,
  ] =
    useState<SlideDirection>(
      "next"
    );

  const pointerStartX =
    useRef<number | null>(
      null
    );

  const currentDragX =
    useRef(0);

  /* =========================================
     CAMBIAR SLIDE
  ========================================= */

  const goToSlide =
    useCallback(
      (
        index: number
      ) => {
        if (
          index ===
          activeIndex
        ) {
          return;
        }

        const total =
          cabins.length;

        /*
         * Detectamos la dirección más natural
         * para que la animación entre correctamente.
         */

        const nextDistance =
          (
            index -
            activeIndex +
            total
          ) %
          total;

        const previousDistance =
          (
            activeIndex -
            index +
            total
          ) %
          total;

        setDirection(
          nextDistance <=
            previousDistance
            ? "next"
            : "previous"
        );

        setActiveIndex(
          index
        );

        setDragX(0);

        currentDragX.current =
          0;
      },
      [activeIndex]
    );

  const goToNext =
    useCallback(() => {
      setDirection(
        "next"
      );

      setActiveIndex(
        (current) =>
          (current + 1) %
          cabins.length
      );

      setDragX(0);

      currentDragX.current =
        0;
    }, []);

  const goToPrevious =
    useCallback(() => {
      setDirection(
        "previous"
      );

      setActiveIndex(
        (current) =>
          (
            current -
            1 +
            cabins.length
          ) %
          cabins.length
      );

      setDragX(0);

      currentDragX.current =
        0;
    }, []);

  /* =========================================
     AUTOPLAY
  ========================================= */

  useEffect(() => {
    if (isDragging) {
      return;
    }

    const interval =
      window.setInterval(
        () => {
          goToNext();
        },
        CHANGE_TIME
      );

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [
    activeIndex,
    isDragging,
    goToNext,
  ]);

  /* =========================================
     COMPROBAR ELEMENTOS INTERACTIVOS

     Esto evita que el swipe robe
     los clicks de botones y enlaces.
  ========================================= */

  const isInteractiveElement = (
    target: EventTarget | null
  ) => {
    if (
      !(
        target instanceof
        HTMLElement
      )
    ) {
      return false;
    }

    return Boolean(
      target.closest(
        '[data-no-swipe="true"]'
      )
    );
  };

  /* =========================================
     POINTER DOWN
  ========================================= */

  const handlePointerDown = (
    event:
      ReactPointerEvent<HTMLElement>
  ) => {
    /*
     * CRÍTICO:
     * Si estás pulsando un botón
     * o enlace, NO iniciamos swipe.
     */

    if (
      isInteractiveElement(
        event.target
      )
    ) {
      return;
    }

    pointerStartX.current =
      event.clientX;

    currentDragX.current =
      0;

    setDragX(0);

    setIsDragging(
      true
    );

    try {
      event.currentTarget
        .setPointerCapture(
          event.pointerId
        );
    } catch {
      // Algunos navegadores
      // pueden no soportarlo.
    }
  };

  /* =========================================
     POINTER MOVE
  ========================================= */

  const handlePointerMove = (
    event:
      ReactPointerEvent<HTMLElement>
  ) => {
    if (
      pointerStartX.current ===
      null
    ) {
      return;
    }

    const rawDistance =
      event.clientX -
      pointerStartX.current;

    /*
     * Limitamos visualmente el arrastre
     * para mantener sensación premium.
     */

    const limitedDistance =
      Math.max(
        -MAX_DRAG,
        Math.min(
          MAX_DRAG,
          rawDistance
        )
      );

    currentDragX.current =
      limitedDistance;

    setDragX(
      limitedDistance
    );
  };

  /* =========================================
     FINALIZAR SWIPE
  ========================================= */

  const finishPointerGesture = (
    event:
      ReactPointerEvent<HTMLElement>
  ) => {
    if (
      pointerStartX.current ===
      null
    ) {
      return;
    }

    const distance =
      currentDragX.current;

    pointerStartX.current =
      null;

    currentDragX.current =
      0;

    setIsDragging(
      false
    );

    try {
      if (
        event.currentTarget
          .hasPointerCapture?.(
            event.pointerId
          )
      ) {
        event.currentTarget
          .releasePointerCapture(
            event.pointerId
          );
      }
    } catch {
      // Sin acción.
    }

    if (
      Math.abs(distance) <
      SWIPE_THRESHOLD
    ) {
      /*
       * Si no alcanza el límite,
       * vuelve suavemente al centro.
       */

      setDragX(0);

      return;
    }

    if (distance < 0) {
      goToNext();
    } else {
      goToPrevious();
    }
  };

  /* =========================================
     ACTIVE CABIN
  ========================================= */

  const activeCabin =
    cabins[activeIndex];

  /* =========================================
     CSS VARIABLES
  ========================================= */

  const heroStyle =
    {
      "--drag-x":
        `${dragX}px`,
    } as CSSProperties;

  return (
    <section
      className={`${styles.hero} ${
        isDragging
          ? styles.heroDragging
          : ""
      }`}
      style={
        heroStyle
      }
      aria-label="Cabañas Zagari Resort Club"
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        finishPointerGesture
      }
      onPointerCancel={
        finishPointerGesture
      }
    >
      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div
        className={
          styles.background
        }
        aria-hidden="true"
      >
        {cabins.map(
          (
            cabin,
            index
          ) => {
            const isActive =
              index ===
              activeIndex;

            return (
              <div
                key={
                  cabin.id
                }
                className={`${styles.slide} ${
                  isActive
                    ? styles.slideActive
                    : ""
                } ${
                  isActive &&
                  direction ===
                    "next"
                    ? styles.slideFromRight
                    : ""
                } ${
                  isActive &&
                  direction ===
                    "previous"
                    ? styles.slideFromLeft
                    : ""
                }`}
              >
                <Image
                  src={
                    cabin.image
                  }
                  alt=""
                  fill
                  priority={
                    index ===
                    0
                  }
                  sizes="100vw"
                  className={
                    styles.image
                  }
                  draggable={
                    false
                  }
                />
              </div>
            );
          }
        )}
      </div>

      {/* =====================================
          OVERLAY
      ====================================== */}

      <div
        className={
          styles.overlay
        }
        aria-hidden="true"
      />

      <div
        className={
          styles.noise
        }
        aria-hidden="true"
      />

      {/* =====================================
          CONTAINER
      ====================================== */}

      <div
        className={
          styles.container
        }
      >
        {/* ===================================
            CONTENT
        ==================================== */}

        <div
          className={
            styles.content
          }
        >
          <span
            key={`eyebrow-${activeIndex}`}
            className={
              styles.eyebrow
            }
          >
            {
              activeCabin.eyebrow
            }
          </span>

          <div
            key={`title-${activeIndex}`}
            className={
              styles.titleWrapper
            }
          >
            <h1
              className={
                styles.title
              }
            >
              <span>
                {
                  activeCabin.title
                }
              </span>

              <strong>
                {
                  activeCabin.highlight
                }
              </strong>
            </h1>
          </div>

          <p
            key={`description-${activeIndex}`}
            className={
              styles.description
            }
          >
            {
              activeCabin.description
            }
          </p>

          {/* =================================
              CTA
          ================================== */}

          <div
            className={
              styles.actions
            }
          >
            <Link
              href="/cabanas"
              data-no-swipe="true"
              className={
                styles.primaryButton
              }
            >
              <span
                className={
                  styles.buttonInner
                }
              >
                <span
                  className={
                    styles.buttonText
                  }
                >
                  Descubrir
                  cabañas
                </span>

                <span
                  className={
                    styles.buttonArrow
                  }
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                  >
                    <path
                      d="M7 12H17"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />

                    <path
                      d="M13 8L17 12L13 16"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* ===================================
            CABIN SELECTOR
        ==================================== */}

        <nav
          className={
            styles.navigation
          }
          aria-label="Seleccionar tipo de cabaña"
          data-no-swipe="true"
        >
          <div
            className={
              styles.navigationLine
            }
            aria-hidden="true"
          />

          <div
            className={
              styles.navigationItems
            }
          >
            {cabins.map(
              (
                cabin,
                index
              ) => {
                const isActive =
                  index ===
                  activeIndex;

                return (
                  <button
                    key={
                      cabin.id
                    }
                    type="button"
                    data-no-swipe="true"
                    onPointerDown={(
                      event
                    ) => {
                      /*
                       * Evita que el pointerDown
                       * llegue al hero.
                       */

                      event.stopPropagation();
                    }}
                    onClick={(
                      event
                    ) => {
                      event.stopPropagation();

                      goToSlide(
                        index
                      );
                    }}
                    className={`${styles.navItem} ${
                      isActive
                        ? styles.navItemActive
                        : ""
                    }`}
                    aria-current={
                      isActive
                        ? "true"
                        : undefined
                    }
                    aria-label={`Ver ${cabin.highlight}`}
                  >
                    <span
                      className={
                        styles.navLabel
                      }
                    >
                      {
                        cabin.highlight
                      }
                    </span>

                    <span
                      className={
                        styles.progress
                      }
                      aria-hidden="true"
                    >
                      <span
                        key={`${activeIndex}-${cabin.id}`}
                        className={
                          styles.progressBar
                        }
                      />
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </nav>

       {/* ===================================
    SCROLL MOUSE
==================================== */}

<div
  className={styles.scrollCue}
  aria-hidden="true"
  data-no-swipe="true"
>
  <span className={styles.scrollText}>
    Scroll
  </span>

  <div className={styles.mouse}>
    <span className={styles.mouseWheel} />
  </div>

  <span className={styles.scrollArrow}>
    <svg
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1V20"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />

      <path
        d="M3 15L8 20L13 15"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
</div>
      </div>

      {/* =====================================
          LARGE NUMBER
      ====================================== */}

      <div
        key={`number-${activeIndex}`}
        className={
          styles.bigNumber
        }
        aria-hidden="true"
      >
        {
          activeCabin.id
        }
      </div>
    </section>
  );
}
"use client";

import {
  ArrowRight,
  CheckCircle,
  MapPin,
  PaperPlaneTilt,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";

import Image from "next/image";

import {
  FormEvent,
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import styles from "./LotsSection.module.css";

/* =========================================================
   CONFIG
========================================================= */

const MAP_URL =
  "/assets/lots/lotes-zagari-mapa.svg";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_ZAGARI_WHATSAPP ||
  "51971069763";

const DRAG_THRESHOLD = 6;

/* =========================================================
   TYPES
========================================================= */

type LotStatus =
  | "available"
  | "reserved"
  | "sold";

type SelectedLot = {
  status: LotStatus;
  reference: string;
};

type DragState = {
  active: boolean;
  moved: boolean;

  startX: number;
  startY: number;

  startScrollLeft: number;
  startScrollTop: number;
};

/* =========================================================
   DATA
========================================================= */

const highlights = [
  "Desde 234 m²",
  "Acceso al Resort Club",
  "+20 amenidades",
];

/* =========================================================
   HELPERS
========================================================= */

function getStatusLabel(
  status: LotStatus,
) {
  if (status === "available") {
    return "Disponible";
  }

  if (status === "reserved") {
    return "Separado";
  }

  return "Vendido";
}

function getWhatsAppUrl(
  lot: SelectedLot,
) {
  const status =
    getStatusLabel(
      lot.status,
    ).toLowerCase();

  const message =
    lot.status === "available"
      ? `Hola, estoy interesado en el lote ${lot.reference} de Zagari Resort Club. Figura como disponible. Quisiera conocer área, precio y condiciones comerciales.`
      : `Hola, estaba revisando el plano de Zagari Resort Club. El lote ${lot.reference} figura como ${status}. Quisiera conocer otras alternativas disponibles.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function LotsSection() {
  const mapContainerRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const viewportRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const selectedElementRef =
    useRef<SVGElement | null>(
      null,
    );

  const pageScrollRef =
    useRef(0);

  const dragRef =
    useRef<DragState>({
      active: false,
      moved: false,

      startX: 0,
      startY: 0,

      startScrollLeft: 0,
      startScrollTop: 0,
    });

  const [
    mounted,
    setMounted,
  ] = useState(false);

  const [
    isMapOpen,
    setIsMapOpen,
  ] = useState(false);

  const [
    svgMarkup,
    setSvgMarkup,
  ] = useState("");

  const [
    mapLoading,
    setMapLoading,
  ] = useState(false);

  const [
    mapError,
    setMapError,
  ] = useState("");

  const [
    selectedLot,
    setSelectedLot,
  ] =
    useState<SelectedLot | null>(
      null,
    );

  const [
    isDragging,
    setIsDragging,
  ] = useState(false);

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  /* =======================================================
     MOUNT
  ======================================================= */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =======================================================
     LOAD SVG
  ======================================================= */

  useEffect(() => {
    if (
      !isMapOpen ||
      svgMarkup
    ) {
      return;
    }

    const controller =
      new AbortController();

    const loadMap =
      async () => {
        try {
          setMapLoading(true);
          setMapError("");

          const response =
            await fetch(
              MAP_URL,
              {
                cache:
                  "force-cache",

                signal:
                  controller.signal,
              },
            );

          if (!response.ok) {
            throw new Error(
              `No se pudo cargar el plano (${response.status}).`,
            );
          }

          const svg =
            await response.text();

          setSvgMarkup(svg);
        } catch (error) {
          if (
            error instanceof Error &&
            error.name ===
              "AbortError"
          ) {
            return;
          }

          setMapError(
            error instanceof Error
              ? error.message
              : "No se pudo cargar el plano.",
          );
        } finally {
          setMapLoading(false);
        }
      };

    loadMap();

    return () => {
      controller.abort();
    };
  }, [
    isMapOpen,
    svgMarkup,
  ]);

  /* =======================================================
     LOCK PAGE
  ======================================================= */

  useEffect(() => {
    if (!isMapOpen) {
      return;
    }

    const body =
      document.body;

    const html =
      document.documentElement;

    pageScrollRef.current =
      window.scrollY;

    const previous = {
      position:
        body.style.position,

      top:
        body.style.top,

      left:
        body.style.left,

      right:
        body.style.right,

      width:
        body.style.width,

      overflow:
        body.style.overflow,

      htmlOverflow:
        html.style.overflow,
    };

    body.style.position =
      "fixed";

    body.style.top =
      `-${pageScrollRef.current}px`;

    body.style.left = "0";
    body.style.right = "0";

    body.style.width =
      "100%";

    body.style.overflow =
      "hidden";

    html.style.overflow =
      "hidden";

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape"
      ) {
        setIsMapOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      body.style.position =
        previous.position;

      body.style.top =
        previous.top;

      body.style.left =
        previous.left;

      body.style.right =
        previous.right;

      body.style.width =
        previous.width;

      body.style.overflow =
        previous.overflow;

      html.style.overflow =
        previous.htmlOverflow;

      window.scrollTo(
        0,
        pageScrollRef.current,
      );

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [isMapOpen]);

  /* =======================================================
     SELECT LOT
  ======================================================= */

  const selectLot =
    useCallback(
      (
        lotElement:
          SVGElement,
      ) => {
        const status =
          lotElement.dataset
            .lotStatus as
            | LotStatus
            | undefined;

        const reference =
          lotElement.dataset
            .lotReference;

        if (
          !status ||
          !reference
        ) {
          return;
        }

        /*
         * Limpiamos solo el anterior.
         */

        if (
          selectedElementRef.current &&
          selectedElementRef.current !==
            lotElement
        ) {
          selectedElementRef.current.classList.remove(
            "zagari-selected",
          );

          selectedElementRef.current.setAttribute(
            "aria-pressed",
            "false",
          );
        }

        /*
         * Seleccionamos el nuevo.
         */

        lotElement.classList.add(
          "zagari-selected",
        );

        lotElement.setAttribute(
          "aria-pressed",
          "true",
        );

        selectedElementRef.current =
          lotElement;

        /*
         * Siempre nuevo objeto.
         */

        setSelectedLot({
          status,
          reference,
        });
      },
      [],
    );

  /* =======================================================
     PREPARE SVG

     AQUÍ ESTÁ LA CORRECCIÓN PRINCIPAL.

     Cada lote recibe SU PROPIO listener.
     No dependemos del viewport.
  ======================================================= */

  useEffect(() => {
    if (
      !svgMarkup ||
      !isMapOpen
    ) {
      return;
    }

    const frame =
      requestAnimationFrame(
        () => {
          const root =
            mapContainerRef.current;

          if (!root) {
            return;
          }

          const svg =
            root.querySelector(
              "svg",
            );

          if (!svg) {
            return;
          }

          svg.removeAttribute(
            "width",
          );

          svg.removeAttribute(
            "height",
          );

          svg.setAttribute(
            "preserveAspectRatio",
            "xMidYMid meet",
          );

          svg.setAttribute(
            "role",
            "img",
          );

          svg.setAttribute(
            "aria-label",
            "Plano interactivo de disponibilidad Zagari Resort Club",
          );

          /* =====================================
             PREPARE LOT GROUP
          ====================================== */

          const prepare = (
            selector: string,

            status:
              LotStatus,

            prefix:
              string,
          ) => {
            const elements =
              svg.querySelectorAll(
                selector,
              );

            elements.forEach(
              (
                element,
                index,
              ) => {
                const lot =
                  element as SVGElement;

                /*
                 * No configurarlo dos veces.
                 */

                if (
                  lot.dataset
                    .zagariPrepared ===
                  "true"
                ) {
                  return;
                }

                const reference =
                  `${prefix}-${String(
                    index + 1,
                  ).padStart(
                    2,
                    "0",
                  )}`;

                lot.dataset
                  .zagariPrepared =
                  "true";

                lot.dataset
                  .lotStatus =
                  status;

                lot.dataset
                  .lotReference =
                  reference;

                lot.classList.add(
                  "zagari-lot-zone",
                );

                lot.setAttribute(
                  "role",
                  "button",
                );

                lot.setAttribute(
                  "tabindex",
                  "0",
                );

                lot.setAttribute(
                  "aria-pressed",
                  "false",
                );

                lot.setAttribute(
                  "aria-label",
                  `${reference} · ${getStatusLabel(
                    status,
                  )}`,
                );

                /* =================================
                   CLICK DIRECTO

                   Esto evita el estado extraño.
                ================================== */

                lot.addEventListener(
                  "click",
                  (
                    event:
                      Event,
                  ) => {
                    event.preventDefault();

                    event.stopPropagation();

                    selectLot(
                      lot,
                    );
                  },
                );

                /* =================================
                   POINTER DOWN EN LOTE

                   Cancelamos drag del mapa.
                ================================== */

                lot.addEventListener(
                  "pointerdown",
                  (
                    event:
                      Event,
                  ) => {
                    event.stopPropagation();

                    dragRef.current.active =
                      false;

                    dragRef.current.moved =
                      false;

                    setIsDragging(
                      false,
                    );
                  },
                );

                /* =================================
                   KEYBOARD
                ================================== */

                lot.addEventListener(
                  "keydown",
                  (
                    event:
                      Event,
                  ) => {
                    const keyboard =
                      event as KeyboardEvent;

                    if (
                      keyboard.key !==
                        "Enter" &&
                      keyboard.key !==
                        " "
                    ) {
                      return;
                    }

                    keyboard.preventDefault();

                    selectLot(
                      lot,
                    );
                  },
                );
              },
            );
          };

          prepare(
            ".cls-56",
            "available",
            "D",
          );

          prepare(
            ".cls-53",
            "reserved",
            "S",
          );

          prepare(
            ".cls-54",
            "sold",
            "V",
          );
        },
      );

    return () => {
      cancelAnimationFrame(
        frame,
      );
    };
  }, [
    svgMarkup,
    isMapOpen,
    selectLot,
  ]);

  /* =======================================================
     DESKTOP DRAG START

     Solo llega aquí si pointerdown
     NO ocurrió en un lote.
  ======================================================= */

  const handlePointerDown = (
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) => {
    /*
     * Touch:
     * scroll nativo.
     */

    if (
      event.pointerType !==
      "mouse"
    ) {
      return;
    }

    if (
      event.button !== 0
    ) {
      return;
    }

    const viewport =
      viewportRef.current;

    if (!viewport) {
      return;
    }

    dragRef.current = {
      active: true,

      moved: false,

      startX:
        event.clientX,

      startY:
        event.clientY,

      startScrollLeft:
        viewport.scrollLeft,

      startScrollTop:
        viewport.scrollTop,
    };
  };

  /* =======================================================
     DESKTOP DRAG MOVE
  ======================================================= */

  const handlePointerMove = (
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (
      event.pointerType !==
      "mouse"
    ) {
      return;
    }

    const viewport =
      viewportRef.current;

    const drag =
      dragRef.current;

    if (
      !viewport ||
      !drag.active
    ) {
      return;
    }

    const deltaX =
      event.clientX -
      drag.startX;

    const deltaY =
      event.clientY -
      drag.startY;

    const distance =
      Math.hypot(
        deltaX,
        deltaY,
      );

    if (
      !drag.moved &&
      distance <
        DRAG_THRESHOLD
    ) {
      return;
    }

    if (
      !drag.moved
    ) {
      drag.moved =
        true;

      setIsDragging(
        true,
      );
    }

    event.preventDefault();

    viewport.scrollLeft =
      drag.startScrollLeft -
      deltaX;

    viewport.scrollTop =
      drag.startScrollTop -
      deltaY;
  };

  /* =======================================================
     END DRAG
  ======================================================= */

  const finishDrag = () => {
    if (
      !dragRef.current.active
    ) {
      return;
    }

    dragRef.current.active =
      false;

    dragRef.current.moved =
      false;

    setIsDragging(false);
  };

  /* =======================================================
     OPEN MAP
  ======================================================= */

  const openMap = () => {
    if (
      selectedElementRef.current
    ) {
      selectedElementRef.current.classList.remove(
        "zagari-selected",
      );

      selectedElementRef.current.setAttribute(
        "aria-pressed",
        "false",
      );
    }

    selectedElementRef.current =
      null;

    dragRef.current.active =
      false;

    dragRef.current.moved =
      false;

    setIsDragging(false);

    setSelectedLot(null);

    setIsMapOpen(true);
  };

  /* =======================================================
     CLOSE MAP
  ======================================================= */

  const closeMap = () => {
    dragRef.current.active =
      false;

    dragRef.current.moved =
      false;

    setIsDragging(false);

    setIsMapOpen(false);
  };

  /* =======================================================
     FORM
  ======================================================= */

  const handleSubmit = (
    event:
      FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSubmitted(true);

    event.currentTarget.reset();
  };

  /* =======================================================
     MODAL
  ======================================================= */

  const modal =
    isMapOpen ? (
      <div
        className={
          styles.overlay
        }
        onMouseDown={(
          event,
        ) => {
          if (
            event.target ===
            event.currentTarget
          ) {
            closeMap();
          }
        }}
      >
        <section
          className={
            styles.modal
          }
          role="dialog"
          aria-modal="true"
          aria-labelledby="zagari-map-title"
        >
          {/* =================================
              HEADER
          ================================== */}

          <header
            className={
              styles.modalHeader
            }
          >
            <div>
              <span>
                Zagari · Segunda
                etapa
              </span>

              <h2
                id="zagari-map-title"
              >
                Disponibilidad
              </h2>

              <p>
                Selecciona cualquier
                lote para consultar su
                estado.
              </p>
            </div>

            <button
              type="button"
              className={
                styles.close
              }
              onClick={
                closeMap
              }
              aria-label="Cerrar mapa"
            >
              <X
                size={18}
              />
            </button>
          </header>

          {/* =================================
              LEGEND
          ================================== */}

          <div
            className={
              styles.legend
            }
          >
            <div>
              <i
                className={
                  styles.legendGreen
                }
              />

              <span>
                Disponible
              </span>
            </div>

            <div>
              <i
                className={
                  styles.legendOrange
                }
              />

              <span>
                Separado
              </span>
            </div>

            <div>
              <i
                className={
                  styles.legendRed
                }
              />

              <span>
                Vendido
              </span>
            </div>

            <span
              className={
                styles.legendHelp
              }
            >
              Toca un lote para
              seleccionarlo
            </span>
          </div>

          {/* =================================
              BODY
          ================================== */}

          <div
            className={
              styles.modalBody
            }
          >
            {/* ===============================
                MAP
            ================================ */}

            <div
              className={
                styles.mapPanel
              }
            >
              <div
                className={
                  styles.mapTop
                }
              >
                <span>
                  Plano general
                </span>

                <small>
                  Desliza para recorrer
                  el mapa
                </small>
              </div>

              <div
                ref={
                  viewportRef
                }
                className={`${styles.mapViewport} ${
                  isDragging
                    ? styles.dragging
                    : ""
                }`}
                onPointerDown={
                  handlePointerDown
                }
                onPointerMove={
                  handlePointerMove
                }
                onPointerUp={
                  finishDrag
                }
                onPointerCancel={
                  finishDrag
                }
                onPointerLeave={
                  finishDrag
                }
              >
                {mapLoading && (
                  <div
                    className={
                      styles.mapState
                    }
                  >
                    Cargando plano...
                  </div>
                )}

                {mapError && (
                  <div
                    className={`${styles.mapState} ${styles.mapError}`}
                  >
                    {mapError}
                  </div>
                )}

                {!mapError &&
                  svgMarkup && (
                    <div
                      ref={
                        mapContainerRef
                      }
                      className={
                        styles.realMap
                      }
                      dangerouslySetInnerHTML={{
                        __html:
                          svgMarkup,
                      }}
                    />
                  )}
              </div>

              <div
                className={
                  styles.mapHint
                }
              >
                <span>
                  ↔
                </span>

                Lote = seleccionar ·
                fondo = mover mapa
              </div>
            </div>

            {/* ===============================
                INFO
            ================================ */}

            <aside
              className={
                styles.info
              }
            >
              {!selectedLot ? (
                <div
                  className={
                    styles.infoEmpty
                  }
                >
                  <span
                    className={
                      styles.infoIcon
                    }
                  >
                    <MapPin
                      size={22}
                      weight="duotone"
                    />
                  </span>

                  <strong>
                    Selecciona un lote
                  </strong>

                  <p>
                    Puedes cambiar de
                    lote todas las
                    veces que quieras.
                  </p>
                </div>
              ) : (
                <div
                  key={`${selectedLot.reference}-${selectedLot.status}`}
                  className={
                    styles.infoContent
                  }
                >
                  <span
                    className={
                      styles.infoEyebrow
                    }
                  >
                    Selección actual
                  </span>

                  <div
                    className={
                      styles.status
                    }
                  >
                    <i
                      className={
                        styles[
                          `status_${selectedLot.status}`
                        ]
                      }
                    />

                    <strong>
                      {getStatusLabel(
                        selectedLot.status,
                      )}
                    </strong>
                  </div>

                  <div
                    className={
                      styles.reference
                    }
                  >
                    <span>
                      Referencia
                    </span>

                    <strong>
                      {
                        selectedLot.reference
                      }
                    </strong>
                  </div>

                  {selectedLot.status ===
                  "available" ? (
                    <>
                      <p
                        className={
                          styles.infoText
                        }
                      >
                        Consulta área,
                        precio y
                        condiciones con
                        nuestro equipo.
                      </p>

                      <a
                        href={getWhatsAppUrl(
                          selectedLot,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          styles.whatsapp
                        }
                      >
                        <WhatsappLogo
                          size={17}
                          weight="fill"
                        />

                        <span>
                          Contactar asesor
                        </span>

                        <ArrowRight
                          size={14}
                        />
                      </a>
                    </>
                  ) : (
                    <>
                      <p
                        className={
                          styles.infoText
                        }
                      >
                        Esta unidad no
                        está disponible.
                        Podemos mostrarte
                        otras opciones.
                      </p>

                      <a
                        href={getWhatsAppUrl(
                          selectedLot,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={
                          styles.alternatives
                        }
                      >
                        <WhatsappLogo
                          size={16}
                          weight="fill"
                        />

                        <span>
                          Ver alternativas
                        </span>
                      </a>
                    </>
                  )}
                </div>
              )}
            </aside>
          </div>
        </section>
      </div>
    ) : null;

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <>
      <section
        id="lotes"
        className={
          styles.section
        }
        aria-labelledby="lots-title"
      >
        <header
          className={
            styles.heading
          }
        >
          <div>
            <span
              className={
                styles.eyebrow
              }
            >
              Segunda etapa · Preventa
            </span>

            <h2 id="lots-title">
              Tu espacio en
              <span>
                Zagari.
              </span>
            </h2>
          </div>

          <p>
            Lotes en San Ramón con
            acceso a las experiencias
            y amenidades del Resort
            Club.
          </p>
        </header>

        <div
          className={
            styles.layout
          }
        >
          {/* =================================
              IMAGE
          ================================== */}

          <div
            className={
              styles.visual
            }
          >
            <Image
              src="/assets/lots/zagari-lot.png"
              alt="Lotes Zagari Resort Club en San Ramón"
              fill
              priority
              quality={95}
              sizes="
                (max-width: 760px) 100vw,
                (max-width: 1100px) 100vw,
                58vw
              "
              className={
                styles.image
              }
            />

            <div
              className={
                styles.imageShade
              }
            />

            <div
              className={
                styles.location
              }
            >
              <span
                className={
                  styles.locationIcon
                }
              >
                <MapPin
                  size={14}
                  weight="fill"
                />
              </span>

              San Ramón · Junín
            </div>

            <div
              className={
                styles.photoCaption
              }
            >
              <span>
                ZAGARI RESORT CLUB
              </span>

              <p>
                Un espacio propio en
                medio de la naturaleza.
              </p>
            </div>
          </div>

          {/* =================================
              CONTENT
          ================================== */}

          <div
            className={
              styles.content
            }
          >
            <span
              className={
                styles.contentLabel
              }
            >
              Lotes Zagari
            </span>

            <h3>
              Elige dónde empieza tu
              próxima historia.
            </h3>

            <p
              className={
                styles.description
              }
            >
              Espacios desde 234 m²
              para disfrutar Zagari a
              tu manera.
            </p>

            <div
              className={
                styles.highlights
              }
            >
              {highlights.map(
                (highlight) => (
                  <span
                    key={
                      highlight
                    }
                  >
                    <CheckCircle
                      size={15}
                      weight="fill"
                    />

                    {highlight}
                  </span>
                ),
              )}
            </div>

            {/* =================================
                MAP BUTTON
            ================================== */}

            <button
              type="button"
              className={
                styles.availabilityButton
              }
              onClick={
                openMap
              }
            >
              <span
                className={
                  styles.availabilityIcon
                }
              >
                <MapPin
                  size={16}
                  weight="fill"
                />
              </span>

              <span
                className={
                  styles.availabilityCopy
                }
              >
                <small>
                  Segunda etapa
                </small>

                <strong>
                  Explorar
                  disponibilidad
                </strong>
              </span>

              <span
                className={
                  styles.availabilityArrow
                }
              >
                <ArrowRight
                  size={15}
                />
              </span>
            </button>

            {/* =================================
                FORM
            ================================== */}

            <div
              className={
                styles.formSection
              }
            >
              <header
                className={
                  styles.formHeading
                }
              >
                <span>
                  Conversemos
                </span>

                <p>
                  Déjanos tus datos
                  para recibir
                  información
                  comercial.
                </p>
              </header>

              <form
                className={
                  styles.form
                }
                onSubmit={
                  handleSubmit
                }
              >
                <div
                  className={
                    styles.formRow
                  }
                >
                  <label
                    className={
                      styles.field
                    }
                  >
                    <span>
                      Nombre
                    </span>

                    <input
                      type="text"
                      name="name"
                      placeholder="Tu nombre"
                      autoComplete="name"
                      required
                    />
                  </label>

                  <label
                    className={
                      styles.field
                    }
                  >
                    <span>
                      Celular
                    </span>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="987 654 321"
                      autoComplete="tel"
                      inputMode="numeric"
                      required
                    />
                  </label>
                </div>

                <label
                  className={
                    styles.field
                  }
                >
                  <span>
                    Correo
                  </span>

                  <input
                    type="email"
                    name="email"
                    placeholder="correo@ejemplo.com"
                    autoComplete="email"
                    required
                  />
                </label>

                <div
                  className={
                    styles.formFooter
                  }
                >
                  <button
                    type="submit"
                    className={
                      styles.submitButton
                    }
                  >
                    <PaperPlaneTilt
                      size={14}
                      weight="fill"
                    />

                    Solicitar
                    información
                  </button>

                  <small>
                    Nuestro equipo te
                    contactará para
                    orientarte.
                  </small>
                </div>

                {submitted && (
                  <div
                    className={
                      styles.success
                    }
                  >
                    <CheckCircle
                      size={15}
                      weight="fill"
                    />

                    Datos registrados.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {mounted &&
      modal
        ? createPortal(
            modal,
            document.body,
          )
        : null}
    </>
  );
}
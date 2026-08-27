"use client";

import Image from "next/image";
import {
  createPortal,
} from "react-dom";

import {
  PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowRight,
  CheckCircle,
  MapPin,
  X,
  WhatsappLogo,
} from "@phosphor-icons/react";


import styles from "./LotsSection.module.css";
import LeadForm from "./component/LeadForm";

const MAP_URL =
  "/assets/lots/lotes-zagari-mapa.svg";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_ZAGARI_WHATSAPP ||
  "51971069763";

type LotStatus =
  | "available"
  | "reserved"
  | "sold";

type MapLot = {
  id: string;
  status: LotStatus;
  x: number;
  y: number;
};

type DragState = {
  active: boolean;
  moved: boolean;
  startX: number;
  startY: number;
  scrollLeft: number;
  scrollTop: number;
};

const highlights = [
  "Desde 234 m²",
  "Acceso al Resort Club",
  "+20 amenidades",
];

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

function getWhatsappUrl(
  status: LotStatus,
) {
  const statusText =
    getStatusLabel(status).toLowerCase();

  const message =
    status === "available"
      ? "Hola, estoy revisando el mapa de Zagari Resort Club y quiero información del lote que seleccioné. Figura como disponible. ¿Me pueden indicar área, precio y condiciones?"
      : `Hola, estoy revisando el mapa de Zagari Resort Club. El lote que seleccioné figura como ${statusText}. Quisiera conocer alternativas disponibles.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;
}

export default function LotsSection() {
  const mapRootRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const viewportRef =
    useRef<HTMLDivElement | null>(
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
      scrollLeft: 0,
      scrollTop: 0,
    });

  const [mounted, setMounted] =
    useState(false);

  const [isMapOpen, setIsMapOpen] =
    useState(false);

  const [svgMarkup, setSvgMarkup] =
    useState("");

  const [mapLoading, setMapLoading] =
    useState(false);

  const [mapError, setMapError] =
    useState("");

  const [lots, setLots] =
    useState<MapLot[]>([]);

  const [selectedLot, setSelectedLot] =
    useState<MapLot | null>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  /*
   * =========================================================
   * MOUNT
   * =========================================================
   */

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * =========================================================
   * LOAD SVG
   * =========================================================
   */

  useEffect(() => {
    if (
      !isMapOpen ||
      svgMarkup
    ) {
      return;
    }

    const controller =
      new AbortController();

    const loadMap = async () => {
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
            `No se pudo cargar el mapa (${response.status}).`,
          );
        }

        const markup =
          await response.text();

        setSvgMarkup(markup);
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
            : "No se pudo cargar el mapa.",
        );
      } finally {
        setMapLoading(false);
      }
    };

    void loadMap();

    return () =>
      controller.abort();
  }, [
    isMapOpen,
    svgMarkup,
  ]);

  /*
   * =========================================================
   * DETECT LOTS USING REAL SVG GEOMETRY
   *
   * NO manual x/y.
   * NO artificial numbering.
   *
   * The original number printed in
   * the SVG remains visible.
   * =========================================================
   */

  useEffect(() => {
    if (
      !isMapOpen ||
      !svgMarkup
    ) {
      return;
    }

    const frame =
      window.requestAnimationFrame(
        () => {
          const root =
            mapRootRef.current;

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

          const viewBox =
            svg.viewBox.baseVal;

          if (
            !viewBox.width ||
            !viewBox.height
          ) {
            return;
          }

          const elements =
            Array.from(
              svg.querySelectorAll<SVGGraphicsElement>(
                ".cls-53, .cls-54, .cls-56",
              ),
            );

          const detected:
            MapLot[] = [];

          elements.forEach(
            (
              element,
              index,
            ) => {
              let box:
                | DOMRect
                | SVGRect;

              try {
                box =
                  element.getBBox();
              } catch {
                return;
              }

              /*
               * Ignore tiny decorative
               * fragments.
               */
              if (
                box.width < 25 ||
                box.height < 25
              ) {
                return;
              }

              const status:
                LotStatus =
                element.classList.contains(
                  "cls-56",
                )
                  ? "available"
                  : element.classList.contains(
                        "cls-53",
                      )
                    ? "reserved"
                    : "sold";

              detected.push({
                id: `svg-lot-${index}`,

                status,

                x:
                  ((box.x +
                    box.width /
                      2 -
                    viewBox.x) /
                    viewBox.width) *
                  100,

                y:
                  ((box.y +
                    box.height /
                      2 -
                    viewBox.y) /
                    viewBox.height) *
                  100,
              });
            },
          );

          setLots(detected);
        },
      );

    return () =>
      window.cancelAnimationFrame(
        frame,
      );
  }, [
    isMapOpen,
    svgMarkup,
  ]);

  /*
   * =========================================================
   * COUNTERS
   * =========================================================
   */

  const counters = useMemo(
    () => ({
      available:
        lots.filter(
          (lot) =>
            lot.status ===
            "available",
        ).length,

      reserved:
        lots.filter(
          (lot) =>
            lot.status ===
            "reserved",
        ).length,

      sold:
        lots.filter(
          (lot) =>
            lot.status ===
            "sold",
        ).length,
    }),
    [lots],
  );

  /*
   * =========================================================
   * LOCK BACKGROUND
   * =========================================================
   */

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

    body.style.width = "100%";

    body.style.overflow =
      "hidden";

    html.style.overflow =
      "hidden";

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key ===
        "Escape"
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

  /*
   * =========================================================
   * DESKTOP DRAG
   * =========================================================
   */

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (
      event.pointerType !==
        "mouse" ||
      event.button !== 0
    ) {
      return;
    }

    const target =
      event.target as HTMLElement;

    if (
      target.closest(
        "[data-map-hotspot]",
      )
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
      scrollLeft:
        viewport.scrollLeft,
      scrollTop:
        viewport.scrollTop,
    };
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
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

    const dx =
      event.clientX -
      drag.startX;

    const dy =
      event.clientY -
      drag.startY;

    if (
      !drag.moved &&
      Math.hypot(
        dx,
        dy,
      ) > 5
    ) {
      drag.moved = true;
      setIsDragging(true);
    }

    if (!drag.moved) {
      return;
    }

    event.preventDefault();

    viewport.scrollLeft =
      drag.scrollLeft - dx;

    viewport.scrollTop =
      drag.scrollTop - dy;
  };

  const finishDrag = () => {
    dragRef.current.active =
      false;

    dragRef.current.moved =
      false;

    setIsDragging(false);
  };

  /*
   * =========================================================
   * MAP OPEN / CLOSE
   * =========================================================
   */

  const openMap = () => {
    setSelectedLot(null);

    finishDrag();

    setIsMapOpen(true);
  };

  const closeMap = () => {
    finishDrag();

    setIsMapOpen(false);
  };

  /*
   * =========================================================
   * MODAL
   * =========================================================
   */

  const modal =
    isMapOpen ? (
      <div
        className={styles.overlay}
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
          <header
            className={
              styles.modalHeader
            }
          >
            <div>
              <span
                className={
                  styles.modalEyebrow
                }
              >
                Zagari · Segunda
                etapa
              </span>

              <h2 id="zagari-map-title">
                Mapa interactivo
              </h2>

              <p>
                Usa los números
                originales del
                plano. Toca
                directamente sobre
                cada número para
                consultar su
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

          <div
            className={
              styles.legend
            }
          >
            <div
              className={
                styles.legendItem
              }
            >
              <i
                className={
                  styles.legendGreen
                }
              />

              <span>
                Disponible
              </span>

              <strong>
                {
                  counters.available
                }
              </strong>
            </div>

            <div
              className={
                styles.legendItem
              }
            >
              <i
                className={
                  styles.legendOrange
                }
              />

              <span>
                Separado
              </span>

              <strong>
                {
                  counters.reserved
                }
              </strong>
            </div>

            <div
              className={
                styles.legendItem
              }
            >
              <i
                className={
                  styles.legendRed
                }
              />

              <span>
                Vendido
              </span>

              <strong>
                {
                  counters.sold
                }
              </strong>
            </div>

            <span
              className={
                styles.legendHelp
              }
            >
              Número original =
              seleccionar · Fondo =
              mover mapa
            </span>
          </div>

          <div
            className={
              styles.modalBody
            }
          >
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
                  Numeración
                  idéntica al SVG
                  original
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
                      className={
                        styles.mapCanvas
                      }
                    >
                      <div
                        ref={
                          mapRootRef
                        }
                        className={
                          styles.realMap
                        }
                        dangerouslySetInnerHTML={{
                          __html:
                            svgMarkup,
                        }}
                      />

                      <div
                        className={
                          styles.hotspotLayer
                        }
                      >
                        {lots.map(
                          (
                            lot,
                          ) => {
                            const active =
                              selectedLot?.id ===
                              lot.id;

                            return (
                              <button
                                key={
                                  lot.id
                                }
                                type="button"
                                data-map-hotspot
                                aria-label={`${getStatusLabel(
                                  lot.status,
                                )}. Seleccionar lote en el mapa.`}
                                aria-pressed={
                                  active
                                }
                                className={`${styles.mapHotspot} ${
                                  styles[
                                    `mapHotspot_${lot.status}`
                                  ]
                                } ${
                                  active
                                    ? styles.mapHotspotActive
                                    : ""
                                }`}
                                style={{
                                  left: `${lot.x}%`,
                                  top: `${lot.y}%`,
                                }}
                                onPointerDown={(
                                  event,
                                ) => {
                                  event.stopPropagation();
                                }}
                                onClick={(
                                  event,
                                ) => {
                                  event.preventDefault();

                                  event.stopPropagation();

                                  setSelectedLot(
                                    lot,
                                  );
                                }}
                              >
                                <span
                                  className={
                                    styles.srOnly
                                  }
                                >
                                  {getStatusLabel(
                                    lot.status,
                                  )}
                                </span>
                              </button>
                            );
                          },
                        )}
                      </div>
                    </div>
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

                Desliza el plano ·
                toca el número
                original del lote
              </div>
            </div>

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
                      size={24}
                      weight="duotone"
                    />
                  </span>

                  <strong>
                    Selecciona un lote
                  </strong>

                  <p>
                    Los números que
                    ves son exactamente
                    los que contiene el
                    SVG original; ya no
                    se generan números
                    artificiales.
                  </p>
                </div>
              ) : (
                <div
                  key={
                    selectedLot.id
                  }
                  className={
                    styles.infoContent
                  }
                >
                  <span
                    className={
                      styles.infoEyebrow
                    }
                  >
                    Lote seleccionado
                  </span>

                  <div
                    className={
                      styles.detailStatus
                    }
                  >
                    <i
                      className={
                        styles[
                          `status_${selectedLot.status}`
                        ]
                      }
                    />

                    <div>
                      <small>
                        Estado actual
                      </small>

                      <strong>
                        {getStatusLabel(
                          selectedLot.status,
                        )}
                      </strong>
                    </div>
                  </div>

                  <div
                    className={
                      styles.detailGrid
                    }
                  >
                    <div>
                      <span>
                        Proyecto
                      </span>

                      <strong>
                        Zagari Resort
                        Club
                      </strong>
                    </div>

                    <div>
                      <span>
                        Etapa
                      </span>

                      <strong>
                        Segunda etapa
                      </strong>
                    </div>

                    <div>
                      <span>
                        Ubicación
                      </span>

                      <strong>
                        San Ramón ·
                        Junín
                      </strong>
                    </div>

                    <div>
                      <span>
                        Referencia
                      </span>

                      <strong>
                        Lote del plano
                      </strong>
                    </div>
                  </div>

                  {selectedLot.status ===
                  "available" ? (
                    <>
                      <p
                        className={
                          styles.infoText
                        }
                      >
                        Este lote aparece
                        disponible. El
                        número mostrado
                        directamente en
                        el plano es la
                        referencia
                        comercial que
                        debes indicar al
                        asesor.
                      </p>

                      <a
                        href={getWhatsappUrl(
                          selectedLot.status,
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
                          Consultar este
                          lote
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
                        Esta unidad
                        figura como{" "}
                        <strong>
                          {getStatusLabel(
                            selectedLot.status,
                          ).toLowerCase()}
                        </strong>
                        . Podemos
                        mostrarte
                        alternativas.
                      </p>

                      <a
                        href={getWhatsappUrl(
                          selectedLot.status,
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
                          Ver
                          alternativas
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

  /*
   * =========================================================
   * MAIN SECTION
   * =========================================================
   */

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
              Segunda etapa ·
              Preventa
            </span>

            <h2 id="lots-title">
              Tu espacio en{" "}
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
          {/* =================================================
              IMAGE
              ================================================= */}

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
          </div>

          {/* =================================================
              CONTENT
              ================================================= */}

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

            {/* HIGHLIGHTS */}

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

            {/* MAP BUTTON */}

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
                  Plano interactivo
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

            {/* =================================================
                LEAD FORM
                ================================================= */}

            <div
              className={
                styles.formSection
              }
            >
              <LeadForm/>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAP PORTAL
          ===================================================== */}

      {mounted &&
        modal &&
        createPortal(
          modal,
          document.body,
        )}
    </>
  );
}
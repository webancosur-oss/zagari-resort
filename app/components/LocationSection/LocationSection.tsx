"use client";

import {
  CheckCircle,
  MapPin,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

import styles from "./LocationSection.module.css";

/* =========================================================
   TIPOS
========================================================= */

type ZoneStatus =
  | "sold"
  | "available";

type Zona = {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
  status: ZoneStatus;

  ubicacion: {
    left: string;
    top: string;
  };
};

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const WHATSAPP_NUMBER =
  "51971069763";

const zonas: Zona[] = [
  {
    id: "A",
    nombre: "Zona A",
    descripcion:
      "Lotes ubicados cerca del Resort Club y de los principales espacios recreativos.",
    estado:
      "Primera etapa vendida",
    status:
      "sold",
    ubicacion: {
      left: "67.7%",
      top: "47%",
    },
  },
  {
    id: "B",
    nombre: "Zona B",
    descripcion:
      "Lotes con acceso cercano a las amenidades y al recorrido principal del proyecto.",
    estado:
      "Primera etapa vendida",
    status:
      "sold",
    ubicacion: {
      left: "59.8%",
      top: "45.5%",
    },
  },
  {
    id: "C",
    nombre: "Zona C",
    descripcion:
      "Lotes ubicados en la zona central del proyecto, con conexión hacia sus principales espacios.",
    estado:
      "Segunda etapa en preventa",
    status:
      "available",
    ubicacion: {
      left: "48.6%",
      top: "72%",
    },
  },
  {
    id: "D",
    nombre: "Zona D",
    descripcion:
      "Lotes rodeados de naturaleza, áreas verdes y recorridos internos.",
    estado:
      "Primera etapa vendida",
    status:
      "sold",
    ubicacion: {
      left: "56.3%",
      top: "65%",
    },
  },
  {
    id: "E",
    nombre: "Zona E",
    descripcion:
      "Lotes próximos al biohuerto, zona de trekking y espacios naturales.",
    estado:
      "Segunda etapa en preventa",
    status:
      "available",
    ubicacion: {
      left: "36%",
      top: "63%",
    },
  },
  {
    id: "F",
    nombre: "Zona F",
    descripcion:
      "Lotes con acceso directo al recorrido interno y conexión hacia las amenidades.",
    estado:
      "Segunda etapa en preventa",
    status:
      "available",
    ubicacion: {
      left: "45.6%",
      top: "57.5%",
    },
  },
];

/* =========================================================
   UTILIDAD
========================================================= */

function createWhatsAppUrl(
  zone: Zona,
): string {
  const message =
    `Hola, deseo información sobre la ${zone.nombre} de Zagari Resort Club. ` +
    `Estado: ${zone.estado}.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;
}

/* =========================================================
   COMPONENTE
========================================================= */

export default function MapaZagari() {
  const [
    zonaSeleccionada,
    setZonaSeleccionada,
  ] = useState<Zona | null>(
    null,
  );

  const selectZone = (
    zone: Zona,
  ) => {
    setZonaSeleccionada(
      zone,
    );
  };

  const closeZone = () => {
    setZonaSeleccionada(
      null,
    );
  };

  return (
    <section
      className={styles.section}
      id="ubicacion"
      aria-labelledby="zagari-map-title"
    >
      <div className={styles.container}>
        {/* =================================================
            CABECERA
        ================================================== */}

        <header className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>
              Explora el proyecto
            </span>

            <h2 id="zagari-map-title">
              Conoce las zonas de Zagari Resort Club
            </h2>
          </div>

          <div className={styles.headerAside}>
            <p>
              Selecciona una zona del mapa para conocer sus
              características, disponibilidad y ubicación dentro
              del proyecto.
            </p>

            <div
              className={styles.legend}
              aria-label="Leyenda del mapa"
            >
              <span>
                <i
                  className={styles.availableDot}
                  aria-hidden="true"
                />

                En preventa
              </span>

              <span>
                <i
                  className={styles.soldDot}
                  aria-hidden="true"
                />

                Vendido
              </span>
            </div>
          </div>
        </header>

        {/* =================================================
            MAPA
        ================================================== */}

        <div className={styles.mapViewport}>
          <div className={styles.mapCanvas}>
            <Image
              src="/assets/images/mapa-zagari.webp"
              alt="Plano general interactivo de las zonas de Zagari Resort Club"
              fill
              priority
              sizes="
                (max-width: 700px) 1100px,
                (max-width: 1200px) 100vw,
                1500px
              "
              className={styles.mapImage}
            />

            <div
              className={styles.mapShade}
              aria-hidden="true"
            />

            {/* MARCADORES */}

            {zonas.map((zona) => {
              const isSelected =
                zonaSeleccionada?.id ===
                zona.id;

              return (
                <button
                  key={zona.id}
                  type="button"
                  aria-label={`Ver información de ${zona.nombre}: ${zona.estado}`}
                  aria-pressed={isSelected}
                  className={`${styles.marker} ${
                    zona.status ===
                    "sold"
                      ? styles.markerSold
                      : styles.markerAvailable
                  } ${
                    isSelected
                      ? styles.markerSelected
                      : ""
                  }`}
                  style={{
                    left:
                      zona.ubicacion
                        .left,

                    top:
                      zona.ubicacion
                        .top,
                  }}
                  onClick={() =>
                    selectZone(
                      zona,
                    )
                  }
                >
                  <span>
                    {zona.id}
                  </span>
                </button>
              );
            })}

            {/* INFORMACIÓN EN DESKTOP */}

            {zonaSeleccionada && (
              <aside
                className={styles.card}
                aria-live="polite"
              >
                <button
                  type="button"
                  className={styles.close}
                  onClick={closeZone}
                  aria-label="Cerrar información de la zona"
                >
                  <X
                    size={19}
                    weight="bold"
                    aria-hidden="true"
                  />
                </button>

                <div className={styles.cardHeader}>
                  <span
                    className={`${styles.cardIcon} ${
                      zonaSeleccionada.status ===
                      "sold"
                        ? styles.cardIconSold
                        : styles.cardIconAvailable
                    }`}
                  >
                    <MapPin
                      size={22}
                      weight="fill"
                      aria-hidden="true"
                    />
                  </span>

                  <div>
                    <span className={styles.zoneLabel}>
                      {zonaSeleccionada.nombre}
                    </span>

                    <h3>
                      {
                        zonaSeleccionada.estado
                      }
                    </h3>
                  </div>
                </div>

                <p>
                  {
                    zonaSeleccionada.descripcion
                  }
                </p>

                <div className={styles.cardStatus}>
                  <CheckCircle
                    size={18}
                    weight="fill"
                    aria-hidden="true"
                  />

                  <span>
                    {zonaSeleccionada.status ===
                    "available"
                      ? "Disponible para consultas comerciales"
                      : "Zona correspondiente a una etapa vendida"}
                  </span>
                </div>

                <a
                  href={createWhatsAppUrl(
                    zonaSeleccionada,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.button}
                >
                  <WhatsappLogo
                    size={20}
                    weight="fill"
                    aria-hidden="true"
                  />

                  <span>
                    Consultar disponibilidad
                  </span>
                </a>
              </aside>
            )}
          </div>
        </div>

        {/* =================================================
            INFORMACIÓN EN MÓVIL
        ================================================== */}

        {zonaSeleccionada && (
          <aside
            className={styles.mobileCard}
            aria-live="polite"
          >
            <button
              type="button"
              className={styles.mobileClose}
              onClick={closeZone}
              aria-label="Cerrar información de la zona"
            >
              <X
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </button>

            <div className={styles.mobileCardHeader}>
              <span
                className={`${styles.cardIcon} ${
                  zonaSeleccionada.status ===
                  "sold"
                    ? styles.cardIconSold
                    : styles.cardIconAvailable
                }`}
              >
                <MapPin
                  size={21}
                  weight="fill"
                  aria-hidden="true"
                />
              </span>

              <div>
                <span className={styles.zoneLabel}>
                  {zonaSeleccionada.nombre}
                </span>

                <h3>
                  {
                    zonaSeleccionada.estado
                  }
                </h3>
              </div>
            </div>

            <p>
              {
                zonaSeleccionada.descripcion
              }
            </p>

            <a
              href={createWhatsAppUrl(
                zonaSeleccionada,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              <WhatsappLogo
                size={20}
                weight="fill"
                aria-hidden="true"
              />

              <span>
                Consultar disponibilidad
              </span>
            </a>
          </aside>
        )}

        <p className={styles.mobileHint}>
          Desliza horizontalmente para explorar todo el mapa y
          presiona las letras para ver cada zona.
        </p>
      </div>
    </section>
  );
}
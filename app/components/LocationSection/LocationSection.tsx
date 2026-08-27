"use client";

import Image from "next/image";

import {
  MapPin,
} from "@phosphor-icons/react";

import styles from "./LocationSection.module.css";
import LeadForm from "./components/LeadFormLocation";



/* =========================================================
   TIPOS
========================================================= */

type NearbyPlace = {
  id: string;
  name: string;
  label: string;
  image: string;
};


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/p8EkgxDp4M3pmgkv5";


/* =========================================================
   LUGARES CERCANOS
========================================================= */

const nearbyPlaces: NearbyPlace[] = [
  {
    id: "plaza-san-ramon",

    name:
      "Plaza San Ramón",

    label:
      "Referencia cercana",

    image:
      "/assets/location/attractions/plaza-san-ramon.jpg",
  },

  {
    id: "ingreso-chincana",

    name:
      "Ingreso a Chincana",

    label:
      "Ingreso a Chincana",

    image:
      "/assets/location/attractions/ingreso-chincana.png",
  },

  {
    id: "mirador-mishasho",

    name:
      "Mirador El Mishasho",

    label:
      "Naturaleza",

    image:
      "/assets/location/attractions/mirador-mishasho.jpg",
  },

  {
    id: "fundo-selenita",

    name:
      "Fundo Selenita",

    label:
      "Referencia cercana",

    image:
      "/assets/location/attractions/fundo-selenita.jpg",
  },

  {
    id: "iglesia",

    name:
      "Iglesia Chincana",

    label:
      "Referencia local",

    image:
      "/assets/location/attractions/iglesia-chincana.jpg",
  },
];


/* =========================================================
   COMPONENTE
========================================================= */

export default function LocationSection() {
  return (
    <section
      className={
        styles.section
      }
      id="ubicacion"
      aria-labelledby="location-title"
    >
      <div
        className={
          styles.container
        }
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <header
          className={
            styles.header
          }
        >
          <div
            className={
              styles.headerTitle
            }
          >
            <span
              className={
                styles.eyebrow
              }
            >
              Ubicación
            </span>

            <h2
              id="location-title"
            >
              Tu escape comienza
              <span>
                {" "}
                mucho antes de
                llegar.
              </span>
            </h2>
          </div>

          <div
            className={
              styles.headerCopy
            }
          >
            <p>
              Descubre la ruta
              hacia Zagari y
              algunos de los
              lugares que forman
              parte de su entorno.
            </p>
          </div>
        </header>


        {/* =================================================
            MAPA
        ================================================= */}

        <div
          className={
            styles.mapSection
          }
        >
          <div
            className={
              styles.mapFrame
            }
          >
            <Image
              src="/assets/location/ubicacion.webp"
              alt="Ruta referencial hacia Zagari Resort Club"
              fill
              priority
              sizes="
                (max-width: 600px) 100vw,
                (max-width: 1024px) 100vw,
                1440px
              "
              className={
                styles.mapImage
              }
            />
          </div>

          <div
            className={
              styles.mapFooter
            }
          >
            <div>
              <span>
                Zagari Resort
                Club
              </span>

              <p>
                Consulta la
                ubicación exacta
                y planifica tu
                visita.
              </p>
            </div>

            <a
              href={
                GOOGLE_MAPS_URL
              }
              target="_blank"
              rel="noopener noreferrer"
              className={
                styles.mapsButton
              }
            >
              Abrir en Google
              Maps

              <span
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          </div>
        </div>


        {/* =================================================
            LUGARES CERCANOS
        ================================================= */}

        <section
          className={
            styles.nearbySection
          }
          aria-labelledby="nearby-title"
        >
          <div
            className={
              styles.nearbyHeader
            }
          >
            <div>
              <span>
                El entorno
              </span>

              <h3
                id="nearby-title"
              >
                Descubre lo que
                tienes
                <em>
                  {" "}
                  cerca de
                  Zagari.
                </em>
              </h3>
            </div>

            <p>
              Naturaleza,
              referencias y
              lugares que
              acompañan el
              recorrido hacia el
              resort.
            </p>
          </div>

          <div
            className={
              styles.placesGrid
            }
          >
            {nearbyPlaces.map(
              (place) => (
                <article
                  key={
                    place.id
                  }
                  className={
                    styles.placeCard
                  }
                >
                  <div
                    className={
                      styles.placeImage
                    }
                  >
                    <Image
                      src={
                        place.image
                      }
                      alt={
                        place.name
                      }
                      fill
                      sizes="
                        (max-width: 480px) 50vw,
                        (max-width: 768px) 50vw,
                        (max-width: 1100px) 33vw,
                        25vw
                      "
                      className={
                        styles.placePhoto
                      }
                    />

                    <div
                      className={
                        styles.placeShade
                      }
                    />

                    <div
                      className={
                        styles.placeContent
                      }
                    >
                      <span>
                        {
                          place.label
                        }
                      </span>

                      <h4>
                        {
                          place.name
                        }
                      </h4>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>


        {/* =================================================
            LEAD
        ================================================= */}

        <section
          className={
            styles.leadSection
          }
          aria-labelledby="location-lead-title"
        >
          <div
            className={
              styles.leadIntro
            }
          >
            <span>
              Vive Zagari
            </span>

            <h3
              id="location-lead-title"
            >
              ¿Quieres conocerlo
              en persona?
            </h3>

            <p>
              Déjanos tus datos
              y nuestro equipo
              te contactará.
            </p>
          </div>

          {/* =================================================
              FORMULARIO SEPARADO
          ================================================= */}

          <LeadForm
            source="Sección ubicación Zagari"
            component="LocationSection - LeadForm"
          />
        </section>

      </div>
    </section>
  );
}
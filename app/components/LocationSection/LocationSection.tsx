"use client";

import Image from "next/image";
import {
  FormEvent,
  useState,
} from "react";

import styles from "./LocationSection.module.css";

/* =========================================================
   TIPOS
========================================================= */

type NearbyPlace = {
  id: string;
  name: string;
  label: string;
  image: string;
};

type LeadForm = {
  nombre: string;
  telefono: string;
  email: string;
};

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/p8EkgxDp4M3pmgkv5";

const nearbyPlaces: NearbyPlace[] = [
  {
    id: "plaza-san-ramon",
    name: "Plaza San Ramón",
    label: "Referencia cercana",
    image:
      "/assets/location/attractions/plaza-san-ramon.jpg",
  },
  {
    id: "ingreso-chincana",
    name: "Ingreso a Chincana",
    label: "Ingreso a Chincana",
    image:
      "/assets/location/attractions/ingreso-chincana.png",
  },
  {
    id: "mirador-mishasho",
    name: "Mirador El Mishasho",
    label: "Naturaleza",
    image:
      "/assets/location/attractions/mirador-mishasho.jpg",
  },
  {
    id: "fundo-selenita",
    name: "Fundo Selenita",
    label: "Referencia cercana",
    image:
      "/assets/location/attractions/fundo-selenita.jpg",
  },
  {
    id: "iglesia",
    name: "Iglesia Chincana",
    label: "Referencia local",
    image:
      "/assets/location/attractions/iglesia-chincana.jpg",
  },

];

/* =========================================================
   COMPONENTE
========================================================= */

export default function LocationSection() {
  const [formData, setFormData] =
    useState<LeadForm>({
      nombre: "",
      telefono: "",
      email: "",
    });

  const [isSending, setIsSending] =
    useState(false);

  const [sent, setSent] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =======================================================
     INPUT
  ======================================================= */

  const updateField = (
    field: keyof LeadForm,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSending) return;

    const nombre =
      formData.nombre.trim();

    const telefono =
      formData.telefono.replace(
        /\D/g,
        "",
      );

    const email =
      formData.email
        .trim()
        .toLowerCase();

    if (!nombre) {
      setError(
        "Ingresa tu nombre.",
      );
      return;
    }

    if (telefono.length < 9) {
      setError(
        "Ingresa un número válido.",
      );
      return;
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email,
      )
    ) {
      setError(
        "Ingresa un correo válido.",
      );
      return;
    }

    try {
      setIsSending(true);
      setError("");

      const response =
        await fetch(
          "/api/leads",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              nombre,
              telefono,
              email,
              dni: "",

              campaña:
                "Zagari Resort Club",

              anuncio:
                "Sección ubicación Zagari",

              comentario:
                "Cliente interesado en conocer Zagari Resort Club.",

              msj_client:
                JSON.stringify({
                  interes:
                    "Zagari Resort Club",

                  origen:
                    "Sección ubicación",

                  ruta:
                    window.location
                      .pathname,
                }),
            }),
          },
        );

      if (!response.ok) {
        throw new Error();
      }

      setSent(true);

      setFormData({
        nombre: "",
        telefono: "",
        email: "",
      });
    } catch {
      setError(
        "No pudimos enviar tus datos. Inténtalo nuevamente.",
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      className={styles.section}
      id="ubicacion"
      aria-labelledby="location-title"
    >
      <div className={styles.container}>
        {/* =================================================
            HEADER
        ================================================== */}

        <header
          className={styles.header}
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

            <h2 id="location-title">
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
        ================================================== */}

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
        ================================================== */}

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

              <h3 id="nearby-title">
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
                  key={place.id}
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
        ================================================== */}

        <section
          className={
            styles.leadSection
          }
        >
          <div
            className={
              styles.leadIntro
            }
          >
            <span>
              Vive Zagari
            </span>

            <h3>
              ¿Quieres conocerlo
              en persona?
            </h3>

            <p>
              Déjanos tus datos
              y nuestro equipo
              te contactará.
            </p>
          </div>

          {sent ? (
            <div
              className={
                styles.success
              }
            >
              <strong>
                Datos enviados
              </strong>

              <p>
                Nos pondremos en
                contacto contigo
                pronto.
              </p>

              <button
                type="button"
                onClick={() =>
                  setSent(false)
                }
              >
                Nueva consulta
              </button>
            </div>
          ) : (
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
                  styles.field
                }
              >
                <label
                  htmlFor="zagari-nombre"
                >
                  Nombre
                </label>

                <input
                  id="zagari-nombre"
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  value={
                    formData.nombre
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "nombre",
                      event.target
                        .value,
                    )
                  }
                />
              </div>

              <div
                className={
                  styles.field
                }
              >
                <label
                  htmlFor="zagari-telefono"
                >
                  WhatsApp
                </label>

                <input
                  id="zagari-telefono"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder="999 999 999"
                  maxLength={15}
                  value={
                    formData.telefono
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "telefono",
                      event.target
                        .value,
                    )
                  }
                />
              </div>

              <div
                className={
                  styles.field
                }
              >
                <label
                  htmlFor="zagari-email"
                >
                  Correo
                  <span>
                    {" "}
                    opcional
                  </span>
                </label>

                <input
                  id="zagari-email"
                  type="email"
                  autoComplete="email"
                  placeholder="correo@ejemplo.com"
                  value={
                    formData.email
                  }
                  onChange={(
                    event,
                  ) =>
                    updateField(
                      "email",
                      event.target
                        .value,
                    )
                  }
                />
              </div>

              <button
                type="submit"
                disabled={
                  isSending
                }
                className={
                  styles.submit
                }
              >
                {isSending
                  ? "Enviando..."
                  : "Quiero conocer Zagari"}

                {!isSending && (
                  <span
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </button>

              {error && (
                <p
                  className={
                    styles.error
                  }
                  role="alert"
                >
                  {error}
                </p>
              )}
            </form>
          )}
        </section>
      </div>
    </section>
  );
}
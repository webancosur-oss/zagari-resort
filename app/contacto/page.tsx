"use client";

import {
  ArrowRight,
  CalendarBlank,
  Check,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
  Sparkle,
  WhatsappLogo,
} from "@phosphor-icons/react";

import Link from "next/link";
import {
  FormEvent,
  useState,
} from "react";

import styles from "./page.module.css";

const interests = [
  "Lotes",
  "Cabañas",
  "Resort Club",
  "Amenidades",
  "Inversión",
  "Visita al proyecto",
];

export default function ContactPage() {
  const [
    selectedInterest,
    setSelectedInterest,
  ] = useState("Lotes");

  const [
    isSending,
    setIsSending,
  ] = useState(false);

  const [
    sent,
    setSent,
  ] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSending) {
      return;
    }

    setIsSending(true);
    setSent(false);

    /*
     * Aquí luego puedes conectar:
     * /api/leads
     * tu CRM
     * Google Sheets
     * WhatsApp
     * etc.
     */

    await new Promise((resolve) =>
      window.setTimeout(
        resolve,
        900
      )
    );

    setIsSending(false);
    setSent(true);
  };

  return (
    <main
      className={
        styles.page
      }
    >
      {/* =====================================
          DECORATION
      ====================================== */}

      <div
        className={
          styles.noise
        }
        aria-hidden="true"
      />

      <div
        className={
          styles.glowOne
        }
        aria-hidden="true"
      />

      <div
        className={
          styles.glowTwo
        }
        aria-hidden="true"
      />

      {/* =====================================
          HERO / CONTACT
      ====================================== */}

      <section
        className={
          styles.contactSection
        }
      >
        <div
          className={
            styles.container
          }
        >
          {/* =================================
              LEFT
          ================================== */}

          <div
            className={
              styles.content
            }
          >
            <div
              className={
                styles.eyebrow
              }
            >
              <span
                className={
                  styles.eyebrowDot
                }
              />

              <span>
                Contacto
              </span>
            </div>

            <h1
              className={
                styles.title
              }
            >
              Empieza a vivir
              <span>
                Zagari.
              </span>
            </h1>

            <p
              className={
                styles.description
              }
            >
              Conoce el proyecto,
              descubre nuestros lotes,
              cabañas y experiencias,
              y recibe asesoría para
              encontrar la mejor forma
              de ser parte de Zagari
              Resort Club.
            </p>

            {/* =============================
                QUICK ACTIONS
            ============================== */}

            <div
              className={
                styles.quickActions
              }
            >
              <Link
                href="#formulario"
                className={
                  styles.primaryAction
                }
              >
                <span>
                  Quiero información
                </span>

                <span
                  className={
                    styles.primaryActionIcon
                  }
                >
                  <ArrowRight
                    size={17}
                    weight="bold"
                  />
                </span>
              </Link>

              <Link
                href="#visita"
                className={
                  styles.secondaryAction
                }
              >
                <CalendarBlank
                  size={17}
                  weight="regular"
                />

                <span>
                  Agendar visita
                </span>
              </Link>
            </div>

            {/* =============================
                INFO CARDS
            ============================== */}

            <div
              className={
                styles.infoGrid
              }
            >
              <article
                className={
                  styles.infoCard
                }
              >
                <span
                  className={
                    styles.infoIcon
                  }
                >
                  <MapPin
                    size={20}
                    weight="regular"
                  />
                </span>

                <div>
                  <span>
                    Ubicación
                  </span>

                  <strong>
                    San Ramón
                  </strong>

                  <small>
                    Selva Central
                  </small>
                </div>
              </article>

              <article
                className={
                  styles.infoCard
                }
              >
                <span
                  className={
                    styles.infoIcon
                  }
                >
                  <Clock
                    size={20}
                    weight="regular"
                  />
                </span>

                <div>
                  <span>
                    Atención
                  </span>

                  <strong>
                    Asesoría personalizada
                  </strong>

                  <small>
                    Previa coordinación
                  </small>
                </div>
              </article>
            </div>

            {/* =============================
                EXPERIENCE LABEL
            ============================== */}

            <div
              className={
                styles.experience
              }
            >
              <div
                className={
                  styles.experienceIcon
                }
              >
                <Sparkle
                  size={17}
                  weight="fill"
                />
              </div>

              <p>
                Más que elegir un espacio,
                descubre una experiencia
                conectada con naturaleza,
                descanso y bienestar.
              </p>
            </div>
          </div>

          {/* =================================
              FORM
          ================================== */}

          <div
            id="formulario"
            className={
              styles.formWrapper
            }
          >
            <div
              className={
                styles.formHeader
              }
            >
              <div>
                <span
                  className={
                    styles.formEyebrow
                  }
                >
                  Hablemos
                </span>

                <h2>
                  Cuéntanos qué
                  estás buscando.
                </h2>
              </div>
            </div>

            <form
              className={
                styles.form
              }
              onSubmit={
                handleSubmit
              }
            >
              {/* ===========================
                  NAME
              ============================ */}

              <div
                className={
                  styles.field
                }
              >
                <label
                  htmlFor="name"
                >
                  Nombre completo
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Escribe tu nombre"
                  autoComplete="name"
                  required
                />
              </div>

              {/* ===========================
                  TWO COLUMNS
              ============================ */}

              <div
                className={
                  styles.fieldRow
                }
              >
                <div
                  className={
                    styles.field
                  }
                >
                  <label
                    htmlFor="phone"
                  >
                    Teléfono
                  </label>

                  <div
                    className={
                      styles.inputWithIcon
                    }
                  >
                    <Phone
                      size={17}
                      weight="regular"
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="999 999 999"
                      autoComplete="tel"
                      required
                    />
                  </div>
                </div>

                <div
                  className={
                    styles.field
                  }
                >
                  <label
                    htmlFor="email"
                  >
                    Correo
                  </label>

                  <div
                    className={
                      styles.inputWithIcon
                    }
                  >
                    <EnvelopeSimple
                      size={17}
                      weight="regular"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@email.com"
                      autoComplete="email"
                    />
                  </div>
                </div>
              </div>

              {/* ===========================
                  INTEREST
              ============================ */}

              <fieldset
                className={
                  styles.interestField
                }
              >
                <legend>
                  ¿Qué te interesa?
                </legend>

                <div
                  className={
                    styles.interests
                  }
                >
                  {interests.map(
                    (interest) => {
                      const active =
                        selectedInterest ===
                        interest;

                      return (
                        <button
                          key={
                            interest
                          }
                          type="button"
                          className={`${styles.interestButton} ${
                            active
                              ? styles.interestButtonActive
                              : ""
                          }`}
                          onClick={() =>
                            setSelectedInterest(
                              interest
                            )
                          }
                        >
                          <span>
                            {
                              interest
                            }
                          </span>

                          {active && (
                            <Check
                              size={13}
                              weight="bold"
                            />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>

                <input
                  type="hidden"
                  name="interest"
                  value={
                    selectedInterest
                  }
                />
              </fieldset>

              {/* ===========================
                  MESSAGE
              ============================ */}

              <div
                className={
                  styles.field
                }
              >
                <label
                  htmlFor="message"
                >
                  Cuéntanos un poco más
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Me gustaría recibir información sobre..."
                />
              </div>

              {/* ===========================
                  LEGAL
              ============================ */}

              <label
                className={
                  styles.privacy
                }
              >
                <input
                  type="checkbox"
                  required
                />

                <span
                  className={
                    styles.customCheckbox
                  }
                >
                  <Check
                    size={11}
                    weight="bold"
                  />
                </span>

                <span>
                  Acepto el tratamiento
                  de mis datos de acuerdo
                  con la{" "}
                  <Link
                    href="/politica-de-privacidad"
                  >
                    política de privacidad
                  </Link>
                  .
                </span>
              </label>

              {/* ===========================
                  SUBMIT
              ============================ */}

              <button
                type="submit"
                className={
                  styles.submitButton
                }
                disabled={
                  isSending
                }
              >
                <span>
                  {isSending
                    ? "Enviando..."
                    : "Solicitar información"}
                </span>

                <span
                  className={
                    styles.submitIcon
                  }
                >
                  <ArrowRight
                    size={17}
                    weight="bold"
                  />
                </span>
              </button>

              {sent && (
                <div
                  className={
                    styles.success
                  }
                  role="status"
                >
                  <span
                    className={
                      styles.successIcon
                    }
                  >
                    <Check
                      size={14}
                      weight="bold"
                    />
                  </span>

                  <div>
                    <strong>
                      Solicitud enviada
                    </strong>

                    <p>
                      Un asesor podrá
                      contactarte para
                      brindarte más
                      información.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* =====================================
          VISIT SECTION
      ====================================== */}

      <section
        id="visita"
        className={
          styles.visitSection
        }
      >
        <div
          className={
            styles.visitContainer
          }
        >
          <div
            className={
              styles.visitContent
            }
          >
            <span
              className={
                styles.visitEyebrow
              }
            >
              Conoce Zagari
            </span>

            <h2>
              La experiencia
              comienza cuando
              llegas.
            </h2>

            <p>
              Coordina una visita
              y descubre personalmente
              el entorno, las amenidades,
              los lotes y todo lo que
              hace diferente a Zagari.
            </p>
          </div>

          <div
            className={
              styles.visitActions
            }
          >
            <Link
              href="#formulario"
              className={
                styles.visitButton
              }
            >
              <CalendarBlank
                size={18}
                weight="regular"
              />

              <span>
                Coordinar visita
              </span>

              <ArrowRight
                size={16}
                weight="bold"
              />
            </Link>

            <div
              className={
                styles.locationMini
              }
            >
              <MapPin
                size={17}
                weight="fill"
              />

              <div>
                <strong>
                  San Ramón
                </strong>

                <span>
                  Selva Central
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
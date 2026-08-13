"use client";

import {
  ArrowRight,
  Check,
  EnvelopeSimple,
  Phone,
  User,
  WhatsappLogo,
} from "@phosphor-icons/react";

import {
  FormEvent,
  useState,
} from "react";

import styles from "./HomeContactForm.module.css";

const interests = [
  "Lotes",
  "Cabañas",
  "Resort Club",
  "Amenidades",
  "Visita al proyecto",
];

export default function HomeContactForm() {
  const [
    selectedInterest,
    setSelectedInterest,
  ] = useState("Lotes");

  const [
    formData,
    setFormData,
  ] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [
    isSending,
    setIsSending,
  ] = useState(false);

  const [
    sent,
    setSent,
  ] = useState(false);

  /* =========================================
     WHATSAPP

     Coloca tu número Zagari:
     país + número
     ejemplo Perú:
     519XXXXXXXX
  ========================================= */

  const WHATSAPP_NUMBER =
    process.env
      .NEXT_PUBLIC_ZAGARI_WHATSAPP ||
    "519XXXXXXXX";

  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (current) => ({
        ...current,
        [name]: value,
      })
    );
  };

  /* =========================================
     FORM SUBMIT
  ========================================= */

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
     * Aquí puedes reemplazar esto
     * posteriormente por tu API:
     *
     * await fetch("/api/leads", ...)
     */

    await new Promise(
      (resolve) => {
        window.setTimeout(
          resolve,
          800
        );
      }
    );

    setIsSending(false);
    setSent(true);
  };

  /* =========================================
     WHATSAPP
  ========================================= */

  const handleWhatsApp = () => {
    const message = [
      "Hola Zagari Resort Club 👋",
      "",
      "Quisiera recibir información.",
      "",
      `Nombre: ${
        formData.name ||
        "No indicado"
      }`,
      `Teléfono: ${
        formData.phone ||
        "No indicado"
      }`,
      `Interés: ${selectedInterest}`,
      formData.message
        ? `Consulta: ${formData.message}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}` +
      `?text=${encodeURIComponent(
        message
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="contacto-home"
      className={
        styles.section
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
          <span
            className={
              styles.eyebrow
            }
          >
            <span
              className={
                styles.eyebrowDot
              }
            />

            Contacto
          </span>

          <h2
            className={
              styles.title
            }
          >
            ¿Quieres conocer
            más sobre Zagari?
          </h2>

          <p
            className={
              styles.description
            }
          >
            Déjanos tus datos y uno
            de nuestros asesores podrá
            brindarte información sobre
            lotes, cabañas, amenidades
            y visitas al proyecto.
          </p>

          <div
            className={
              styles.details
            }
          >
            <div
              className={
                styles.detail
              }
            >
              <span>
                01
              </span>

              <div>
                <strong>
                  Cuéntanos qué buscas
                </strong>

                <p>
                  Selecciona el tipo de
                  información que deseas
                  recibir.
                </p>
              </div>
            </div>

            <div
              className={
                styles.detail
              }
            >
              <span>
                02
              </span>

              <div>
                <strong>
                  Te contactamos
                </strong>

                <p>
                  Un asesor podrá
                  ayudarte de manera
                  personalizada.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={
              styles.whatsappButton
            }
            onClick={
              handleWhatsApp
            }
          >
            <span
              className={
                styles.whatsappIcon
              }
            >
              <WhatsappLogo
                size={20}
                weight="fill"
              />
            </span>

            <span>
              Hablar por WhatsApp
            </span>

            <ArrowRight
              size={16}
              weight="bold"
            />
          </button>
        </div>

        {/* =================================
            FORM
        ================================== */}

        <div
          className={
            styles.formCard
          }
        >
          <div
            className={
              styles.formHeading
            }
          >
            <span>
              Solicita información
            </span>

            <h3>
              Déjanos tus datos
            </h3>

            <p>
              Completa el formulario
              para poder comunicarnos
              contigo.
            </p>
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
                htmlFor="zagari-name"
              >
                Nombre completo
              </label>

              <div
                className={
                  styles.inputBox
                }
              >
                <User
                  size={17}
                  weight="regular"
                />

                <input
                  id="zagari-name"
                  name="name"
                  type="text"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Ingresa tu nombre"
                  autoComplete="name"
                  required
                />
              </div>
            </div>

            {/* ===========================
                PHONE / EMAIL
            ============================ */}

            <div
              className={
                styles.row
              }
            >
              <div
                className={
                  styles.field
                }
              >
                <label
                  htmlFor="zagari-phone"
                >
                  Teléfono
                </label>

                <div
                  className={
                    styles.inputBox
                  }
                >
                  <Phone
                    size={17}
                    weight="regular"
                  />

                  <input
                    id="zagari-phone"
                    name="phone"
                    type="tel"
                    value={
                      formData.phone
                    }
                    onChange={
                      handleChange
                    }
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
                  htmlFor="zagari-email"
                >
                  Correo
                </label>

                <div
                  className={
                    styles.inputBox
                  }
                >
                  <EnvelopeSimple
                    size={17}
                    weight="regular"
                  />

                  <input
                    id="zagari-email"
                    name="email"
                    type="email"
                    value={
                      formData.email
                    }
                    onChange={
                      handleChange
                    }
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
                  (
                    interest
                  ) => {
                    const active =
                      selectedInterest ===
                      interest;

                    return (
                      <button
                        key={
                          interest
                        }
                        type="button"
                        onClick={() =>
                          setSelectedInterest(
                            interest
                          )
                        }
                        className={`${styles.interestButton} ${
                          active
                            ? styles.interestButtonActive
                            : ""
                        }`}
                      >
                        {
                          active && (
                            <Check
                              size={11}
                              weight="bold"
                            />
                          )
                        }

                        <span>
                          {
                            interest
                          }
                        </span>
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
                htmlFor="zagari-message"
              >
                Mensaje
              </label>

              <textarea
                id="zagari-message"
                name="message"
                value={
                  formData.message
                }
                onChange={
                  handleChange
                }
                placeholder="Cuéntanos qué información necesitas..."
                rows={4}
              />
            </div>

            {/* ===========================
                PRIVACY
            ============================ */}

            <div
              className={
                styles.privacy
              }
            >
              <input
                id="zagari-privacy"
                type="checkbox"
                checked
                readOnly
                tabIndex={-1}
              />

              <span
                className={
                  styles.checkbox
                }
              >
                <Check
                  size={11}
                  weight="bold"
                />
              </span>

              <label
                htmlFor="zagari-privacy"
              >
                Acepto el tratamiento
                de mis datos personales
                y la política de
                privacidad.
              </label>
            </div>

            {/* ===========================
                ACTIONS
            ============================ */}

            <div
              className={
                styles.actions
              }
            >
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
                    styles.submitArrow
                  }
                >
                  <ArrowRight
                    size={16}
                    weight="bold"
                  />
                </span>
              </button>

              <button
                type="button"
                className={
                  styles.formWhatsapp
                }
                onClick={
                  handleWhatsApp
                }
                aria-label="Contactar por WhatsApp"
              >
                <WhatsappLogo
                  size={20}
                  weight="fill"
                />

                <span>
                  WhatsApp
                </span>
              </button>
            </div>

            {/* ===========================
                SUCCESS
            ============================ */}

            {sent && (
              <div
                className={
                  styles.success
                }
                role="status"
              >
                <span>
                  <Check
                    size={13}
                    weight="bold"
                  />
                </span>

                <p>
                  Datos enviados
                  correctamente.
                  Pronto podremos
                  comunicarnos contigo.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
"use client";

import {
  ArrowRight,
  CaretDown,
  Phone,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

import styles from "./FaqSection.module.css";

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const PHONE_NUMBER = "51971069763";

const WHATSAPP_URL =
  `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    "Hola, deseo recibir más información sobre Zagari Resort Club.",
  )}`;

const PHONE_URL =
  `tel:+${PHONE_NUMBER}`;

/* =========================================================
   TIPOS
========================================================= */

type FAQ = {
  question: string;
  answer: string;
  cta?: "whatsapp" | "phone";
  ctaLabel?: string;
};

/* =========================================================
   FAQs HOME
========================================================= */

const faqs: FAQ[] = [
  {
    question:
      "¿Qué es Zagari Resort Club?",
    answer:
      "Zagari es una propuesta pensada para quienes buscan descanso, naturaleza, experiencias y espacios para disfrutar en familia en un entorno diferente a la rutina de la ciudad.",
  },
  {
    question:
      "¿Cómo puedo conocer Zagari Resort Club?",
    answer:
      "Puedes coordinar una visita con nuestro equipo comercial. Te ayudaremos con la ubicación, disponibilidad para visitar el proyecto y toda la información que necesites antes de llegar.",
    cta: "whatsapp",
    ctaLabel:
      "Coordinar una visita por WhatsApp",
  },
  {
    question:
      "¿Dónde puedo consultar precios y disponibilidad?",
    answer:
      "Los precios y la disponibilidad pueden variar según las opciones vigentes. Nuestro equipo puede brindarte información actualizada y orientarte de acuerdo con lo que estás buscando.",
    cta: "whatsapp",
    ctaLabel:
      "Consultar disponibilidad",
  },
  {
    question:
      "¿Puedo recibir asesoría antes de visitar el proyecto?",
    answer:
      "Sí. Puedes conversar directamente con un asesor para resolver tus dudas, conocer mejor el proyecto y evaluar qué alternativa puede ajustarse a lo que buscas.",
    cta: "phone",
    ctaLabel:
      "Hablar con un asesor",
  },
  {
    question:
      "¿Cómo puedo obtener más información sobre Zagari?",
    answer:
      "Puedes escribirnos por WhatsApp, llamarnos o visitar nuestra sección completa de preguntas frecuentes, donde encontrarás información adicional sobre el proyecto y el proceso de atención.",
    cta: "whatsapp",
    ctaLabel:
      "Escribir a Zagari",
  },
];

/* =========================================================
   COMPONENTE
========================================================= */

export default function FaqSection() {
  const [
    openIndex,
    setOpenIndex,
  ] = useState<number | null>(0);

  const toggleFAQ = (
    index: number,
  ) => {
    setOpenIndex(
      openIndex === index
        ? null
        : index,
    );
  };

  return (
    <section
      className={styles.section}
      id="preguntas-frecuentes"
      aria-labelledby="faq-title"
    >
      <div
        className={styles.container}
      >
        {/* =================================================
            HEADER
        ================================================== */}

        <div
          className={styles.layout}
        >
          <header
            className={styles.header}
          >
            <span
              className={styles.eyebrow}
            >
              Preguntas frecuentes
            </span>

            <h2 id="faq-title">
              Antes de vivirlo,
              <span>
                {" "}
                quizá quieras
                saber esto.
              </span>
            </h2>

            <p>
              Resolvemos algunas
              de las dudas más
              comunes para que
              conozcas Zagari con
              mayor claridad.
            </p>

            {/* =============================================
                CONTACTO DESKTOP
            ============================================== */}

            <div
              className={
                styles.contactBlock
              }
            >
              <span>
                ¿Prefieres
                conversar?
              </span>

              <div
                className={
                  styles.contactActions
                }
              >
                <a
                  href={
                    WHATSAPP_URL
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    styles.contactLink
                  }
                >
                  <WhatsappLogo
                    size={18}
                    weight="fill"
                  />

                  WhatsApp
                </a>

                <a
                  href={
                    PHONE_URL
                  }
                  className={
                    styles.contactLink
                  }
                >
                  <Phone
                    size={17}
                    weight="fill"
                  />

                  Llamar
                </a>
              </div>
            </div>
          </header>

          {/* =================================================
              FAQ LIST
          ================================================== */}

          <div
            className={styles.faqArea}
          >
            <div
              className={styles.faqList}
            >
              {faqs.map(
                (
                  faq,
                  index,
                ) => {
                  const isOpen =
                    openIndex ===
                    index;

                  return (
                    <article
                      key={
                        faq.question
                      }
                      className={`${styles.faqItem} ${
                        isOpen
                          ? styles.faqItemOpen
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={
                          styles.question
                        }
                        onClick={() =>
                          toggleFAQ(
                            index,
                          )
                        }
                        aria-expanded={
                          isOpen
                        }
                      >
                        <span
                          className={
                            styles.questionNumber
                          }
                        >
                          {String(
                            index +
                              1,
                          ).padStart(
                            2,
                            "0",
                          )}
                        </span>

                        <span
                          className={
                            styles.questionText
                          }
                        >
                          {
                            faq.question
                          }
                        </span>

                        <span
                          className={
                            styles.icon
                          }
                        >
                          <CaretDown
                            size={18}
                            weight="bold"
                          />
                        </span>
                      </button>

                      <div
                        className={
                          styles.answerWrapper
                        }
                      >
                        <div
                          className={
                            styles.answer
                          }
                        >
                          <p>
                            {
                              faq.answer
                            }
                          </p>

                          {faq.cta ===
                            "whatsapp" && (
                            <a
                              href={
                                WHATSAPP_URL
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className={
                                styles.answerLink
                              }
                            >
                              <WhatsappLogo
                                size={
                                  16
                                }
                                weight="fill"
                              />

                              {
                                faq.ctaLabel
                              }

                              <ArrowRight
                                size={
                                  15
                                }
                                weight="bold"
                              />
                            </a>
                          )}

                          {faq.cta ===
                            "phone" && (
                            <a
                              href={
                                PHONE_URL
                              }
                              className={
                                styles.answerLink
                              }
                            >
                              <Phone
                                size={
                                  15
                                }
                                weight="fill"
                              />

                              {
                                faq.ctaLabel
                              }

                              <ArrowRight
                                size={
                                  15
                                }
                                weight="bold"
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                },
              )}
            </div>

            {/* =================================================
                VER TODAS
            ================================================== */}

            <div
              className={
                styles.moreRow
              }
            >
              <div
                className={
                  styles.moreText
                }
              >
                <span>
                  ¿Tienes otra
                  pregunta?
                </span>

                <p>
                  Encuentra más
                  respuestas en
                  nuestra sección
                  completa.
                </p>
              </div>

              <Link
                href="/faq"
                className={
                  styles.moreButton
                }
              >
                Ver todas las
                preguntas

                <ArrowRight
                  size={17}
                  weight="bold"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import type {
  Metadata,
} from "next";

import styles from "./FaqPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata: Metadata = {
  title:
    "Preguntas frecuentes | Zagari Resort Club",

  description:
    "Conoce más sobre Zagari Resort Club: ubicación, amenidades, lotes, cabañas, financiamiento, visitas y atención personalizada.",
};

/* =========================================================
   CONFIG
========================================================= */

const PHONE_NUMBER =
  "51971069763";

const WHATSAPP_URL =
  `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    "Hola, deseo recibir información sobre Zagari Resort Club.",
  )}`;

const VISIT_WHATSAPP_URL =
  `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    "Hola, deseo coordinar una visita a Zagari Resort Club.",
  )}`;

const PHONE_URL =
  `tel:+${PHONE_NUMBER}`;

const GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/p8EkgxDp4M3pmgkv5";

/* =========================================================
   TYPES
========================================================= */

type FAQ = {
  question: string;

  answer: string;

  cta?: {
    label: string;
    href: string;
    external?: boolean;
  };
};

type Category = {
  id: string;

  name: string;

  title: string;

  description: string;

  questions: FAQ[];
};

/* =========================================================
   DATA
========================================================= */

const categories: Category[] = [
  {
    id: "proyecto",

    name:
      "Proyecto",

    title:
      "Conoce Zagari",

    description:
      "Lo esencial sobre el concepto, sus espacios y la experiencia Resort Club.",

    questions: [
      {
        question:
          "¿Qué es Zagari Resort Club?",

        answer:
          "Zagari Resort Club es un proyecto que integra lotes, naturaleza, alojamiento tipo lodge y un Resort Club con espacios diseñados para descanso, recreación y experiencias en contacto con el entorno.",
      },

      {
        question:
          "¿Qué amenidades tendrá el Resort Club?",

        answer:
          "El proyecto contempla más de 20 amenidades, entre ellas piscina infinita, bar piscina, restaurante bar, gimnasio, mini tenis, cancha de fútbol y vóley, camping, spa, yoga, biohuerto, mini golf, zona de parrillas, zona de niños y otros espacios recreativos.",

        cta: {
          label:
            "Conocer amenidades",

          href:
            WHATSAPP_URL,

          external:
            true,
        },
      },

      {
        question:
          "¿Zagari cuenta con biohuerto?",

        answer:
          "Sí. El biohuerto forma parte de la propuesta del proyecto y está pensado como un espacio para reconectar con la naturaleza y vivir la experiencia de sembrar y cosechar alimentos.",
      },
    ],
  },

  {
    id: "inversion",

    name:
      "Lotes e inversión",

    title:
      "Tu espacio en Zagari",

    description:
      "Disponibilidad, acceso al Resort Club y alternativas para adquirir un lote.",

    questions: [
      {
        question:
          "¿Actualmente hay lotes disponibles?",

        answer:
          "Zagari se encuentra promocionando su segunda etapa en preventa. La disponibilidad puede cambiar, por lo que recomendamos solicitar información actualizada directamente con un asesor.",

        cta: {
          label:
            "Consultar disponibilidad",

          href:
            WHATSAPP_URL,

          external:
            true,
        },
      },

      {
        question:
          "¿Al comprar un lote tengo acceso al Resort Club?",

        answer:
          "La propuesta comercial de Zagari contempla acceso al Resort Club para propietarios, permitiéndoles disfrutar de las amenidades y espacios que forman parte del proyecto. Consulta las condiciones vigentes con un asesor.",

        cta: {
          label:
            "Consultar condiciones",

          href:
            WHATSAPP_URL,

          external:
            true,
        },
      },

      {
        question:
          "¿Existen facilidades de pago?",

        answer:
          "Sí. El proyecto comunica crédito directo con facilidades de pago de hasta 18 meses, además de asesoría personalizada. Las condiciones dependen de la alternativa elegida y deben confirmarse al momento de cotizar.",

        cta: {
          label:
            "Solicitar cotización",

          href:
            WHATSAPP_URL,

          external:
            true,
        },
      },
    ],
  },

  {
    id: "cabanas",

    name:
      "Cabañas",

    title:
      "Construye y disfruta",

    description:
      "Alternativas de alojamiento pensadas para uso personal y experiencias dentro de Zagari.",

    questions: [
      {
        question:
          "¿Puedo construir una cabaña en mi lote?",

        answer:
          "La propuesta de Zagari contempla la posibilidad de adquirir un lote y desarrollar una cabaña tipo lodge para disfrutarla como espacio de descanso o vacaciones.",
      },

      {
        question:
          "¿Qué tipos de cabaña propone Zagari?",

        answer:
          "El proyecto presenta alternativas referenciales de cabañas de 1, 2 y 3 habitaciones, permitiendo elegir una propuesta según el uso y las necesidades de cada propietario.",
      },

      {
        question:
          "¿Puedo generar ingresos alquilando mi cabaña?",

        answer:
          "La propuesta comercial contempla la posibilidad de alquilar la cabaña mediante plataformas de alojamiento. Antes de invertir, solicita al equipo comercial las condiciones y alcances vigentes.",

        cta: {
          label:
            "Hablar sobre inversión",

          href:
            WHATSAPP_URL,

          external:
            true,
        },
      },
    ],
  },

  {
    id: "ubicacion",

    name:
      "Ubicación",

    title:
      "Llegar a Zagari",

    description:
      "Referencias, tiempos aproximados y opciones para coordinar una visita.",

    questions: [
      {
        question:
          "¿A qué distancia está Zagari de San Ramón?",

        answer:
          "De acuerdo con la información del proyecto, Zagari se encuentra aproximadamente a 15 minutos de San Ramón y de la Carretera Central.",

        cta: {
          label:
            "Ver ubicación",

          href:
            GOOGLE_MAPS_URL,

          external:
            true,
        },
      },

      {
        question:
          "¿Qué referencias encontraré durante el recorrido?",

        answer:
          "Durante la ruta se encuentran referencias como Fundo Selenita, Iglesia Chincana y Escuela Chincana. El proyecto también se ubica aproximadamente a 3 minutos del Mirador El Mishasho.",
      },

      {
        question:
          "¿Cómo puedo coordinar una visita?",

        answer:
          "Puedes comunicarte directamente con el equipo de Zagari para acordar el día de visita y recibir las indicaciones necesarias antes de desplazarte al proyecto.",

        cta: {
          label:
            "Agendar visita",

          href:
            VISIT_WHATSAPP_URL,

          external:
            true,
        },
      },
    ],
  },

  {
    id: "respaldo",

    name:
      "Respaldo",

    title:
      "Antes de decidir",

    description:
      "Información sobre el desarrollo del proyecto y la atención comercial.",

    questions: [
      {
        question:
          "¿Quién desarrolla Zagari Resort Club?",

        answer:
          "Zagari forma parte de los proyectos desarrollados a través de Ancosur. La empresa comunica más de 10 años de experiencia en desarrollo inmobiliario en el centro del país.",
      },

      {
        question:
          "¿Las imágenes representan exactamente el resultado final?",

        answer:
          "No necesariamente. Las imágenes del material comercial son referenciales y pueden estar sujetas a variaciones durante el desarrollo del proyecto.",
      },

      {
        question:
          "¿Puedo recibir asesoría antes de tomar una decisión?",

        answer:
          "Sí. Puedes solicitar atención personalizada para revisar disponibilidad, condiciones comerciales, alternativas de pago y resolver dudas antes de avanzar.",

        cta: {
          label:
            "Hablar con un asesor",

          href:
            WHATSAPP_URL,

          external:
            true,
        },
      },
    ],
  },
];

/* =========================================================
   FAQ ITEM
========================================================= */

function FAQItem({
  faq,
}: {
  faq: FAQ;
}) {
  return (
    <details
      className={
        styles.faqItem
      }
    >
      <summary
        className={
          styles.question
        }
      >
        <span
          className={
            styles.questionText
          }
        >
          {faq.question}
        </span>

        <span
          className={
            styles.toggle
          }
          aria-hidden="true"
        >
          <span />

          <span />
        </span>
      </summary>

      <div
        className={
          styles.answer
        }
      >
        <p>
          {faq.answer}
        </p>

        {faq.cta && (
          <a
            href={
              faq.cta.href
            }
            target={
              faq.cta.external
                ? "_blank"
                : undefined
            }
            rel={
              faq.cta.external
                ? "noopener noreferrer"
                : undefined
            }
            className={
              styles.answerLink
            }
          >
            <span>
              {faq.cta.label}
            </span>

            <span
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        )}
      </div>
    </details>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function FaqPage() {
  return (
    <main
      className={
        styles.page
      }
    >
      {/* ===================================================
          HERO
      ==================================================== */}

      <section
        className={
          styles.hero
        }
      >
        <div
          className={
            styles.container
          }
        >
          <div
            className={
              styles.heroGrid
            }
          >
            <div
              className={
                styles.heroMain
              }
            >
              <div
                className={
                  styles.eyebrow
                }
              >
                <span
                  className={
                    styles.eyebrowLine
                  }
                  aria-hidden="true"
                />

                Preguntas frecuentes
              </div>

              <h1>
                Todo lo que necesitas

                <span>
                  {" "}
                  saber antes de elegir Zagari.
                </span>
              </h1>
            </div>

            <div
              className={
                styles.heroAside
              }
            >
              <p>
                Resolvemos las principales
                dudas sobre lotes, Resort
                Club, cabañas, ubicación y
                condiciones comerciales.
              </p>

              <a
                href={
                  WHATSAPP_URL
                }
                target="_blank"
                rel="noopener noreferrer"
                className={
                  styles.heroWhatsapp
                }
              >
                <span
                  className={
                    styles.whatsappDot
                  }
                  aria-hidden="true"
                />

                <span>
                  Hablar con un asesor
                </span>

                <span
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          CATEGORY NAV

          IMPORTANTE:
          YA NO ES STICKY.
      ==================================================== */}

      <nav
        className={
          styles.categoryNav
        }
        aria-label="Categorías de preguntas frecuentes"
      >
        <div
          className={
            styles.container
          }
        >
          <div
            className={
              styles.categoryScroll
            }
          >
            {categories.map(
              (category) => (
                <a
                  key={
                    category.id
                  }
                  href={`#${category.id}`}
                  className={
                    styles.categoryLink
                  }
                >
                  {category.name}
                </a>
              ),
            )}
          </div>
        </div>
      </nav>

      {/* ===================================================
          QUESTIONS
      ==================================================== */}

      <section
        className={
          styles.faqSection
        }
      >
        <div
          className={
            styles.container
          }
        >
          <div
            className={
              styles.groups
            }
          >
            {categories.map(
              (category) => (
                <section
                  key={
                    category.id
                  }
                  id={
                    category.id
                  }
                  className={
                    styles.group
                  }
                >
                  <header
                    className={
                      styles.groupHeader
                    }
                  >
                    <span
                      className={
                        styles.groupEyebrow
                      }
                    >
                      {category.name}
                    </span>

                    <h2>
                      {category.title}
                    </h2>

                    <p>
                      {category.description}
                    </p>
                  </header>

                  <div
                    className={
                      styles.faqList
                    }
                  >
                    {category.questions.map(
                      (faq) => (
                        <FAQItem
                          key={
                            faq.question
                          }
                          faq={
                            faq
                          }
                        />
                      ),
                    )}
                  </div>
                </section>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          CONTACT
      ==================================================== */}

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
          <div
            className={
              styles.contactCard
            }
          >
            <div
              className={
                styles.contactDecoration
              }
              aria-hidden="true"
            >
              <span
                className={
                  styles.colorGreen
                }
              />

              <span
                className={
                  styles.colorYellow
                }
              />

              <span
                className={
                  styles.colorMagenta
                }
              />

              <span
                className={
                  styles.colorBlue
                }
              />
            </div>

            <div
              className={
                styles.contactCopy
              }
            >
              <span
                className={
                  styles.contactEyebrow
                }
              >
                Atención personalizada
              </span>

              <h2>
                ¿Aún tienes

                <span>
                  {" "}
                  alguna duda?
                </span>
              </h2>

              <p>
                Nuestro equipo puede ayudarte
                con disponibilidad, precios,
                financiamiento y visitas al
                proyecto.
              </p>
            </div>

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
                  styles.primaryButton
                }
              >
                <span>
                  Escribir por WhatsApp
                </span>

                <span
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>

              <a
                href={
                  PHONE_URL
                }
                className={
                  styles.phoneButton
                }
              >
                <span>
                  Llamar al 971 069 763
                </span>

                <span
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
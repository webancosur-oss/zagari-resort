import type { Metadata } from "next";

import styles from "./FaqPage.module.css";

/* =========================================================
   SEO
========================================================= */

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Zagari Resort Club",
  description:
    "Conoce más sobre Zagari Resort Club: ubicación, amenidades, lotes, cabañas, financiamiento, visitas y atención personalizada.",
};

/* =========================================================
   CONFIGURACIÓN
========================================================= */

const PHONE_NUMBER = "51971069763";

const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
  "Hola, deseo recibir información sobre Zagari Resort Club.",
)}`;

const VISIT_WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
  "Hola, deseo coordinar una visita a Zagari Resort Club.",
)}`;

const PHONE_URL = `tel:+${PHONE_NUMBER}`;

const GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/p8EkgxDp4M3pmgkv5";

/* =========================================================
   TIPOS
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
  number: string;
  name: string;
  title: string;
  questions: FAQ[];
};

/* =========================================================
   PREGUNTAS
========================================================= */

const categories: Category[] = [
  {
    id: "proyecto",
    number: "01",
    name: "Proyecto",
    title: "Conoce Zagari",
    questions: [
      {
        question: "¿Qué es Zagari Resort Club?",
        answer:
          "Zagari Resort Club es un proyecto que integra lotes, naturaleza, alojamiento tipo lodge y un Resort Club con espacios diseñados para descanso, recreación y experiencias en contacto con el entorno.",
      },
      {
        question: "¿Qué amenidades tendrá el Resort Club?",
        answer:
          "El proyecto contempla más de 20 amenidades, entre ellas piscina infinita, bar piscina, restaurante bar, gimnasio, mini tenis, cancha de fútbol y vóley, camping, spa, yoga, biohuerto, mini golf, zona de parrillas, zona de niños y otros espacios recreativos.",
        cta: {
          label: "Quiero conocer las amenidades",
          href: WHATSAPP_URL,
          external: true,
        },
      },
      {
        question: "¿Zagari cuenta con biohuerto?",
        answer:
          "Sí. El biohuerto forma parte de la propuesta del proyecto y está pensado como un espacio para reconectar con la naturaleza y vivir la experiencia de sembrar y cosechar alimentos.",
      },
    ],
  },

  {
    id: "inversion",
    number: "02",
    name: "Lotes e inversión",
    title: "Tu espacio en Zagari",
    questions: [
      {
        question: "¿Actualmente hay lotes disponibles?",
        answer:
          "Zagari se encuentra promocionando su segunda etapa en preventa. La disponibilidad puede cambiar, por lo que recomendamos solicitar información actualizada directamente con un asesor.",
        cta: {
          label: "Consultar disponibilidad",
          href: WHATSAPP_URL,
          external: true,
        },
      },
      {
        question: "¿Al comprar un lote tengo acceso al Resort Club?",
        answer:
          "La propuesta comercial de Zagari contempla acceso al Resort Club para propietarios, permitiéndoles disfrutar de las amenidades y espacios que forman parte del proyecto. Consulta las condiciones vigentes con un asesor.",
        cta: {
          label: "Consultar condiciones",
          href: WHATSAPP_URL,
          external: true,
        },
      },
      {
        question: "¿Existen facilidades de pago?",
        answer:
          "Sí. El proyecto comunica crédito directo con facilidades de pago de hasta 18 meses, además de asesoría personalizada. Las condiciones dependen de la alternativa elegida y deben confirmarse al momento de cotizar.",
        cta: {
          label: "Solicitar una cotización",
          href: WHATSAPP_URL,
          external: true,
        },
      },
    ],
  },

  {
    id: "cabanas",
    number: "03",
    name: "Cabañas",
    title: "Construye y disfruta",
    questions: [
      {
        question: "¿Puedo construir una cabaña en mi lote?",
        answer:
          "La propuesta de Zagari contempla la posibilidad de adquirir un lote y desarrollar una cabaña tipo lodge para disfrutarla como espacio de descanso o vacaciones.",
      },
      {
        question: "¿Qué tipos de cabaña propone Zagari?",
        answer:
          "El proyecto presenta alternativas referenciales de cabañas de 1, 2 y 3 habitaciones, permitiendo elegir una propuesta según el uso y las necesidades de cada propietario.",
      },
      {
        question: "¿Puedo generar ingresos alquilando mi cabaña?",
        answer:
          "La propuesta comercial contempla la posibilidad de alquilar la cabaña mediante plataformas de alojamiento. Antes de invertir, solicita al equipo comercial las condiciones y alcances vigentes.",
        cta: {
          label: "Hablar sobre inversión",
          href: WHATSAPP_URL,
          external: true,
        },
      },
    ],
  },

  {
    id: "ubicacion",
    number: "04",
    name: "Ubicación",
    title: "Llegar a Zagari",
    questions: [
      {
        question: "¿A qué distancia está Zagari de San Ramón?",
        answer:
          "De acuerdo con la información del proyecto, Zagari se encuentra aproximadamente a 15 minutos de San Ramón y de la Carretera Central.",
        cta: {
          label: "Ver ubicación en Google Maps",
          href: GOOGLE_MAPS_URL,
          external: true,
        },
      },
      {
        question: "¿Qué referencias encontraré durante el recorrido?",
        answer:
          "Durante la ruta se encuentran referencias como Fundo Selenita, Iglesia Chincana y Escuela Chincana. El proyecto también se ubica aproximadamente a 3 minutos del Mirador El Mishasho.",
      },
      {
        question: "¿Cómo puedo coordinar una visita?",
        answer:
          "Puedes comunicarte directamente con el equipo de Zagari para acordar el día de visita y recibir las indicaciones necesarias antes de desplazarte al proyecto.",
        cta: {
          label: "Agendar mi visita",
          href: VISIT_WHATSAPP_URL,
          external: true,
        },
      },
    ],
  },

  {
    id: "respaldo",
    number: "05",
    name: "Respaldo",
    title: "Antes de decidir",
    questions: [
      {
        question: "¿Quién desarrolla Zagari Resort Club?",
        answer:
          "Zagari forma parte de los proyectos desarrollados a través de Ancosur. La empresa comunica más de 10 años de experiencia en desarrollo inmobiliario en el centro del país.",
      },
      {
        question: "¿Las imágenes representan exactamente el resultado final?",
        answer:
          "No necesariamente. Las imágenes del material comercial son referenciales y pueden estar sujetas a variaciones durante el desarrollo del proyecto.",
      },
      {
        question: "¿Puedo recibir asesoría antes de tomar una decisión?",
        answer:
          "Sí. Puedes solicitar atención personalizada para revisar disponibilidad, condiciones comerciales, alternativas de pago y resolver dudas antes de avanzar.",
        cta: {
          label: "Hablar con un asesor",
          href: WHATSAPP_URL,
          external: true,
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
  index,
}: {
  faq: FAQ;
  index: number;
}) {
  return (
    <details className={styles.faqItem}>
      <summary className={styles.question}>
        <span className={styles.questionNumber}>
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className={styles.questionText}>
          {faq.question}
        </span>

        <span
          className={styles.toggle}
          aria-hidden="true"
        >
          <span />
          <span />
        </span>
      </summary>

      <div className={styles.answer}>
        <p>{faq.answer}</p>

        {faq.cta && (
          <a
            href={faq.cta.href}
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
            className={styles.answerLink}
          >
            {faq.cta.label}

            <span aria-hidden="true">
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
    <main className={styles.page}>
      {/* ===================================================
          HERO
      ==================================================== */}

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroMain}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowLine} />

                Preguntas frecuentes
              </div>

              <h1>
                Respuestas claras
                <span>
                  {" "}
                  antes de elegir Zagari.
                </span>
              </h1>
            </div>

            <div className={styles.heroAside}>
              <p>
                Lotes, Resort Club, cabañas, ubicación,
                financiamiento y visitas. Encuentra aquí la
                información esencial del proyecto.
              </p>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroWhatsapp}
              >
                <span className={styles.whatsappDot} />

                Hablar con un asesor

                <span aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* ===============================================
              QUICK INFO
          ================================================ */}

          <div className={styles.quickFacts}>
            <div className={styles.quickFact}>
              <strong>+20</strong>

              <span>
                amenidades
              </span>
            </div>

            <div className={styles.quickFact}>
              <strong>15 min</strong>

              <span>
                desde San Ramón
              </span>
            </div>

            <div className={styles.quickFact}>
              <strong>1 · 2 · 3</strong>

              <span>
                habitaciones
              </span>
            </div>

            <div className={styles.quickFact}>
              <strong>18 meses</strong>

              <span>
                crédito directo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          CATEGORY NAV
      ==================================================== */}

      <nav
        className={styles.categoryNav}
        aria-label="Categorías de preguntas"
      >
        <div className={styles.container}>
          <div className={styles.categoryScroll}>
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className={styles.categoryLink}
              >
                <span>
                  {category.number}
                </span>

                {category.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ===================================================
          FAQ GROUPS
      ==================================================== */}

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.groups}>
            {categories.map((category) => (
              <section
                key={category.id}
                id={category.id}
                className={styles.group}
              >
                <header className={styles.groupHeader}>
                  <span className={styles.groupNumber}>
                    {category.number}
                  </span>

                  <div>
                    <span className={styles.groupEyebrow}>
                      {category.name}
                    </span>

                    <h2>
                      {category.title}
                    </h2>
                  </div>
                </header>

                <div className={styles.faqList}>
                  {category.questions.map(
                    (faq, index) => (
                      <FAQItem
                        key={faq.question}
                        faq={faq}
                        index={index}
                      />
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          CONTACT CTA
      ==================================================== */}

      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactCard}>
            <div className={styles.contactDecoration}>
              <span className={styles.colorGreen} />
              <span className={styles.colorYellow} />
              <span className={styles.colorMagenta} />
              <span className={styles.colorBlue} />
            </div>

            <div className={styles.contactCopy}>
              <span className={styles.contactEyebrow}>
                Atención personalizada
              </span>

              <h2>
                ¿Hay algo que
                <span>
                  {" "}
                  prefieres conversar?
                </span>
              </h2>

              <p>
                Nuestro equipo puede ayudarte con precios,
                disponibilidad, visitas y alternativas de
                financiamiento.
              </p>
            </div>

            <div className={styles.contactActions}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                Escribir por WhatsApp

                <span aria-hidden="true">
                  →
                </span>
              </a>

              <a
                href={PHONE_URL}
                className={styles.phoneButton}
              >
                Llamar al 971 069 763

                <span aria-hidden="true">
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
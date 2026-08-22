"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  Bed,
  CheckCircle,
  House,
  Percent,
  Sparkle,
  TrendUp,
} from "@phosphor-icons/react";

import styles from "./ProjectPage.module.css";

const cabins = [
  {
    id: "01",
    title: "Cabaña 1 habitación",
    description:
      "Ideal para parejas o escapadas de descanso. Un formato íntimo, funcional y rodeado de naturaleza.",
    image: "/assets/cabins/cabania-1-habitacion.png",
    badge: "1 habitación",
  },
  {
    id: "02",
    title: "Cabaña 2 habitaciones",
    description:
      "Más espacio para compartir en familia o con amigos sin perder privacidad ni conexión con el entorno.",
    image: "/assets/cabins/cabania-2-habitaciones.png",
    badge: "2 habitaciones",
  },
  {
    id: "03",
    title: "Cabaña 3 habitaciones",
    description:
      "Una propuesta amplia para disfrutar estadías más largas y una experiencia completa dentro de Zagari.",
    image: "/assets/cabins/cabania-3-habitaciones.png",
    badge: "3 habitaciones",
  },
];

const benefits = [
  {
    icon: House,
    title: "Compra tu lote",
    text: "Forma parte de Zagari Resort Club con un espacio propio en San Ramón.",
  },
  {
    icon: Sparkle,
    title: "Acceso al Resort Club",
    text: "Disfruta acceso gratuito al club y a más de 20 amenidades del proyecto.",
  },
  {
    icon: Percent,
    title: "30% de descuento",
    text: "Obtén beneficios especiales en productos seleccionados dentro de Zagari.",
  },
  {
    icon: TrendUp,
    title: "Convierte tu inversión en ingresos",
    text: "Construye tu cabaña y evalúa alquilarla en plataformas de hospedaje como Airbnb.",
  },
];

export default function ProjectPage() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <Image
          src="/assets/amenities/element-aire-mirador.webp"
          alt="Zagari Resort Club en San Ramón"
          fill
          priority
          className={styles.heroImage}
        />

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            ZAGARI RESORT CLUB · SAN RAMÓN
          </span>

          <h1>
            Invierte en naturaleza.
            <span> Disfrútala. Hazla crecer.</span>
          </h1>

          <p>
            Compra tu lote, construye tu cabaña y forma parte de un resort
            club con más de 20 amenidades, beneficios exclusivos y una
            propuesta pensada para disfrutar e invertir.
          </p>

          <div className={styles.heroActions}>
            <Link href="#cabanas" className={styles.secondaryButton}>
              Conocer cabañas
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className={styles.intro}>
        <div className={styles.introHeading}>
          <span>UN PROYECTO, DOS FORMAS DE VIVIRLO</span>

          <h2>
            Tu lote hoy.
            <br />
            <strong>Tu cabaña mañana.</strong>
          </h2>
        </div>

        <div className={styles.introCopy}>
          <p>
            Zagari combina inversión inmobiliaria, naturaleza y experiencia
            resort en un solo concepto.
          </p>

          <p>
            Puedes adquirir tu lote, disfrutar los beneficios del club y,
            cuando decidas construir, convertirlo en una cabaña para uso
            personal o para generar ingresos por alquiler.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className={styles.benefits}>
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <article key={benefit.title} className={styles.benefitItem}>
              <span className={styles.benefitIcon}>
                <Icon size={22} weight="duotone" />
              </span>

              <h3>{benefit.title}</h3>

              <p>{benefit.text}</p>
            </article>
          );
        })}
      </section>

      {/* INVESTMENT */}
      <section className={styles.investment}>
        <div className={styles.investmentMedia}>
          <Image
            src="/assets/amenities/cabanias-alojamiento.webp"
            alt="Cabañas de Zagari Resort Club"
            fill
            className={styles.coverImage}
          />
        </div>

        <div className={styles.investmentContent}>
          <span className={styles.sectionLabel}>
            INVERSIÓN QUE PUEDE GENERAR INGRESOS
          </span>

          <h2>
            Alquila tu cabaña
            <span> y deja que tu inversión trabaje para ti.</span>
          </h2>

          <p>
            Construye una cabaña dentro de Zagari y evalúa ofrecerla en
            plataformas de hospedaje como Airbnb para generar ingresos cuando
            no la estés utilizando.
          </p>

          <div className={styles.investmentPoints}>
            <span>
              <CheckCircle size={17} weight="fill" />
              Uso personal y potencial de alquiler
            </span>

            <span>
              <CheckCircle size={17} weight="fill" />
              Entorno turístico de San Ramón
            </span>

            <span>
              <CheckCircle size={17} weight="fill" />
              Acceso a experiencias y amenidades del resort
            </span>
          </div>

          <small className={styles.disclaimer}>
            La rentabilidad, ocupación e ingresos dependen de la operación,
            demanda y condiciones del mercado. No constituyen una garantía de
            retorno.
          </small>
        </div>
      </section>

      {/* CABINS */}
      <section className={styles.cabins} id="cabanas">
        <header className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionLabel}>CABAÑAS ZAGARI</span>

            <h2>
              Elige cómo quieres
              <span> vivir la experiencia.</span>
            </h2>
          </div>

          <p>
            Tres formatos de cabaña pensados para diferentes formas de
            disfrutar, compartir e invertir.
          </p>
        </header>

        <div className={styles.cabinGrid}>
          {cabins.map((cabin) => (
            <article key={cabin.id} className={styles.cabinCard}>
              <div className={styles.cabinImageWrap}>
                <Image
                  src={cabin.image}
                  alt={cabin.title}
                  fill
                  className={styles.cabinImage}
                />

                <span className={styles.cabinBadge}>
                  <Bed size={14} />
                  {cabin.badge}
                </span>
              </div>

              <div className={styles.cabinContent}>
                <span>{cabin.id}</span>
                <h3>{cabin.title}</h3>
                <p>{cabin.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* RESORT ACCESS */}
      <section className={styles.club}>
        <div className={styles.clubContent}>
          <span className={styles.sectionLabel}>
            BENEFICIOS PARA PROPIETARIOS
          </span>

          <h2>
            Compra tu lote y
            <span> vive Zagari desde adentro.</span>
          </h2>

          <p>
            Ser propietario te conecta con una propuesta de descanso,
            naturaleza y experiencias dentro de Zagari Resort Club.
          </p>

          <div className={styles.clubStats}>
            <div>
              <strong>+20</strong>
              <span>Amenidades</span>
            </div>

            <div>
              <strong>30%</strong>
              <span>Descuento en productos seleccionados</span>
            </div>

            <div>
              <strong>Club</strong>
              <span>Acceso gratuito para propietarios</span>
            </div>
          </div>
        </div>

        <div className={styles.clubImage}>
          <Image
            src="/assets/amenities/element-agua-piscina-borde-infinito.webp"
            alt="Piscina de Zagari Resort Club"
            fill
            className={styles.coverImage}
          />
        </div>
      </section>

      {/* LOTS */}
      <section className={styles.lots} id="lotes">
        <div>
          <span className={styles.sectionLabel}>SEGUNDA ETAPA · PREVENTA</span>

          <h2>
            Elige tu lote.
            <span> Empieza tu próxima historia.</span>
          </h2>

          <p>
            Lotes desde 234 m² en un entorno natural pensado para disfrutar,
            construir e invertir.
          </p>
        </div>

        <Link href="/#lotes" className={styles.primaryButtonDark}>
          Ver disponibilidad
          <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
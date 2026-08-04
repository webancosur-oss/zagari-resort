import {
  ArrowRight,
  CheckCircle,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import styles from "./LotsSection.module.css";

const benefits = [
  "Segunda etapa en preventa",
  "Lotes desde 234 m²",
  "Acceso al Resort Club",
  "Más de 20 amenidades",
  "Entorno natural en San Ramón",
  "Financiamiento sujeto a evaluación",
];

export default function LotsSection() {
  return (
    <section
      className={styles.section}
      id="lotes"
      aria-labelledby="lots-section-title"
    >
      <div className={styles.intro}>
        <span>
          Segunda etapa · Preventa
        </span>

        <h2 id="lots-section-title">
          Un espacio propio en la
          Selva Central
        </h2>

        <p>
          Naturaleza, bienestar e inversión
          se encuentran en una propuesta
          pensada para construir una nueva
          forma de vivir.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.media}>
          <Image
            src="/assets/lots/zagari-lot.png"
            alt="Lotes rodeados de naturaleza en Zagari Resort Club, San Ramón"
            fill
            sizes="
              (max-width: 768px) 100vw,
              (max-width: 1100px) 100vw,
              56vw
            "
            className={styles.image}
          />

          <div
            className={styles.imageOverlay}
            aria-hidden="true"
          />

          <div className={styles.mediaTop}>
            <span>Segunda etapa</span>
            <strong>Preventa</strong>
          </div>

          <div className={styles.locationBadge}>
            <MapPin
              size={19}
              weight="fill"
              aria-hidden="true"
            />

            <div>
              <span>Ubicación</span>

              <strong>
                San Ramón · Selva Central
              </strong>
            </div>
          </div>

          <div className={styles.mediaCaption}>
            <span>
              Naturaleza, descanso e inversión
            </span>

            <strong>
              Construye una nueva forma de vivir
            </strong>
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.eyebrow}>
            Lotes Zagari Resort Club
          </span>

          <h3>
            Tu lote rodeado de naturaleza
          </h3>

          <p className={styles.description}>
            Adquiere un espacio propio y forma
            parte de una experiencia que
            combina descanso, bienestar,
            inversión y acceso a un Resort
            Club.
          </p>

          <div
            className={styles.stats}
            aria-label="Características principales de los lotes"
          >
            <div>
              <strong>234 m²</strong>
              <span>Área desde</span>
            </div>

            <div>
              <strong>525 m²</strong>
              <span>Área máxima</span>
            </div>

            <div>
              <strong>+20</strong>
              <span>Amenidades</span>
            </div>
          </div>

          <ul className={styles.benefits}>
            {benefits.map(
              (benefit) => (
                <li key={benefit}>
                  <CheckCircle
                    size={20}
                    weight="fill"
                    aria-hidden="true"
                  />

                  <span>{benefit}</span>
                </li>
              ),
            )}
          </ul>

          <div className={styles.actions}>
            <Link
              href="/lotes"
              className={styles.primaryButton}
            >
              Ver lotes disponibles

              <ArrowRight
                size={18}
                weight="bold"
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/contacto"
              className={
                styles.secondaryButton
              }
            >
              Solicitar asesoría
            </Link>
          </div>

          <p className={styles.disclaimer}>
            Disponibilidad, precios y
            condiciones sujetos a actualización
            y evaluación comercial.
          </p>
        </div>
      </div>
    </section>
  );
}
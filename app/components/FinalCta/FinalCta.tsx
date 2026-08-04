import {
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import styles from "./FinalCta.module.css";

export default function FinalCta() {
  return (
    <section
      className={styles.section}
      aria-labelledby="final-cta-title"
    >
      <div className={styles.content}>
        <span>
          Segunda etapa · Preventa
        </span>

        <h2 id="final-cta-title">
          Tu próxima historia puede comenzar
          en Zagari
        </h2>

        <p>
          Conoce los lotes disponibles y recibe
          asesoría personalizada para encontrar
          la mejor opción.
        </p>

        <div className={styles.actions}>
          <Link
            href="/contacto"
            className={styles.primaryButton}
          >
            Solicitar información

            <ArrowRight
              size={18}
              weight="bold"
              aria-hidden="true"
            />
          </Link>

          <a
            href="https://wa.me/51971069763?text=Hola%2C%20quiero%20recibir%20informaci%C3%B3n%20sobre%20Zagari%20Resort%20Club."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryButton}
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
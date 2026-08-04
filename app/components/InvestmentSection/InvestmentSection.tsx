import {
  ArrowRight,
  Buildings,
  Sparkle,
  Tree,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import styles from "./InvestmentSection.module.css";

export default function InvestmentSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="investment-title"
    >
      <div className={styles.container}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>
            Una inversión diferente
          </span>

          <h2 id="investment-title">
            Invierte en naturaleza, bienestar
            y nuevas oportunidades
          </h2>
        </div>

        <div className={styles.content}>
          <p>
            Zagari combina el valor de un lote
            propio con la posibilidad de
            construir una cabaña para uso
            personal o alquiler vacacional.
          </p>

          <div className={styles.features}>
            <div>
              <Tree
                size={27}
                weight="duotone"
                aria-hidden="true"
              />

              <strong>Entorno natural</strong>

              <span>
                Un proyecto rodeado de la
                riqueza de la Selva Central.
              </span>
            </div>

            <div>
              <Buildings
                size={27}
                weight="duotone"
                aria-hidden="true"
              />

              <strong>Cabaña propia</strong>

              <span>
                Construye un espacio para
                disfrutar o alquilar.
              </span>
            </div>

            <div>
              <Sparkle
                size={27}
                weight="duotone"
                aria-hidden="true"
              />

              <strong>Resort Club</strong>

              <span>
                Accede a experiencias y más de
                veinte amenidades.
              </span>
            </div>
          </div>

          <Link
            href="/inversion"
            className={styles.button}
          >
            Conoce la oportunidad

            <ArrowRight
              size={18}
              weight="bold"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
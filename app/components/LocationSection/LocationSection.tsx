import {
  ArrowRight,
  Leaf,
  MapPin,
  Mountains,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import styles from "./LocationSection.module.css";

export default function LocationSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="location-title"
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            Ubicación privilegiada
          </span>

          <h2 id="location-title">
            Cerca de San Ramón. Rodeado de
            naturaleza.
          </h2>

          <p>
            Zagari Resort Club se encuentra a
            aproximadamente 15 minutos de San
            Ramón y la Carretera Central, en
            una ubicación que combina
            accesibilidad y belleza natural.
          </p>

          <div className={styles.points}>
            <span>
              <Mountains
                size={20}
                weight="fill"
                aria-hidden="true"
              />

              Mirador El Mishasho
            </span>

            <span>
              <MapPin
                size={20}
                weight="fill"
                aria-hidden="true"
              />

              Anexo de Chincana
            </span>

            <span>
              <Leaf
                size={20}
                weight="fill"
                aria-hidden="true"
              />

              Selva Central
            </span>
          </div>

          <Link
            href="/ubicacion"
            className={styles.button}
          >
            Ver ubicación

            <ArrowRight
              size={18}
              weight="bold"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className={styles.media}>
          <Image
            src="/assets/location/san-ramon.webp"
            alt="Paisaje natural de San Ramón en la Selva Central"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.image}
          />

          <div className={styles.tag}>
            <MapPin
              size={20}
              weight="fill"
              aria-hidden="true"
            />

            <div>
              <span>Proyecto</span>
              <strong>
                Zagari Resort Club
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
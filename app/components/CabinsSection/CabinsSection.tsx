import {
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

import styles from "./CabinsSection.module.css";

export default function CabinsSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="cabins-title"
    >
      <Image
        src="/assets/amenities/miradores-senderos.png"
        alt=""
        fill
        sizes="100vw"
        className={styles.background}
      />

      <div
        className={styles.overlay}
        aria-hidden="true"
      />

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            Vacaciona, construye y gana
          </span>

          <h2 id="cabins-title">
            Construye una cabaña que también
            trabaje para ti
          </h2>

          <p>
            Adquiere tu lote, construye una
            cabaña tipo lodge y crea un espacio
            para vacacionar, compartir o
            generar ingresos mediante alquiler.
          </p>

          <div className={styles.types}>
            <span>1 habitación</span>
            <span>2 habitaciones</span>
            <span>3 habitaciones</span>
          </div>

          <Link
            href="/cabanas"
            className={styles.button}
          >
            Conoce las cabañas

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
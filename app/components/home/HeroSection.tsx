"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";

import styles from "./HeroSection.module.css";

export default function HeroSection() {

  return (
    <section className={styles.hero}>
      {/* =========================================
          VIDEO
      ========================================= */}
      <div className={styles.videoWrapper}>
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/images/zagari-hero-poster.webp"
          aria-hidden="true"
        >
          <source
            src="/assets/videos/zagari-hero.webm"
            type="video/webm"
          />

          <source
            src="/assets/hero/hero-video.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* =========================================
          OVERLAYS
      ========================================= */}

      <div className={styles.overlay} />

      <div className={styles.overlayBottom} />

      <div className={styles.overlayTop} />

      {/* =========================================
          CONTENIDO
      ========================================= */}

      <div className={styles.container}>
        <div className={styles.content}>
          {/* eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />

            <span>Nature & Lifestyle Resort</span>
          </div>

          {/* título */}
          <h1 className={styles.title}>
            Un destino para
            <span> vivir diferente.</span>
          </h1>

          {/* descripción */}
          <p className={styles.description}>
            Naturaleza, descanso y experiencias diseñadas para
            reconectar. Más de 20 experiencias reunidas en un
            solo lugar.
          </p>

          {/* botones */}
          <div className={styles.actions}>
            <Link
              href="#experiencias"
              className={styles.primaryButton}
            >
              <span>Descubrir Zagari</span>

              <span className={styles.buttonIcon}>
                <ArrowRight
                  size={18}
                  weight="regular"
                />
              </span>
            </Link>

            <Link
              href="#cabins"
              className={styles.secondaryButton}
            >
              Conocer cabañas
            </Link>
          </div>
        </div>

        {/* =========================================
            INFORMACIÓN INFERIOR
        ========================================= */}

        <div className={styles.bottom}>
          <div className={styles.bottomInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoNumber}>20+</span>

              <span className={styles.infoLabel}>
                experiencias
              </span>
            </div>

            <span className={styles.separator} />

            <div className={styles.infoItem}>
              <span className={styles.infoNumber}>4</span>

              <span className={styles.infoLabel}>
                elementos
              </span>
            </div>

            <span className={styles.separator} />

            <div className={styles.infoItem}>
              <span className={styles.infoNumber}>01</span>

              <span className={styles.infoLabel}>
                destino
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
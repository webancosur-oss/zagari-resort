"use client";

import {
  ArrowRight,
  Pause,
  Play,
  SpeakerHigh,
  SpeakerSlash,
} from "@phosphor-icons/react";
import Link from "next/link";
import {
  useRef,
  useState,
} from "react";

import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const videoRef =
    useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(true);

  const [isMuted, setIsMuted] =
    useState(true);

  /* =========================================
     PLAY / PAUSE
  ========================================= */

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error(
        "No se pudo reproducir el video:",
        error,
      );
    }
  };

  /* =========================================
     AUDIO
  ========================================= */

  const toggleMute = async () => {
    const video = videoRef.current;

    if (!video) return;

    const nextMuted = !video.muted;

    video.muted = nextMuted;
    setIsMuted(nextMuted);

    /*
      Si el usuario activa el audio
      y el video estuviera pausado,
      no lo reproducimos automáticamente.
      Solo modificamos el audio.
    */
  };

  return (
    <section className={styles.hero}>
      {/* =========================================
          VIDEO
      ========================================= */}

      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/images/zagari-hero-poster.webp"
          aria-hidden="true"
          onPlay={() =>
            setIsPlaying(true)
          }
          onPause={() =>
            setIsPlaying(false)
          }
          onVolumeChange={(event) => {
            setIsMuted(
              event.currentTarget.muted,
            );
          }}
        >
          <source
            src="/assets/videos/zagari-hero.webm"
            type="video/webm"
          />

          <source
            src="/assets/hero/herovideo-main.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* =========================================
          OVERLAYS
      ========================================= */}

      <div
        className={styles.overlay}
        aria-hidden="true"
      />

      <div
        className={styles.overlayBottom}
        aria-hidden="true"
      />

      <div
        className={styles.overlayTop}
        aria-hidden="true"
      />

      {/* =========================================
          CONTROLES DEL VIDEO
      ========================================= */}

      <div
        className={styles.videoControls}
        aria-label="Controles del video"
      >
        <button
          type="button"
          className={styles.videoControl}
          onClick={togglePlayback}
          aria-label={
            isPlaying
              ? "Pausar video"
              : "Reproducir video"
          }
          title={
            isPlaying
              ? "Pausar video"
              : "Reproducir video"
          }
        >
          {isPlaying ? (
            <Pause
              size={17}
              weight="fill"
            />
          ) : (
            <Play
              size={17}
              weight="fill"
            />
          )}
        </button>

        <button
          type="button"
          className={styles.videoControl}
          onClick={toggleMute}
          aria-label={
            isMuted
              ? "Activar sonido"
              : "Silenciar video"
          }
          title={
            isMuted
              ? "Activar sonido"
              : "Silenciar video"
          }
        >
          {isMuted ? (
            <SpeakerSlash
              size={18}
              weight="regular"
            />
          ) : (
            <SpeakerHigh
              size={18}
              weight="regular"
            />
          )}
        </button>
      </div>

      {/* =========================================
          CONTENIDO
      ========================================= */}

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span
              className={styles.eyebrowLine}
              aria-hidden="true"
            />

            <span>
              Nature & Lifestyle Resort
            </span>
          </div>

          <h1 className={styles.title}>
            Un destino para
            <span> vivir diferente.</span>
          </h1>

          <p className={styles.description}>
            Naturaleza, descanso y experiencias
            diseñadas para reconectar. Más de 20
            experiencias reunidas en un solo lugar.
          </p>

          <div className={styles.actions}>
            <Link
              href="#experiencia"
              className={styles.primaryButton}
            >
              <span>
                Descubrir Zagari
              </span>

              <span
                className={styles.buttonIcon}
                aria-hidden="true"
              >
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
              <span
                className={styles.infoNumber}
              >
                20+
              </span>

              <span
                className={styles.infoLabel}
              >
                experiencias
              </span>
            </div>

            <span
              className={styles.separator}
              aria-hidden="true"
            />

            <div className={styles.infoItem}>
              <span
                className={styles.infoNumber}
              >
                4
              </span>

              <span
                className={styles.infoLabel}
              >
                elementos
              </span>
            </div>

            <span
              className={styles.separator}
              aria-hidden="true"
            />

            <div className={styles.infoItem}>
              <span
                className={styles.infoNumber}
              >
                01
              </span>

              <span
                className={styles.infoLabel}
              >
                destino
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
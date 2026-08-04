"use client";

import {
  ArrowDown,
  ArrowRight,
  MapPin,
} from "@phosphor-icons/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import styles from "./HomeHero.module.css";

gsap.registerPlugin(
  ScrollTrigger,
  useGSAP,
);

export default function HomeHero() {
  const heroRef =
    useRef<HTMLElement | null>(null);

  const imageLayerRef =
    useRef<HTMLDivElement | null>(null);

  const overlayRef =
    useRef<HTMLDivElement | null>(null);

  const curtainRef =
    useRef<HTMLDivElement | null>(null);

  const chapterRef =
    useRef<HTMLDivElement | null>(null);

  const brandRef =
    useRef<HTMLDivElement | null>(null);

  const contentRef =
    useRef<HTMLDivElement | null>(null);

  const eyebrowRef =
    useRef<HTMLDivElement | null>(null);

  const titleRef =
    useRef<HTMLHeadingElement | null>(null);

  const descriptionRef =
    useRef<HTMLDivElement | null>(null);

  const actionsRef =
    useRef<HTMLDivElement | null>(null);

  const metaRef =
    useRef<HTMLDivElement | null>(null);

  const scrollRef =
    useRef<HTMLAnchorElement | null>(null);

  useGSAP(
    () => {
      const hero =
        heroRef.current;

      const imageLayer =
        imageLayerRef.current;

      const overlay =
        overlayRef.current;

      const curtain =
        curtainRef.current;

      const chapter =
        chapterRef.current;

      const brand =
        brandRef.current;

      const content =
        contentRef.current;

      const eyebrow =
        eyebrowRef.current;

      const title =
        titleRef.current;

      const description =
        descriptionRef.current;

      const actions =
        actionsRef.current;

      const meta =
        metaRef.current;

      const scroll =
        scrollRef.current;

      if (
        !hero ||
        !imageLayer ||
        !overlay ||
        !curtain ||
        !chapter ||
        !brand ||
        !content ||
        !eyebrow ||
        !title ||
        !description ||
        !actions ||
        !meta ||
        !scroll
      ) {
        return;
      }

      const titleLines =
        gsap.utils.toArray<HTMLElement>(
          `.${styles.titleInner}`,
          title,
        );

      const media =
        gsap.matchMedia();

      media.add(
        "(min-width: 769px)",
        () => {
          gsap.set(
            imageLayer,
            {
              scale: 1.12,
            },
          );

          gsap.set(
            overlay,
            {
              opacity: 0.25,
            },
          );

          gsap.set(
            curtain,
            {
              scaleY: 1,
              transformOrigin:
                "top center",
            },
          );

          gsap.set(
            titleLines,
            {
              yPercent: 115,
              rotate: 1.5,
            },
          );

          gsap.set(
            [
              chapter,
              brand,
              eyebrow,
              description,
              actions,
              meta,
              scroll,
            ],
            {
              autoAlpha: 0,
              y: 24,
            },
          );

          const entrance =
            gsap.timeline({
              defaults: {
                ease: "power3.out",
              },
            });

          entrance
            .to(
              curtain,
              {
                scaleY: 0,
                duration: 1.15,
                ease:
                  "power4.inOut",
              },
              0,
            )

            .to(
              imageLayer,
              {
                scale: 1,
                duration: 2.1,
                ease:
                  "power2.out",
              },
              0,
            )

            .to(
              overlay,
              {
                opacity: 1,
                duration: 1.1,
              },
              0.12,
            )

            .to(
              chapter,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
              },
              0.38,
            )

            .to(
              brand,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
              },
              0.43,
            )

            .to(
              eyebrow,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
              },
              0.5,
            )

            .to(
              titleLines,
              {
                yPercent: 0,
                rotate: 0,
                duration: 1,
                stagger: 0.1,
              },
              0.56,
            )

            .to(
              description,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
              },
              0.88,
            )

            .to(
              actions,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
              },
              0.98,
            )

            .to(
              meta,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.75,
              },
              1.05,
            )

            .to(
              scroll,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
              },
              1.14,
            );

          const scrollTimeline =
            gsap.timeline({
              defaults: {
                ease: "none",
              },

              scrollTrigger: {
                id:
                  "zagari-home-hero",

                trigger:
                  hero,

                start:
                  "top top",

                end:
                  "bottom top",

                scrub: 1,

                invalidateOnRefresh:
                  true,
              },
            });

          scrollTimeline
            .to(
              imageLayer,
              {
                scale: 1.1,
                yPercent: 6,
              },
              0,
            )

            .to(
              overlay,
              {
                opacity: 1.12,
              },
              0,
            )

            .to(
              content,
              {
                y: -90,
                autoAlpha: 0,
              },
              0.05,
            )

            .to(
              chapter,
              {
                y: -28,
                autoAlpha: 0,
              },
              0,
            )

            .to(
              brand,
              {
                y: -28,
                autoAlpha: 0,
              },
              0,
            )

            .to(
              meta,
              {
                y: 45,
                autoAlpha: 0,
              },
              0.04,
            )

            .to(
              scroll,
              {
                x: 35,
                autoAlpha: 0,
              },
              0,
            );

          return () => {
            entrance.kill();

            scrollTimeline
              .scrollTrigger
              ?.kill();

            scrollTimeline.kill();
          };
        },
      );

      media.add(
        "(max-width: 768px)",
        () => {
          gsap.set(
            imageLayer,
            {
              scale: 1.08,
            },
          );

          gsap.set(
            curtain,
            {
              scaleY: 1,
              transformOrigin:
                "top center",
            },
          );

          gsap.set(
            titleLines,
            {
              yPercent: 110,
            },
          );

          gsap.set(
            [
              chapter,
              eyebrow,
              description,
              actions,
              meta,
            ],
            {
              autoAlpha: 0,
              y: 22,
            },
          );

          const entrance =
            gsap.timeline({
              defaults: {
                ease: "power3.out",
              },
            });

          entrance
            .to(
              curtain,
              {
                scaleY: 0,
                duration: 0.95,
                ease:
                  "power4.inOut",
              },
              0,
            )

            .to(
              imageLayer,
              {
                scale: 1,
                duration: 1.6,
              },
              0,
            )

            .to(
              chapter,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
              },
              0.3,
            )

            .to(
              eyebrow,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
              },
              0.38,
            )

            .to(
              titleLines,
              {
                yPercent: 0,
                duration: 0.85,
                stagger: 0.09,
              },
              0.44,
            )

            .to(
              description,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
              },
              0.7,
            )

            .to(
              actions,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
              },
              0.78,
            )

            .to(
              meta,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
              },
              0.86,
            );

          const scrollTimeline =
            gsap.timeline({
              defaults: {
                ease: "none",
              },

              scrollTrigger: {
                id:
                  "zagari-home-hero-mobile",

                trigger:
                  hero,

                start:
                  "top top",

                end:
                  "bottom top",

                scrub: 0.8,

                invalidateOnRefresh:
                  true,
              },
            });

          scrollTimeline
            .to(
              imageLayer,
              {
                scale: 1.07,
                yPercent: 4,
              },
              0,
            )

            .to(
              content,
              {
                y: -45,
                autoAlpha: 0,
              },
              0.08,
            )

            .to(
              meta,
              {
                autoAlpha: 0,
              },
              0.04,
            );

          return () => {
            entrance.kill();

            scrollTimeline
              .scrollTrigger
              ?.kill();

            scrollTimeline.kill();
          };
        },
      );

      const timer =
        window.setTimeout(
          () => {
            ScrollTrigger.refresh();
          },
          180,
        );

      return () => {
        window.clearTimeout(
          timer,
        );

        media.revert();

        ScrollTrigger.getById(
          "zagari-home-hero",
        )?.kill();

        ScrollTrigger.getById(
          "zagari-home-hero-mobile",
        )?.kill();
      };
    },
    {
      scope: heroRef,
    },
  );

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-labelledby="zagari-home-title"
    >
      {/* =====================================================
          FONDO
      ====================================================== */}

      <div
        ref={imageLayerRef}
        className={styles.imageLayer}
      >
        <Image
          src="/assets/hero/zagari-hero-desktop.png"
          alt="Piscina, naturaleza y espacios de descanso de Zagari Resort Club en San Ramón"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div
        ref={overlayRef}
        className={styles.overlay}
        aria-hidden="true"
      />

      <div
        className={styles.light}
        aria-hidden="true"
      />

      <div
        className={styles.texture}
        aria-hidden="true"
      />

      <div
        className={styles.vignette}
        aria-hidden="true"
      />

      <div
        ref={curtainRef}
        className={styles.curtain}
        aria-hidden="true"
      />

      {/* =====================================================
          CONTENIDO
      ====================================================== */}

      <div className={styles.container}>
        <div
          ref={contentRef}
          className={styles.content}
        >
          <div
            ref={eyebrowRef}
            className={styles.eyebrow}
          >
            <MapPin
              size={14}
              weight="fill"
              aria-hidden="true"
            />

            <span>
              San Ramón · Selva Central
            </span>
          </div>

          <h1
            ref={titleRef}
            id="zagari-home-title"
            className={styles.title}
          >
            <span
              className={styles.titleLine}
            >
              <span
                className={styles.titleInner}
              >
                Donde la naturaleza
              </span>
            </span>

            <span
              className={styles.titleLine}
            >
              <span
                className={styles.titleInner}
              >
                se convierte en una
              </span>
            </span>

            <span
              className={styles.titleLine}
            >
              <span
                className={styles.titleInner}
              >
                nueva forma de vivir
              </span>
            </span>
          </h1>

          <div
            ref={descriptionRef}
            className={styles.descriptionRow}
          >
            <span
              className={styles.descriptionLine}
              aria-hidden="true"
            />

            <p>
              Una experiencia que une
              naturaleza, descanso e inversión
              en la segunda etapa de Zagari
              Resort Club.
            </p>
          </div>

          <div
            ref={actionsRef}
            className={styles.actions}
          >
            <Link
              href="/lotes"
              className={styles.primaryButton}
            >
              <span>
                Conoce nuestros lotes
              </span>

              <span
                className={styles.buttonCircle}
              >
                <ArrowRight
                  size={17}
                  weight="bold"
                  aria-hidden="true"
                />
              </span>
            </Link>

            <Link
              href="#experiencia"
              className={styles.secondaryButton}
            >
              <span>
                Descubre la experiencia
              </span>

              <ArrowDown
                size={17}
                weight="bold"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>

        {/* =====================================================
            DATOS
        ====================================================== */}

        <div
          ref={metaRef}
          className={styles.meta}
        >
          <div className={styles.metaStatement}>
            <span>
              Proyecto inmobiliario
            </span>

            <strong>
              Una nueva forma de conectar
              con lo esencial.
            </strong>
          </div>

          <div className={styles.metaItem}>
            <span>Etapa</span>

            <strong>
              Segunda etapa
            </strong>

            <small>
              Preventa de lotes
            </small>
          </div>

          <div className={styles.metaItem}>
            <span>Ubicación</span>

            <strong>
              San Ramón
            </strong>

            <small>
              Selva Central
            </small>
          </div>

          <div className={styles.metaItem}>
            <span>Áreas</span>

            <strong>
              234 – 525 m²
            </strong>

            <small>
              Lotes disponibles
            </small>
          </div>
        </div>
      </div>

      {/* =====================================================
          INDICADOR DE SCROLL
      ====================================================== */}

      <a
        ref={scrollRef}
        href="#experiencia"
        className={styles.scrollIndicator}
        aria-label="Descubrir la experiencia de Zagari Resort Club"
      >
        <span>
          Desliza para descubrir
        </span>

        <i />

        <ArrowDown
          size={16}
          weight="bold"
          aria-hidden="true"
        />
      </a>
    </section>
  );
}
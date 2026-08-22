"use client";

import {
  ArrowUpRight,
  CaretUp,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  TiktokLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";

import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.css";

/* =========================================================
   CONFIG
========================================================= */

const GOOGLE_MAPS_URL =
  "https://maps.app.goo.gl/p8EkgxDp4M3pmgkv5";

/* =========================================================
   MENÚ
========================================================= */

const menuLinks = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Proyecto",
    href: "/proyecto",
  },
  {
    label: "Lotes",
    href: "/lotes",
  },
  {
    label: "Nosotros",
    href: "/nosotros",
  },
] as const;

/* =========================================================
   EXPLORA
========================================================= */

const exploreLinks = [
  {
    label: "Amenidades",
    href: "/#amenidades",
  },
  {
    label: "Experiencias",
    href: "/#experiencia",
  },
  {
    label: "Ubicación",
    href: "/#ubicacion",
  },
  {
    label: "Preguntas frecuentes",
    href: "/faq",
  },
  {
    label: "Contacto",
    href: "/contacto",
  },
] as const;

/* =========================================================
   REDES SOCIALES
========================================================= */

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: InstagramLogo,
  },
  {
    label: "Facebook",
    href: "#",
    icon: FacebookLogo,
  },
  {
    label: "TikTok",
    href: "#",
    icon: TiktokLogo,
  },
] as const;

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const year =
    new Date().getFullYear();

  const whatsappNumber =
    process.env
      .NEXT_PUBLIC_ZAGARI_WHATSAPP ||
    "51971069763";

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}` +
    `?text=${encodeURIComponent(
      "Hola Zagari Resort Club, quisiera recibir más información.",
    )}`;

  /* =======================================================
     VOLVER ARRIBA
  ======================================================= */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={styles.footer}
      data-zagari-footer
    >
      {/* =================================================
          AMBIENT BACKGROUND
      ================================================== */}

      <div
        className={styles.background}
        aria-hidden="true"
      >
        <span
          className={styles.glowLeft}
        />

        <span
          className={styles.glowRight}
        />

        <span
          className={styles.glowCenter}
        />

        <span
          className={styles.noise}
        />
      </div>

      {/* =================================================
          INNER
      ================================================== */}

      <div className={styles.inner}>
        {/* =================================================
            MAIN
        ================================================== */}

        <div className={styles.main}>
          {/* ===============================================
              BRAND
          ================================================ */}

          <div className={styles.brand}>
            <Link
              href="/"
              className={styles.logo}
              aria-label="Zagari Resort Club"
            >
              <Image
                src="/assets/brand/zagari-logo-light.svg"
                alt="Zagari Resort Club"
                width={170}
                height={62}
                className={styles.logoImage}
              />
            </Link>

            <div className={styles.slogan}>
              <strong>
                Vive diferente.
              </strong>

              <span>
                Conecta con la naturaleza.
              </span>
            </div>

            <p
              className={
                styles.description
              }
            >
              Naturaleza, descanso,
              bienestar y experiencias
              diferentes para reconectar
              con lo esencial.
            </p>

            {/* =============================================
                UBICACIÓN
            ============================================== */}

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.location}
            >
              <span
                className={
                  styles.locationIcon
                }
              >
                <MapPin
                  size={19}
                  weight="fill"
                />
              </span>

              <span
                className={
                  styles.locationText
                }
              >
                <strong>
                  Zagari Resort Club
                </strong>

                <small>
                  Ver ubicación en Google
                  Maps
                </small>
              </span>

              <ArrowUpRight
                className={
                  styles.locationArrow
                }
                size={14}
                weight="bold"
              />
            </a>

            {/* =============================================
                WHATSAPP
            ============================================== */}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                styles.whatsapp
              }
            >
              <span
                className={
                  styles.whatsappIcon
                }
              >
                <WhatsappLogo
                  size={18}
                  weight="fill"
                />
              </span>

              <span>
                Hablar con un asesor
              </span>

              <ArrowUpRight
                size={14}
                weight="bold"
              />
            </a>
          </div>

          {/* ===============================================
              NAVIGATION
          ================================================ */}

          <div className={styles.links}>
            {/* =============================================
                MENÚ
            ============================================== */}

            <nav
              className={
                styles.linkColumn
              }
              aria-label="Menú principal"
            >
              <span
                className={
                  styles.columnTitle
                }
              >
                Menú
              </span>

              <div
                className={
                  styles.linkList
                }
              >
                {menuLinks.map(
                  (item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                    >
                      <span>
                        {item.label}
                      </span>

                      <ArrowUpRight
                        size={12}
                        weight="bold"
                      />
                    </Link>
                  ),
                )}
              </div>
            </nav>

            {/* =============================================
                EXPLORA
            ============================================== */}

            <nav
              className={
                styles.linkColumn
              }
              aria-label="Explora Zagari"
            >
              <span
                className={
                  styles.columnTitle
                }
              >
                Explora
              </span>

              <div
                className={
                  styles.linkList
                }
              >
                {exploreLinks.map(
                  (item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                    >
                      <span>
                        {item.label}
                      </span>

                      <ArrowUpRight
                        size={12}
                        weight="bold"
                      />
                    </Link>
                  ),
                )}
              </div>
            </nav>
          </div>

          {/* ===============================================
              SOCIAL
          ================================================ */}

          <div className={styles.social}>
            <span
              className={
                styles.columnTitle
              }
            >
              Síguenos
            </span>

            <div
              className={
                styles.socialList
              }
            >
              {socials.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        item.label
                      }
                    >
                      <span
                        className={
                          styles.socialIcon
                        }
                      >
                        <Icon
                          size={17}
                          weight="fill"
                        />
                      </span>

                      <span>
                        {item.label}
                      </span>

                      <ArrowUpRight
                        size={11}
                        weight="bold"
                      />
                    </a>
                  );
                },
              )}
            </div>

            {/* =============================================
                LEGALES
            ============================================== */}

            <div
              className={styles.legal}
            >
              <Link href="/politica-de-privacidad">
                Política de privacidad
              </Link>

              <Link href="/terminos-y-condiciones">
                Términos y condiciones
              </Link>
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM
        ================================================== */}

        <div className={styles.bottom}>
          <p>
            © {year} Zagari Resort Club.
            Todos los derechos reservados.
          </p>

          <div
            className={styles.values}
            aria-hidden="true"
          >
            <span>
              Naturaleza
            </span>

            <i />

            <span>
              Experiencia
            </span>

            <i />

            <span>
              Bienestar
            </span>
          </div>

          <button
            type="button"
            className={styles.backTop}
            onClick={scrollToTop}
            aria-label="Volver arriba"
          >
            <span>
              Volver arriba
            </span>

            <strong>
              <CaretUp
                size={16}
                weight="bold"
              />
            </strong>
          </button>
        </div>
      </div>
    </footer>
  );
}
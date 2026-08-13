"use client";

import {
  ArrowUpRight,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  TiktokLogo,
  WhatsappLogo,
} from "@phosphor-icons/react";

import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.css";

const menuLinks = [
  {
    label: "Inicio",
    href: "/",
  },
  {
    label: "Proyecto",
    href: "/#proyecto",
  },
  {
    label: "Lotes",
    href: "/lotes",
  },
  {
    label: "Cabañas",
    href: "/cabanas",
  },
  {
    label: "Amenidades",
    href: "/#amenities",
  },
];

const exploreLinks = [
  {
    label: "Experiencias",
    href: "/#experiencia",
  },
  {
    label: "Ubicación",
    href: "/#ubicacion",
  },
  {
    label: "Contacto",
    href: "/contacto",
  },
  {
    label: "Preguntas frecuentes",
    href: "/#faq",
  },
];

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
];

export default function Footer() {
  const year =
    new Date().getFullYear();

  const whatsappNumber =
    process.env
      .NEXT_PUBLIC_ZAGARI_WHATSAPP ||
    "519XXXXXXXX";

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}` +
    `?text=${encodeURIComponent(
      "Hola Zagari Resort Club, quisiera recibir más información."
    )}`;

  return (
    <footer
      className={
        styles.footer
      }
      data-zagari-footer
    >
      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div
        className={
          styles.background
        }
        aria-hidden="true"
      >
        <div
          className={
            styles.glowLeft
          }
        />

        <div
          className={
            styles.glowRight
          }
        />

        <div
          className={
            styles.glowBottom
          }
        />

        <div
          className={
            styles.noise
          }
        />
      </div>

      {/* =====================================
          INNER
      ====================================== */}

      <div
        className={
          styles.inner
        }
      >
        {/* ===================================
            TOP
        ==================================== */}

        <div
          className={
            styles.topMeta
          }
        >
        </div>

        {/* ===================================
            MAIN
        ==================================== */}

        <div
          className={
            styles.main
          }
        >
          {/* =================================
              BRAND
          ================================== */}

          <div
            className={
              styles.brand
            }
          >
            <Link
              href="/"
              className={
                styles.logo
              }
            >
              <Image
                src="/assets/brand/zagari-logo-light.svg"
                alt="Zagari Resort Club"
                width={160}
                height={58}
                className={
                  styles.logoImage
                }
              />
            </Link>

            <div
              className={
                styles.slogan
              }
            >
              <strong>
                Vive diferente.
              </strong>

              <span>
                Conecta con la
                naturaleza.
              </span>
            </div>

            <p
              className={
                styles.description
              }
            >
              Naturaleza, descanso,
              bienestar y experiencias
              diferentes en el corazón
              de la Selva Central.
            </p>

            <div
              className={
                styles.location
              }
            >
              <span
                className={
                  styles.locationIcon
                }
              >
                <MapPin
                  size={16}
                  weight="fill"
                />
              </span>

              <div>
                <strong>
                  San Ramón
                </strong>

                <span>
                  Selva Central · Perú
                </span>
              </div>
            </div>

            <a
              href={
                whatsappUrl
              }
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
                  size={17}
                  weight="fill"
                />
              </span>

              <span>
                Hablar con un asesor
              </span>

              <ArrowUpRight
                size={13}
              />
            </a>
          </div>

          {/* =================================
              LINKS
          ================================== */}

          <div
            className={
              styles.links
            }
          >
            <nav
              className={
                styles.linkColumn
              }
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
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                    >
                      {
                        item.label
                      }

                      <ArrowUpRight
                        size={10}
                      />
                    </Link>
                  )
                )}
              </div>
            </nav>

            <nav
              className={
                styles.linkColumn
              }
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
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                    >
                      {
                        item.label
                      }

                      <ArrowUpRight
                        size={10}
                      />
                    </Link>
                  )
                )}
              </div>
            </nav>
          </div>

          {/* =================================
              SOCIAL
          ================================== */}

          <div
            className={
              styles.social
            }
          >
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
                      key={
                        item.label
                      }
                      href={
                        item.href
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span
                        className={
                          styles.socialIcon
                        }
                      >
                        <Icon
                          size={14}
                          weight="fill"
                        />
                      </span>

                      <span>
                        {
                          item.label
                        }
                      </span>

                      <ArrowUpRight
                        size={9}
                      />
                    </a>
                  );
                }
              )}
            </div>

            <div
              className={
                styles.legal
              }
            >
              <Link href="/politica-de-privacidad">
                Política de privacidad
              </Link>

              <Link href="/terminos-y-condiciones">
                Términos y condiciones
              </Link>
            </div>
          </div>

          {/* =================================
              SIGNATURE DESKTOP
          ================================== */}

          <div
            className={
              styles.signature
            }
            aria-hidden="true"
          >
            <strong>
              Z.
            </strong>

            <span
              className={
                styles.signatureLine
              }
            />

            <small>
              Vive diferente
            </small>
          </div>
        </div>

        {/* ===================================
            BOTTOM
        ==================================== */}

        <div
          className={
            styles.bottom
          }
        >
          <p>
            © {year} Zagari Resort Club.
            Todos los derechos reservados.
          </p>

          <div
            className={
              styles.values
            }
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
            className={
              styles.backTop
            }
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior:
                  "smooth",
              });
            }}
          >
            <span>
              Volver arriba
            </span>

            <strong>
              ↑
            </strong>
          </button>
        </div>
      </div>
    </footer>
  );
}
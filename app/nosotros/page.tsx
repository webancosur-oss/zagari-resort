"use client";

import {
  ArrowDown,
  ArrowUpRight,
  FilePdf,
  Leaf,
  MapPin,
} from "@phosphor-icons/react";

import Image from "next/image";
import Link from "next/link";

import BrochureViewer from "./components/BrochureViewer/BrochureViewer";
import styles from "./NosotrosPage.module.css";

const elements = [
  {
    name: "Tierra",
    phrase: "Raíces que conectan.",
    image:
      "/assets/amenities/element-tierra-biohuerto-mandarina.webp",
  },

  {
    name: "Agua",
    phrase: "Calma que renueva.",
    image:
      "/assets/amenities/element-agua-piscina-borde-infinito.webp",
  },

  {
    name: "Aire",
    phrase: "Libertad para contemplar.",
    image:
      "/assets/amenities/element-aire-mirador.webp",
  },

  {
    name: "Fuego",
    phrase: "Energía para compartir.",
    image:
      "/assets/amenities/element-fuego-zona-espiritual.webp",
  },
] as const;

export default function NosotrosPage() {
  return (
    <main className={styles.page}>
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className={styles.hero}>
        <Image
              src="/assets/amenities/element-aire-mirador.webp"
              alt="Naturaleza de Zagari Resort Club en San Ramón"
              fill
              priority
              sizes="100vw"
              className={styles.heroImage}
            />

        <div
          className={styles.heroOverlay}
          aria-hidden="true"
        />

        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            ZAGARI RESORT CLUB
          </span>

          <h1>
            Nacimos para vivir
            <span>
              {" "}
              más cerca de lo natural.
            </span>
          </h1>

          <p>
            Un proyecto en San Ramón donde
            naturaleza, descanso y experiencias
            forman parte de una misma manera
            de vivir.
          </p>

          <div className={styles.heroActions}>
            <Link
              href="/proyecto"
              className={styles.primaryButton}
            >
              <span>
                Conocer el proyecto
              </span>

              <ArrowUpRight
                size={16}
                weight="bold"
              />
            </Link>

            <BrochureViewer
              triggerClassName={
                styles.brochureButton
              }
            >
              <FilePdf
                size={16}
                weight="regular"
              />

              <span>
                Descargar brochure
              </span>
            </BrochureViewer>
          </div>
        </div>

        <div className={styles.heroBottom}>
          <span>
            SAN RAMÓN · SELVA CENTRAL
          </span>

          <a
            href="#esencia"
            aria-label="Ir a nuestra esencia"
          >
            <ArrowDown
              size={17}
              weight="regular"
            />
          </a>
        </div>
      </section>

      {/* =====================================================
          ESENCIA
      ====================================================== */}

      <section
        className={styles.story}
        id="esencia"
      >
        <div className={styles.storyCopy}>
          <span className={styles.eyebrow}>
            NUESTRA ESENCIA
          </span>

          <h2>
            Un lugar que nace
            <span>
              {" "}
              de su entorno.
            </span>
          </h2>

          <p>
            Zagari nace para acercar la vida
            cotidiana a la naturaleza, creando
            espacios para descansar, compartir
            y disfrutar con mayor libertad.
          </p>

          <div className={styles.storyMeta}>
            <MapPin
              size={17}
              weight="fill"
            />

            <span>
              San Ramón · Chanchamayo
            </span>
          </div>
        </div>

        <div className={styles.storyMedia}>
          <Image
            src="/assets/amenities/element-tierra-portico.webp"
            alt="Ingreso a Zagari Resort Club"
            fill
            sizes="
              (max-width: 700px) 100vw,
              (max-width: 1100px) 55vw,
              58vw
            "
            className={styles.cover}
          />

          <div
            className={styles.storyShade}
            aria-hidden="true"
          />

          <div className={styles.storyMessage}>
            <Leaf
              size={19}
              weight="regular"
            />

            <span>
              Vivir también puede significar
              reconectar.
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          IDENTIDAD ZAGARI
      ====================================================== */}

      <section
        className={styles.identity}
        aria-label="Identidad Zagari"
      >
        <div
          className={styles.zagariLine}
          aria-hidden="true"
        >
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className={styles.identityInner}>
          <div className={styles.logoWrap}>
            <Image
              src="/assets/brand/zagari-logo-dark.svg"
              alt="Zagari Resort Club"
              width={520}
              height={190}
              className={styles.logo}
            />
          </div>

          <p>
            Inspirado en cuatro fuerzas que
            forman parte del entorno y de la
            experiencia Zagari.
          </p>
        </div>
      </section>

      {/* =====================================================
          ELEMENTOS
      ====================================================== */}

      <section className={styles.elements}>
        <header className={styles.elementsHeader}>
          <div>
            <span className={styles.eyebrow}>
              NUESTRA INSPIRACIÓN
            </span>

            <h2>
              Cuatro elementos.
              <span>
                {" "}
                Una misma esencia.
              </span>
            </h2>
          </div>

          <p>
            Tierra, Agua, Aire y Fuego dan
            identidad a los espacios y
            experiencias de Zagari.
          </p>
        </header>

        <div className={styles.elementsGrid}>
          {elements.map((element) => (
            <article
              key={element.name}
              className={styles.element}
            >
              <Image
                src={element.image}
                alt={`${element.name} en Zagari Resort Club`}
                fill
                sizes="
                  (max-width: 700px) 84vw,
                  (max-width: 1100px) 50vw,
                  25vw
                "
                className={styles.elementImage}
              />

              <div
                className={styles.elementShade}
                aria-hidden="true"
              />

              <div className={styles.elementContent}>
                <span>
                  {element.phrase}
                </span>

                <h3>
                  {element.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================
          RESPALDO
      ====================================================== */}

      <section className={styles.backing}>
        <div className={styles.backingMedia}>
          <Image
            src="/assets/amenities/element-tierra-campo-futbol-voley.webp"
            alt="Espacios de Zagari Resort Club"
            fill
            sizes="
              (max-width: 700px) 100vw,
              52vw
            "
            className={styles.cover}
          />

          <div
            className={styles.backingShade}
            aria-hidden="true"
          />

          <span className={styles.backingCaption}>
            Una propuesta desarrollada con
            visión inmobiliaria y de largo plazo.
          </span>
        </div>

        <div className={styles.backingContent}>
          <span className={styles.eyebrow}>
            EL RESPALDO DETRÁS DE ZAGARI
          </span>

          <h2>
            Experiencia que
            <span>
              {" "}
              construye confianza.
            </span>
          </h2>

          <p>
            Zagari forma parte de la trayectoria
            inmobiliaria de Ancosur, empresa de
            Moro Capital.
          </p>

          {/* =========================================
              LOGOS EMPRESARIALES
          ========================================== */}

          <div className={styles.brands}>
            {/* ANCOSUR */}

            <a
              href="https://ancosur.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.brandItem}
              aria-label="Visitar sitio web de Ancosur"
            >
              <div
                className={
                  styles.brandLogoWrap
                }
              >
                <Image
                  src="/assets/brand/ancosur-logo-dark.svg"
                  alt="Ancosur"
                  width={240}
                  height={90}
                  className={
                    styles.brandLogo
                  }
                />
              </div>

              <span>
                Desarrollo inmobiliario
              </span>

              <span
                className={
                  styles.brandVisit
                }
              >
                Visitar sitio

                <ArrowUpRight
                  size={12}
                  weight="bold"
                />
              </span>
            </a>

            <i
              className={
                styles.brandDivider
              }
              aria-hidden="true"
            />

            {/* MORO CAPITAL */}

            <a
              href="https://moro-capital-production.up.railway.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.brandItem}
              aria-label="Visitar sitio web de Moro Capital"
            >
              <div
                className={
                  styles.brandLogoWrap
                }
              >
                <Image
                  src="/assets/brand/morocapital-logo-dark.svg"
                  alt="Moro Capital"
                  width={240}
                  height={90}
                  className={
                    styles.brandLogo
                  }
                />
              </div>

              <span>
                Holding inmobiliario
              </span>

              <span
                className={
                  styles.brandVisit
                }
              >
                Visitar sitio

                <ArrowUpRight
                  size={12}
                  weight="bold"
                />
              </span>
            </a>
          </div>

          <Link
            href="/proyecto"
            className={styles.textLink}
          >
            Descubrir Zagari

            <ArrowUpRight
              size={16}
              weight="bold"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
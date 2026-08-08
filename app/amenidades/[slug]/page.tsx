import {
  ArrowLeft,
  ArrowRight,
  Fire,
  Leaf,
  Waves,
  Wind,
} from "@phosphor-icons/react/dist/ssr";

import type {
  Metadata,
} from "next";

import Image from "next/image";
import Link from "next/link";
import {
  notFound,
} from "next/navigation";

import {
  elementSlugs,
  elements,
  getElementAmenities,
  isElementSlug,
} from "./data";

import styles from "./page.module.css";

/*==================================================
  ICONOS
==================================================*/

const icons = {
  air: Wind,
  fire: Fire,
  earth: Leaf,
  water: Waves,
};

/*==================================================
  THEMES
==================================================*/

const themeClasses = {
  air: styles.air,
  fire: styles.fire,
  earth: styles.earth,
  water: styles.water,
};

/*==================================================
  PROPS
==================================================*/

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/*==================================================
  STATIC PARAMS
==================================================*/

export function generateStaticParams() {
  return elementSlugs.map(
    (slug) => ({
      slug,
    }),
  );
}

/*==================================================
  METADATA
==================================================*/

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const {
    slug,
  } = await params;

  if (
    !isElementSlug(
      slug,
    )
  ) {
    return {
      title:
        "Amenidades | Zagari Resort Club",
    };
  }

  const element =
    elements[slug];

  return {
    title:
      `Amenidades de ${element.name} | Zagari Resort Club`,

    description:
      `Descubre las amenidades de Zagari Resort Club inspiradas en ${element.name}: ${element.description}`,

    alternates: {
      canonical:
        `/amenidades/${slug}`,
    },
  };
}

/*==================================================
  PAGE
==================================================*/

export default async function AmenidadesPage({
  params,
}: PageProps) {
  const {
    slug,
  } = await params;

  if (
    !isElementSlug(
      slug,
    )
  ) {
    notFound();
  }

  const element =
    elements[slug];

  const amenities =
    getElementAmenities(
      slug,
    );

  const Icon =
    icons[
      element.theme
    ];

  const currentIndex =
    elementSlugs.indexOf(
      slug,
    );

  const previousSlug =
    elementSlugs[
      (
        currentIndex -
        1 +
        elementSlugs.length
      ) %
        elementSlugs.length
    ];

  const nextSlug =
    elementSlugs[
      (
        currentIndex +
        1
      ) %
        elementSlugs.length
    ];

  return (
    <main
      className={`${styles.page} ${
        themeClasses[
          element.theme
        ]
      }`}
    >
      {/*================================================
        INTRO
      ================================================*/}

      <section
        className={
          styles.intro
        }
      >
        <div
          className={
            styles.introContainer
          }
        >
          {/*==============================================
            BACK
          ==============================================*/}

          <Link
            href="/#experiencia"
            className={
              styles.back
            }
          >
            <ArrowLeft
              size={15}
              weight="bold"
              aria-hidden="true"
            />

            <span>
              Volver a la experiencia
            </span>
          </Link>

          {/*==============================================
            INTRO TOP
          ==============================================*/}

          <div
            className={
              styles.introTop
            }
          >
            <div
              className={
                styles.eyebrow
              }
            >
              <Icon
                size={18}
                weight="light"
                aria-hidden="true"
              />

              <span>
                Elemento{" "}
                {
                  element.number
                }
              </span>
            </div>

            <span
              className={
                styles.counter
              }
            >
              {String(
                amenities.length,
              ).padStart(
                2,
                "0",
              )}

              {" "}

              amenidades
            </span>
          </div>

          {/*==============================================
            HEADING
          ==============================================*/}

          <div
            className={
              styles.heading
            }
          >
            <div
              className={
                styles.headingMain
              }
            >
              <h1>
                {
                  element.name
                }
              </h1>

              <span
                className={
                  styles.elementConcept
                }
              >
                {
                  element.eyebrow
                }
              </span>
            </div>

            <div
              className={
                styles.headingCopy
              }
            >
              <h2>
                {
                  element.title
                }
              </h2>

              <p>
                {
                  element.description
                }
              </p>
            </div>
          </div>

          {/*==============================================
            SWITCHER
          ==============================================*/}

          <nav
            className={
              styles.switcher
            }
            aria-label="Amenidades por elemento"
          >
            {elementSlugs.map(
              (
                itemSlug,
              ) => {
                const item =
                  elements[
                    itemSlug
                  ];

                const ItemIcon =
                  icons[
                    item.theme
                  ];

                const isActive =
                  itemSlug ===
                  slug;

                return (
                  <Link
                    key={
                      itemSlug
                    }
                    href={`/amenidades/${itemSlug}`}
                    className={`${styles.switchItem} ${
                      isActive
                        ? styles.switchItemActive
                        : ""
                    }`}
                    aria-current={
                      isActive
                        ? "page"
                        : undefined
                    }
                  >
                    <ItemIcon
                      size={15}
                      weight="light"
                      aria-hidden="true"
                    />

                    <span>
                      {
                        item.name
                      }
                    </span>
                  </Link>
                );
              },
            )}
          </nav>
        </div>
      </section>

      {/*================================================
        AMENITIES
      ================================================*/}

      <section
        className={
          styles.amenitiesSection
        }
      >
        <div
          className={
            styles.amenitiesContainer
          }
        >
          {amenities.map(
            (
              amenity,
              index,
            ) => {
              const isFeatured =
                index === 0;

              return (
                <article
                  key={
                    amenity.id
                  }
                  id={
                    amenity.id
                  }
                  className={`${styles.amenity} ${
                    isFeatured
                      ? styles.amenityFeatured
                      : ""
                  } ${
                    index %
                      2 ===
                    0
                      ? styles.amenityLeft
                      : styles.amenityRight
                  }`}
                >
                  {/*======================================
                    IMAGE
                  ======================================*/}

                  <div
                    className={
                      styles.media
                    }
                  >
                    <Image
                      src={
                        amenity.image
                      }
                      alt={
                        amenity.name
                      }
                      fill
                      sizes="
                        (max-width: 700px) 100vw,
                        (max-width: 1024px) 65vw,
                        60vw
                      "
                      className={
                        styles.image
                      }
                      style={{
                        objectPosition:
                          amenity.imagePosition,
                      }}
                    />

                    <div
                      className={
                        styles.imageOverlay
                      }
                      aria-hidden="true"
                    />

                    <span
                      className={
                        styles.imageNumber
                      }
                    >
                      {
                        amenity.number
                      }
                    </span>

                    <span
                      className={
                        styles.imageElement
                      }
                    >
                      {
                        element.name
                      }
                    </span>
                  </div>

                  {/*======================================
                    COPY
                  ======================================*/}

                  <div
                    className={
                      styles.copy
                    }
                  >
                    <div
                      className={
                        styles.copyLine
                      }
                      aria-hidden="true"
                    />

                    <span
                      className={
                        styles.copyEyebrow
                      }
                    >
                      {
                        amenity.shortName
                      }
                    </span>

                    <h2>
                      {
                        amenity.name
                      }
                    </h2>

                    <p>
                      {
                        amenity.description
                      }
                    </p>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </section>

      {/*================================================
        BOTTOM
      ================================================*/}

      <section
        className={
          styles.bottom
        }
      >
        <div
          className={
            styles.bottomContainer
          }
        >
          <Link
            href={`/amenidades/${previousSlug}`}
            className={
              styles.elementNavigation
            }
          >
            <ArrowLeft
              size={16}
              weight="bold"
              aria-hidden="true"
            />

            <div>
              <span>
                Elemento anterior
              </span>

              <strong>
                {
                  elements[
                    previousSlug
                  ].name
                }
              </strong>
            </div>
          </Link>

          <div
            className={
              styles.bottomCenter
            }
          >
            <span>
              Zagari Resort Club
            </span>

            <strong>
              Cuatro elementos.
              Una experiencia.
            </strong>
          </div>

          <Link
            href={`/amenidades/${nextSlug}`}
            className={`${styles.elementNavigation} ${styles.elementNavigationNext}`}
          >
            <div>
              <span>
                Siguiente elemento
              </span>

              <strong>
                {
                  elements[
                    nextSlug
                  ].name
                }
              </strong>
            </div>

            <ArrowRight
              size={16}
              weight="bold"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
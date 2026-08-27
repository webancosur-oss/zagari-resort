"use client";

import {
  ArrowRight,
  CalendarBlank,
  Clock,
  MapPin,
  Sparkle,
} from "@phosphor-icons/react";

import Link from "next/link";

import styles from "./page.module.css";
import LeadFormularioContact from "./component/LeadFormularioContact";



export default function ContactPage() {
  return (
    <main
      className={
        styles.page
      }
    >
      <div
        className={
          styles.noise
        }
        aria-hidden="true"
      />

      <div
        className={
          styles.glowOne
        }
        aria-hidden="true"
      />

      <div
        className={
          styles.glowTwo
        }
        aria-hidden="true"
      />

      <section
        className={
          styles.contactSection
        }
      >
        <div
          className={
            styles.container
          }
        >

          {/* =================================================
              LEFT
          ================================================= */}

          <div
            className={
              styles.content
            }
          >
            <div
              className={
                styles.eyebrow
              }
            >
              <span
                className={
                  styles.eyebrowDot
                }
              />

              <span>
                Contacto
              </span>
            </div>


            <h1
              className={
                styles.title
              }
            >
              Empieza a vivir

              <span>
                Zagari.
              </span>
            </h1>


            <p
              className={
                styles.description
              }
            >
              Conoce el proyecto,
              descubre nuestros
              lotes, cabañas y
              experiencias, y recibe
              asesoría para encontrar
              la mejor forma de ser
              parte de Zagari Resort
              Club.
            </p>


            {/* QUICK ACTIONS */}

            <div
              className={
                styles.quickActions
              }
            >
              <Link
                href="#formulario"
                className={
                  styles.primaryAction
                }
              >
                <span>
                  Quiero información
                </span>

                <span
                  className={
                    styles.primaryActionIcon
                  }
                >
                  <ArrowRight
                    size={17}
                    weight="bold"
                  />
                </span>
              </Link>


              <Link
                href="#visita"
                className={
                  styles.secondaryAction
                }
              >
                <CalendarBlank
                  size={17}
                  weight="regular"
                />

                <span>
                  Agendar visita
                </span>
              </Link>
            </div>


            {/* INFO CARDS */}

            <div
              className={
                styles.infoGrid
              }
            >
              <article
                className={
                  styles.infoCard
                }
              >
                <span
                  className={
                    styles.infoIcon
                  }
                >
                  <MapPin
                    size={20}
                    weight="regular"
                  />
                </span>

                <div>
                  <span>
                    Ubicación
                  </span>

                  <strong>
                    San Ramón
                  </strong>

                  <small>
                    Selva Central
                  </small>
                </div>
              </article>


              <article
                className={
                  styles.infoCard
                }
              >
                <span
                  className={
                    styles.infoIcon
                  }
                >
                  <Clock
                    size={20}
                    weight="regular"
                  />
                </span>

                <div>
                  <span>
                    Atención
                  </span>

                  <strong>
                    Asesoría personalizada
                  </strong>

                  <small>
                    Previa coordinación
                  </small>
                </div>
              </article>
            </div>


            {/* EXPERIENCE */}

            <div
              className={
                styles.experience
              }
            >
              <div
                className={
                  styles.experienceIcon
                }
              >
                <Sparkle
                  size={17}
                  weight="fill"
                />
              </div>

              <p>
                Más que elegir un
                espacio, descubre una
                experiencia conectada
                con naturaleza, descanso
                y bienestar.
              </p>
            </div>
          </div>


          {/* =================================================
              FORMULARIO
          ================================================= */}

          <div
            id="formulario"
            className={
              styles.formWrapper
            }
          >
            <LeadFormularioContact />
          </div>
        </div>
      </section>


      {/* =====================================================
          VISITA
      ===================================================== */}

      <section
        id="visita"
        className={
          styles.visitSection
        }
      >
        <div
          className={
            styles.visitContainer
          }
        >
          <div
            className={
              styles.visitContent
            }
          >
            <span
              className={
                styles.visitEyebrow
              }
            >
              Conoce Zagari
            </span>

            <h2>
              La experiencia comienza
              cuando llegas.
            </h2>

            <p>
              Coordina una visita y
              descubre personalmente el
              entorno, las amenidades,
              los lotes y todo lo que
              hace diferente a Zagari.
            </p>
          </div>


          <div
            className={
              styles.visitActions
            }
          >
            <Link
              href="#formulario"
              className={
                styles.visitButton
              }
            >
              <CalendarBlank
                size={18}
                weight="regular"
              />

              <span>
                Coordinar visita
              </span>

              <ArrowRight
                size={16}
                weight="bold"
              />
            </Link>


            <div
              className={
                styles.locationMini
              }
            >
              <MapPin
                size={17}
                weight="fill"
              />

              <div>
                <strong>
                  San Ramón
                </strong>

                <span>
                  Selva Central
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
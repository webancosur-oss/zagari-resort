import {
  Fire,
  Leaf,
  Waves,
  Wind,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import styles from "./ElementsSection.module.css";

type ElementTheme =
  | "air"
  | "fire"
  | "earth"
  | "water";

type ElementItem = {
  id: string;
  number: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  theme: ElementTheme;
};

const elements: ElementItem[] = [
  {
    id: "aire",
    number: "01",
    name: "Aire",
    eyebrow:
      "Libertad y contemplación",
    title:
      "Respira la tranquilidad de la Selva Central",
    description:
      "Miradores, senderos y espacios abiertos conectan cada momento con los paisajes de San Ramón. Un entorno creado para detenerte, respirar y recuperar la calma.",
    image:
      "/assets/concept/aire.png",
    alt:
      "Mirador rodeado de naturaleza que representa el elemento aire en Zagari Resort Club",
    theme: "air",
  },
  {
    id: "fuego",
    number: "02",
    name: "Fuego",
    eyebrow:
      "Energía y conexión",
    title:
      "Encuentros que permanecen en la memoria",
    description:
      "El fuego representa la energía de compartir. Espacios cálidos, noches bajo las estrellas y experiencias creadas para reconectar con quienes más importan.",
    image:
      "/assets/concept/fuego.png",
    alt:
      "Espacio de reunión alrededor del fuego en Zagari Resort Club",
    theme: "fire",
  },
  {
    id: "tierra",
    number: "03",
    name: "Tierra",
    eyebrow:
      "Origen y estabilidad",
    title:
      "Un lugar para construir nuevas raíces",
    description:
      "La tierra representa pertenencia, equilibrio y crecimiento. La arquitectura de Zagari se integra al paisaje respetando la identidad natural del entorno.",
    image:
      "/assets/concept/tierra.png",
    alt:
      "Diosa de los Elementos representando la tierra en Zagari Resort Club",
    theme: "earth",
  },
  {
    id: "agua",
    number: "04",
    name: "Agua",
    eyebrow:
      "Renovación y bienestar",
    title:
      "Fluye hacia una nueva forma de descansar",
    description:
      "Piscinas y espacios de contemplación invitan a renovar el cuerpo, despejar la mente y disfrutar el presente en contacto permanente con la naturaleza.",
    image:
      "/assets/concept/agua.png",
    alt:
      "Piscina y zona social representando el agua en Zagari Resort Club",
    theme: "water",
  },
];

const icons = {
  air: Wind,
  fire: Fire,
  earth: Leaf,
  water: Waves,
};

const themeClasses = {
  air: styles.air,
  fire: styles.fire,
  earth: styles.earth,
  water: styles.water,
};

export default function ElementsSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="elements-title"
    >
      {/* =============================================
          PRESENTACIÓN
      ============================================== */}

      <header className={styles.intro}>
        <div className={styles.introContainer}>
          <span className={styles.mainEyebrow}>
            Conecta con lo esencial
          </span>

          <div className={styles.introGrid}>
            <h2 id="elements-title">
              Cuatro elementos.
              <br />
              Una experiencia.
            </h2>

            <div className={styles.introContent}>
              <p>
                Aire, fuego, tierra y agua
                inspiran cada espacio de Zagari
                Resort Club para crear una
                experiencia conectada con la
                naturaleza y el bienestar.
              </p>

              <a
                href="#elemento-aire"
                className={styles.exploreLink}
              >
                Descubrir los elementos

                <span aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* =============================================
          PÁGINAS STICKY
      ============================================== */}

      <div className={styles.scenes}>
        {elements.map(
          (element, index) => {
            const Icon =
              icons[element.theme];

            return (
              <article
                key={element.id}
                id={`elemento-${element.id}`}
                className={`${styles.scene} ${
                  themeClasses[element.theme]
                }`}
                style={{
                  zIndex: index + 1,
                }}
                aria-labelledby={`${element.id}-title`}
              >
                <div className={styles.sceneCard}>
                  <Image
                    src={element.image}
                    alt={element.alt}
                    fill
                    priority={index === 0}
                    sizes="100vw"
                    className={styles.image}
                  />

                  <div
                    className={styles.overlay}
                    aria-hidden="true"
                  />

                  <div
                    className={styles.ambientLight}
                    aria-hidden="true"
                  />

                  <div
                    className={styles.sceneContent}
                  >
                    <div className={styles.sceneHeader}>
                      <div className={styles.counter}>
                        <span>
                          {element.number}
                        </span>

                        <i />

                        <span>04</span>
                      </div>

                      <div className={styles.elementBadge}>
                        <Icon
                          size={19}
                          weight="light"
                          aria-hidden="true"
                        />

                        <span>
                          {element.name}
                        </span>
                      </div>
                    </div>

                    <div className={styles.copy}>
                      <span className={styles.eyebrow}>
                        {element.eyebrow}
                      </span>

                      <h3
                        id={`${element.id}-title`}
                      >
                        {element.title}
                      </h3>

                      <p>
                        {element.description}
                      </p>
                    </div>

                    <div className={styles.sceneBottom}>
                      <div className={styles.brand}>
                        <span>
                          Zagari Resort Club
                        </span>

                        <span>
                          San Ramón · Selva
                          Central
                        </span>
                      </div>

                      <nav
                        className={styles.navigation}
                        aria-label="Navegación de los cuatro elementos"
                      >
                        {elements.map(
                          (
                            navigationElement,
                          ) => (
                            <a
                              key={
                                navigationElement.id
                              }
                              href={`#elemento-${navigationElement.id}`}
                              className={`${styles.navigationItem} ${
                                navigationElement.id ===
                                element.id
                                  ? styles.navigationItemActive
                                  : ""
                              }`}
                              aria-current={
                                navigationElement.id ===
                                element.id
                                  ? "step"
                                  : undefined
                              }
                            >
                              <span>
                                {
                                  navigationElement.number
                                }
                              </span>

                              <strong>
                                {
                                  navigationElement.name
                                }
                              </strong>
                            </a>
                          ),
                        )}
                      </nav>
                    </div>
                  </div>
                </div>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}
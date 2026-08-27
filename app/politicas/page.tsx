"use client";

import Link from "next/link";

import styles from "./PoliticasPage.module.css";

type PolicyDocument = {
  id: number;
  title: string;
  description: string;
  href: string;
};

const policies: PolicyDocument[] = [
  {
    id: 1,
    title: "Política de Privacidad",
    description:
      "Conoce cómo Ancosur recopila, utiliza, conserva y protege tus datos personales de acuerdo con la normativa peruana.",
    href: "/politicas/politica-de-privacidad",
  },
  {
    id: 2,
    title: "Política de Cookies",
    description:
      "Consulta cómo utilizamos cookies y tecnologías similares para mejorar la experiencia de navegación y analizar el uso del sitio.",
    href: "/politicas/cookies",
  },
];

export default function PoliticasPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span>
            Documentación oficial
          </span>

          <h1>
            Políticas y documentos
            corporativos
          </h1>

          <p>
            Accede a la documentación
            oficial de Ancosur,
            incluyendo nuestra política
            de privacidad y política de
            cookies.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.header}>
          <span>
            Centro documental
          </span>

          <h2>
            Selecciona el documento que
            deseas consultar
          </h2>

          <p>
            Revisa las políticas
            publicadas por Ancosur y
            conoce cómo gestionamos la
            información de nuestros
            usuarios.
          </p>
        </div>

        <div className={styles.grid}>
          {policies.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={styles.card}
            >
              <span
                className={styles.number}
              >
                {String(item.id).padStart(
                  2,
                  "0",
                )}
              </span>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

              <strong>
                Ver documento
              </strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
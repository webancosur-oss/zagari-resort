import styles from "./ManifestoSection.module.css";

export default function ManifestoSection() {
  return (
    <section
      className={styles.section}
      id="experiencia"
      aria-labelledby="manifesto-title"
    >
      <div className={styles.container}>
        <span className={styles.eyebrow}>
          Vive diferente
        </span>

        <h2 id="manifesto-title">
          Un lugar donde la naturaleza y el
          lujo se encuentran
        </h2>

        <div className={styles.grid}>
          <p className={styles.lead}>
            Zagari Resort Club nace para
            quienes desean construir una vida
            más conectada con la naturaleza,
            el bienestar y las experiencias
            que permanecen.
          </p>

          <div className={styles.text}>
            <p>
              En medio de la riqueza natural
              de San Ramón, cada espacio ha
              sido pensado para respirar,
              descansar, compartir y crear
              recuerdos.
            </p>

            <p>
              Aquí podrás adquirir un lote,
              construir una cabaña tipo lodge
              y disfrutar de un Resort Club
              con más de veinte amenidades.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
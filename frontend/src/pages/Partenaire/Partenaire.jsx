import React from "react";
import styles from "./Partenaire.module.css";
import partnerImg from "@/Assets/partenaire.jpg";

const partenaires = [
  "logoipsum",
  "logoipsum",
  "logoipsum",
  "logoipsum",
  "logoipsum",
];

const Partenaire = () => {
  return (
    <section className={styles.partenaire}>
      {/* ===== HEADER ===== */}
      <div className={styles.header} data-aos="fade-up">
        <span></span>
        <h2>Nos partenaires</h2>
        <span></span>
      </div>

      {/* ===== LOGOS ===== */}
      <div className={styles.logos}>
        {partenaires.map((logo, index) => (
          <div
            key={index}
            className={styles.logo}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            {logo}
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <div className={styles.cta} data-aos="fade-up">
        <div className={styles.image} data-aos="fade-right">
          <img src={partnerImg} alt="Partenaire" />
        </div>

        <div className={styles.content} data-aos="fade-left">
          <h3>Devenez notre prochain partenaire</h3>
          <p>
            Ensemble, construisons des parcours plus fluides,
            plus transparents et plus performants.
          </p>

          <h4>Avantages</h4>
          <ul>
            <li>Recrutez plus facilement les meilleurs talents</li>
            <li>Gagnez du temps dans la gestion des stages</li>
            <li>Valorisez votre entreprise ou établissement</li>
          </ul>

          <div className={styles.actions}>
            <button className={styles.primary}>
              Devenir partenaire
            </button>
            <button className={styles.secondary}>
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partenaire;

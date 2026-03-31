import React from "react";
import styles from "./WhyStageGuide.module.css";

import img1 from "@/Assets/why1.jpg";
import img2 from "@/Assets/why2.jpg";
import img3 from "@/Assets/why3.jpg";

const WhyStageGuide = () => {
  return (
    <section className={styles.why}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.line}></span>
          Pourquoi Stage Guide ?
        </h2>

        <div className={styles.cards}>
          {/* CARD 1 */}
          <div className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={img1} alt="Matching intelligent et personnalisé" />
            </div>

            <span className={styles.badge}>
              Une plateforme complète et centralisée
            </span>

            <div className={styles.pill}>
              Un matching intelligent et personnalisé
            </div>
          </div>

          {/* CARD 2 */}
          <div className={`${styles.card} ${styles.cardCenter}`}>
            <div className={styles.imageWrapper}>
              <img src={img2} alt="Suivi clair et motivant" />
            </div>

            <div className={styles.pill}>
              Un suivi clair et motivant
            </div>
          </div>

          {/* CARD 3 */}
          <div className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={img3} alt="Formations certifiantes accessibles" />
            </div>

            <span className={styles.badge}>
              Des formations certifiantes accessibles
            </span>

            <div className={styles.pill}>
              Soyez en stage depuis chez vous
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyStageGuide;

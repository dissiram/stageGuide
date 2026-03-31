import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Stagiaire.module.css";

const Stagiaire = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
    });
  }, []);

  return (
    <section className={styles.stagiaire}>
      <div className={styles.overlay}>
        <h2 data-aos="fade-up">
          Rejoignez notre team de stagiaires,
          gagnez en compétences et en expériences.
        </h2>

        <p data-aos="fade-up" data-aos-delay="150">
          <span>+100k</span> Utilisateurs
        </p>

        <button
          className={styles.btn}
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          Créer un compte
        </button>
      </div>
    </section>
  );
};

export default Stagiaire;

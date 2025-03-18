import styles from "@/styles/index.module.css";
import SolarSystem from "@/components/SolarSystem.js";
import Image from "next/image.js";
import Link from "next/link.js";
import Navbar from "@/components/Navbar.js"

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <div className={styles.overlay}>
       <Navbar/>
        
          <h1>Voyage au Cœur du Système Solaire</h1>
          <h2>Du Soleil à Neptune, une aventure infinie vous attend !</h2>
          <p>
            Bienvenue sur <b>Voyage au Cœur du Système Solaire</b>, votre
            portail vers les merveilles de l’Univers ! Ici, chaque planète
            raconte une histoire, chaque étoile éclaire notre compréhension du
            cosmos.
          </p>

          <p>
            ✨ Notre mission : rendre l’apprentissage du système solaire
            fascinant et accessible à tous. À travers des animations
            interactives, des quiz ludiques et des explications claires, nous
            vous embarquons dans un voyage éducatif captivant.
          </p>

          <ul>
            <h3>🔭 Que découvrirez-vous ?</h3>
            <li>
              ✔️ Les secrets de chaque planète et de leurs lunes mystérieuses
            </li>
            <li>✔️ Le rôle du Soleil, cette étoile qui nous donne vie</li>
            <li>✔️ Les comètes, astéroïdes et autres curiosités célestes</li>
            <li>✔️ Les grandes missions spatiales qui explorent l’inconnu</li>

            <div className={styles.cta}>
              <Link href="/map" passHref legacyBehavior>
                <a>Voir la carte du système solaire</a>
              </Link>
            </div>
          </ul>
          <p>
            Que vous soyez passionné d’astronomie, élève curieux ou simple
            rêveur des étoiles, embarquez avec nous et explorez l’Univers à
            portée de clic ! 🌠
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

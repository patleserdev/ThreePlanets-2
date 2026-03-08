import styles from "@/styles/index.module.css";
import Link from "next/link.js";

const FEATURES = [
  { icon: "🪐", text: "Les secrets de chaque planète et de leurs lunes mystérieuses" },
  { icon: "☀️", text: "Le rôle du Soleil, cette étoile qui nous donne vie" },
  { icon: "☄️", text: "Les comètes, astéroïdes et autres curiosités célestes" },
  { icon: "🚀", text: "Les grandes missions spatiales qui explorent l'inconnu" },
];

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.overlay}>

          <div className={styles.inner}>

            {/* Badge */}
            <span className={styles.badge}>🔭 Exploration spatiale</span>

            {/* Titre */}
            <h1 className={styles.title}>
              Voyage au Cœur du<br />
              <span className={styles.gradient}>Système Solaire</span>
            </h1>

            <p className={styles.subtitle}>
              Du Soleil à Neptune, une aventure infinie vous attend.
            </p>

            <p className={styles.intro}>
              Bienvenue sur votre portail vers les merveilles de l'Univers.
              Chaque planète raconte une histoire, chaque étoile éclaire notre
              compréhension du cosmos — à portée de clic.
            </p>

            {/* Features */}
            <div className={styles.features}>
              {FEATURES.map(({ icon, text }) => (
                <div key={text} className={styles.featureItem}>
                  <span className={styles.featureIcon}>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={styles.ctaGroup}>
              <Link href="/map" className={styles.ctaPrimary}>
                Explorer la carte
              </Link>
              <Link href="/planets" className={styles.ctaSecondary}>
                Les planètes →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
import styles from "@/styles/footer.module.css";

export default function Footer() {


    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>

                <div className={styles.footerBrand}>
                    <h3 className={styles.footerTitle}>
                        Three<span className={styles.footerGradient}>-Planets-2</span>
                    </h3>
                    <p className={styles.footerText}>
                        Une plateforme moderne pour découvrir, apprendre et évoluer.
                    </p>
                </div>

                <div className={styles.footerLinks}>
                    <h4>Navigation</h4>
                    <a href="#">Accueil</a>
                    <a href="/map">Carte du système</a>
                    <a href="/planets">Les planètes</a>
                    <a href="/quizz">Quizz</a>
                </div>

                     </div>

            <div className={styles.footerBottom}>
                © 2026 Three-Planets-2 — Tous droits réservés
            </div>
        </footer>
    )
}
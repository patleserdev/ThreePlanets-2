import styles from "@/styles/quizz.module.css";
import Navbar from "@/components/Navbar.js";
import QuizzMotor from "@/components/QuizzMotor.js";
import quizzDatas_easy from "@/datas/quizzDatas_easy.js";
import quizzDatas_normal from "@/datas/quizzDatas_normal.js";
import quizzDatas_hard from "@/datas/quizzDatas_hard.js";
import { useEffect, useState } from "react";

const LEVELS = [
  { id: 1, label: "Facile",   emoji: "🟢" },
  { id: 2, label: "Moyen",    emoji: "🟡" },
  { id: 3, label: "Difficile",emoji: "🔴" },
];

const quizzPage = () => {
  const [quizzControl, setQuizzControl] = useState(0);
  const [level, setLevel] = useState(1);
  const [useThisQuizz, setUseThisQuizz] = useState(quizzDatas_easy);

  const startQuizz  = () => setQuizzControl(1);
  const restartQuizz = () => {
    setQuizzControl(0);
    setTimeout(() => setQuizzControl(1), 1000);
  };

  useEffect(() => {
    setQuizzControl(0);
    if (level === 1) setUseThisQuizz(quizzDatas_easy);
    if (level === 2) setUseThisQuizz(quizzDatas_normal);
    if (level === 3) setUseThisQuizz(quizzDatas_hard);
  }, [level]);

  const currentLevel = LEVELS.find((l) => l.id === level);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.overlay}>
          <div className={styles.inner}>

            {/* ── Header ── */}
            <div className={styles.header}>
              <span className={styles.badge}>🧠 Défi spatial</span>
              <h1 className={styles.title}>
                Le <span className={styles.gradient}>Quizz</span>
              </h1>
              <p className={styles.subtitle}>
                Tu connais vraiment notre système solaire ? Prouve-le.
              </p>
            </div>

            {/* ── Controls ── */}
            <div className={styles.controls}>

              {/* Sélecteur de niveau */}
              <div className={styles.levelSection}>
                <span className={styles.controlLabel}>Niveau de difficulté</span>
                <div className={styles.levelButtons}>
                  {LEVELS.map(({ id, label, emoji }) => (
                    <button
                      key={id}
                      className={`${styles.levelBtn} ${level === id ? styles.levelBtnActive : ""}`}
                      onClick={() => setLevel(id)}
                    >
                      <span className={styles.levelEmoji}>{emoji}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Badge niveau actif + CTA */}
              <div className={styles.ctaSection}>
                <span className={styles.levelBadge}>
                  {currentLevel?.emoji} Niveau {currentLevel?.label}
                </span>

                {quizzControl === 0 ? (
                  <button className={styles.ctaPrimary} onClick={startQuizz}>
                    Commencer →
                  </button>
                ) : (
                  <button className={styles.ctaSecondary} onClick={restartQuizz}>
                    ↺ Recommencer
                  </button>
                )}
              </div>
            </div>

            {/* ── Quizz motor ── */}
            {quizzControl === 1 && (
              <div className={styles.motorWrapper}>
                <QuizzMotor  key={level} datas={useThisQuizz} control={quizzControl} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default quizzPage;
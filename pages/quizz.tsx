import styles from "@/styles/quizz.module.css";
import Navbar from "@/components/Navbar.js";
import QuizzMotor from "@/components/QuizzMotor.js";
import quizzDatas_easy from "@/datas/quizzDatas_easy.js";
import quizzDatas_normal from "@/datas/quizzDatas_normal.js";
import quizzDatas_hard from "@/datas/quizzDatas_hard.js";
import { useEffect, useState } from "react";

const quizzPage = () => {
  const [quizzControl, setQuizzControl] = useState(0);
  const [level, setLevel] = useState(1);
  const [useThisQuizz, setUseThisQuizz] = useState(quizzDatas_easy);

  const startQuizz = () => {
    setQuizzControl(1);
  };

  const restartQuizz = () => {
    setQuizzControl(0);
    setTimeout(() => {
      setQuizzControl(1);
    }, 1000);
  };

  useEffect(() => {
    if (level == 1) {
      setUseThisQuizz(quizzDatas_easy);
    }

    if (level == 2) {
      setUseThisQuizz(quizzDatas_normal);
    }

    if (level == 3) {
      setUseThisQuizz(quizzDatas_hard);
    }

  }, [level]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.overlay}>

          <h1>Quizz</h1>
          <p>Tu connais beaucoup de choses sur notre système solaire ?</p>

          <p>C'est ce que l'on va voir, frotte toi au Quizz !!</p>

          <div className={styles.controlContainer}>
          <div className={styles.level}>
            <button
              className={level == 1 ? styles.active : styles.inactive}
              onClick={() => setLevel(1)}
            >
              Facile
            </button>
            <button
              className={level == 2 ? styles.active : styles.inactive}
              onClick={() => setLevel(2)}
            >
              Moyen
            </button>
            <button
              className={level == 3 ? styles.active : styles.inactive}
              onClick={() => setLevel(3)}
            >
              Difficile
            </button>
          </div>

          <div className={styles.levelDisplay}>
            Niveau {level == 1 && "Facile"} {level == 2 && "Moyen"} {level == 3 && "Difficule"}
          </div>
          
          <div className={styles.cta}>
            {quizzControl == 0 && <button className={styles.cta} onClick={() => startQuizz()}>
              Commencer
            </button>}

            {quizzControl == 1 && <button className={styles.cta} onClick={() => restartQuizz()}>
              Recommencer
            </button>}
          </div>

        
          </div>

          {quizzControl == 1 && (
            <QuizzMotor datas={useThisQuizz} control={quizzControl} />
          )}
        </div>
      </div>
    </div>
  );
};

export default quizzPage;

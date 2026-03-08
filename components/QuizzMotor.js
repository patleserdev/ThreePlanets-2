import { useEffect, useState, useCallback, useRef } from "react";
import styles from "@/styles/quizzMotor.module.css";
import CircleLoader from "react-spinners/ClipLoader";

function compareAnswers(userResponses, datas) {
  let correctCount = 0;
  const results = datas.map((data, i) => {
    const isCorrect = userResponses[i] === data.answer;
    if (isCorrect) correctCount++;
    return isCorrect;
  });
  return { results, correctCount };
}

export default function QuizzMotor({ datas, control }) {
  const [step, setStep]               = useState(0);
  const [question, setQuestion]       = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [loading, setLoading]         = useState(false);
  const [results, setResults]         = useState(null);
  const [note, setNote]               = useState(0);
  // ✅ state pour le rendu visuel + ref pour la valeur à soumettre
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedRef = useRef(null);

  // ── Reset ──────────────────────────────────────────────────
  const restartQuizz = useCallback(() => {
    setStep(0);
    setUserResponses([]);
    setQuestion(0);
    setLoading(false);
    setResults(null);
    setNote(0);
    selectedRef.current = null;
    setSelectedIndex(null);
  }, []);

  // ── Réaction au control ────────────────────────────────────
  useEffect(() => {
    if (control === 0) { restartQuizz(); return; }

    if (control === 1) {
      setStep(1);
      const t = setTimeout(() => setStep(2), 3000);
      return () => clearTimeout(t);
    }
  }, [control, restartQuizz]);

  // ── Réaction au step ───────────────────────────────────────
  useEffect(() => {
    if (step === 2) { setQuestion(1); return; }

    if (step === 3) {
      setLoading(true);
      const t = setTimeout(() => { setLoading(false); setStep(4); }, 1500);
      return () => clearTimeout(t);
    }

    if (step === 4) {
      const comparison = compareAnswers(userResponses, datas);
      setResults(comparison.results);
      setNote(comparison.correctCount);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ── Fin des questions ──────────────────────────────────────
  useEffect(() => {
    if (question > 0 && question === datas.length + 1) setStep(3);
  }, [question, datas.length]);

  // ── Passage à la question suivante ─────────────────────────
  // ✅ utilise selectedRef au lieu de querySelector
  const nextQuestion = useCallback(() => {
    if (selectedRef.current === null) {
      alert("Veuillez sélectionner une réponse avant de continuer !");
      return;
    }
    setUserResponses((prev) => [...prev, selectedRef.current]);
    setQuestion((prev) => prev + 1);
    selectedRef.current = null;
    setSelectedIndex(null);
  }, []);

  const currentQuestion = datas[question - 1];
  const scorePercent = datas.length > 0 ? Math.round((note / datas.length) * 100) : 0;

  const scoreComment = () => {
    if (scorePercent === 100) return "🏆 Parfait ! Tu es un expert du système solaire !";
    if (scorePercent >= 70)  return "🌟 Excellent ! Tu connais très bien le cosmos.";
    if (scorePercent >= 40)  return "🚀 Pas mal ! Encore un peu d'exploration et tu y seras.";
    return "☄️ Continue d'explorer, l'univers n'a pas fini de te surprendre !";
  };

  return (
    <div className={styles.QuizzMotor}>

      {/* ── Step 1 : intro ── */}
      {step === 1 && (
        <div className={styles.intro}>
          <h2 className={styles.introTitle}>Le quizz commence !</h2>
          <p className={styles.introSub}>
            {datas.length} question{datas.length > 1 ? "s" : ""} t'attendent — bonne chance 🚀
          </p>
        </div>
      )}

      {/* ── Step 2 : question ── */}
      {step === 2 && currentQuestion && (
        <>
          {/* Barre de progression */}
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${((question - 1) / datas.length) * 100}%` }}
            />
          </div>

          <div className={styles.questionHeader}>
            <span className={styles.questionCount}>
              {question} / {datas.length}
            </span>
            <h2 className={styles.questionTitle}>{currentQuestion.question}</h2>
          </div>

          {/* Image optionnelle */}
          {currentQuestion.type === "image" && currentQuestion.image && (
            <div className={styles.imageWrapper}>
              <img
                src={currentQuestion.image}
                alt="Illustration de la question"
                className={styles.questionImage}
              />
            </div>
          )}

          {/* Choix */}
          <div className={styles.choices}>
            {currentQuestion.choices?.map((choice, key) => (
              <label
                key={key}
                className={`${styles.choiceLabel} ${selectedIndex === key ? styles.choiceSelected : ""}`}
                onClick={() => { selectedRef.current = key; setSelectedIndex(key); }}
              >
                <input
                  type="radio"
                  name={`question${question}`}
                  value={key}
                  className={styles.radio}
                  onChange={() => { selectedRef.current = key; setSelectedIndex(key); }}
                />
                <span className={styles.choiceLetter}>
                  {String.fromCharCode(65 + key)}
                </span>
                <span className={styles.choiceText}>{choice}</span>
              </label>
            ))}
          </div>

          <button onClick={nextQuestion} className={styles.nextBtn}>
            {question === datas.length ? "Terminer →" : "Question suivante →"}
          </button>
        </>
      )}

      {/* ── Step 3 : analyse ── */}
      {step === 3 && (
        <div className={styles.analyzing}>
          <h3 className={styles.analyzingText}>Analyse de tes réponses en cours…</h3>
        </div>
      )}

      {/* ── Step 4 : résultats ── */}
      {step === 4 && results && (
        <div className={styles.results}>
          <div className={styles.scoreBlock}>
            <span className={styles.scoreNumber}>{note}</span>
            <span className={styles.scoreDivider}>/</span>
            <span className={styles.scoreTotal}>{datas.length}</span>
          </div>
          <p className={styles.scoreComment}>{scoreComment()}</p>

          <ul className={styles.resultList}>
            {datas.map((data, key) => (
              <li key={key} className={`${styles.resultItem} ${results[key] ? styles.resultCorrect : styles.resultWrong}`}>
                <span className={styles.resultIcon}>{results[key] ? "✅" : "❌"}</span>
                <span className={styles.resultQuestion}>
                  Q{key + 1} — {data.question}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Loader ── */}
      {loading && (
        <div className={styles.loader}>
          <CircleLoader size={25} color="#f49f16" speedMultiplier={1} />
        </div>
      )}
    </div>
  );
}
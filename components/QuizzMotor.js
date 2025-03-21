import { useEffect, useState } from "react";
import styles from "@/styles/quizzMotor.module.css";
import CircleLoader from "react-spinners/ClipLoader";

// Fonction pour comparer les réponses de l'utilisateur avec les réponses correctes
function compareAnswers(userResponses, datas) {
    let results = [];
    let correctCount = 0;

    userResponses.forEach((response, index) => {
        const correctAnswer = datas[index].answer;
        const isCorrect = response === correctAnswer;
        results.push(isCorrect);
        if (isCorrect) correctCount++;
    });

    return {
        results, // Tableau des réponses correctes (true/false)
        correctCount // Nombre total de réponses correctes
    };
}



export default function QuizzMotor({ datas, control }) {
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results,setResults]=useState(null)
  const [note,setNote]=useState(0)
  //système de step
  //start
  //a chaque question, je valide une réponse, elle s'ajoute a stateresponses,
  //je passe au step suivant tant qu'il y en a dans le tableau de datas
  // quand le dernier step est passé, je contrôle l'état du stateresponses et le compare au tableau de données
  // je retourne le résultat sur 20 et ajoute un commentaire suivant la note
  //start = step 1
  // questions // step 2
  // last question finish // step3

  /** Gère les comportements au changement de control */
  useEffect(() => {
    if (control == 0) {
 restartQuizz()
    }

    if (control == 1) {
      setTimeout(() => {
        setStep(1);
      }, 0);

      setTimeout(() => {
        setStep(2);
      }, 5000);
    }
  }, [control]);

  const restartQuizz=()=>{
    setStep(0);
    setUserResponses([])
    setQuestion(0)
    setLoading(false)
    setResults(null)
    setNote(0)
    
  }

  /** Gère les comportements à chaque changement d'étape */
  useEffect(() => {
    if (step == 2) {
      setQuestion(1);
    }

    if (step == 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(4);
      }, 2000);
    }

    // calcul du nombre de bonnes réponses par rapport au tableaux de données
    //comparer userResponses a datas[X].response
    //result = nb de bonnes réponses /nb de questions
    if(step == 3)
        {
            const comparison = compareAnswers(userResponses, datas);
            console.log(comparison)
            if(comparison)
            {
                setResults(comparison.results)
                setNote(comparison.correctCount)
            }
            
        }
  }, [step]);

  /**
   * Gère le stockage des réponses
   */
  const nextQuestion = () => {
    const selectedOption = document.querySelector(
      `input[name="question${question}"]:checked`
    );
    if (selectedOption) {
      // Mettre à jour le tableau des réponses de l'utilisateur
      setUserResponses([...userResponses, Number(selectedOption.value)]);

      // Passer à la question suivante
      setQuestion(question + 1);
      // Désélectionner l'option choisie
      selectedOption.checked = false;
    } else {
      alert("Veuillez sélectionner une réponse avant de continuer !");
    }
  };

  // gère la fin des questions
  useEffect(() => {
    if (question == datas.length + 1) {
      setStep(3);
    }
  }, [question]);

  return (
    <div className={styles.QuizzMotor}>
      {step == 1 && (
        <>
          <h1>Le quizz commence !</h1>
          <p>Il y a {datas.length} questions ! C'est parti !</p>
        </>
      )}

      {step == 2 && question && (
        <>
          <h2>Question {question}</h2>
          <h3>{datas[question - 1]?.question}</h3>

          {datas[question - 1]?.choices?.map((choice, key) => {
            return (
              <div key={key}>
                <input
                  type="radio"
                  id={`q${question}-option${key}`}
                  name={`question${question}`}
                  value={key}
                />
                <label htmlFor={key}>{choice}</label>
                <br></br>
              </div>
            );
          })}

          <button onClick={() => nextQuestion()} className={styles.button}>
            Question suivante
          </button>
        </>
      )}

      {step == 3 && <h3>Nous allons maintenant analyser tes réponses </h3>}

      {step == 4 && (
        <>
          <h3>Ton résultat : {note}/ {datas.length}</h3>
    <ul>
    {datas.map((data,key) => <li key={key}><div>Question {key+1}</div> <div>{data.answer && data.answer != results[key] ? "✅" : "❌"}</div></li>)}

    </ul>
        </>
      )}

      {loading && (
        <div className={styles.loader}>
        <CircleLoader size={25} color={"#483596"} speedMultiplier={2} />
        </div>
      )}
   


    </div>
  );
}

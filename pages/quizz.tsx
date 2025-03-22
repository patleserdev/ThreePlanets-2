import styles from "@/styles/quizz.module.css"
import Navbar from "@/components/Navbar.js";
import QuizzMotor from "@/components/QuizzMotor.js"
import quizzDatas from "@/datas/quizzDatas.js"
import { useState } from "react";

const quizzPage = () => {
const [quizzControl,setQuizzControl]=useState(0)
const [level,setLevel]=useState(1)

  const startQuizz=()=>{
    setQuizzControl(1)
  }

  const restartQuizz=()=>{
    setQuizzControl(0)
    setTimeout(() => {
      setQuizzControl(1)
    }, 1000);
    
      }

  return (
    <div className={styles.container}>
    <div className={styles.content}>
    <div className={styles.overlay}>
      <Navbar />

      <h1>Quizz</h1>
      <p>Tu connais beaucoup de choses sur notre système solaire ?</p>

      <p>C'est ce que l'on va voir, frotte toi au Quizz !!</p>

      <div className={styles.level}>
      <button className={level == 1 ? styles.active : styles.inactive} onClick={()=>setLevel(1)}>Facile</button>
      <button className={level == 2 ? styles.active : styles.inactive} onClick={()=>setLevel(2)}>Moyen</button>
      <button className={level == 3 ? styles.active : styles.inactive} onClick={()=>setLevel(3)}>Difficile</button>
      </div>

      <div className={styles.cta}>
      <button className={styles.cta} onClick={()=>startQuizz()}>Commencer</button>
      <button className={styles.cta} onClick={()=>restartQuizz()}>Recommencer</button>
      </div>
   

      

      {quizzControl == 1 && <QuizzMotor datas={quizzDatas} control={quizzControl}/>}
      
      
      </div>
     
      </div>
    </div>
  );
};

export default quizzPage;

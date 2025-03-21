import styles from "@/styles/quizz.module.css"
import Navbar from "@/components/Navbar.js";
import QuizzMotor from "@/components/QuizzMotor.js"
import quizzDatas from "@/datas/quizzDatas.js"
import { useState } from "react";

const quizzPage = () => {
const [quizzControl,setQuizzControl]=useState(0)

  const startQuizz=()=>{
    setQuizzControl(1)
  }

  const restartQuizz=()=>{
    setQuizzControl(0)
      }

  return (
    <div className={styles.container} >
      <Navbar />
      <div className={styles.content}>
      <h1>Quizz</h1>
      <p>Tu connais beaucoup de choses sur notre système solaire ?</p>

      <p>C'est ce que l'on va voir, frotte toi au Quizz !!</p>

      <button className={styles.button} onClick={()=>startQuizz()}>Commencer</button>
      <button className={styles.button} onClick={()=>restartQuizz()}>Recommencer</button>

      

      {quizzControl == 1 && <QuizzMotor datas={quizzDatas} control={quizzControl}/>}
      
      
      </div>
     
      
    </div>
  );
};

export default quizzPage;

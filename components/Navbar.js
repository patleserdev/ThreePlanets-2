import Image from "next/image.js"
import styles from "../styles/navbar.module.css"
import Link from "next/link.js"
import { useState } from "react";
import BurgerIcon from "./BurgerIcon";

export default function Navbar()
{

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

    return (
        <nav className={styles.navbar}>
            <Image src={"/pictures/logo.png"} alt="logo" width={100} height={100} className={styles.logo}/>
          <div className={styles.title}>
          <p>Three-Planets 2</p>
          </div>
        
        <div className={styles.desktop}>
        <ul>
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <Link href="/map">Carte du système</Link>
          </li>
          <li>
            <Link href="/planets">Les planètes</Link>
          </li>
          <li>
            <Link href="/quizz">Quizz</Link>
          </li>
        </ul>
        
        </div>

        <div className={styles.mobile}>
        <div style={{width:36,height:36}} onClick={()=>handleClick()}><BurgerIcon/></div>
        </div>
        <div className={open ? styles.toggleOpen : styles.toggleClose  }>
       { open && <div> <ul>
          <li>
            <Link onClick={handleClick} href="/">Accueil</Link>
          </li>
          <li>
            <Link onClick={handleClick} href="/map">Carte du système</Link>
          </li>
          <li>
            <Link onClick={handleClick} href="/planets">Les planètes</Link>
          </li>
          <li>
            <Link onClick={handleClick} href="/quizz">Quizz</Link>
          </li>
        </ul></div> }
        
        </div>
        

      </nav>
      
    )
}
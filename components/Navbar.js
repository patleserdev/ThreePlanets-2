import Image from "next/image.js"
import styles from "../styles/navbar.module.css"
import Link from "next/link.js"
import { useState } from "react";

export default function Navbar()
{

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

    return (
        <nav className={styles.navbar}>
            <Image src={"/pictures/logo.png"} alt="logo" width={100} height={100} className={styles.logo}/>
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
      </nav>
      
    )
}
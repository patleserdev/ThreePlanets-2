import planets from "@/datas/planets.js";
import styles from "../styles/planetfocus.module.css";
import PlanetsIcon from "@/components/PlanetsIcon.js";
import { useEffect, useState } from "react";

export default function PlanetFocus({ setFocus,setSelectedPlanet }) {
    const [displayPlanetsChoice, setDisplayPlanetsChoice] = useState(true);
    

    return (
        <>
            <div className={`${styles.planetFocus} ${displayPlanetsChoice ? styles.slideRight : styles.slideLeft}`}>
                <h3>Cibler une planète :</h3>
                {planets.map((planet, i) => (
                    planet.display ?
                    <button 
                        key={i} 
                        onClick={() => setSelectedPlanet(planet.name)}
                        onMouseEnter={() => setFocus(planet.name)} // Survol de la planète
                        onMouseLeave={() => setFocus(null)} // Quitter le survol
                    >
                        {planet.name}
                    </button> : null
                ))}
            </div>

            <div className={styles.planetFocusIcon} onClick={() => setDisplayPlanetsChoice(!displayPlanetsChoice)}>
                <PlanetsIcon />
            </div>
        </>
    );
}

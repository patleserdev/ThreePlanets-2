import planets from "@/datas/planets.js"
import styles from "../styles/display.module.css"
export default function PlanetFocus({setFocus}){

    return (
        <div className={styles.planetFocus}>
            <h3>Cibler une planète :</h3>
            {planets.map((planet,i) => <button key={i} onClick={() => setFocus(planet.name)}> {planet.name}</button> )}

      </div>
    )
}
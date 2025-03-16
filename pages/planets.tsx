import styles from "@/styles/planets.module.css";
import SolarSystem from "@/components/SolarSystem.js";
import Image from "next/image.js";
import Link from "next/link.js";
import Navbar from "@/components/Navbar.js";
import planets from "@/datas/planets.js";
import PlanetViewer from "@/components/PlanetViewer.js";
import { useState } from "react";
interface PlanetInterface {
  name: string;
  size?: number;
  position?: number[];
  color?: string;
  speed?: number;
  rotation?: number;
  inclination?: number;
  infos?: string[];
  texture?: string;
  hasRings?: boolean;
  display?: boolean;
  orbitRadius?: number ;  // Optionnel si tu ne veux pas toujours fournir cette propriété
  emitsLight?: boolean;  // Optionnel
  satellites?: string[]; // Optionnel
  temperature?: number;  // Optionnel
  sunDistance?:boolean
}


const planetsPage = () => {

  const [selectedPlanet,setSelectedPlanet]=useState<PlanetInterface| null>(null)
  return (
    <div className={styles.container} >
      <div className={styles.content}>
        <div className={styles.overlay}>
          <Navbar />

          <h1>Les planètes</h1>
          <h2>Découvre les planètes qui entourent notre Terre !</h2>
          <div className={styles.planetCarousel}>
            <div className={styles.planetList}>
              <ul>
                {planets.map((planet,key) => (
                  planet.display ?
                  <li key={key} onClick={() => { 
                    setSelectedPlanet(planet as PlanetInterface);
                  }}>{planet.name}</li> :null
                ))}
              </ul>
            </div>

            <div className={styles.displayPlanet}>
            <div className={styles.displayPlanetContentText}>
                <h2>{selectedPlanet ? selectedPlanet.name : "Planète non sélectionée"}</h2>
                <ul>
                  <li>
                    Taille : {selectedPlanet ? selectedPlanet.size : "Non précisé"}
                  </li>
                  <li>
                    Couleur dominante : {selectedPlanet ? selectedPlanet.color : "Non précisé"}
                  </li>
                  <li>
                  Anneaux : {selectedPlanet && selectedPlanet.hasRings ? "OUI" : "Non"}
                  </li>
                  <li>
                    Distance du soleil : {selectedPlanet && selectedPlanet.sunDistance ? selectedPlanet.sunDistance : "Non précisé"}
                  </li>
                  <li>
                    Température : {selectedPlanet && selectedPlanet.temperature ? `${selectedPlanet.temperature}°c` : "Non précisé"}
                  </li>
                </ul>

                <p>Description</p>
                {selectedPlanet && selectedPlanet.infos ? selectedPlanet.infos.map((info) => <p>{info}</p>) : null}
                </div>
                <div className={styles.displayPlanetContent3D}>
                  {selectedPlanet && <PlanetViewer planet={selectedPlanet}/>}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default planetsPage;

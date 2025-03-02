"use client";
import { Canvas,useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import Planet from "./Planet";
import Sun from "./Sun";
import { useState,useEffect,useRef } from "react";
import styles from "@/styles/display.module.css"
import planets from '../planets.js'
import MovingLight from './MovingLight.js'
import StarDome from './StarDome.js'
import Constellations from './Constellation.js'
import { PerspectiveCamera } from '@react-three/drei';
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import MiniMap from "./Minimap.js";
import CenterIcon from "./CenterIcon.js"
import PauseIcon from "./PauseIcon.js"
import CameraController from './CameraController.js'
import ConstellationFocus from './ConstallationFocus.js'
import PlayIcon from './PlayIcon.js'
import { Clock } from "three";  // Importation de Clock de Three.js
import PlanetFocus from './PlanetFocus.js'
export default function SolarSystem() {

    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const sunRef = useRef();
    const [isPaused, setIsPaused] = useState(false);  // L'état pour gérer la pause

    const clockRef = useRef(new Clock());  // Création du clock
    const clock = clockRef.current;
    const [lastTime, setLastTime] = useState(0);  // Garder la dernière valeur du temps
    const [elapsedTimeAtPause, setElapsedTimeAtPause] = useState(0);  // Temps au moment de la pause

    const [focus, setFocus] = useState(null);
      // Fonction pour mettre en pause ou reprendre les mouvements
 // Fonction pour mettre en pause ou reprendre les mouvements
 const togglePause = () => {
  if (isPaused) {
    // On reprend à partir du temps où on s'est arrêté
    clockRef.current.start();  // Reprendre l'horloge
  } else {
    // On garde l'elapsed time avant la pause
    setElapsedTimeAtPause(clockRef.current.getElapsedTime());
    clockRef.current.stop();  // Arrêter l'horloge
  }
  setIsPaused((prevState) => !prevState);  // Alterner entre pause et reprise
};

useEffect(()=>{

  if(focus)
  {
    setSelectedPlanet(focus)
  }
},[focus])

  return (
    <div className={styles.container}>
      <PlanetFocus setFocus={setFocus}/>
     {!selectedPlanet && <ConstellationFocus setFocus={setFocus} />} 
    <Canvas camera={{ position: [0, 50, 20], fov: 50, near: 1,   far: 5000  }} onPointerMissed={() => setSelectedPlanet(null)}
    >
     
      <Suspense fallback={null}>
      <StarDome />
       <CameraController focusPlanet={selectedPlanet} planets={planets} />


         {/* Lumière directionnelle pour la scène */}
         <directionalLight 
        intensity={2}
        position={[0, 100, 0]} 
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <ambientLight intensity={0.5} />
      {/* <MovingLight sunRef={sunRef}/> */}
      {/* <Stars /> */}
      
      

      
        {/* Dôme d'étoiles */}
        
        <Constellations/>

        {/* <MiniMap/> */}

        <Sun 
        ref={sunRef}
        name="Sun"
            size={10.9}
            position={[0, 0, 0]}
            color="yellow"
            speed={0.001}
            onClick={() => {
              setSelectedPlanet("Sun")
            }}
            emitsLight={true} 
            starTexture="/textures/2k_sun.jpg"
            clock={clock} 
            elapsedTimeAtPause={elapsedTimeAtPause}  // Passer la dernière valeur du temps

            />

            {planets.map((planet,key)=> <Planet
            key={key}
            name={planet.name}
            size={planet.size}
            position={planet.position}
            color={planet.color}
            speed={planet.speed}
            texture={planet.texture}
            hasRings={planet.hasRings}
            onClick={() => setSelectedPlanet(planet.name)}
            satellites={planet.satellites}
            sunRef={sunRef}
            rotation={planet.rotation}
            inclination={planet.inclination}
            isPaused={isPaused}
            clock={clock}
            elapsedTimeAtPause={elapsedTimeAtPause}  // Passer la dernière valeur du temps
 
          />
          )}
       
      </Suspense>
      <OrbitControls   enableZoom={true} enablePan={true} />
    </Canvas>

   
      <div className={styles.IconContainer}>
        <div><CenterIcon/></div>
        <div onClick={()=>togglePause(!isPaused)}>{!isPaused ? <PauseIcon/> : <PlayIcon/>} </div>
        <div><CenterIcon/></div>
        <div><CenterIcon/></div>
      </div>

    {selectedPlanet && (
        <div className={styles.infoBox}>
          <h2>{selectedPlanet}</h2>
          <p>{planets.find((planet) => planet.name === selectedPlanet)?.infos || "Aucune info disponible"}</p>
          </div>
      )}

       
      </div>
  );
}

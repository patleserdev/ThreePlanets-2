"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import Planet from "./Planet";
import Sun from "./Sun";
import { useState, useEffect, useRef } from "react";
import styles from "@/styles/display.module.css";
import planets from "@/datas/planets.js";
import MovingLight from "./MovingLight.js";
import StarDome from "./StarDome.js";
import Constellations from "./Constellation.js";
import constellations from "../public/constellations.json";
import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import MiniMap from "./Minimap.js";
import CenterIcon from "./CenterIcon.js";
import PauseIcon from "./PauseIcon.js";
import CameraController from "./CameraController.js";
import ConstellationFocus from "./ConstallationFocus.js";
import PlayIcon from "./PlayIcon.js";
import { Clock } from "three"; // Importation de Clock de Three.js
import PlanetFocus from "./PlanetFocus.js";
import InfosBoxIcon from "@/components/InfosBoxIcon";
import PlanetViewer from "./PlanetViewer.js";
import SpaceIcon from "@/components/SpaceIcon"
import { Line, LineBasicMaterial, BufferGeometry, Vector3,RingGeometry, MeshBasicMaterial, Mesh } from 'three';
import HighlightPlanet from "./HighlightPlanet.js"

const Orbit = ({ orbitRadius, inclination }) => {
  // Créer un tableau de points pour la trajectoire circulaire
  const points = [];
  const segments = 200; // Nombre de segments plus élevé pour plus de précision
  // Ajuster les points pour qu'ils forment une orbite complète
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * 2 * Math.PI; // Calculer l'angle pour chaque segment
    points.push(new Vector3(orbitRadius * Math.cos(angle), 0, orbitRadius * Math.sin(angle)));
  }
  // Créer la géométrie de la ligne avec les points
  const geometry = new BufferGeometry().setFromPoints(points);
  return (
    <mesh rotation={[0, inclination, 0]}> {/* Inclinaison autour de l'axe Y pour rester dans le plan XY */}
      <line>
        <lineBasicMaterial color="gray" opacity={0.2} transparent linewidth={2} />
        <primitive object={geometry} />
      </line>
    </mesh>
  );
};


export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const sunRef = useRef();
  const [isPaused, setIsPaused] = useState(false);
  const clockRef = useRef(new Clock());
  const clock = clockRef.current;
  const [lastTime, setLastTime] = useState(0);
  const [elapsedTimeAtPause, setElapsedTimeAtPause] = useState(0);
  const [displayInfoBox, setDisplayInfoBox] = useState(true);
  const [focus, setFocus] = useState(null); // L'état pour la planète ciblée
  const [hoveredPlanetPosition, setHoveredPlanetPosition] = useState(null);

  const selectedPlanetData = planets.find(
    (planet) => planet.name === selectedPlanet
  );

  const handlePlanetPosition = (planetName, position) => {
    if (focus === planetName) {
      setHoveredPlanetPosition(position.clone()); // Clone pour éviter les références directes
    }
  };
  


 const selectPlanet=(e) =>{
setSelectedPlanet(e)
 }

  return (
    <div className={styles.boxContainer}>
      <PlanetFocus setFocus={setFocus} setSelectedPlanet={selectPlanet}/>
      {!selectedPlanet &&
      <Canvas
        camera={{ position: [0, 50, 200], fov: 50, near: 1, far: 10000 }}
        onPointerMissed={() => {
          setSelectedPlanet(null);
          setFocus(null);
        }}
      >
        <Suspense fallback={null}>
          <StarDome />

          <directionalLight
            intensity={2}
            position={[0, 100, 0]}
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />
          <ambientLight intensity={0.5} />

          {planets.map((planet, key) => (
            planet.name === "Soleil" ? (
              <Sun
                key={key}
                ref={sunRef}
                name={planet.name}
                size={10.9}
                position={[0, 0, 0]}
                color="yellow"
                speed={0.001}
                onClick={() => setSelectedPlanet(planet.name)}
                emitsLight={true}
                starTexture="/textures/2k_sun.jpg"
                clock={clock}
                elapsedTimeAtPause={elapsedTimeAtPause}
                getplanetPosition={handlePlanetPosition}
              />
            ) : null
          ))}

          {/* Trajectoires des planètes (orbites) uniquement pour la planète ciblée */}
          {planets.map((planet, key) => (
            planet.display && planet.orbitRadius ? 
                <Orbit
                  key={`orbit-${key}`}
                  orbitRadius={planet.orbitRadius}
                  inclination={planet.inclination * (Math.PI / 180)}
                />
              
             : null
          ))}

          
          {/* Affichage des planètes */}
          {planets.map((planet, key) => (
            planet.display ? (
         <>
                {/* Si la planète est survolée, afficher un cercle autour */}
                {focus === planet.name && hoveredPlanetPosition && (
  <HighlightPlanet key={`highlight-${key}`} planet={planet} position={hoveredPlanetPosition} />
)}


              <Planet
                key={key}
                name={planet.name}
                size={planet.size}
                position={planet.position}
                getplanetPosition={handlePlanetPosition}
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
                elapsedTimeAtPause={elapsedTimeAtPause}
              />
              </>
            ) : null
          ))}
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
      }

      {selectedPlanet && <PlanetViewer planet={selectedPlanetData} />}
      {selectedPlanet && (
        <div
          className={styles.SpaceIcon}
          onClick={() => {
            setSelectedPlanet(null);
            setFocus(null);
            setDisplayInfoBox(true);
          }}
        >
          <SpaceIcon />
        </div>
      )}

      <div className={styles.IconContainer}>
        <div>
          <CenterIcon />
        </div>
        <div onClick={() => togglePause(!isPaused)}>
          {!isPaused ? <PauseIcon /> : <PlayIcon />}
        </div>
        <div>
          <CenterIcon />
        </div>
      </div>

      {/** Boîte d'informations des planètes  **/}
      {selectedPlanet && (
        <div
          className={`${styles.infoBox} ${
            displayInfoBox ? styles.slideRightinfoBox : styles.slideLeftinfoBox
          }`}
        >
          <h2>{selectedPlanet}</h2>
          {selectedPlanetData ? (
            selectedPlanetData.infos.map((info, index) => (
              <p key={index}>{info}</p>
            ))
          ) : (
            <p>Aucune info disponible</p>
          )}
        </div>
      )}

      {/** Boîte d'informations des planètes  **/}
      <div className={styles.infoBoxIcon} onClick={() => setDisplayInfoBox(!displayInfoBox)}>
        <InfosBoxIcon />
      </div>
    </div>
  );
}

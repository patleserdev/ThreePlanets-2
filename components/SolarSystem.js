"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Clock } from "three";

import Planet from "./Planet";
import Sun from "./Sun";
import styles from "@/styles/display.module.css";
import planets from "@/datas/planets.js";
import StarDome from "./StarDome.js";
import { PerspectiveCamera } from "@react-three/drei";
import MiniMap from "./Minimap.js";
import CenterIcon from "./CenterIcon.js";
import PauseIcon from "./PauseIcon.js";
import CameraController from "./CameraController.js";
import PlayIcon from "./PlayIcon.js";
import PlanetFocus from "./PlanetFocus.js";
import InfosBoxIcon from "@/components/InfosBoxIcon";
import PlanetViewer from "./PlanetViewer.js";
import SpaceIcon from "@/components/SpaceIcon";
import HighlightPlanet from "./HighlightPlanet.js";
import Navbar from "./Navbar.js";
import Orbit from "./Orbit";
import Minimap from "./Minimap.js";

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTimeAtPause, setElapsedTimeAtPause] = useState(0);
  const [displayInfoBox, setDisplayInfoBox] = useState(true);
  const [focus, setFocus] = useState(null);

  // ✅ ref au lieu de state — la position change 60x/s, pas besoin de re-render React
  const hoveredPlanetPositionRef = useRef(null);
  const focusRef = useRef(null);

  // Sync focusRef avec focus state pour l'utiliser dans useCallback sans dépendance stale
  useEffect(() => {
    focusRef.current = focus;
  }, [focus]);

  const sunRef = useRef();
  const controlsRef = useRef();
  const clockRef = useRef(new Clock());
  const clock = clockRef.current;
  const planetPositionsRef = useRef({});
  // ✅ Donnée dérivée mémorisée — recalculée uniquement si selectedPlanet change
  const selectedPlanetData = useMemo(
    () => planets.find((p) => p.name === selectedPlanet),
    [selectedPlanet]
  );

  // ✅ Reset displayInfoBox à chaque nouvelle sélection de planète
  useEffect(() => {
    if (selectedPlanet) setDisplayInfoBox(true);
  }, [selectedPlanet]);

  // ✅ useCallback stable — lit focusRef pour éviter la dépendance sur focus
  // Écrit dans un ref → zéro re-render React à chaque frame


  const handlePlanetPosition = useCallback((planetName, position) => {
    planetPositionsRef.current[planetName] = position.clone();
  
    if (focusRef.current === planetName) {
      hoveredPlanetPositionRef.current = position.clone();
    }
  }, []);

  const handleSelectPlanet = useCallback((name) => {
    setSelectedPlanet(name);
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const handlePointerMissed = useCallback(() => {
    setSelectedPlanet(null);
    setFocus(null);
  }, []);

  const handleSpaceBack = useCallback(() => {
    setSelectedPlanet(null);
    setFocus(null);
    setDisplayInfoBox(true);
  }, []);

  // ✅ Une seule boucle sur planets, résultat mémorisé
  // Se recalcule uniquement quand les dépendances changent
  const { sunElement, orbitElements, planetElements } = useMemo(() => {
    const sunElement = planets
      .filter((p) => p.name === "Soleil")
      .map((planet, key) => (
        <Sun
          key={planet.name}
          ref={sunRef}
          name={planet.name}
          size={10.9}
          position={[0, 0, 0]}
          color="yellow"
          speed={0.001}
          onClick={() => handleSelectPlanet(planet.name)}
          emitsLight={true}
          starTexture="/textures/2k_sun.jpg"
          clock={clock}
          elapsedTimeAtPause={elapsedTimeAtPause}
          getplanetPosition={handlePlanetPosition}
        />
      ))[0];

    const orbitElements = planets
      .filter((p) => p.display && p.orbitRadius)
      .map((planet) => (
        <Orbit
          key={`orbit-${planet.name}`}
          orbitRadius={planet.orbitRadius}
          inclination={planet.inclination * (Math.PI / 180)}
        />
      ));

    const planetElements = planets
      .filter((p) => p.display)
      .map((planet) => (
        <>
          {focus === planet.name && (
            <HighlightPlanet key={`hl-${planet.name}`} planet={planet} positionRef={hoveredPlanetPositionRef} />
          )}
          <Planet
            key={planet.name}
            name={planet.name}
            size={planet.size}
            position={planet.position}
            getplanetPosition={handlePlanetPosition}
            color={planet.color}
            speed={planet.speed}
            texture={planet.texture}
            hasRings={planet.hasRings}
            onClick={() => handleSelectPlanet(planet.name)}
            satellites={planet.satellites}
            sunRef={sunRef}
            rotation={planet.rotation}
            inclination={planet.inclination}
            isPaused={isPaused}
            clock={clock}
            elapsedTimeAtPause={elapsedTimeAtPause}
          />
        </>
      ));

    return { sunElement, orbitElements, planetElements };
  }, [focus, isPaused, elapsedTimeAtPause, handlePlanetPosition, handleSelectPlanet, clock]);

  return (
    <div className={styles.boxContainer}>
      <Navbar />

      <div className={styles.planetFocusContainer}>
        <PlanetFocus setFocus={setFocus} setSelectedPlanet={handleSelectPlanet} />
      </div>

      <Minimap
  planets={planets}
  positionsRef={planetPositionsRef}
  focus={focus}
/>

      {!selectedPlanet && (
        <Canvas
          camera={{ position: [0, 50, 200], fov: 50, near: 1, far: 1000000  }}
          onPointerMissed={handlePointerMissed}
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

            {sunElement}
            {orbitElements}
            {planetElements}
          </Suspense>

          <OrbitControls ref={controlsRef} enableZoom={true} enablePan={true} />
        </Canvas>
      )}

      {selectedPlanet && <PlanetViewer planet={selectedPlanetData} />}

      {selectedPlanet && (
        <div className={styles.SpaceIcon} onClick={handleSpaceBack}>
          <SpaceIcon />
        </div>
      )}

      <div className={styles.IconContainer}>
        <div><CenterIcon /></div>
        <div onClick={togglePause}>
          {isPaused ? <PlayIcon /> : <PauseIcon />}
        </div>
        <div><CenterIcon /></div>
      </div>

      {selectedPlanet && (
        <div
          className={`${styles.infoBox} ${
            displayInfoBox ? styles.slideRightinfoBox : styles.slideLeftinfoBox
          }`}
        >
          <h2>{selectedPlanet}</h2>
          {selectedPlanetData
            ? selectedPlanetData.infos.map((info, index) => (
                <p key={index}>{info}</p>
              ))
            : <p>Aucune info disponible</p>
          }
        </div>
      )}

      {selectedPlanet && (
        <div
          className={styles.infoBoxIcon}
          onClick={() => setDisplayInfoBox((prev) => !prev)}
        >
          <InfosBoxIcon />
        </div>
      )}
    </div>
  );
}
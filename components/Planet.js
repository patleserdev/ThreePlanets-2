import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useState, useEffect } from "react";
import * as THREE from "three";
import Satellite from "./Satellite";
import { TextureLoader } from "three";
import GlowMaterial from "./GlowMaterial.js";

export default function Planet(
  { name, size, position, texture, speed, rotation, inclination, onClick, 
    hasRings, 
    satellites = [], 
    emitsLight = false,
    sunRef,
    isPaused,
    clock,
    elapsedTimeAtPause,
    getplanetPosition
  }
) {
  const ref = useRef();
  const ringsRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Charger les textures
  const planetTexture = useLoader(TextureLoader, texture);
  const ringsTexture = hasRings ? useLoader(TextureLoader, "/textures/2k_saturn_ring_alpha.png") : null;

  // Appliquer la rotation de la texture des anneaux
  if (ringsTexture) {
    ringsTexture.rotation = Math.PI / 2;
  }

  // Appliquer l'inclinaison initiale
  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.set(THREE.MathUtils.degToRad(inclination), 0, 0);
    }
  }, [inclination]);
  

  // Animer la planète et les anneaux
  useFrame(() => {

    if (ref.current && !isPaused) {
      const elapsedTime = clock.getElapsedTime() - elapsedTimeAtPause;

    // Mouvement orbital
    ref.current.position.x = position[0] * Math.cos(elapsedTime * speed);
    ref.current.position.z = position[0] * Math.sin(elapsedTime * speed);

    // Rotation sur elle-même
    ref.current.rotation.y += THREE.MathUtils.degToRad(rotation) * 0.01; // Rotation ajustée
    }
    // Mise à jour des anneaux
    if (ringsRef.current) {
      ringsRef.current.position.x = ref.current.position.x;
      ringsRef.current.position.z = ref.current.position.z;
      ringsRef.current.rotation.x = THREE.MathUtils.degToRad(inclination); // Ajuste les anneaux à l'inclinaison
    }

     // Remonter la position de la planète via `getplanetPosition`
     if (getplanetPosition) {
      getplanetPosition(name, ref.current.position);
    }
  });
  return (
    <>
      {/* Planète */}
      <mesh 
        ref={ref} 
        name={name}
        onClick={onClick} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
      
        <meshStandardMaterial map={planetTexture} side={THREE.DoubleSide} />

        {/* Lumière pour les planètes lumineuses */}
        {emitsLight && (
          <pointLight position={position} intensity={500} distance={500} color="white" />
        )}

        {/* Affichage du nom de la planète au survol */}
        {hovered && (
          <Html position={[-2, size, 0]}>
            <div style={{position:'absolute',top:0,left:0,color: "white", background: "black", padding: "5px", borderRadius: "5px" }}>
              {name}
            </div>
          </Html>
        )}
      </mesh>

      {/* Satellites */}
      {satellites.map((sat, index) => (
        <Satellite key={index} parentRef={ref} {...sat} />
      ))}

      {/* Anneaux de Saturne et autres planètes à anneaux */}
      {hasRings && (
  <>
    {/* Couches des anneaux de Saturne */}
    <mesh ref={ringsRef}>
      {/* Utilisation de plusieurs anneaux avec des tailles et épaisseurs ajustées */}
      {[0.00, 0.02, 0.03, 0.04].map((thickness, index) => (
        <mesh key={index}>
          <torusGeometry args={[size + index*0.5, thickness, 16, 100]} />
          <meshStandardMaterial 
            map={ringsTexture} 
            side={THREE.DoubleSide}
            transparent={true}  // Utilisation de transparence pour rendre plus réaliste

            emissiveIntensity={0.3} 
            opacity={0.7}  // Ajuster l'opacité pour plus de réalisme
          />
        </mesh>
      ))}
    </mesh>
  </>
)}

    </>
  );
}

"use client";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  Sphere,
  TextureLoader,
  useTexture,
} from "@react-three/drei";
import { Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import styles from "@/styles/viewer.module.css";

const Planet = ({ planet }) => {
  const texture = useTexture(planet.texture);
  const planetRef = useRef();
  const ringsTexture = useTexture("/textures/2k_saturn_ring_alpha.png"); // Texture des anneaux (si tu en as une)

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += planet.speed * 0.01;
    }
  });

  return (
    <group
      ref={planetRef}
      position={[0, 0, 0]}
      rotation={[planet.inclination, 0, 0]}
    >
      {/* Planète */}
      <mesh>
        <sphereGeometry args={[7, 256, 256]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Anneaux */}
      {planet.hasRings && (
        <>
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[11, 0.3, 16, 100]} />{" "}
            {/* Rayon des anneaux (10), épaisseur réduite (0.3) */}
            <meshStandardMaterial
              map={ringsTexture}
              side={2}
              transparent={true}
              opacity={0.7} // Réglage de l'opacité si nécessaire
            />
          </mesh>

          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[13, 0.3, 16, 100]} />{" "}
            {/* Rayon des anneaux (10), épaisseur réduite (0.3) */}
            <meshStandardMaterial
              map={ringsTexture}
              side={2}
              transparent={true}
              opacity={0.7} // Réglage de l'opacité si nécessaire
            />
          </mesh>

          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[12, 0.3, 16, 100]} />{" "}
            {/* Rayon des anneaux (10), épaisseur réduite (0.3) */}
            <meshStandardMaterial
              map={ringsTexture}
              side={2}
              transparent={true}
              opacity={0.7} // Réglage de l'opacité si nécessaire
            />
          </mesh>
        </>
      )}
    </group>
  );
};

const StarBackground = () => {
  const starsTexture = useTexture("/textures/2k_stars_milky_way.jpg"); // Ta texture étoilée

  return (
    <mesh>
      <sphereGeometry args={[100, 256, 256]} />
      <meshBasicMaterial map={starsTexture} side={2} />
    </mesh>
  );
};

export default function PlanetViewer({ planet }) {
  return (
    <div className={styles.planetViewerContainer}>
      <Canvas camera={{ position: [10, 10, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <StarBackground /> {/* Ajout du fond étoilé */}
          {planet && <Planet key={planet.name} planet={planet} />}
        </Suspense>
        <OrbitControls />
      </Canvas>
      {!planet && (
        <div className={styles.noplanet}>Aucune planète sélectionnée</div>
      )}
    </div>
  );
}

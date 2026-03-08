"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import styles from "@/styles/viewer.module.css";

const PLANET_SIZE = 7;
const STAR_SPHERE_SIZE = 100;
const RING_INNER = PLANET_SIZE * 1.2;
const RING_OUTER = PLANET_SIZE * 2.2;

// ─── UV corrigés pour RingGeometry ───────────────────────────────────────────
// La texture est une bande horizontale (intérieur → extérieur)
// u = position radiale normalisée, v = 0.5 fixe (on lit la ligne du milieu)
function buildRingGeometry(innerRadius, outerRadius, segments = 128) {
  const geo = new THREE.RingGeometry(innerRadius, outerRadius, segments);
  const pos = geo.attributes.position;
  const uv  = geo.attributes.uv;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const r = Math.sqrt(x * x + y * y);
    // ✅ u seul gère le mapping radial — v fixé évite l'effet éventail
    const u = (r - innerRadius) / (outerRadius - innerRadius);
    uv.setXY(i, u, 0.5);
  }
  uv.needsUpdate = true;
  return geo;
}

// ─── Fond étoilé ──────────────────────────────────────────────────────────────
const StarBackground = () => {
  const starsTexture = useTexture("/textures/2k_stars_milky_way.jpg");
  return (
    <mesh>
      <sphereGeometry args={[STAR_SPHERE_SIZE, 64, 64]} />
      <meshBasicMaterial map={starsTexture} side={THREE.BackSide} />
    </mesh>
  );
};

// ─── Planète ──────────────────────────────────────────────────────────────────
const PlanetMesh = ({ planet }) => {
  const groupRef = useRef();

  const planetTexture = useTexture(planet.texture);
  const ringsTexture  = useTexture("/textures/2k_saturn_ring_alpha.png");

  const rotationSpeed  = useMemo(() => planet.speed * 0.01, [planet.speed]);
  const inclinationRad = useMemo(
    () => THREE.MathUtils.degToRad(planet.inclination ?? 0),
    [planet.inclination]
  );

  const ringGeometry = useMemo(
    () => buildRingGeometry(RING_INNER, RING_OUTER),
    []
  );

  const configuredRingsTexture = useMemo(() => {
    if (!planet.hasRings) return null;
    const t = ringsTexture.clone();
    // ✅ ClampToEdge évite la répétition aux bords
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    t.needsUpdate = true;
    return t;
  }, [planet.hasRings, ringsTexture]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <>
      {/* Planète */}
      <group ref={groupRef} rotation={[inclinationRad, 0, 0]}>
        <mesh>
          <sphereGeometry args={[PLANET_SIZE, 64, 64]} />
          <meshStandardMaterial map={planetTexture} />
        </mesh>
      </group>

      {/* Anneaux — group séparé, ne tournent pas avec la planète */}
      {planet.hasRings && configuredRingsTexture && (
        <group rotation={[inclinationRad, 0, 0]}>
          <mesh geometry={ringGeometry} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial
              map={configuredRingsTexture}
              side={THREE.DoubleSide}
              transparent
              alphaTest={0.001}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}
    </>
  );
};

// ─── PlanetViewer ─────────────────────────────────────────────────────────────
export default function PlanetViewer({ planet }) {
  return (
    <div className={styles.planetViewerContainer}>
      {!planet && (
        <div className={styles.noplanet}>Aucune planète sélectionnée</div>
      )}
      <Canvas
        camera={{ position: [0, 5, 20], fov: 50 }}
        frameloop={planet ? "always" : "demand"}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, -5, -5]} intensity={0.2} />

        <Suspense fallback={null}>
          <StarBackground />
          {planet && <PlanetMesh key={planet.name} planet={planet} />}
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={10}
          maxDistance={40}
        />
      </Canvas>
    </div>
  );
}
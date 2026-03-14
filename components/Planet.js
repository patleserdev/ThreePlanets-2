import { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";
import Satellite from "./Satellite";

const RINGS_TEXTURE_PATH = "/textures/2k_saturn_ring_alpha.png";

function buildRingGeometry(innerRadius, outerRadius, segments = 128) {
  const geo = new THREE.RingGeometry(innerRadius, outerRadius, segments);
  const pos = geo.attributes.position;
  const uv  = geo.attributes.uv;

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const r = Math.sqrt(x * x + y * y);
    const u = (r - innerRadius) / (outerRadius - innerRadius);
    uv.setXY(i, u, 0.5);
  }
  uv.needsUpdate = true;
  return geo;
}

const RING_LAYERS = [
  [1.2, 1.6, 0.8],
  [1.65, 1.95, 0.6],
  [2.0, 2.25, 0.45],
  [2.3, 2.5, 0.3],
];

export default function Planet({
  name,
  size,
  position,
  texture,
  speed,
  rotation,
  inclination,
  onClick,
  hasRings,
  satellites = [],
  emitsLight = false,
  isPaused,
  clock,
  elapsedTimeAtPause,
  getplanetPosition,
}) {
  const orbitRef = useRef();      // Groupe orbital → mouvement autour du Soleil
  const meshGroupRef = useRef();  // Groupe interne → inclinaison de la planète
  const meshRef  = useRef();
  const worldPosRef = useRef(new THREE.Vector3());
  const [hovered, setHovered] = useState(false);

  const planetTexture = useLoader(TextureLoader, texture);
  const ringsTexture  = useLoader(TextureLoader, RINGS_TEXTURE_PATH);

  const inclinationRad = useMemo(
    () => THREE.MathUtils.degToRad(inclination),
    [inclination]
  );

  const rotationSpeed = useMemo(
    () => THREE.MathUtils.degToRad(rotation) * 0.01,
    [rotation]
  );

  const configuredRingsTexture = useMemo(() => {
    if (!hasRings) return null;
    const t = ringsTexture.clone();
    t.wrapS = THREE.ClampToEdgeWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    t.needsUpdate = true;
    return t;
  }, [hasRings, ringsTexture]);

  const ringGeometries = useMemo(() => {
    if (!hasRings) return [];
    return RING_LAYERS.map(([inner, outer]) =>
      buildRingGeometry(size * inner, size * outer)
    );
  }, [hasRings, size]);

  useFrame(() => {
    if (!orbitRef.current) return;

    const elapsedTime = isPaused ? elapsedTimeAtPause : clock.getElapsedTime() - elapsedTimeAtPause;

    // ----------------------------
    // Orbite autour du Soleil (même sens pour toutes les planètes)
    // ----------------------------
    orbitRef.current.position.x = position[0] * Math.cos(elapsedTime * speed);
    orbitRef.current.position.z = position[0] * Math.sin(elapsedTime * speed);

    // ----------------------------
    // Rotation de la planète sur elle-même
    // ----------------------------
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }

    // ----------------------------
    // Position globale pour Minimap ou highlight
    // ----------------------------
    if (getplanetPosition) {
      orbitRef.current.getWorldPosition(worldPosRef.current);
      getplanetPosition(name, worldPosRef.current);
    }
  });

  return (
    // Groupe orbital sans inclinaison
    <group ref={orbitRef}>
      {/* Groupe interne pour inclinaison de la planète */}
      <group ref={meshGroupRef} rotation={[inclinationRad, 0, 0]}>
        <mesh
          ref={meshRef}
          name={name}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial map={planetTexture} />

          {emitsLight && (
            <pointLight intensity={500} distance={500} color="white" />
          )}

          {hovered && (
            <Html position={[0, size + 0.3, 0]} center>
              <div style={{
                color: "white",
                background: "rgba(0,0,0,0.75)",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "13px",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}>
                {name}
              </div>
            </Html>
          )}
        </mesh>

        {/* Anneaux */}
        {hasRings && configuredRingsTexture && RING_LAYERS.map(([inner, outer, opacity], i) => (
          <mesh
            key={i}
            geometry={ringGeometries[i]}
            rotation={[Math.PI / 2 - inclinationRad, 0, 0]}
          >
            <meshBasicMaterial
              map={configuredRingsTexture}
              side={THREE.DoubleSide}
              transparent
              alphaTest={0.001}
              depthWrite={false}
              opacity={opacity}
            />
          </mesh>
        ))}

        {/* Satellites */}
        {satellites.map((sat) => (
          <Satellite key={sat.texture ?? sat.distance} parentRef={meshRef} {...sat} />
        ))}
      </group>
    </group>
  );
}
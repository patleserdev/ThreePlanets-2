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
  const meshRef  = useRef();
  const groupRef = useRef();
  const worldPosRef = useRef(new THREE.Vector3());

  const [hovered, setHovered] = useState(false);

  const planetTexture = useLoader(TextureLoader, texture);
  const ringsTexture  = useLoader(TextureLoader, RINGS_TEXTURE_PATH);

  // ✅ inclinaison en radians — utilisée pour le plan orbital ET le visuel
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
    t.wrapS = THREE.ClampToEdgeWrapping; // ✅ comme PlanetViewer
    t.wrapT = THREE.ClampToEdgeWrapping;
    t.needsUpdate = true;
    return t;
  }, [hasRings, ringsTexture]);

  
  // Dans le composant, avec les autres useMemo :
const ringGeometries = useMemo(() => {
  if (!hasRings) return [];
  return RING_LAYERS.map(([inner, outer]) =>
    buildRingGeometry(size * inner, size * outer)
  );
}, [hasRings, size]);

  useFrame(() => {
    if (!groupRef.current) return;

    if (!isPaused) {
      const elapsedTime = clock.getElapsedTime() - elapsedTimeAtPause;

      // ✅ Orbite dans le plan XZ — l'inclinaison du GROUP parent la fait tourner
      // dans le même plan incliné que l'orbite affichée
      groupRef.current.position.x = position[0] * Math.cos(elapsedTime * speed);
      groupRef.current.position.z = position[0] * Math.sin(elapsedTime * speed);

      if (meshRef.current) {
        meshRef.current.rotation.y += rotationSpeed;
      }
    }



    if (getplanetPosition) {
      groupRef.current.getWorldPosition(worldPosRef.current);
      getplanetPosition(name, worldPosRef.current);
    }
  });

  return (
    // ✅ Le group orbital est incliné → la planète tourne dans le même plan que son orbite
    <group rotation={[inclinationRad, 0, 0]}>
      <group ref={groupRef}>
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

        {/* Anneaux dans le même group que la planète → suivent sa position */}
        {hasRings && configuredRingsTexture && RING_LAYERS.map(([inner, outer, opacity], i) => (
  <mesh
    key={i}
    geometry={ringGeometries[i]}
    rotation={[Math.PI / 2 - inclinationRad, 0, 0]}
  >
    <meshBasicMaterial  // ✅ meshBasicMaterial comme PlanetViewer, pas meshStandardMaterial
      map={configuredRingsTexture}
      side={THREE.DoubleSide}
      transparent
      alphaTest={0.001}
      depthWrite={false}
      opacity={opacity}
    />
  </mesh>
))}

        {satellites.map((sat) => (
          <Satellite key={sat.texture ?? sat.distance} parentRef={meshRef} {...sat} />
        ))}
      </group>
    </group>
  );
}
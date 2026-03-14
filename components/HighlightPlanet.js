import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HighlightPlanet = ({ planet, positionRef }) => {
  const groupRef = useRef();
  const innerRingRef = useRef();
  const outerRingRef = useRef();
  const diamondRef = useRef();
  const timeRef = useRef(0);

  const BASE = 1;

  const innerGeometry = useMemo(
    () => new THREE.RingGeometry(BASE * 1.2, BASE * 1.5, 64),
    [BASE]
  );

  const outerGeometry = useMemo(
    () => new THREE.RingGeometry(BASE * 1.5, BASE * 2.2, 64),
    [BASE]
  );

  const lineGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, BASE * 6, 0),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [BASE]);

  const diamondGeometry = useMemo(() => {
    const s = BASE * 0.8;
    const shape = new THREE.Shape();
    shape.moveTo(0, s);
    shape.lineTo(s * 0.5, 0);
    shape.lineTo(0, -s);
    shape.lineTo(-s * 0.5, 0);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, [BASE]);

  useFrame(({ camera }, delta) => {
    if (!groupRef.current || !positionRef.current) return;
  
    const p = positionRef.current;
    groupRef.current.position.set(p.x, p.y, p.z);
  
    const dist = camera.position.distanceTo(groupRef.current.position);
  
    const factor = 0.03; // à ajuster
    groupRef.current.scale.setScalar(dist * factor);
  
    timeRef.current += delta;
    const t = timeRef.current;
  
    if (innerRingRef.current) {
      innerRingRef.current.material.opacity = 0.5 + Math.sin(t * 3) * 0.4;
    }
  
    if (outerRingRef.current) {
      const pulse = (t * 0.6) % 1;
      outerRingRef.current.scale.setScalar(1 + pulse * 2);
      outerRingRef.current.material.opacity = (1 - pulse) * 0.7;
    }
  
    /*
    if (diamondRef.current) {
      diamondRef.current.rotation.z = t * 1.5;
    }
      */
  });

  return (
    <group ref={groupRef} frustumCulled={false}>
      <mesh
        ref={innerRingRef}
        rotation={[Math.PI / 2, 0, 0]}
        frustumCulled={false}
      >
        <primitive object={innerGeometry} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>

      <mesh
        ref={outerRingRef}
        rotation={[Math.PI / 2, 0, 0]}
        frustumCulled={false}
      >
        <primitive object={outerGeometry} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>

      <line geometry={lineGeometry} frustumCulled={false}>
        <lineBasicMaterial
          color="#00FFFF"
          depthTest={false}
        />
      </line>

      <mesh
        ref={diamondRef}
        position={[0, BASE * 6, 0]}
        frustumCulled={false}
      >
        <primitive object={diamondGeometry} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.95}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
    </group>
  );
};

export default HighlightPlanet;
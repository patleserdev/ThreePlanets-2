import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";

export default function Satellite({ parentRef, distance, size, speed, texture }) {
  const ref = useRef();
  const satelliteTexture = useLoader(TextureLoader, texture);

  useFrame(({ clock }) => {
    if (parentRef?.current) {
      // Animation de l'orbite du satellite autour de la planète
      ref.current.position.x = parentRef.current.position.x + distance * Math.cos(clock.elapsedTime * speed);
      ref.current.position.z = parentRef.current.position.z + distance * Math.sin(clock.elapsedTime * speed);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={satelliteTexture} side={THREE.DoubleSide}/>
    </mesh>
  );
}

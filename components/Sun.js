import { Sphere } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useState } from "react";
import styles from "@/styles/display.module.css"
import { PointLight,TextureLoader  } from "three"; // Import nécessaire
import { useLoader } from "@react-three/fiber";

export default function Sun({ name, size, position, color, speed,onClick, emitsLight = false,starTexture,isPaused,clock,elapsedTimeAtPause }) {

  const sunTexture = useLoader(TextureLoader, starTexture); // Charger la texture du Soleil
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (ref.current && !isPaused) {  // Si ce n'est pas en pause, appliquer la rotation
      const elapsedTime = clock.getElapsedTime() - elapsedTimeAtPause;  // Utilisation du clock

    ref.current.position.x = position[0] * Math.cos(elapsedTime * speed);
    ref.current.position.z = position[0] * Math.sin(elapsedTime * speed);
    }
  });
 

  return (
    <>
    <mesh ref={ref} 
    onClick={onClick} 
    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}>
    <Sphere args={[size, 128, 128]}>
      <meshStandardMaterial map={sunTexture} emissive={0xffff00} emissiveIntensity={0.05}/>
      {hovered && (
        <Html position={[0, size + 2, 0]}>
          <div style={{ color: "white", background: "black", padding: "5px", borderRadius: "5px" }}>
            {name}
          </div>
        </Html>
      )}
    </Sphere>
      {/* Ajout d'une vraie lumière pour les planètes lumineuses */}
      {/* {emitsLight && (
        <pointLight position={position} intensity={50000} distance={500000} color="0xffff00" decay={3} />
      )} */}
    </mesh>
  
    </>
  );
}

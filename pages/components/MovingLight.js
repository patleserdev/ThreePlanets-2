import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Ce composant fait en sorte que la lumière suive la position du Soleil
export default function MovingLight({ sunRef }) {
  const lightRef = useRef();

  useFrame(() => {
    // Assurez-vous que la lumière suit la position du Soleil
    if (sunRef.current && lightRef.current) {
      lightRef.current.position.copy(sunRef.current.position);
    }
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={1.5} // Ajuste l'intensité de la lumière du Soleil
      color="yellow" // Donne une couleur de lumière jaune (comme le Soleil)
      distance={200} // La distance à laquelle la lumière s’étend
      decay={2} // La décroissance de la lumière au fur et à mesure que la distance augmente
    />
  );
}

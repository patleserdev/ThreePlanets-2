import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function StarDome() {
  // Charger la texture des étoiles
  const starTexture = useLoader(TextureLoader, "/textures/8k_stars_milky_way.jpg");

  return (
    <mesh>
      {/* Créer une sphère inversée avec un rayon plus petit */}
      <sphereGeometry args={[1000, 256 , 256]} />
      {/* Utiliser meshBasicMaterial avec la texture des étoiles et inverser la sphère (side: 2) */}
      <meshBasicMaterial map={starTexture} side={2} />
    </mesh>
  );
}

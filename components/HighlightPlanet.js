import { useRef, useEffect } from "react";
import { RingGeometry, MeshBasicMaterial, Mesh } from "three";

const HighlightPlanet = ({ planet, position }) => {

    console.log(planet,position)
  const ref = useRef();

  // Mettre à jour la position de l'anneau en fonction de la position de la planète
  useEffect(() => {
    if (ref.current && position) {
      ref.current.position.set(position.x, position.y, position.z);
    }
  }, [position]);

  return (
    <mesh ref={ref}>
           {/* Création de la géométrie de l'anneau autour de la planète */}
           <primitive object={new RingGeometry(planet.size + 1, planet.size + 2, 64)} />
        {/* Création de la matière pour l'anneau avec une couleur jaune et une opacité */}
        <primitive object={new MeshBasicMaterial({ color: "yellow", opacity: 1, transparent: true })} />
    </mesh>
  );
};

  

export default HighlightPlanet;

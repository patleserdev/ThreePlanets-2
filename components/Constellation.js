import { useEffect, useState } from "react";
import { Line } from "@react-three/drei";
import { Html } from "@react-three/drei";

export default function Constellations({ focus,setFocus  }) {
  const [constellations, setConstellations] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [visibleConstellations, setVisibleConstellations] = useState([]);

   // Chargement des constellations une seule fois au montage
  useEffect(() => {
    fetch("/constellations.json")
      .then((res) => res.json())
      .then((data) => {
        setConstellations(data);
        setVisibleConstellations(data); // Initialisation avec toutes les constellations
      })
      .catch((error) => console.error("Erreur de chargement des constellations :", error));
  }, []);

  // Met à jour les constellations visibles en fonction du focus
  useEffect(() => {
    if (focus) {
      setVisibleConstellations(
        constellations.filter((c) => c.name.toLowerCase() === focus.toLowerCase())
      );
    } else {
      setVisibleConstellations(constellations); // Si pas de focus, on affiche tout
    }
  }, [focus, constellations]);

  return (
    <>
      {visibleConstellations.length > 0 &&
        visibleConstellations.map((constellation, index) => (
          <group key={index} onClick={() => setFocus(constellation.name)} // Sélectionner la constellation cliquée
>
            {/* Affichage des étoiles */}
            {constellation.stars.map((star, i) => (
              <mesh
                key={i}
                position={[star.x, star.y, star.z]}
                
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
              >
                <sphereGeometry args={[2, 16, 16]} />
                <meshBasicMaterial color="white" />
              </mesh>
            ))}

            {/* Affichage des lignes entre les étoiles */}
            {constellation.connections &&
              constellation.connections.map(([id1, id2], i) => {
                const star1 = constellation.stars.find((s) => s.id === id1);
                const star2 = constellation.stars.find((s) => s.id === id2);
                if (star1 && star2) {
                  return (
                    <Line
                      key={i}
                      points={[
                        [star1.x, star1.y, star1.z],
                        [star2.x, star2.y, star2.z],
                      ]}
                      color="cyan"
                    />
                  );
                }
                return null;
              })}

            {/* Affichage du nom de la constellation */}
            {hovered && constellation.stars.length > 0 && (
              <Html position={[constellation.stars[0].x, constellation.stars[0].y, constellation.stars[0].z]}>
                <div
                  style={{
                    transition: "1s all",
                    color: "white",
                    background: "black",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  {constellation.name}
                </div>
              </Html>
            )}
          </group>
        ))}
    </>
  );
}

import { useEffect, useState } from "react";
import { Line } from "@react-three/drei";
import { Html } from "@react-three/drei";
export default function Constellations() {
  const [constellations, setConstellations] = useState([]);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    fetch("/constellations.json")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setConstellations(data)}
    );
  }, []);

  return (
    <>
      {constellations.map((constellation, index) => (
        <group key={index}  >
          {constellation.stars.map((star, i) => (
            <mesh key={i} position={[star.x, star.y, star.z]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
              <sphereGeometry args={[2, 16, 16]} />
              <meshBasicMaterial color="white" />
            </mesh>
          ))}
          {constellation.connections.map(([id1, id2], i) => {
            const star1 = constellation.stars.find((s) => s.id === id1);
            const star2 = constellation.stars.find((s) => s.id === id2);
            return <Line key={i} points={[[star1.x, star1.y, star1.z], [star2.x, star2.y, star2.z]]} color="cyan" />;
          })}

        {hovered && (
        <Html position={[constellation.stars[0].x, constellation.stars[0].y, constellation.stars[0].z]}>
          <div style={{ transition:'1s all',color: "white", background: "black", padding: "5px", borderRadius: "5px" }}>
            {constellation.name}
          </div>
        </Html>
      )}
        </group>
      ))}
    </>
  );
}

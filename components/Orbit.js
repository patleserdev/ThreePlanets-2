import { useMemo } from "react";
import { BufferGeometry, Vector3 } from "three";

const SEGMENTS = 200;

const Orbit = ({ orbitRadius, inclination = 0 }) => {

  // ✅ Géométrie mémorisée — recalculée uniquement si orbitRadius change
  const geometry = useMemo(() => {
    const points = [];
    for (let i = 0; i <= SEGMENTS; i++) {
      const angle = (i / SEGMENTS) * 2 * Math.PI;
      points.push(new Vector3(
        orbitRadius * Math.cos(angle),
        0,
        orbitRadius * Math.sin(angle)
      ));
    }
    return new BufferGeometry().setFromPoints(points);
  }, [orbitRadius]);

  return (
    // ✅ rotation sur X — cohérent avec Planet.jsx qui incline aussi sur X
    // ✅ pas de <mesh> wrapper inutile autour d'une <line>
    <line geometry={geometry} rotation={[inclination, 0, 0]}>
      <lineBasicMaterial color="gray" transparent opacity={0.3} />
    </line>
  );
};

export default Orbit;
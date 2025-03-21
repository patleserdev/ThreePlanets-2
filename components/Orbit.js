import { Line, LineBasicMaterial, BufferGeometry, Vector3,RingGeometry, MeshBasicMaterial, Mesh } from 'three';


const Orbit = ({ orbitRadius, inclination }) => {
    // Créer un tableau de points pour la trajectoire circulaire
    const points = [];
    const segments = 200; // Nombre de segments plus élevé pour plus de précision
    // Ajuster les points pour qu'ils forment une orbite complète
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * 2 * Math.PI; // Calculer l'angle pour chaque segment
      points.push(new Vector3(orbitRadius * Math.cos(angle), 0, orbitRadius * Math.sin(angle)));
    }
    // Créer la géométrie de la ligne avec les points
    const geometry = new BufferGeometry().setFromPoints(points);
    return (
      <mesh rotation={[0, inclination, 0]}> {/* Inclinaison autour de l'axe Y pour rester dans le plan XY */}
        <line>
          <lineBasicMaterial color="gray" opacity={0.2} transparent linewidth={2} />
          <primitive object={geometry} />
        </line>
      </mesh>
    );
  };

  export default Orbit
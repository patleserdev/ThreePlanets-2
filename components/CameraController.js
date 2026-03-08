import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ✅ Constantes extraites — jamais recréées, lisibles
const ROTATION_SPEED     = 0.001;
const LERP_SPEED         = 0.05;
const DISTANCE_FACTOR    = 5;    // distance caméra = rayon planète × DISTANCE_FACTOR
const X_OFFSET           = 0.5;
const Y_OFFSET           = 0;
const ANGLE_ADJUSTMENT   = Math.PI / 24;
const ARRIVAL_THRESHOLD  = 0.1;

// Récupère le rayon réel d'un mesh via sa BoundingSphere
function getPlanetRadius(object) {
  let radius = 1;
  object.traverse((child) => {
    if (child.isMesh && child.geometry) {
      child.geometry.computeBoundingSphere();
      const r = child.geometry.boundingSphere?.radius ?? 1;
      if (r > radius) radius = r;
    }
  });
  return radius * object.scale.x;
}

export default function CameraController({ focusPlanet }) {
  const { camera, scene } = useThree();

  // ✅ Tout en refs — zéro re-render React
  const targetPosition  = useRef(new THREE.Vector3());
  const targetLookAt    = useRef(new THREE.Vector3());
  const rotationAngle   = useRef(0);
  const isTracking      = useRef(false);
  const currentFov      = useRef(camera.fov);

  useFrame(() => {
    if (!focusPlanet) {
      isTracking.current = false;
      return;
    }

    const planetObject = scene.getObjectByName(focusPlanet);
    if (!planetObject) return;

    const planetPosition = planetObject.position.clone();
    const planetRadius   = getPlanetRadius(planetObject);
    const distance       = planetRadius * DISTANCE_FACTOR;

    // ✅ Rotation angle incrémenté via ref — aucun re-render
    rotationAngle.current += ROTATION_SPEED;

    const offset = new THREE.Vector3(
      distance * Math.cos(rotationAngle.current) * X_OFFSET,
      planetRadius * Y_OFFSET,
      distance * Math.sin(rotationAngle.current)
    );

    targetPosition.current.copy(planetPosition).add(offset);
    targetLookAt.current.copy(planetPosition);

    // Déplacement fluide de la caméra
    camera.position.lerp(targetPosition.current, LERP_SPEED);
    camera.lookAt(targetLookAt.current);

    // ✅ FOV ajusté avec updateProjectionMatrix — sinon le changement n'a aucun effet
    const targetFov = 2 * Math.atan(planetRadius / distance) * (180 / Math.PI);
    // Clamp entre 10° et 90° pour éviter des valeurs aberrantes
    const clampedFov = Math.min(90, Math.max(10, targetFov));
    currentFov.current = THREE.MathUtils.lerp(currentFov.current, clampedFov, 0.05);
    camera.fov = currentFov.current;
    camera.updateProjectionMatrix(); // ✅ indispensable après changement de fov

    isTracking.current = true;
  });

  return null;
}
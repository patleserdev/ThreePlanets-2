import { useEffect, useRef, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CameraController({ focusPlanet }) {
  const { camera, scene } = useThree();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const [planetScale, setPlanetScale] = useState(1);
  const [fov, setFov] = useState(50);
  const [distance, setDistance] = useState(0); // Distance initiale de la caméra

  // Paramètres ajustables
  const [distanceMultiplier, setDistanceMultiplier] = useState(5);
  const [angleAdjustment, setAngleAdjustment] = useState(Math.PI / 24);
  const [yOffsetMultiplier, setyOffsetMultiplier] = useState(0);
  const [xOffsetMultiplier, setxOffsetMultiplier] = useState(0.5);
  const [lerpSpeed, setlerpSpeed] = useState(1);

  // Rotation angle pour faire tourner la caméra autour de la planète
  const [rotationAngle, setRotationAngle] = useState(0);

  // Paramètre de vitesse de rotation
  const rotationSpeed = 0.001; // Vitesse à laquelle la caméra tourne autour de la planète

  useEffect(() => {
    if (!focusPlanet) return;

    const planetObject = scene.getObjectByName(focusPlanet);
    if (!planetObject) return;

    const planetPosition = planetObject.position.clone();
    const planetRadius = planetObject.scale.x; // Assume la taille de la planète est dans son échelle

    setPlanetScale(planetRadius);

    // Calcul de la distance ajustée
    const adjustedDistance = planetRadius * 2.5; // Ajuste la distance en fonction de la taille de la planète
    setDistance(adjustedDistance);

    // Réajuster le fov en fonction de la distance pour obtenir un cadrage de 80%
    const adjustedFov = 2 * Math.atan(planetRadius / adjustedDistance) * (180 / Math.PI); // Calculer le fov pour un zoom approprié
    setFov(adjustedFov);

    // Calcul du décalage en fonction de l'angle
    const offset = new THREE.Vector3(
      adjustedDistance * Math.cos(angleAdjustment) * xOffsetMultiplier,  // X : Ajuste l'écart horizontal
      planetObject.scale.x * yOffsetMultiplier,  // Y : Ajuste la hauteur de la caméra
      adjustedDistance * Math.sin(angleAdjustment)  // Z : Ajuste la profondeur de la caméra
    );

    // Calcul de la position cible de la caméra et de la cible de la vue (planète)
    targetPosition.current.copy(planetPosition.clone().add(offset));
    targetLookAt.current.copy(planetPosition);

    let animationFrame;
    const animateCamera = () => {
      camera.position.lerp(targetPosition.current, lerpSpeed); // Applique l'interpolation pour un mouvement fluide
      camera.lookAt(targetLookAt.current); // Focalise la caméra sur la planète
      camera.fov = fov; // Applique le fov calculé

      // Si la caméra n'est pas encore à la position cible, continue l'animation
      if (camera.position.distanceTo(targetPosition.current) > 0.1) {
        animationFrame = requestAnimationFrame(animateCamera);
      }
    };

    animateCamera();
    return () => cancelAnimationFrame(animationFrame);
  }, [focusPlanet, camera, scene, fov, distance]);

  // Effect pour mettre à jour la position de la caméra pour tourner autour de la planète
  useFrame(() => {
    if (!focusPlanet) return;

    const planetObject = scene.getObjectByName(focusPlanet);
    if (!planetObject) return;

    const planetPosition = planetObject.position.clone();
    const planetRadius = 2 * planetObject.scale.x;

    // Tourner la caméra autour de la planète sur l'axe Y
    const adjustedDistance = planetRadius * 2.5;
    const offset = new THREE.Vector3(
      adjustedDistance * Math.cos(rotationAngle) * xOffsetMultiplier,
      planetObject.scale.x * yOffsetMultiplier,
      adjustedDistance * Math.sin(rotationAngle)
    );

    targetPosition.current.copy(planetPosition.clone().add(offset));
    targetLookAt.current.copy(planetPosition);

    // Augmenter l'angle de rotation à chaque frame pour faire tourner la caméra
    setRotationAngle((prev) => prev + rotationSpeed);

    camera.position.lerp(targetPosition.current, lerpSpeed); // Applique l'interpolation pour un mouvement fluide
    camera.lookAt(targetLookAt.current); // Focalise la caméra sur la planète
    camera.fov = fov; // Applique le fov calculé
  });

  return null;
}

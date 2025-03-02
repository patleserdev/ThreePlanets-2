import { Html, Plane } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

export default function Minimap() {
  const { scene, camera, gl } = useThree();
  const minimapCamera = useRef();
  const [minimapTexture, setMinimapTexture] = useState(null);

  useEffect(() => {
    // Créer le renderTarget pour la minimap
    const renderTarget = new THREE.WebGLRenderTarget(512, 512);
    setMinimapTexture(renderTarget.texture);

    // Initialiser la caméra minimap
    if (minimapCamera.current) {
      minimapCamera.current.position.set(0, 100, 0);
      minimapCamera.current.lookAt(0, 0, 0);
      minimapCamera.current.rotation.x = -Math.PI / 2; // Vue du dessus
    }
  }, []);

  useFrame(() => {
    if (minimapCamera.current && minimapTexture) {
      // Capturer la scène dans le renderTarget
      gl.setRenderTarget(minimapTexture);
      gl.render(scene, minimapCamera.current); // Rendu dans la texture
      gl.setRenderTarget(null); // Réinitialiser après le rendu
    }
  });

  // Affichage de la minimap sur un Plane dans la scène
  return (
    <>
      {/* La minimap est rendue dans la scène 3D */}
      <Plane position={[0, 100, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[3, 3, 1]}>
        <meshBasicMaterial map={minimapTexture} />
      </Plane>

      {/* Affichage en HTML */}
      <Html>
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: '150px',
            height: '150px',
            border: '2px solid white',
            backgroundColor: 'black',
            borderRadius: '10px',
            zIndex: 1000,
          }}
        >
          <img
            src={minimapTexture ? minimapTexture.image.src : ''}
            alt="minimap"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Ajuster l'image pour qu'elle occupe tout le div sans déformation
            }}
          />
        </div>
      </Html>
    </>
  );
}

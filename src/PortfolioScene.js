import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useLoader } from '@react-three/drei';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

const PortfolioItem = ({ position, color, label }) => {
  const ref = useRef();
  const font = useLoader(FontLoader, '/fonts/helvetiker_regular.typeface.json');

  useFrame(({ clock }) => {
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.5;
    ref.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.5) * 0.5;
  });

  return (
    <group position={position}>
      <mesh ref={ref} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <textGeometry args={[label, { font, size: 0.25, height: 0.2 }]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const PortfolioScene = () => {
  return (
    <Canvas
      shadows
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 5, 15],
      }}
    >
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <Suspense fallback={null}>
        <PortfolioItem
          position={[-3, 1, 0]}
          color="#ff6347"
          label="Web Development"
        />
        <PortfolioItem
          position={[0, 1, 0]}
          color="#4169E1"
          label="Mobile App"
        />
        <PortfolioItem
          position={[3, 1, 0]}
          color="#32CD32"
          label="Data Science"
        />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default PortfolioScene;
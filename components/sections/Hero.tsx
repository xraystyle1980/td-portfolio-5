'use client';

import styles from './Hero.module.css';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

function Model() {
  // First, let's verify the model loads
  console.log('Attempting to load model...');
  const gltf = useGLTF('/models/token-face-export-1.glb');
  console.log('GLTF loaded:', gltf);

  return (
    <primitive 
      object={gltf.scene} 
      scale={1} 
      position={[0, 0, 0]} 
    />
  );
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Welcome to My Site</h1>
        <p>Discover amazing things with floating shapes</p>
      </div>
      
      <div className={styles.modelContainer}>
        <Canvas>
          <ambientLight />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    </section>
  );
}

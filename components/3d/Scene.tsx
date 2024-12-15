'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import TokenFace from './TokenFace'
import { Suspense } from 'react'

// Define positions for multiple tokens
const TOKEN_POSITIONS = [
  [0, 0, 0],      // Center
  [-4, 2, -2],    // Top left
  [4, 2, -2],     // Top right
  [-4, -2, -2],   // Bottom left
  [4, -2, -2],    // Bottom right
  [0, 3, -3],     // Top center
  [0, -3, -3],    // Bottom center
]

export default function Scene() {
  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{
          width: '100%',
          height: '100vh',
          background: 'transparent'
        }}
        dpr={[1, 2]} // Optimize performance
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Map through positions to create multiple tokens */}
        {TOKEN_POSITIONS.map((position, index) => (
          <TokenFace 
            key={index}
            position={position}
            rotation={[0, Math.random() * Math.PI * 2, 0]}
            scale={0.8}
            rotationSpeed={0.3 + Math.random() * 0.4}
          />
        ))}
        
        <OrbitControls enableZoom={false} makeDefault />
        <Preload all />
      </Canvas>
    </Suspense>
  )
} 
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import TokenFace from './TokenFace'
import { Suspense } from 'react'
import { Vector3 } from 'three'

// Generate random positions on the right side
const generateRandomPositions = (count: number) => {
  return Array.from({ length: count }, () => {
    return [
      // x: moved further right (8 to 12)
      8 + Math.random() * 4,
      // y: full height (-4 to 4)
      -4 + Math.random() * 8,
      // z: varying depth (-3 to 0)
      -3 + Math.random() * 3
    ] as const
  })
}

const TOKEN_POSITIONS = generateRandomPositions(10)

export default function Scene() {
  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ position: [10, 0, 12], fov: 45 }}
        style={{
          width: '100%',
          height: '100vh',
          background: 'transparent'
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.2} />
        <pointLight 
          position={[15, 10, 10]} 
          intensity={2}
          castShadow
        />
        <pointLight 
          position={[5, -10, -10]} 
          intensity={1}
        />
        <directionalLight
          position={[10, 0, 5]}
          intensity={0.8}
          color="#ffffff"
        />
        
        {TOKEN_POSITIONS.map((position, index) => (
          <TokenFace 
            key={index}
            position={position as [number, number, number]}
            rotation={[0, Math.random() * Math.PI * 2, 0]}
            scale={0.4 + Math.random() * 0.8}
            rotationSpeed={0.2 + Math.random() * 0.3}
          />
        ))}
        
        <OrbitControls 
          enableZoom={false}
          makeDefault
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI * 2/3}
          target={new Vector3(10, 0, 0)}
        />
        <Preload all />
      </Canvas>
    </Suspense>
  )
} 
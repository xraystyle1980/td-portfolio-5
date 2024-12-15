'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

interface TokenFaceProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  rotationSpeed?: number
}

export default function TokenFace({ 
  position, 
  rotation = [0, 0, 0], 
  scale = 1,
  rotationSpeed = 0.5 
}: TokenFaceProps) {
  const modelRef = useRef<Group>(null)
  const { scene } = useGLTF('/models/token-face-export-1.glb')

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Add smooth rotation animation
      modelRef.current.rotation.y += delta * rotationSpeed
    }
  })

  return (
    <primitive 
      ref={modelRef}
      object={scene.clone()} // Clone the scene for multiple instances
      scale={scale} 
      position={position}
      rotation={rotation}
    />
  )
}

// Pre-load the model
useGLTF.preload('/models/token-face-export-1.glb') 
'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

export default function TokenFace() {
  const modelRef = useRef<Group>(null)
  const { scene } = useGLTF('/models/token-face-export-1.glb')

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Add smooth rotation animation
      modelRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={1} 
      position={[0, 0, 0]} 
    />
  )
}

// Pre-load the model
useGLTF.preload('/models/token-face-export-1.glb') 
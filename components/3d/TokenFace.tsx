'use client'

import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { Group } from 'three'
import { useFrame } from '@react-three/fiber'

interface TokenFaceProps {
  rotation: [number, number, number]
  scale: number
  onPointerOver: () => void
  onPointerOut: () => void
  isHovered: boolean
}

export default function TokenFace({ rotation, scale, onPointerOver, onPointerOut, isHovered }: TokenFaceProps) {
  const { scene } = useGLTF('/models/token-face-export-1.glb')
  const modelRef = useRef<Group>(null)

  // Clone the scene and modify its materials for hover effect
  const clonedScene = scene.clone()
  clonedScene.traverse((child: any) => {
    if (child.isMesh && child.material) {
      child.material = child.material.clone()
      if (isHovered) {
        child.material.metalness = 0.85
        child.material.roughness = 0.15
        child.material.envMapIntensity = 1.5
        child.material.clearcoat = 0.7
        child.material.clearcoatRoughness = 0.2
        child.material.needsUpdate = true
      } else {
        child.material.metalness = 0.6
        child.material.roughness = 0.4
        child.material.envMapIntensity = 1.0
        child.material.clearcoat = 0.0
        child.material.clearcoatRoughness = 0.5
        child.material.needsUpdate = true
      }
    }
  })

  return (
    <primitive 
      ref={modelRef}
      object={clonedScene}
      rotation={rotation}
      scale={scale}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    />
  )
}

// Pre-load the model
useGLTF.preload('/models/token-face-export-1.glb')
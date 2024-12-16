'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

interface TokenFaceProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  onPointerEnter?: () => void
  onPointerLeave?: () => void
  onClick?: () => void
}

export default function TokenFace({ 
  position,
  rotation,
  scale,
  onPointerEnter,
  onPointerLeave,
  onClick
}: TokenFaceProps) {
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
      object={scene.clone()}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    />
  )
}

// Pre-load the model
useGLTF.preload('/models/token-face-export-1.glb') 
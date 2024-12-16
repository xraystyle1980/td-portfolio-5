'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Group } from 'three'

interface TokenFaceProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
}

export default function TokenFace({ 
  position,
  rotation,
  scale
}: TokenFaceProps) {
  const { scene } = useGLTF('/models/token-face-export-1.glb')
  const modelRef = useRef<Group>(null)

  return (
    <primitive 
      ref={modelRef}
      object={scene.clone()}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

// Pre-load the model
useGLTF.preload('/models/token-face-export-1.glb') 
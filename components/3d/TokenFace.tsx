'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Group } from 'three'

interface TokenFaceProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  isHovered?: boolean
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}

export default function TokenFace({ 
  position,
  rotation,
  scale,
  isHovered = false,
  onPointerEnter,
  onPointerLeave
}: TokenFaceProps) {
  const modelRef = useRef<Group>(null)
  const { scene } = useGLTF('/models/token-face-export-1.glb')

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5
    }
  })

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.type === 'Mesh') {
          const mesh = child as THREE.Mesh
          if (mesh.material) {
            const material = mesh.material as THREE.MeshStandardMaterial
            material.emissiveIntensity = isHovered ? 0.8 : 0.2
          }
        }
      })
    }
  }, [isHovered])

  return (
    <primitive 
      ref={modelRef}
      object={scene.clone()}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    />
  )
}

// Pre-load the model
useGLTF.preload('/models/token-face-export-1.glb') 
'use client'

import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import { Group } from 'three'
import gsap from 'gsap'

// Make all props optional with default values
interface TokenFaceProps {
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  onPointerOver?: () => void
  onPointerOut?: () => void
  isHovered?: boolean
  onClick?: () => void
}

export default function TokenFace({ 
  rotation = [0, 0, 0], 
  scale = 1, 
  onPointerOver = () => {}, 
  onPointerOut = () => {}, 
  isHovered = false,
  onClick = () => {}
}: TokenFaceProps) {
  const { scene } = useGLTF('/models/token-face-export-1.glb')
  const modelRef = useRef<Group>(null)

  const handleClick = () => {
    if (modelRef.current) {
      // Create a quick spin animation
      gsap.to(modelRef.current.rotation, {
        y: modelRef.current.rotation.y + Math.PI * 2,
        duration: 0.8,
        ease: "power2.out"
      })
      
      // Add a little bounce
      gsap.to(modelRef.current.position, {
        y: "+=0.5",
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      })
    }
    onClick()
  }

  // Clone the scene and modify its materials for hover effect
  const clonedScene = scene.clone()
  clonedScene.traverse((child: any) => {
    if (child.isMesh && child.material) {
      child.material = child.material.clone()
      if (isHovered) {
        child.material.metalness = 0.4
        child.material.roughness = 0.4
        child.material.envMapIntensity = 1.1
      } else {
        child.material.metalness = 0.2
        child.material.roughness = 0.6
        child.material.envMapIntensity = 1.0
      }
      child.material.needsUpdate = true
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
      onClick={handleClick}
    />
  )
}

useGLTF.preload('/models/token-face-export-1.glb')
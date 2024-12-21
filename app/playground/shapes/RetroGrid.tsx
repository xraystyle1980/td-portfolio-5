'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface RetroGridProps {
  size?: number;
}

export default function RetroGrid({ size = 2 }: RetroGridProps) {
  const sceneRef = useRef<THREE.Group>(null)
  const scrollProgress = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  // Create grid geometry
  const gridGeometry = useMemo(() => {
    const size = 8000
    const divisions = 20
    const geometry = new THREE.BufferGeometry()
    const vertices: number[] = []

    const step = size / divisions

    // Vertical lines (along Z)
    for (let i = 0; i <= divisions; i++) {
      const x = -size/2 + (i * step)
      vertices.push(
        x, 0, -size/2,
        x, 0, size/2
      )
    }

    // Horizontal lines (along X)
    for (let i = 0; i <= divisions; i++) {
      const z = -size/2 + (i * step)
      vertices.push(
        -size/2, 0, z,
        size/2, 0, z
      )
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  // Create border slightly larger than grid
  const borderGeometry = useMemo(() => {
    const size = 8000
    const borderOffset = 40
    const geometry = new THREE.BufferGeometry()
    const vertices: number[] = []

    // Create square border
    vertices.push(
      -(size/2 + borderOffset), 0, -(size/2 + borderOffset),   // Back left
      (size/2 + borderOffset), 0, -(size/2 + borderOffset),    // Back right
      (size/2 + borderOffset), 0, size/2 + borderOffset,       // Front right
      -(size/2 + borderOffset), 0, size/2 + borderOffset,      // Front left
      -(size/2 + borderOffset), 0, -(size/2 + borderOffset)    // Back to start
    )

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  return (
    <group ref={sceneRef} position={[0, -400, 0]}>
      {/* Single yellow border - removed duplicate */}
      <line>
        <primitive object={borderGeometry} />
        <lineBasicMaterial 
          color={0xffff00}
          transparent={true}
          opacity={0.8}
          linewidth={4}
        />
      </line>

      {/* Grid */}
      <lineSegments>
        <primitive object={gridGeometry} />
        <lineBasicMaterial 
          color={0x00ffff}
          transparent
          opacity={0.8}
          linewidth={1}
        />
      </lineSegments>

      {/* Enhanced lighting */}
      <pointLight position={[0, 100, 0]} intensity={5} color={0x00ffff} />
      {/* Border-specific lights */}
      <pointLight position={[size/2, 50, size]} intensity={3} color={0xffff00} />
      <pointLight position={[-size/2, 50, size]} intensity={3} color={0xffff00} />
      <pointLight position={[size/2, 50, -size]} intensity={3} color={0xffff00} />
      <pointLight position={[-size/2, 50, -size]} intensity={3} color={0xffff00} />
      <ambientLight intensity={0.5} />
    </group>
  )
} 
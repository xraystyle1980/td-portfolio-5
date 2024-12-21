'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface RetroGridProps {
  size?: number;
  scroll: number;
}

// Update the createWavePattern function
const createWavePattern = () => {
  const amplitude = 600
  const frequency = 0.001

  return (x: number, z: number) => {
    // Calculate base wave pattern
    const pattern = Math.sin(x * frequency) * Math.cos(z * frequency) * amplitude
    
    // Add edge falloff
    const distanceFromCenter = Math.sqrt(x * x + z * z)
    const maxDistance = 4000  // Half of grid size (8000/2)
    const falloffStart = 3000 // Distance where falloff begins
    
    // Smooth falloff function
    let falloff = 1
    if (distanceFromCenter > falloffStart) {
      falloff = Math.max(0, 1 - Math.pow((distanceFromCenter - falloffStart) / (maxDistance - falloffStart), 2))
    }
    
    // Apply falloff to pattern
    return pattern * falloff
  }
}

export default function RetroGrid({ size = 2, scroll }: RetroGridProps) {
  const sceneRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.LineBasicMaterial>(null)
  const scrollProgress = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Create timeline for grid reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        onUpdate: (self) => {
          if (materialRef.current) {
            // Animate the dash offset based on scroll
            materialRef.current.dashSize = self.progress * 200
            materialRef.current.gapSize = (1 - self.progress) * 200
          }
        }
      }
    })

    return () => {
      tl.kill()
    }
  }, [])

  // Create a single instance of the wave function
  const getWaveHeight = useMemo(() => createWavePattern(), [])

  // Use the same getWaveHeight in both geometries
  const gridGeometry = useMemo(() => {
    const size = 8000
    const divisions = 30
    const geometry = new THREE.BufferGeometry()
    const vertices: number[] = []

    const step = size / divisions

    // Vertical lines (along Z)
    for (let i = 0; i <= divisions; i++) {
      const x = -size/2 + (i * step)
      for (let j = 0; j <= divisions - 1; j++) {
        const z = -size/2 + (j * step)
        const y1 = getWaveHeight(x, z)
        const y2 = getWaveHeight(x, Math.min(z + step, size/2))
        vertices.push(
          x, y1, z,
          x, y2, z + step
        )
      }
    }

    // Horizontal lines (along X)
    for (let i = 0; i <= divisions; i++) {
      const z = -size/2 + (i * step)
      for (let j = 0; j <= divisions - 1; j++) {
        const x = -size/2 + (j * step)
        const y1 = getWaveHeight(x, z)
        const y2 = getWaveHeight(Math.min(x + step, size/2), z)
        vertices.push(
          x, y1, z,
          x + step, y2, z
        )
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [getWaveHeight])

  const borderGeometry = useMemo(() => {
    const size = 8000
    const divisions = 30  // Match grid divisions
    const geometry = new THREE.BufferGeometry()
    const vertices: number[] = []
    const step = size / divisions

    // Only create the outer edges
    
    // Front edge (constant z = -size/2)
    for (let i = 0; i <= divisions; i++) {
      const x = -size/2 + (i * step)
      const z = -size/2
      const y = getWaveHeight(x, z)
      vertices.push(x, y + 2, z)
    }

    // Right edge (constant x = size/2)
    for (let i = 0; i <= divisions; i++) {
      const x = size/2
      const z = -size/2 + (i * step)
      const y = getWaveHeight(x, z)
      vertices.push(x, y + 2, z)
    }

    // Back edge (constant z = size/2) - reverse direction
    for (let i = divisions; i >= 0; i--) {
      const x = -size/2 + (i * step)
      const z = size/2
      const y = getWaveHeight(x, z)
      vertices.push(x, y + 2, z)
    }

    // Left edge (constant x = -size/2) - reverse direction
    for (let i = divisions; i >= 0; i--) {
      const x = -size/2
      const z = -size/2 + (i * step)
      const y = getWaveHeight(x, z)
      vertices.push(x, y + 2, z)
    }

    // Close the loop
    vertices.push(vertices[0], vertices[1], vertices[2])

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [getWaveHeight])

  return (
    <group 
      ref={sceneRef} 
      position={[0, -400, 0]}
      rotation={[
        0.25,  // X: tilted up
        0,         // Y: 180 degree turn
        0           // Z: straight up/down (or use 0)
      ]}
    >
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
        <lineDashedMaterial 
          ref={materialRef}
          color={0x00ffff}
          transparent
          opacity={1}
          linewidth={1}
          scale={1}
          dashSize={0.1}
          gapSize={10}
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
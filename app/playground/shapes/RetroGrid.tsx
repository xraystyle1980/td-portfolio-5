'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  scroll: number
}

export default function RetroGrid({ scroll }: Props) {
  const sceneRef = useRef<THREE.Group>(null)
  const scrollProgress = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress
        }
      }
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  // Improved noise function for smoother, organic terrain
  const noise = (x: number, z: number) => {
    // Large, smooth waves
    const baseWave = Math.sin(x * 0.003) * Math.cos(z * 0.003) * 200

    // Medium organic variations
    const mediumDetail = (
      Math.sin(x * 0.008 + z * 0.005) * 
      Math.cos(z * 0.008 - x * 0.005)
    ) * 100

    // Subtle height variations
    const fineDetail = (
      Math.sin((x + z) * 0.015) * 
      Math.cos((x - z) * 0.015)
    ) * 50

    // Combine all frequencies with smooth transitions
    return baseWave + 
           mediumDetail * (Math.sin(x * 0.001) * 0.5 + 0.5) + 
           fineDetail * (Math.cos(z * 0.002) * 0.5 + 0.5)
  }

  // Create grid geometry
  const gridGeometry = useMemo(() => {
    const size = 800
    const divisions = 60 // Increased divisions for smoother curves
    const geometry = new THREE.BufferGeometry()
    const vertices = []

    // Create grid lines along X axis (width)
    for (let i = 0; i <= divisions; i++) {
      const x = (i / divisions - 0.5) * size * 12
      for (let j = 0; j <= divisions; j++) {
        const z = (j / divisions - 0.5) * size * 12
        vertices.push(x, 0, z)
        if (j < divisions) vertices.push(x, 0, z + size * 12 / divisions)
      }
    }

    // Create grid lines along Z axis
    for (let i = 0; i <= divisions; i++) {
      const z = (i / divisions - 0.5) * size * 12
      for (let j = 0; j <= divisions; j++) {
        const x = (j / divisions - 0.5) * size * 12
        vertices.push(x, 0, z)
        if (j < divisions) vertices.push(x + size * 12 / divisions, 0, z)
      }
    }

    // Apply smooth terrain deformation
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const z = vertices[i + 2]
      vertices[i + 1] = noise(x, z)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  // Create border geometry with same smooth terrain
  const borderGeometry = useMemo(() => {
    const size = 800
    const geometry = new THREE.BufferGeometry()
    const vertices = []

    // Create rectangle border
    const width = size * 12
    const length = size * 12
    
    // Create more points along the border for smoother curves
    const borderDivisions = 100
    
    // Create vertices in order to form a continuous perimeter
    // Start from bottom-left corner and go counter-clockwise
    for (let i = 0; i <= borderDivisions; i++) {
      const t = i / borderDivisions
      // Left edge (bottom to top)
      vertices.push(-width/2, 0, -length/2 + length * t)
    }
    for (let i = 0; i <= borderDivisions; i++) {
      const t = i / borderDivisions
      // Top edge (left to right)
      vertices.push(-width/2 + width * t, 0, length/2)
    }
    for (let i = 0; i <= borderDivisions; i++) {
      const t = i / borderDivisions
      // Right edge (top to bottom)
      vertices.push(width/2, 0, length/2 - length * t)
    }
    for (let i = 0; i <= borderDivisions; i++) {
      const t = i / borderDivisions
      // Bottom edge (right to left)
      vertices.push(width/2 - width * t, 0, -length/2)
    }

    // Apply same noise function to border
    for (let i = 1; i < vertices.length; i += 3) {
      const x = vertices[i-1]
      const z = vertices[i+1]
      vertices[i] = noise(x, z)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])

  return (
    <group ref={sceneRef}>
      {/* Bright yellow border base */}
      <line>
        <primitive object={borderGeometry} />
        <lineBasicMaterial 
          color={0xffff00}
          transparent={false}
          opacity={1.0}
          linewidth={3}
        />
      </line>

      {/* Border outer glow */}
      <line>
        <primitive object={borderGeometry} />
        <lineBasicMaterial 
          color={0xffff00}
          transparent
          opacity={0.6}
          linewidth={6}
        />
      </line>

      {/* Border inner glow */}
      <line>
        <primitive object={borderGeometry} />
        <lineBasicMaterial 
          color={0xffff00}
          transparent
          opacity={0.8}
          linewidth={2}
        />
      </line>

      {/* Main grid */}
      <lineSegments>
        <primitive object={gridGeometry} />
        <lineBasicMaterial 
          color={0x00ffff}
          transparent
          opacity={0.8}
          linewidth={1.5}
        />
      </lineSegments>

      {/* Lights */}
      <pointLight position={[200, 100, 0]} intensity={12} color={0xffff00} />
      <pointLight position={[-200, 100, 0]} intensity={12} color={0xffff00} />
      <pointLight position={[200, -100, 0]} intensity={12} color={0xffff00} />
      <pointLight position={[-200, -100, 0]} intensity={12} color={0xffff00} />
      <pointLight position={[100, 100, 0]} intensity={6} color={0x00ffff} />
      <pointLight position={[-100, 100, 0]} intensity={6} color={0x00ffff} />
      <pointLight position={[0, 100, 100]} intensity={5} color={0x00ffff} />
      <ambientLight intensity={0.8} />
    </group>
  )
} 
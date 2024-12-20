'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'
import CellularPlane from '@/components/3d/CellularPlane'
import TorusField from './shapes/TorusField'
import CubeGrid from './shapes/CubeGrid'
import SphereCloud from './shapes/SphereCloud'

interface Props {
  scroll: number
  currentSection: number
}

export default function Scene({ scroll, currentSection }: Props) {
  const groupRef = useRef<Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      // Smooth section transitions
      const targetY = -currentSection * 5
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Section 0: Tunnel */}
      <CellularPlane scroll={scroll} />
      
      {/* Section 1: Field of rotating tori */}
      <group position={[0, -5, 0]}>
        <TorusField scroll={scroll} />
      </group>
      
      {/* Section 2: Grid of animated cubes */}
      <group position={[0, -10, 0]}>
        <CubeGrid scroll={scroll} />
      </group>
      
      {/* Section 3: Cloud of spheres */}
      <group position={[0, -15, 0]}>
        <SphereCloud scroll={scroll} />
      </group>
    </group>
  )
} 
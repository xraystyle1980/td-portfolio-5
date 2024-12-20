'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, TorusGeometry } from 'three'

interface Props {
  scroll: number
}

export default function TorusField({ scroll }: Props) {
  const groupRef = useRef<Group>(null)
  const count = 5 // 5x5 grid of tori
  const spacing = 2

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
      groupRef.current.position.z = Math.sin(clock.getElapsedTime() * 0.5) + scroll * 5
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: count * count }).map((_, i) => {
        const x = (i % count - count / 2) * spacing
        const z = (Math.floor(i / count) - count / 2) * spacing
        return (
          <mesh key={i} position={[x, 0, z]}>
            <torusGeometry args={[1, 0.3, 16, 32]} />
            <meshBasicMaterial 
              color={0x00ffff} 
              wireframe 
              transparent 
              opacity={0.5} 
            />
          </mesh>
        )
      })}
    </group>
  )
} 
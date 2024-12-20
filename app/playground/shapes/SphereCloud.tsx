'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Vector3 } from 'three'

interface Props {
  scroll: number
}

function createSpherePositions(count: number, radius: number) {
  const positions: Vector3[] = []
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    const r = Math.random() * radius
    
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)
    
    positions.push(new Vector3(x, y, z))
  }
  return positions
}

export default function SphereCloud({ scroll }: Props) {
  const groupRef = useRef<Group>(null)
  const positions = createSpherePositions(50, 5)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.3
      
      // Pulse effect
      const scale = 1 + Math.sin(clock.getElapsedTime()) * 0.1
      groupRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial 
            color={0x00ffff} 
            wireframe 
            transparent 
            opacity={0.4} 
          />
        </mesh>
      ))}
    </group>
  )
} 
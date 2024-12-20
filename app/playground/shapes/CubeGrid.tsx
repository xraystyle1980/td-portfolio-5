'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'

interface Props {
  scroll: number
}

export default function CubeGrid({ scroll }: Props) {
  const groupRef = useRef<Group>(null)
  const count = 4 // 4x4x4 grid
  const spacing = 2
  const [rotations, setRotations] = useState<[number, number, number][]>([])

  // Initialize rotations array
  useEffect(() => {
    setRotations(Array(count * count * count).fill([0, 0, 0]))
  }, [count])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.2

      // Update individual cube rotations
      const newRotations = Array.from({ length: count * count * count }).map((_, i) => {
        const x = (i % count - count / 2) * spacing
        const y = (Math.floor(i / count) % count - count / 2) * spacing
        const z = (Math.floor(i / (count * count)) - count / 2) * spacing
        
        return [
          Math.sin(clock.getElapsedTime() + x) * 0.5,
          Math.sin(clock.getElapsedTime() + y) * 0.5,
          Math.sin(clock.getElapsedTime() + z) * 0.5
        ] as [number, number, number]
      })
      setRotations(newRotations)
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: count * count * count }).map((_, i) => {
        const x = (i % count - count / 2) * spacing
        const y = (Math.floor(i / count) % count - count / 2) * spacing
        const z = (Math.floor(i / (count * count)) - count / 2) * spacing
        
        return (
          <mesh 
            key={i} 
            position={[x, y, z]}
            rotation={rotations[i] || [0, 0, 0]}
          >
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshBasicMaterial 
              color={0x0066ff} 
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
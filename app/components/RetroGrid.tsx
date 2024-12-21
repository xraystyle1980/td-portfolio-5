'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Line } from '@react-three/drei'

interface Props {
  size?: number
  scroll?: number
}

export default function RetroGrid({ size = 400, scroll = 0 }: Props) {
  const gridRef = useRef<THREE.Group>(null)

  // Create perspective grid lines
  const linePoints = useMemo(() => {
    const points = []
    
    // Grid Parameters - adjusted for forward motion
    const gridWidth = 12000            // Width of grid
    const gridLength = 12000           // Longer grid for smoother motion
    const gridY = 0                    // Grid at camera level
    
    // Line Parameters
    const numLongLines = 80            // Lines along length
    const numCrossLines = 80           // Cross lines for motion effect
    const spacing = gridWidth / numLongLines

    // Create long lines (running into distance)
    for (let i = 0; i <= numLongLines; i++) {
      const x = (i * spacing) - gridWidth / 2
      points.push(
        new THREE.Vector3(x, gridY, -gridLength / 2),
        new THREE.Vector3(x, gridY, gridLength / 2)
      )
    }

    // Create cross lines with closer spacing near the front
    for (let i = 0; i <= numCrossLines; i++) {
      // Use exponential spacing for better motion feel
      const t = Math.pow(i / numCrossLines, 1.2)
      const z = t * gridLength - gridLength / 2
      points.push(
        new THREE.Vector3(-gridWidth / 2, gridY, z),
        new THREE.Vector3(gridWidth / 2, gridY, z)
      )
    }

    return points
  }, [])

  // Create line pairs
  const linePairs = useMemo(() => {
    const pairs = []
    for (let i = 0; i < linePoints.length; i += 2) {
      pairs.push([linePoints[i], linePoints[i + 1]])
    }
    return pairs
  }, [linePoints])

  useFrame(() => {
    if (!gridRef.current) return
    
    // Move grid forward, loop when necessary
    const moveSpeed = 4000
    const loopPoint = 6000
    const scrollZ = (scroll * moveSpeed) % loopPoint
    gridRef.current.position.z = scrollZ
  })

  return (
    <group ref={gridRef}>
      {linePairs.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#F39"
          lineWidth={3}
          opacity={0.8}
          transparent
          dashed={false}
        />
      ))}
    </group>
  )
} 
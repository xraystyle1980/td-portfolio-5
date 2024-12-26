'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Line } from '@react-three/drei'

interface Props {
  size?: number
  scroll?: number
}

interface LineWithMaterial extends THREE.Object3D {
  material?: THREE.Material & {
    opacity: number
  }
}

export default function RetroGrid({ size = 400, scroll = 0 }: Props) {
  const gridRef = useRef<THREE.Group>(null)
  const opacityRef = useRef(0)
  const targetOpacity = useRef(1)

  // Create perspective grid lines
  const linePoints = useMemo(() => {
    const points = []
    
    // Grid Parameters
    const gridWidth = 12000            // Width of grid
    const gridLength = 24000           // Double the length for seamless looping
    const gridY = 0                    // Grid at camera level
    
    // Line Parameters
    const numLongLines = 80            // Lines along length
    const numCrossLines = 160          // Double the cross lines for density
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

      // Add extra lines for more density in the middle
      if (i > 0 && i < numCrossLines - 1) {
        const tHalf = (i + 0.5) / numCrossLines
        const zHalf = Math.pow(tHalf, 1.2) * gridLength - gridLength / 2
        points.push(
          new THREE.Vector3(-gridWidth / 2, gridY, zHalf),
          new THREE.Vector3(gridWidth / 2, gridY, zHalf)
        )
      }
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
    
    // Move grid forward with shorter loop distance
    const moveSpeed = 4000
    const loopPoint = 2000
    const scrollZ = -(scroll * moveSpeed) % loopPoint
    gridRef.current.position.z = scrollZ

    // Fade in effect
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity.current, 0.02)
    const lines = gridRef.current.children as LineWithMaterial[]
    lines.forEach(line => {
      if (line.material) {
        line.material.opacity = opacityRef.current
      }
    })
  })

  return (
    <group ref={gridRef}>
      {linePairs.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#F39"
          lineWidth={3}
          transparent
          opacity={0}
        />
      ))}
    </group>
  )
} 
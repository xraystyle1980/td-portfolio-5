'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'

interface Props {
  size?: number
  scroll?: number
}

export default function RetroGrid({ size = 400, scroll = 0 }: Props) {
  const gridRef = useRef<THREE.Group>(null)
  const materialRef = useRef<LineMaterial>(null)

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

  // Create line geometries with Line2
  const lines = useMemo(() => {
    return linePoints.reduce((acc: Line2[], _, index, array) => {
      if (index % 2 === 0) {
        const geometry = new LineGeometry()
        const start = array[index]
        const end = array[index + 1]
        geometry.setPositions([
          start.x, start.y, start.z,
          end.x, end.y, end.z
        ])
        
        const material = new LineMaterial({
          color: '#F39',
          linewidth: 3, // This will actually work now
          vertexColors: false,
          dashed: false,
          alphaToCoverage: true,
          opacity: 0.8,
          transparent: true,
          resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)
        })

        const line = new Line2(geometry, material)
        acc.push(line)
      }
      return acc
    }, [])
  }, [linePoints])

  useFrame(() => {
    if (!gridRef.current) return
    
    // Move grid forward, loop when necessary
    const moveSpeed = 4000
    const loopPoint = 6000
    const scrollZ = (scroll * moveSpeed) % loopPoint
    gridRef.current.position.z = scrollZ

    // Update resolution on each frame
    lines.forEach(line => {
      const material = line.material as LineMaterial
      material.resolution.set(window.innerWidth, window.innerHeight)
    })
  })

  return (
    <group ref={gridRef}>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  )
} 
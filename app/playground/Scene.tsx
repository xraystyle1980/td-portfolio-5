'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Vector3 } from 'three'
import RetroGrid from './shapes/RetroGrid'
import { lerp } from 'three/src/math/MathUtils'

interface Props {
  scroll: number
  currentSection: number
  initialPosition: { x: number; y: number; z: number }
}

export default function Scene({ scroll, currentSection, initialPosition }: Props) {
  const groupRef = useRef<Group>(null)
  const currentPos = useRef(initialPosition)
  const currentLookAt = useRef({ x: 0, y: -100, z: -100 })
  const hasStarted = useRef(false)

  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Calculate target positions
      let targetX, targetY, targetZ
      let lookAtX, lookAtY, lookAtZ

      if (scroll === 0) {
        // Initial position
        targetX = initialPosition.x     // 500
        targetY = initialPosition.y     // 500
        targetZ = initialPosition.z     // 1000
        lookAtX = 0
        lookAtY = -100
        lookAtZ = -100
      } else {
        // Move forward while maintaining initial viewing angle
        targetX = initialPosition.x     // Keep same X
        targetY = initialPosition.y     // Keep same Y
        targetZ = initialPosition.z - scroll * 8000  // Move backward (negative Z)

        // Maintain same viewing angle by moving look-at point backward
        lookAtX = 0
        lookAtY = -100
        lookAtZ = -100 - scroll * 8000  // Move look-at point backward at same rate
      }

      // Smooth camera position
      currentPos.current.x = lerp(currentPos.current.x, targetX, 0.05)
      currentPos.current.y = lerp(currentPos.current.y, targetY, 0.05)
      currentPos.current.z = lerp(currentPos.current.z, targetZ, 0.05)

      // Smooth look-at points
      currentLookAt.current.x = lerp(currentLookAt.current.x, lookAtX, 0.05)
      currentLookAt.current.y = lerp(currentLookAt.current.y, lookAtY, 0.05)
      currentLookAt.current.z = lerp(currentLookAt.current.z, lookAtZ, 0.05)

      // Apply camera transformations
      camera.position.set(
        currentPos.current.x,
        currentPos.current.y,
        currentPos.current.z
      )
      
      camera.lookAt(new Vector3(
        currentLookAt.current.x,
        currentLookAt.current.y,
        currentLookAt.current.z
      ))
    }
  })

  return (
    <group ref={groupRef}>
      <RetroGrid scroll={scroll} />
    </group>
  )
} 
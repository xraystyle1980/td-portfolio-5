'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Vector3, MathUtils } from 'three'

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
        targetX = initialPosition.x
        targetY = initialPosition.y
        targetZ = initialPosition.z
        lookAtX = 0
        lookAtY = -100
        lookAtZ = -100
      } else {
        // Reduce the movement multiplier from 8000 to match grid size
        targetX = initialPosition.x
        targetY = initialPosition.y
        targetZ = initialPosition.z - scroll * 3000  // Reduced from 8000 to 3000 to match grid size
        
        // Adjust look-at point
        lookAtX = 0
        lookAtY = -100
        lookAtZ = -100 - scroll * 3000  // Match the movement rate
      }

      // Smooth camera position
      currentPos.current.x = MathUtils.lerp(currentPos.current.x, targetX, 0.05)
      currentPos.current.y = MathUtils.lerp(currentPos.current.y, targetY, 0.05)
      currentPos.current.z = MathUtils.lerp(currentPos.current.z, targetZ, 0.05)

      // Smooth look-at points
      currentLookAt.current.x = MathUtils.lerp(currentLookAt.current.x, lookAtX, 0.05)
      currentLookAt.current.y = MathUtils.lerp(currentLookAt.current.y, lookAtY, 0.05)
      currentLookAt.current.z = MathUtils.lerp(currentLookAt.current.z, lookAtZ, 0.05)

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
      {/* Remove RetroGrid component from here */}
    </group>
  )
} 
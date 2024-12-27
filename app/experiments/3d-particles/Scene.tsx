'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Vector3, MathUtils } from 'three'

interface Props {
  scroll: number
  currentSection: number
  initialPosition: { x: number; y: number; z: number }
  hideContent?: boolean
}

export default function Scene({ scroll, currentSection, initialPosition, hideContent }: Props) {
  const groupRef = useRef<Group>(null)
  const currentPos = useRef(initialPosition)
  const currentLookAt = useRef(new Vector3(0, 0, 0))

  useFrame(({ camera }) => {
    if (groupRef.current) {
      // Calculate orbital position based on scroll
      const radius = 6000 // Distance from center
      const angle = scroll * Math.PI * 2 // Full 360-degree rotation
      const height = MathUtils.lerp(1800, 3200, scroll) // Gradual height change

      // Calculate camera position on the circular path
      const targetX = Math.sin(angle) * radius
      const targetZ = Math.cos(angle) * radius
      const targetY = height

      // Calculate lookAt based on scroll with tilt
      let lookAtTarget = new Vector3()
      const tiltAmount = Math.sin(scroll * Math.PI * 2) * 100 // Oscillating tilt
      
      lookAtTarget.set(
        Math.sin(angle + Math.PI) * 800, // Look slightly ahead of movement
        tiltAmount,                       // Add vertical movement
        Math.cos(angle + Math.PI) * 800   // Look slightly ahead of movement
      )

      // Smooth camera position
      currentPos.current.x = MathUtils.lerp(currentPos.current.x, targetX, 0.01)
      currentPos.current.y = MathUtils.lerp(currentPos.current.y, targetY, 0.01)
      currentPos.current.z = MathUtils.lerp(currentPos.current.z, targetZ, 0.01)

      // Smooth lookAt transition
      currentLookAt.current.lerp(lookAtTarget, 0.008)

      // Apply camera transformations
      camera.position.set(
        currentPos.current.x,
        currentPos.current.y,
        currentPos.current.z
      )
      camera.lookAt(currentLookAt.current)
    }
  })

  return (
    <group ref={groupRef}>
      {/* Particle system will go here */}
    </group>
  )
} 
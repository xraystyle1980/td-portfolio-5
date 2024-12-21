'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Vector3 } from 'three'
import RetroGrid from './shapes/RetroGrid'

interface Props {
  scroll: number
  currentSection: number
}

export default function Scene({ scroll, currentSection }: Props) {
  const groupRef = useRef<Group>(null)

  useFrame(({ camera }) => {
    // Calculate camera path
    const y = 40 // Height above tunnel
    const z = 40 // Distance behind viewing point
    const lookAheadDistance = 100 // Distance to look ahead in the tunnel

    if (groupRef.current) {
      // Update camera position to follow a curved path
      const time = scroll * Math.PI * 2
      const xOffset = Math.sin(time) * 20 // Gentle side-to-side motion
      
      camera.position.set(xOffset, y, z)
      
      // Look at a point ahead in the tunnel
      const lookAtPoint = new Vector3(0, 0, -lookAheadDistance)
      camera.lookAt(lookAtPoint)
    }
  })

  return (
    <group ref={groupRef}>
      <RetroGrid scroll={scroll} />
    </group>
  )
} 
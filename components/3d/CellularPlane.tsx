'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh, TubeGeometry, Vector3, CatmullRomCurve3 } from 'three'

function createTunnelPath() {
  // Create points in a more symmetrical, spiral pattern
  const points = []
  const segments = 32
  const radius = 1
  const depth = -30
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const angle = t * Math.PI * 2 // Full rotation
    const z = t * depth
    
    // Gentle spiral effect
    const x = Math.sin(angle) * radius * (1 - t * 0.3)
    const y = Math.cos(angle) * radius * (1 - t * 0.3)
    
    points.push(new Vector3(x, y, z))
  }

  // Create a smooth curve through the points
  const curve = new CatmullRomCurve3(points)
  curve.tension = 0.5 // Adjust curve smoothness

  return curve
}

interface Props {
  scroll: number
}

export default function CellularPlane({ scroll }: Props) {
  const groupRef = useRef<Group>(null)
  const path = createTunnelPath()

  // Create tube geometry with more radial segments for smoother roundness
  const tubeGeometry = new TubeGeometry(
    path,
    128,  // tubular segments (increased for smoothness)
    2.5,  // radius (increased for larger tunnel)
    32,   // radial segments (increased for roundness)
    false // closed
  )

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slower, smoother rotation
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.05
      
      // Smoother scroll movement
      groupRef.current.position.z = scroll * 15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main wireframe mesh */}
      <lineSegments>
        <edgesGeometry args={[tubeGeometry]} />
        <lineBasicMaterial 
          color={0x00ffff} 
          transparent
          opacity={0.6}
          linewidth={1}
        />
      </lineSegments>
      
      {/* Inner glow mesh */}
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial 
          color={0x0066ff}
          wireframe
          transparent
          opacity={0.15}
          wireframeLinewidth={1}
        />
      </mesh>
    </group>
  )
} 
'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Props {
  scroll: number
}

export default function RetroGrid({ scroll }: Props) {
  const tunnelRef = useRef<THREE.Mesh>(null)
  const scrollProgress = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress
        }
      }
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  // Create tunnel geometry
  const tunnelGeometry = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(30, 30, 2000, 32, 200, true)
    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const y = positions[i + 1]
      const z = positions[i + 2]
      const radius = Math.sqrt(x * x + z * z)
      const angle = Math.atan2(z, x)
      const warp = Math.sin(y * 0.01) * 6
      positions[i] = (radius + warp) * Math.cos(angle)
      positions[i + 2] = (radius + warp) * Math.sin(angle)
    }
    geometry.rotateX(Math.PI / 2)
    return geometry
  }, [])

  useFrame(() => {
    if (tunnelRef.current) {
      // Move the tunnel forward based on scroll, but keep it centered in view
      const zOffset = scrollProgress.current * 1500
      tunnelRef.current.position.z = zOffset - 750 // Offset by half the tunnel length to keep it centered
    }
  })

  return (
    <group>
      {/* Main Tunnel with bloom effect */}
      <mesh ref={tunnelRef} position={[0, 0, -750]}>
        <primitive object={tunnelGeometry} />
        <meshBasicMaterial 
          color={0x00ffff}
          wireframe
          transparent
          opacity={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Point lights for additional glow */}
      <pointLight position={[0, 20, 10]} intensity={4} color={0x00ffff} />
      <pointLight position={[0, 20, -10]} intensity={4} color={0x00ffff} />
      <pointLight position={[20, 20, 0]} intensity={2} color={0x00ffff} />
      <pointLight position={[-20, 20, 0]} intensity={2} color={0x00ffff} />

      {/* Additional ambient light */}
      <ambientLight intensity={0.2} />
    </group>
  )
} 
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import TokenFace from './TokenFace'
import { Suspense, useCallback, useRef, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'

// Physics constants - adjusted for lava lamp effect
const DAMPING = 0.9999        // Super smooth damping
const RESTITUTION = 0.1
const BOUNCE_THRESHOLD = -2
const BOUNCE_FORCE = 0.5
const FLOAT_FORCE = 0.03      // Increased for more noticeable floating
const WAVE_SPEED = 2000       // Wave motion cycle in milliseconds

// Position fewer, larger tokens with greater vertical spread
const generateRandomPositions = (count: number) => {
  return Array.from({ length: count }, () => {
    return [
      24 + Math.random() * 4,     // x: 24-28 (much further right)
      -20 + Math.random() * 40,   // y: -20 to 20 (much more height spread)
      -2 + Math.random() * 4      // z: -2 to 2 (same depth)
    ] as const
  })
}

const TOKEN_POSITIONS = generateRandomPositions(6)

const PhysicsToken = ({ position }: { position: readonly [number, number, number] }) => {
  const [hovered, setHovered] = useState(false)
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const [hasBounced, setHasBounced] = useState(false)
  const timeOffset = useRef(Math.random() * Math.PI * 2) // Random starting phase

  // Enhanced lava lamp movement
  useEffect(() => {
    const floatInterval = setInterval(() => {
      if (rigidBodyRef.current) {
        const time = Date.now() / WAVE_SPEED
        const waveY = Math.sin(time + timeOffset.current) * FLOAT_FORCE
        const waveX = Math.cos(time + timeOffset.current) * FLOAT_FORCE * 0.5
        
        // Combine wave motion with random movement
        const randomForce = {
          x: waveX + (Math.random() - 0.5) * FLOAT_FORCE * 0.3,
          y: waveY + Math.random() * FLOAT_FORCE * 0.3,
          z: (Math.random() - 0.5) * FLOAT_FORCE * 0.2
        }

        rigidBodyRef.current.applyImpulse(randomForce, true)

        // Add slight rotation for more organic movement
        rigidBodyRef.current.applyTorqueImpulse({
          x: (Math.random() - 0.5) * 0.0001,
          y: (Math.random() - 0.5) * 0.0001,
          z: (Math.random() - 0.5) * 0.0001
        }, true)
      }
    }, 16) // Smoother updates

    return () => clearInterval(floatInterval)
  }, [])

  // Bounce logic
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      if (rigidBodyRef.current && !hasBounced) {
        const currentPos = rigidBodyRef.current.translation()
        if (currentPos.y <= BOUNCE_THRESHOLD) {
          rigidBodyRef.current.applyImpulse(
            { x: 0, y: BOUNCE_FORCE, z: 0 },
            true
          )
          setHasBounced(true)
        }
      }
    }, 16)

    return () => clearInterval(bounceInterval)
  }, [hasBounced])

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="cuboid"
      restitution={RESTITUTION}
      friction={0.1}
      linearDamping={DAMPING}
      angularDamping={DAMPING}
      mass={0.3}  // Lighter mass for more floaty feel
    >
      <TokenFace 
        rotation={[
          Math.random() * Math.PI * 0.5, 
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 0.5
        ]}
        scale={3 + Math.random() * 2}  // Larger tokens: 3.0-5.0x size
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        isHovered={hovered}
      />
    </RigidBody>
  )
}

export default function Scene() {
  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ 
          position: [10, 0, 25],
          fov: 90
        }}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          left: 0,
          top: 0,
          background: 'transparent'  // Removed debug background
        }}
        dpr={[1, 2]}
      >
        <Physics gravity={[0, -0.05, 0]}>  // Reduced gravity for more floating
          <ambientLight intensity={1.2} />
          <pointLight position={[15, 10, 10]} intensity={2} castShadow />
          <pointLight position={[5, -10, -10]} intensity={1} />
          <directionalLight position={[10, 0, 5]} intensity={0.8} color="#ffffff" />
          
          {TOKEN_POSITIONS.map((position, index) => (
            <PhysicsToken key={index} position={position} />
          ))}
          
          {/* Extended boundary colliders for larger vertical space */}
          <CuboidCollider args={[5, 60, 0.1]} position={[26, 0, -3]} />
          <CuboidCollider args={[5, 0.1, 3]} position={[26, -25, 0]} />
          <CuboidCollider args={[5, 0.1, 3]} position={[26, 25, 0]} />
        </Physics>
        
        <OrbitControls 
          enableZoom={false}
          makeDefault
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={Math.PI / 2.5}    // Adjusted to allow more vertical view
          maxPolarAngle={Math.PI / 1.7}
          target={new Vector3(10, 0, 0)}
        />
        <Preload all />
      </Canvas>
    </Suspense>
  )
} 
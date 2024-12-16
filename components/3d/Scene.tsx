'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import TokenFace from './TokenFace'
import { Suspense, useCallback, useRef, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'

// Physics constants - adjusted for ultra-slow lava lamp effect
const DAMPING = 0.9999        // Even higher damping
const RESTITUTION = 0.1       // Very low bounce
const BOUNCE_THRESHOLD = -2
const BOUNCE_FORCE = 0.5      // Very gentle bounce
const FLOAT_FORCE = 0.01      // Much smaller random forces

// Position tokens across full viewport height on the right
const generateRandomPositions = (count: number) => {
  return Array.from({ length: count }, () => {
    return [
      16 + Math.random() * 4,     // x: 16-20 (right side)
      -12 + Math.random() * 24,   // y: -12 to 12 (even more height spread)
      -2 + Math.random() * 4      // z: -2 to 2 (depth variation)
    ] as const
  })
}

const TOKEN_POSITIONS = generateRandomPositions(12)  // More tokens for better coverage

const PhysicsToken = ({ position }: { position: readonly [number, number, number] }) => {
  const [hovered, setHovered] = useState(false)
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const [hasBounced, setHasBounced] = useState(false)

  // Add subtle random movement
  useEffect(() => {
    const floatInterval = setInterval(() => {
      if (rigidBodyRef.current) {
        const randomForce = {
          x: (Math.random() - 0.5) * FLOAT_FORCE,
          y: Math.random() * FLOAT_FORCE,
          z: (Math.random() - 0.5) * FLOAT_FORCE
        }
        rigidBodyRef.current.applyImpulse(randomForce, true)
      }
    }, 1000) // Apply random force every second

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
      mass={0.5}
    >
      <TokenFace 
        rotation={[
          Math.random() * Math.PI * 0.5, 
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 0.5
        ]}
        scale={2 + Math.random() * 1.5}  // Much larger tokens: 2.0-3.5x size
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
          position: [10, 0, 20],  // Moved camera further back
          fov: 85                 // Even wider FOV
        }}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          left: 0,
          top: 0,
          background: 'rgba(144, 238, 144, 0.2)'  // Light green with some transparency
        }}
        dpr={[1, 2]}
      >
        <Physics gravity={[0, -0.1, 0]}>
          <ambientLight intensity={1.2} />
          <pointLight position={[15, 10, 10]} intensity={2} castShadow />
          <pointLight position={[5, -10, -10]} intensity={1} />
          <directionalLight position={[10, 0, 5]} intensity={0.8} color="#ffffff" />
          
          {TOKEN_POSITIONS.map((position, index) => (
            <PhysicsToken key={index} position={position} />
          ))}
          
          {/* Taller boundary colliders */}
          <CuboidCollider args={[5, 40, 0.1]} position={[18, 0, -3]} />
          <CuboidCollider args={[5, 0.1, 3]} position={[18, -15, 0]} />
          <CuboidCollider args={[5, 0.1, 3]} position={[18, 15, 0]} />
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
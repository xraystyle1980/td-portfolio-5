'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import TokenFace from './TokenFace'
import { Suspense, useCallback, useRef, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'

// Physics constants - adjusted for bouncy movement
const HOVER_FORCE = 0.5
const DAMPING = 0.92      // Reduced damping for more bounce
const RESTITUTION = 0.8   // Increased for more bounce
const RISE_FORCE = 0.15
const INITIAL_DROP_HEIGHT = 15  // Starting height
const BOUNCE_THRESHOLD = -4    // Height at which to apply bounce

const generateRandomPositions = (count: number) => {
  return Array.from({ length: count }, () => {
    return [
      8 + Math.random() * 4,    // x: spread horizontally
      INITIAL_DROP_HEIGHT,      // y: start at top
      -3 + Math.random() * 3    // z: vary depth
    ] as const
  })
}

const TOKEN_POSITIONS = generateRandomPositions(5)

const PhysicsToken = ({ position }: { position: readonly [number, number, number] }) => {
  const [hovered, setHovered] = useState(false)
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const [hasBounced, setHasBounced] = useState(false)

  // Monitor position and apply bounce
  useEffect(() => {
    const bounceInterval = setInterval(() => {
      if (rigidBodyRef.current && !hasBounced) {
        const currentPos = rigidBodyRef.current.translation()
        if (currentPos.y <= BOUNCE_THRESHOLD) {
          // Apply upward force when hitting threshold
          rigidBodyRef.current.applyImpulse(
            { 
              x: 0, 
              y: 8, // Strong upward force
              z: 0 
            },
            true
          )
          setHasBounced(true)
        }
      }
    }, 16)

    return () => clearInterval(bounceInterval)
  }, [hasBounced])

  const handleHover = useCallback((isHovering: boolean) => {
    setHovered(isHovering)
    if (rigidBodyRef.current) {
      const currentPos = new Vector3(
        rigidBodyRef.current.translation().x,
        rigidBodyRef.current.translation().y,
        rigidBodyRef.current.translation().z
      )
      
      // Smoother force application
      const force = currentPos.clone()
        .normalize()
        .multiplyScalar(isHovering ? HOVER_FORCE : -HOVER_FORCE/4)
      
      // Apply force more gradually
      rigidBodyRef.current.applyImpulse(
        { 
          x: force.x * 0.5, 
          y: force.y * 0.5, 
          z: force.z * 0.5 
        },
        true
      )
    }
  }, [])

  const handleClick = useCallback(() => {
    if (rigidBodyRef.current) {
      const randomAngle = Math.random() * Math.PI * 2
      const force = new Vector3(
        Math.cos(randomAngle) * 5, // Reduced from 10
        Math.sin(randomAngle) * 5,
        0
      )
      rigidBodyRef.current.applyImpulse(
        { x: force.x, y: force.y, z: force.z },
        true
      )
    }
  }, [])

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={[position[0], INITIAL_DROP_HEIGHT, position[2]]} // Start from top
      colliders="cuboid"
      restitution={RESTITUTION}
      friction={0.2}
      linearDamping={DAMPING}
      angularDamping={DAMPING}
    >
      <TokenFace 
        rotation={[
          Math.random() * Math.PI * 0.5, 
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 0.5
        ]}
        scale={1.2 + Math.random() * 1.8}
        onPointerEnter={() => handleHover(true)}
        onPointerLeave={() => handleHover(false)}
        onClick={handleClick}
      />
    </RigidBody>
  )
}

export default function Scene() {
  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ position: [10, 0, 12], fov: 45 }}
        style={{
          width: '100%',
          height: '100vh',
          background: 'transparent'
        }}
        dpr={[1, 2]}
      >
        <Physics gravity={[0, -9.8, 0]}>
          <ambientLight intensity={1.2} />
          <pointLight position={[15, 10, 10]} intensity={2} castShadow />
          <pointLight position={[5, -10, -10]} intensity={1} />
          <directionalLight position={[10, 0, 5]} intensity={0.8} color="#ffffff" />
          
          {TOKEN_POSITIONS.map((position, index) => (
            <PhysicsToken key={index} position={position} />
          ))}
          
          {/* Boundary colliders */}
          <CuboidCollider args={[5, 20, 0.1]} position={[10, 0, -3]} />
          <CuboidCollider args={[5, 0.1, 3]} position={[10, -6, 0]} />
        </Physics>
        
        <OrbitControls 
          enableZoom={false}
          makeDefault
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI * 2/3}
          target={new Vector3(10, 0, 0)}
        />
        <Preload all />
      </Canvas>
    </Suspense>
  )
} 
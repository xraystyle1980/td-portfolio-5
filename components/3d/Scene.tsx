'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import TokenFace from './TokenFace'
import { Suspense, useCallback, useRef, useState, useEffect } from 'react'
import { Vector3 } from 'three'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'
import { CameraHelper } from 'three'
import { useHelper } from '@react-three/drei'

// Physics constants - adjusted for lava lamp effect
const DAMPING = 0.9999        // Super smooth damping
const RESTITUTION = 0.1
const BOUNCE_THRESHOLD = -2
const BOUNCE_FORCE = 0.5
const FLOAT_FORCE = 0.03      // Increased for more noticeable floating
const WAVE_SPEED = 2000       // Wave motion cycle in milliseconds

// Position tokens on the right side
const generateRandomPositions = (count: number) => {
  return Array.from({ length: count }, () => {
    return [
      35 + Math.random() * 4,     // x: 35 to 39 (right side)
      -20 + Math.random() * 40,   // y: same vertical spread
      -2 + Math.random() * 4      // z: same depth
    ] as const
  })
}

const TOKEN_POSITIONS = generateRandomPositions(6)

const PhysicsToken = ({ position }: { position: readonly [number, number, number] }) => {
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const [hasBounced, setHasBounced] = useState(false)
  const timeOffset = useRef(Math.random() * Math.PI * 2)
  
  // Store initial values in refs
  const initialRotation = useRef([
    Math.random() * Math.PI * 0.5,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 0.5
  ])
  const initialScale = useRef(3 + Math.random() * 2)

  // Physics animation
  useFrame((state, delta) => {
    if (!rigidBodyRef.current) return

    const time = state.clock.elapsedTime
    const waveY = Math.sin(time + timeOffset.current) * FLOAT_FORCE
    const waveX = Math.cos(time + timeOffset.current) * FLOAT_FORCE * 0.5

    const force = {
      x: waveX + (Math.random() - 0.5) * FLOAT_FORCE * 0.3,
      y: waveY + Math.random() * FLOAT_FORCE * 0.3,
      z: (Math.random() - 0.5) * FLOAT_FORCE * 0.2
    }

    rigidBodyRef.current.applyImpulse(force, true)
    rigidBodyRef.current.applyTorqueImpulse({
      x: (Math.random() - 0.5) * 0.0001,
      y: (Math.random() - 0.5) * 0.0001,
      z: (Math.random() - 0.5) * 0.0001
    }, true)

    // Check bounce
    if (!hasBounced) {
      const currentPos = rigidBodyRef.current.translation()
      if (currentPos.y <= BOUNCE_THRESHOLD) {
        rigidBodyRef.current.applyImpulse(
          { x: 0, y: BOUNCE_FORCE, z: 0 },
          true
        )
        setHasBounced(true)
      }
    }
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="cuboid"
      restitution={RESTITUTION}
      friction={0.1}
      linearDamping={DAMPING}
      angularDamping={DAMPING}
      mass={0.3}
    >
      <TokenFace 
        rotation={initialRotation.current}
        scale={initialScale.current}
      />
    </RigidBody>
  )
}

export default function Scene() {
  const cameraRef = useRef()

  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ 
          position: [-50, 0, 30],  // Keep camera back for helper view
          fov: 45,
          ref: cameraRef
        }}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          left: 0,
          top: 0,
          background: 'transparent'
        }}
        dpr={[1, 2]}
      >
        {cameraRef.current && <primitive object={new CameraHelper(cameraRef.current)} />}
        
        <gridHelper args={[100, 100, '#666666', '#222222']} />
        
        <axesHelper args={[5]} />

        <Physics gravity={[0, -0.15, 0]}>
          <ambientLight intensity={1.2} />
          <pointLight position={[15, 10, 10]} intensity={2} castShadow />
          <pointLight position={[5, -10, -10]} intensity={1} />
          <directionalLight position={[10, 0, 5]} intensity={0.8} color="#ffffff" />
          
          {TOKEN_POSITIONS.map((position, index) => (
            <PhysicsToken key={index} position={position} />
          ))}
          
          <CuboidCollider args={[5, 60, 0.1]} position={[37, 0, -3]} />
          <CuboidCollider args={[5, 0.1, 3]} position={[37, -25, 0]} />
          <CuboidCollider args={[5, 0.1, 3]} position={[37, 25, 0]} />
        </Physics>
        
        <OrbitControls 
          enableZoom={false}
          makeDefault
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.7}
          target={new Vector3(5, 10, -10)}  // Moved target further right (from 35 to 50)
        />
        <Preload all />
      </Canvas>
    </Suspense>
  )
} 
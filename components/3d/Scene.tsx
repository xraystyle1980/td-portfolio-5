'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Preload, Stats, Grid } from '@react-three/drei'
import TokenFace from './TokenFace'
import { Suspense, useRef, useState, useMemo, memo, useEffect } from 'react'
import { Vector3 } from 'three'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'

// Optimize physics constants
const DAMPING = 0.95
const RESTITUTION = 0.1
const FLOAT_FORCE = 0.04
const REPULSION_RADIUS = 30
const REPULSION_FORCE = 50
const ATTRACTION_FORCE = 0.5

// Token positions
const TOKEN_POSITIONS = [
  // Right side tokens
  ...Array.from({ length: 8 }, () => [
    22 + Math.random() * 8,
    -15 + Math.random() * 50,
    15 + Math.random() * 8
  ] as const),
  // Left side tokens
  ...Array.from({ length: 8 }, () => [
    -22 - Math.random() * 8,
    -15 + Math.random() * 50,
    15 + Math.random() * 8
  ] as const)
]

const PhysicsToken = ({ position }: { position: readonly [number, number, number] }) => {
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const timeOffset = useRef(Math.random() * Math.PI * 2)
  const { camera } = useThree()
  const [mousePos] = useState(new Vector3())
  const [repulsionPoint] = useState(new Vector3())

  useFrame((state) => {
    if (!rigidBodyRef.current) return
    const time = state.clock.elapsedTime
    const currentPos = rigidBodyRef.current.translation()
    
    // Update mouse position in 3D space
    const vector = new Vector3()
    vector.set(
      (state.mouse.x * 2) - 1,
      -(state.mouse.y * 2) + 1,
      0.5
    )
    vector.unproject(camera)
    const dir = vector.sub(camera.position).normalize()
    const distance = -camera.position.z / dir.z
    mousePos.copy(camera.position).add(dir.multiplyScalar(distance))

    // Calculate repulsion from mouse
    repulsionPoint.copy(mousePos)
    repulsionPoint.y = currentPos.y // Keep repulsion on same y-plane
    const distanceToMouse = new Vector3(currentPos.x, currentPos.y, currentPos.z)
      .distanceTo(repulsionPoint)

    if (distanceToMouse < REPULSION_RADIUS) {
      const repulsionDirection = new Vector3(
        currentPos.x - repulsionPoint.x,
        0,
        currentPos.z - repulsionPoint.z
      ).normalize()

      const repulsionStrength = 
        (1 - distanceToMouse / REPULSION_RADIUS) * REPULSION_FORCE

      rigidBodyRef.current.applyImpulse({
        x: repulsionDirection.x * repulsionStrength,
        y: 0,
        z: repulsionDirection.z * repulsionStrength
      }, true)
    }

    // Attraction to original position
    const originalPos = new Vector3(position[0], position[1], position[2])
    const currentPosition = new Vector3(currentPos.x, currentPos.y, currentPos.z)
    const attractionDirection = originalPos.sub(currentPosition)
    const attractionStrength = attractionDirection.length() * ATTRACTION_FORCE

    rigidBodyRef.current.applyImpulse({
      x: attractionDirection.x * attractionStrength,
      y: 0,
      z: attractionDirection.z * attractionStrength
    }, true)

    // Floating motion
    rigidBodyRef.current.applyImpulse(
      {
        x: Math.cos(time + timeOffset.current) * FLOAT_FORCE * 0.5,
        y: Math.sin(time + timeOffset.current) * FLOAT_FORCE,
        z: 0
      },
      true
    )
  })

  const initialValues = useMemo(() => ({
    rotation: [
      Math.random() * Math.PI * 0.5,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 0.5
    ] as [number, number, number],
    scale: 5 + Math.random() * 3
  }), [])

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="cuboid"
      restitution={RESTITUTION}
      linearDamping={DAMPING}
      angularDamping={DAMPING}
    >
      <TokenFace 
        rotation={initialValues.rotation}
        scale={initialValues.scale}
      />
    </RigidBody>
  )
}

const Lights = memo(() => (
  <>
    <ambientLight intensity={1.2} />
    <pointLight position={[15, 10, 10]} intensity={2} />
    <pointLight position={[5, -10, -10]} intensity={1} />
    <directionalLight position={[10, 0, 5]} intensity={0.8} color="#ffffff" />
  </>
))
Lights.displayName = 'Lights'

const GridFloor = memo(() => (
  <Grid
    position={[0, 2, 0]}
    args={[100, 100]}
    cellSize={5}
    cellThickness={1}
    cellColor="#2F1A0C"
    sectionSize={20}
    sectionThickness={1.5}
    sectionColor="#2F1A0C"
    fadeDistance={150}
    fadeStrength={1}
    followCamera={true}
    infiniteGrid
  />
))
GridFloor.displayName = 'GridFloor'

export default function Scene() {
  return (
    <Canvas
      camera={{ 
        position: [-40, 30, 60],
        fov: 45
      }}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        background: 'transparent'
      }}
      frameloop="demand"
      dpr={[1, 2]}
      performance={{
        min: 0.5,
        max: 1,
        debounce: 200
      }}
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        alpha: true
      }}
    >
      <Suspense fallback={null}>
        <Stats className="stats-panel" />
        <Physics 
          gravity={[0, -0.15, 0]}
          timeStep="vary"
          interpolate={false}
          colliders={false}
          maxCcdSubsteps={2}
        >
          <Lights />
          <GridFloor />
          {TOKEN_POSITIONS.map((position, index) => (
            <PhysicsToken 
              key={index} 
              position={position} 
            />
          ))}
          <CuboidCollider args={[50, 0.1, 50]} position={[0, -25, 0]} />
        </Physics>
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
          target={new Vector3(15, 0, -5)}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          enablePan={false}
        />
        <Preload all />
      </Suspense>
    </Canvas>
  )
} 
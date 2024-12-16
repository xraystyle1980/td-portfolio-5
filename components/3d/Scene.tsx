'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF, Stats } from '@react-three/drei'
import TokenFace from './TokenFace'
import { Suspense, useRef, useState, useMemo, memo } from 'react'
import { Vector3, Raycaster, Plane } from 'three'
import { Physics, RigidBody, CuboidCollider, RapierRigidBody } from '@react-three/rapier'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'

// Optimize physics constants
const DAMPING = 0.95          // Reduced from 0.9999 for snappier movement
const RESTITUTION = 0.1
const BOUNCE_THRESHOLD = -2
const BOUNCE_FORCE = 0.5
const FLOAT_FORCE = 0.04
const WAVE_SPEED = 1500
const REPULSION_FORCE = 80
const REPULSION_RADIUS = 25
const ATTRACTION_FORCE = 50
const ATTRACTION_RADIUS = 40
const CLICK_FORCE = 400

// Memoize token positions
const TOKEN_POSITIONS = Array.from({ length: 6 }, () => [
  22 + Math.random() * 4,
  -15 + Math.random() * 40,
  15 + Math.random() * 4
] as const)

const PhysicsToken = ({ position }: { position: readonly [number, number, number] }) => {
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const [hasBounced, setHasBounced] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const timeOffset = useRef(Math.random() * Math.PI * 2)
  const { camera, raycaster, pointer } = useThree()
  const plane = useRef(new Plane(new Vector3(0, 0, 1), 0))
  const intersectionPoint = useRef(new Vector3())
  const repelDir = useRef(new Vector3())
  const force = useRef(new Vector3())
  
  // Memoize initial values
  const initialValues = useMemo(() => ({
    rotation: [
      Math.random() * Math.PI * 0.5,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 0.5
    ] as [number, number, number],
    scale: 5 + Math.random() * 3
  }), [])

  useFrame((state) => {
    if (!rigidBodyRef.current) return

    const time = state.clock.elapsedTime
    const tokenPos = rigidBodyRef.current.translation()

    // Get cursor position
    raycaster.setFromCamera(pointer, camera)
    raycaster.ray.intersectPlane(plane.current, intersectionPoint.current)

    // Calculate direction and distance
    repelDir.current.set(
      tokenPos.x - intersectionPoint.current.x,
      tokenPos.y - intersectionPoint.current.y,
      tokenPos.z - intersectionPoint.current.z
    )
    const length = repelDir.current.length()

    // Combine all forces into one impulse
    force.current.set(
      Math.cos(time + timeOffset.current) * FLOAT_FORCE * 0.5,  // Base X wave
      Math.sin(time + timeOffset.current) * FLOAT_FORCE,        // Base Y wave
      0                                                         // Base Z is 0
    )

    // Add interaction forces if in range
    if (length < ATTRACTION_RADIUS) {
      const normalizedDir = repelDir.current.normalize()
      
      if (length < REPULSION_RADIUS) {
        // Close range: repulsion
        force.current.add(
          normalizedDir.multiplyScalar(REPULSION_FORCE * (1 - length / REPULSION_RADIUS))
        )
      } else {
        // Medium range: attraction
        force.current.add(
          normalizedDir.multiplyScalar(-ATTRACTION_FORCE * (1 - (length - REPULSION_RADIUS) / (ATTRACTION_RADIUS - REPULSION_RADIUS)))
        )
      }
    }

    // Add click force
    if (isClicked) {
      force.current.add(repelDir.current.normalize().multiplyScalar(CLICK_FORCE))
      setIsClicked(false)
    }

    // Add some randomness to the movement
    force.current.add(new Vector3(
      (Math.random() - 0.5) * FLOAT_FORCE * 0.3,
      Math.random() * FLOAT_FORCE * 0.3,
      (Math.random() - 0.5) * FLOAT_FORCE * 0.2
    ))

    // Apply the combined force
    rigidBodyRef.current.applyImpulse(force.current, true)

    // Handle bounce
    if (!hasBounced && tokenPos.y <= BOUNCE_THRESHOLD) {
      rigidBodyRef.current.applyImpulse({ x: 0, y: BOUNCE_FORCE, z: 0 }, true)
      setHasBounced(true)
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
      mass={0.5}
    >
      <TokenFace 
        rotation={initialValues.rotation}
        scale={initialValues.scale}
        onClick={() => setIsClicked(true)}
      />
    </RigidBody>
  )
}

// At the top level, create memoized light setup
const Lights = memo(() => (
  <>
    <ambientLight intensity={1.2} />
    <pointLight position={[15, 10, 10]} intensity={2} />
    <pointLight position={[5, -10, -10]} intensity={1} />
    <directionalLight position={[10, 0, 5]} intensity={0.8} color="#ffffff" />
  </>
))
Lights.displayName = 'Lights'

// Create memoized colliders
const Colliders = memo(() => (
  <>
    <CuboidCollider args={[5, 60, 0.1]} position={[-33, 0, 12]} />
    <CuboidCollider args={[5, 0.1, 3]} position={[-33, -25, 15]} />
    <CuboidCollider args={[5, 0.1, 3]} position={[-33, 25, 15]} />
  </>
))
Colliders.displayName = 'Colliders'

export default function Scene() {
  // Memoize OrbitControls props
  const orbitControlsProps = useMemo(() => ({
    enableZoom: false,
    makeDefault: true,
    minAzimuthAngle: -Math.PI / 4,
    maxAzimuthAngle: Math.PI / 4,
    minPolarAngle: Math.PI / 2.5,
    maxPolarAngle: Math.PI / 1.7,
    target: new Vector3(15, 0, -5)
  }), [])

  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ 
          position: [-20, 40, 10],
          fov: 45
        }}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          left: 0,
          top: 0,
          background: 'transparent'
        }}
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ 
          powerPreference: "high-performance",
          antialias: false,
          stencil: false,
          depth: true
        }}
      >
        <Stats 
          showPanel={0}
          className="stats-panel"
        />
        
        <Physics 
          gravity={[0, -0.15, 0]}
          timeStep="vary"
        >
          <Lights />
          
          {TOKEN_POSITIONS.map((position, index) => (
            <PhysicsToken key={index} position={position} />
          ))}
          
          <Colliders />
        </Physics>
        
        <OrbitControls {...orbitControlsProps} />
        <Preload all />
      </Canvas>
    </Suspense>
  )
} 
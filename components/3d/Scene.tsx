'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF, Stats } from '@react-three/drei'
import TokenFace from './TokenFace'
import { Suspense, useRef, useState, useMemo, memo, useEffect } from 'react'
import { Vector3, Raycaster, Plane, GridHelper } from 'three'
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
const TOKEN_POSITIONS = [
  // First batch (right side)
  ...Array.from({ length: 12 }, () => [
    22 + Math.random() * 8,
    -15 + Math.random() * 50,
    15 + Math.random() * 8
  ] as const),
  // Second batch (left side - mirrored)
  ...Array.from({ length: 12 }, () => [
    -22 - Math.random() * 8,  // Negative x position
    -15 + Math.random() * 50,
    15 + Math.random() * 8
  ] as const)
]

const PhysicsToken = ({ 
  position, 
  allTokenRefs,
  returnToOrigin 
}: { 
  position: readonly [number, number, number],
  allTokenRefs: React.MutableRefObject<(RigidBodyType | null)[]>,
  returnToOrigin: boolean
}) => {
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const originalPosition = useRef(new Vector3(position[0], position[1], position[2]))
  const returnForce = useRef(new Vector3())
  const [hasBounced, setHasBounced] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const timeOffset = useRef(Math.random() * Math.PI * 2)
  const { camera, raycaster, pointer } = useThree()
  const plane = useRef(new Plane(new Vector3(0, 0, 1), 0))
  const intersectionPoint = useRef(new Vector3())
  const repelDir = useRef(new Vector3())
  const force = useRef(new Vector3())
  const magneticForce = useRef(new Vector3())
  const tokenPos = useRef(new Vector3())
  const otherPos = useRef(new Vector3())
  
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
    const pos = rigidBodyRef.current.translation()
    tokenPos.current.set(pos.x, pos.y, pos.z)

    // Get cursor position
    raycaster.setFromCamera(pointer, camera)
    raycaster.ray.intersectPlane(plane.current, intersectionPoint.current)

    // Calculate direction and distance
    repelDir.current.set(
      pos.x - intersectionPoint.current.x,
      pos.y - intersectionPoint.current.y,
      pos.z - intersectionPoint.current.z
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

    // Add magnetic forces between tokens
    magneticForce.current.set(0, 0, 0)
    allTokenRefs.current.forEach(otherToken => {
      if (otherToken && otherToken !== rigidBodyRef.current) {
        const otherPos = otherToken.translation()
        const direction = new Vector3(
          otherPos.x - pos.x,
          otherPos.y - pos.y,
          otherPos.z - pos.z
        )
        const distance = direction.length()
        
        if (distance > 0 && distance < 20) { // Adjust range as needed
          const strength = (1 - distance / 20) * 0.3 // Adjust strength as needed
          magneticForce.current.add(
            direction.normalize().multiplyScalar(strength)
          )
        }
      }
    })

    // Add magnetic force to the combined force
    force.current.add(magneticForce.current)

    // Add return to origin force when triggered
    if (returnToOrigin) {
      returnForce.current.set(
        originalPosition.current.x - pos.x,
        originalPosition.current.y - pos.y,
        originalPosition.current.z - pos.z
      )
      const returnStrength = 0.5 // Adjust for stronger/weaker return force
      force.current.add(returnForce.current.multiplyScalar(returnStrength))
    }

    // Apply the combined force
    rigidBodyRef.current.applyImpulse(force.current, true)

    // Handle bounce
    if (!hasBounced && pos.y <= BOUNCE_THRESHOLD) {
      rigidBodyRef.current.applyImpulse({ x: 0, y: BOUNCE_FORCE, z: 0 }, true)
      setHasBounced(true)
    }
  })

  // Add this token to the refs array when mounted
  useEffect(() => {
    if (rigidBodyRef.current) {
      allTokenRefs.current.push(rigidBodyRef.current)
      return () => {
        allTokenRefs.current = allTokenRefs.current.filter(ref => ref !== rigidBodyRef.current)
      }
    }
  }, [allTokenRefs])

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

// Create a new component for camera controls
const CameraControls = () => {
  const { camera, gl } = useThree()
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = true
      controlsRef.current.autoRotateSpeed = 0.5
      controlsRef.current.enableDamping = true
      controlsRef.current.dampingFactor = 0.05
    }
  }, [])

  useFrame(() => {
    controlsRef.current?.update()
  })

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableZoom={false}
      makeDefault
      autoRotate
      enableDamping
      target={new Vector3(15, 0, -5)}
    />
  )
}

export default function Scene() {
  const allTokenRefs = useRef<(RigidBodyType | null)[]>([])
  const [returnToOrigin, setReturnToOrigin] = useState(false)

  // Set up the interval for return-to-origin
  useEffect(() => {
    const returnInterval = setInterval(() => {
      setReturnToOrigin(true)
      
      // Reset after 1 second of return force
      setTimeout(() => {
        setReturnToOrigin(false)
      }, 1000)
    }, 20000)  // Changed from 100000 to 20000 (20 seconds)

    return () => clearInterval(returnInterval)
  }, [])

  return (
    <Suspense fallback={null}>
      <Canvas
        camera={{ 
          position: [-60, 80, 30],  // Moved further back to see both sides
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
            <PhysicsToken 
              key={index} 
              position={position} 
              allTokenRefs={allTokenRefs}
              returnToOrigin={returnToOrigin}
            />
          ))}
          
          <Colliders />
        </Physics>
        
        <CameraControls />
        <Preload all />
      </Canvas>
    </Suspense>
  )
} 
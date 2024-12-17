'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Preload, Stats, Grid } from '@react-three/drei'
import TokenFace from './TokenFace'
import { Suspense, useRef, useState, useMemo, memo, useEffect } from 'react'
import { Vector3 } from 'three'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'
import styles from './Scene.module.css'

// Adjust constants for stronger cursor interaction
const DAMPING = 0.65
const RESTITUTION = 0.8
const FLOAT_FORCE = 0.06
const REPULSION_RADIUS = 200        // Much larger radius
const REPULSION_FORCE = 1200        // Dramatically stronger repulsion
const ATTRACTION_FORCE = 0.05
const MAGNETIC_RADIUS = 50
const MAGNETIC_FORCE = 25          // Reduced magnetic force to let repulsion dominate
const CLICK_FORCE = 2000           // Much stronger click force
const CLICK_RADIUS = 250           // Much larger click radius
const RESET_DURATION = 1.5
const CYCLE_DURATION = 10
const TRANSITION_DURATION = 1.5

// Move tokens even further right and more spread out
const TOKEN_POSITIONS = Array.from({ length: 12 }, () => [
  45 + Math.random() * 40,   // x: shifted further right (45 to 85)
  10 + Math.random() * 30,   // y: same vertical spread (10 to 40)
  15 + Math.random() * 20    // z: same depth (15 to 35)
] as const)

const PhysicsToken = ({ position }: { position: readonly [number, number, number] }) => {
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const timeOffset = useRef(Math.random() * Math.PI * 2)
  const originalPosition = useRef(new Vector3(...position))
  const isResetting = useRef(false)
  const resetStartTime = useRef(0)
  const resetStartPosition = useRef(new Vector3())
  const { camera } = useThree()
  const [mousePos] = useState(new Vector3())
  const [repulsionPoint] = useState(new Vector3())
  const [isClicked, setIsClicked] = useState(false)
  const isScatterPhase = useRef(false)  // Track which phase we're in

  useThree(({ gl }) => {
    // Add click listener to canvas
    gl.domElement.addEventListener('mousedown', () => setIsClicked(true))
    gl.domElement.addEventListener('mouseup', () => setIsClicked(false))
  })

  useFrame((state) => {
    if (!rigidBodyRef.current) return
    const time = state.clock.elapsedTime
    const currentPos = rigidBodyRef.current.translation()

    // Check for phase change every CYCLE_DURATION seconds
    if (Math.floor(time / CYCLE_DURATION) % 2 === 0 && isScatterPhase.current) {
      // Time to return to original position
      isScatterPhase.current = false
      isResetting.current = true
      resetStartTime.current = time
      resetStartPosition.current.set(currentPos.x, currentPos.y, currentPos.z)
    } else if (Math.floor(time / CYCLE_DURATION) % 2 === 1 && !isScatterPhase.current) {
      // Time to scatter
      isScatterPhase.current = true
    }

    // Handle return to original position animation
    if (isResetting.current) {
      const elapsed = time - resetStartTime.current
      const progress = Math.min(elapsed / TRANSITION_DURATION, 1)
      
      const eased = 1 - Math.pow(1 - progress, 3)
      
      const newX = resetStartPosition.current.x + (originalPosition.current.x - resetStartPosition.current.x) * eased
      const newY = resetStartPosition.current.y + (originalPosition.current.y - resetStartPosition.current.y) * eased
      const newZ = resetStartPosition.current.z + (originalPosition.current.z - resetStartPosition.current.z) * eased
      
      rigidBodyRef.current.setTranslation({ x: newX, y: newY, z: newZ }, true)
      
      if (progress === 1) {
        isResetting.current = false
        rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      }
      
      return  // Skip other physics during reset
    }

    // Only apply physics forces during scatter phase
    if (isScatterPhase.current) {
      // Magnetic effect
      const allTokens = Object.values(state.scene.children)
        .find(child => child.name === 'Physics')
        ?.children
        .filter(child => {
          if (!rigidBodyRef.current) return true
          
          // Get current position inside the filter
          const currentPos = rigidBodyRef.current.translation()
          const childPos = child.position
          
          // Check if it's a different object at a different position
          return (childPos.x !== currentPos.x || 
                  childPos.y !== currentPos.y || 
                  childPos.z !== currentPos.z) && 
                  child.name.includes('RigidBody')
        }) || []

      // Apply magnetic attraction to nearby tokens
      allTokens.forEach(token => {
        const tokenPos = token.position
        const distanceToToken = new Vector3(currentPos.x, currentPos.y, currentPos.z)
          .distanceTo(tokenPos)

        if (distanceToToken < MAGNETIC_RADIUS) {
          const attractionDirection = new Vector3(
            tokenPos.x - currentPos.x,
            tokenPos.y - currentPos.y,
            tokenPos.z - currentPos.z
          ).normalize()

          const attractionStrength = 
            Math.pow(1 - distanceToToken / MAGNETIC_RADIUS, 2) * MAGNETIC_FORCE

          rigidBodyRef.current?.applyImpulse({
            x: attractionDirection.x * attractionStrength,
            y: attractionDirection.y * attractionStrength * 0.3, // Reduced vertical attraction
            z: attractionDirection.z * attractionStrength
          }, true)
        }
      })

      // Enhanced cursor repulsion with stronger effect
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

      repulsionPoint.copy(mousePos)
      const distanceToMouse = new Vector3(currentPos.x, currentPos.y, currentPos.z)
        .distanceTo(repulsionPoint)

      if (distanceToMouse < REPULSION_RADIUS) {
        const repulsionDirection = new Vector3(
          currentPos.x - repulsionPoint.x,
          currentPos.y - repulsionPoint.y,
          currentPos.z - repulsionPoint.z
        ).normalize()

        // More dramatic falloff curve
        const repulsionStrength = 
          Math.pow(1 - distanceToMouse / REPULSION_RADIUS, 4) * 
          REPULSION_FORCE * 
          (isClicked ? 5 : 1)  // Even stronger click multiplier

        rigidBodyRef.current.applyImpulse({
          x: repulsionDirection.x * repulsionStrength,
          y: repulsionDirection.y * repulsionStrength,  // Full vertical effect
          z: repulsionDirection.z * repulsionStrength
        }, true)

        // More dramatic click explosion
        if (isClicked && distanceToMouse < CLICK_RADIUS) {
          const explosionStrength = 
            Math.pow(1 - distanceToMouse / CLICK_RADIUS, 3) * CLICK_FORCE

          rigidBodyRef.current.applyImpulse({
            x: repulsionDirection.x * explosionStrength,
            y: Math.abs(repulsionDirection.y) * explosionStrength * 1.5,  // Stronger upward boost
            z: repulsionDirection.z * explosionStrength
          }, true)
        }
      }

      // Floating motion with reduced return force during scatter
      rigidBodyRef.current.applyImpulse(
        {
          x: Math.cos(time + timeOffset.current) * FLOAT_FORCE * 1.2,
          y: Math.sin(time + timeOffset.current) * FLOAT_FORCE * 1.5,
          z: Math.sin(time * 0.7 + timeOffset.current) * FLOAT_FORCE * 0.8
        },
        true
      )
    } else {
      // During gather phase, just apply gentle floating
      rigidBodyRef.current.applyImpulse(
        {
          x: Math.cos(time + timeOffset.current) * FLOAT_FORCE * 0.3,
          y: Math.sin(time + timeOffset.current) * FLOAT_FORCE * 0.4,
          z: Math.sin(time * 0.7 + timeOffset.current) * FLOAT_FORCE * 0.2
        },
        true
      )
    }
  })

  const initialValues = useMemo(() => ({
    rotation: [
      Math.random() * Math.PI * 0.5,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 0.5
    ] as [number, number, number],
    scale: 8 + Math.random() * 4  // Increased from 5 + Math.random() * 3
  }), [])

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="cuboid"
      restitution={RESTITUTION}
      linearDamping={DAMPING}
      angularDamping={DAMPING}
      friction={0.2}           // Added friction for better interactions
      mass={1}                 // Explicit mass for consistent physics
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
    position={[45, 2, 0]}
    args={[100, 100]}
    cellSize={5}
    cellThickness={1}
    cellColor="#EFE8E4"
    sectionSize={20}
    sectionThickness={1}
    sectionColor="#EFE8E4"
    fadeDistance={150}
    fadeStrength={1}
    followCamera={true}
    infiniteGrid
  />
))
GridFloor.displayName = 'GridFloor'

const CANVAS_CONFIG = {
  frameloop: "demand" as const,
  dpr: [1, 2] as [number, number],
  camera: {
    position: [20, 30, 90] as [number, number, number],  // Adjusted for new token positions
    fov: 45
  },
  performance: {
    min: 0.5,
    max: 1,
    debounce: 200
  },
  gl: {
    powerPreference: "high-performance" as const,
    antialias: true,
    alpha: true
  }
} as const;

const CameraLogger = () => {
  const { camera, controls } = useThree()

  useEffect(() => {
    const logCameraPosition = () => {
      console.log('Camera Position:', {
        x: camera.position.x.toFixed(2),
        y: camera.position.y.toFixed(2),
        z: camera.position.z.toFixed(2)
      })
      console.log('Camera Target:', {
        x: (controls as any)?.target.x.toFixed(2),
        y: (controls as any)?.target.y.toFixed(2),
        z: (controls as any)?.target.z.toFixed(2)
      })
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'l') {  // Press 'l' to log camera position
        logCameraPosition()
      }
    })
  }, [camera, controls])

  return null
}

const CursorIndicator = () => {
  const { camera } = useThree()
  const [mousePos] = useState(new Vector3())
  const meshRef = useRef<THREE.Mesh>(null)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useFrame((state) => {
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

    if (meshRef.current) {
      meshRef.current.position.copy(mousePos)
      meshRef.current.scale.setScalar(isClicked ? 2 : 1)
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial 
        color={isClicked ? "#ff0000" : "#ffffff"} 
        transparent 
        opacity={0}
      />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas
      className={styles.canvas}
      {...CANVAS_CONFIG}
    >
      <Suspense fallback={null}>
        <CameraLogger />
        <Stats className="stats-panel" />
        <CursorIndicator />
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
          autoRotateSpeed={0.2}
          enableDamping
          dampingFactor={0.05}
          target={new Vector3(55, 10, 20)}  // Adjusted target for new positioning
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          enablePan={false}
        />
        <Preload all />
      </Suspense>
    </Canvas>
  )
} 
'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Preload, Stats, Grid } from '@react-three/drei'
import TokenFace from './TokenFace'
import { Suspense, useRef, useState, useMemo, memo, useEffect } from 'react'
import { Vector3 } from 'three'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'
import styles from './Scene.module.css'

// Adjust constants for more dramatic repulsion
const DAMPING = 0.95               // Slightly less damping for more movement
const RESTITUTION = 0.2           // More bounce
const FLOAT_FORCE = 0.01          // Keep gentle float
const REPULSION_RADIUS = 150       // Smaller radius for more precise control
const REPULSION_FORCE = 300        // Reduced force for gentler push
const ATTRACTION_FORCE = 0.02      
const MAGNETIC_RADIUS = 40         // Larger magnetic radius
const MAGNETIC_FORCE = 20          // Stronger magnetic force
const CLICK_FORCE = 800           // Strong but not overwhelming click force
const CLICK_RADIUS = 250          // Larger click radius
const RESET_DURATION = 1.5
const CYCLE_DURATION = 10
const TRANSITION_DURATION = 1.5
const RETURN_FORCE = 0.6           // Reduced to be more gentle
const RETURN_RADIUS = 400          // Increased to allow more spread
const RESET_INTERVAL = 3000  // 3 seconds in milliseconds

// Spread tokens out more widely
const TOKEN_POSITIONS = Array.from({ length: 24 }, () => [
  65 + Math.random() * 60,    // x: wider spread (35 to 95)
  25 + Math.random() * 25,    // y: more vertical spread (15 to 40)
  -10 + Math.random() * 50    // z: much more depth (-10 to 40)
] as const)

const PhysicsToken = ({ position }: { position: readonly [number, number, number] }) => {
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const timeOffset = useRef(Math.random() * Math.PI * 2)
  const { camera } = useThree()
  const [mousePos] = useState(new Vector3())
  const [repulsionPoint] = useState(new Vector3())
  const [isClicked, setIsClicked] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const resetTimeoutRef = useRef<NodeJS.Timeout>()
  const { gl } = useThree()

  useEffect(() => {
    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)
    
    gl.domElement.addEventListener('mousedown', handleMouseDown)
    gl.domElement.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      gl.domElement.removeEventListener('mousedown', handleMouseDown)
      gl.domElement.removeEventListener('mouseup', handleMouseUp)
    }
  }, [gl])

  useEffect(() => {
    const resetInterval = setInterval(() => {
      setIsResetting(true)
      
      resetTimeoutRef.current = setTimeout(() => {
        setIsResetting(false)
      }, 1000)
    }, RESET_INTERVAL)

    // Cleanup both interval and timeout
    return () => {
      clearInterval(resetInterval)
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  useFrame((state) => {
    if (!rigidBodyRef.current) return
    const time = state.clock.elapsedTime
    const currentPos = rigidBodyRef.current.translation()

    // Only apply magnetic and repulsion forces if NOT resetting
    if (!isResetting) {
      // Magnetic effect
      const allTokens = Object.values(state.scene.children)
        .find(child => child.name === 'Physics')
        ?.children
        .filter(child => {
          if (!rigidBodyRef.current) return true
          
          const currentPos = rigidBodyRef.current.translation()
          const childPos = child.position
          
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
            y: attractionDirection.y * attractionStrength * 0.3,
            z: attractionDirection.z * attractionStrength
          }, true)
        }
      })

      // Cursor repulsion
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

      mousePos.add(new Vector3(65, 25, 15))  // Adjusted for new center point

      repulsionPoint.copy(mousePos)
      const distanceToMouse = new Vector3(currentPos.x, currentPos.y, currentPos.z)
        .distanceTo(repulsionPoint)

      if (distanceToMouse < REPULSION_RADIUS) {
        const repulsionDirection = new Vector3(
          currentPos.x - repulsionPoint.x,
          currentPos.y - repulsionPoint.y,
          currentPos.z - repulsionPoint.z
        ).normalize()

        const repulsionStrength = 
          Math.pow(1 - distanceToMouse / REPULSION_RADIUS, 3) * // Changed to cubic falloff
          REPULSION_FORCE * 
          (isClicked ? 2 : 1)  // Reduced click multiplier

        rigidBodyRef.current.applyImpulse({
          x: repulsionDirection.x * repulsionStrength,
          y: repulsionDirection.y * repulsionStrength * 0.8, // Reduced vertical effect
          z: repulsionDirection.z * repulsionStrength
        }, true)

        if (isClicked && distanceToMouse < CLICK_RADIUS) {
          const explosionStrength = 
            Math.pow(1 - distanceToMouse / CLICK_RADIUS, 2) * CLICK_FORCE

          rigidBodyRef.current.applyImpulse({
            x: repulsionDirection.x * explosionStrength,
            y: Math.abs(repulsionDirection.y) * explosionStrength,
            z: repulsionDirection.z * explosionStrength
          }, true)
        }
      }

      const distanceToOrigin = new Vector3(
        currentPos.x - position[0],
        currentPos.y - position[1],
        currentPos.z - position[2]
      ).length()

      // Apply return force when tokens get too far
      if (distanceToOrigin > RETURN_RADIUS) {
        const returnDirection = new Vector3(
          position[0] - currentPos.x,
          position[1] - currentPos.y,
          position[2] - currentPos.z
        ).normalize()

        const returnStrength = 
          Math.pow((distanceToOrigin - RETURN_RADIUS) / RETURN_RADIUS, 2) * 
          RETURN_FORCE

        rigidBodyRef.current.applyImpulse({
          x: returnDirection.x * returnStrength,
          y: returnDirection.y * returnStrength,
          z: returnDirection.z * returnStrength
        }, true)
      }

      // Floating motion
      rigidBodyRef.current.applyImpulse(
        {
          x: Math.cos(time + timeOffset.current) * FLOAT_FORCE * 0.3,
          y: Math.sin(time + timeOffset.current) * FLOAT_FORCE * 0.4,
          z: Math.sin(time * 0.7 + timeOffset.current) * FLOAT_FORCE * 0.2
        },
        true
      )
    }

    /* Temporarily disable reset force
    if (isResetting) {
      const returnVector = new Vector3(
        position[0] - currentPos.x,
        position[1] - currentPos.y,
        position[2] - currentPos.z
      )
      
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
      
      rigidBodyRef.current.applyImpulse({
        x: returnVector.x * 5,
        y: returnVector.y * 5,
        z: returnVector.z * 5
      }, true)
    }
    */
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
  frameloop: "always" as const,
  dpr: [1, 2] as [number, number],
  camera: {
    position: [140, 60, 50] as [number, number, number], // Moved back for wider view
    fov: 55,
    near: 0.1,
    far: 1000
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Remove these debug logs
      // console.log('Mouse event at:', e.clientX, e.clientY);
      // console.log('Target:', e.target);
      // console.log('Current Target:', e.currentTarget);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 2,
        overflow: 'visible'
      }}
      {...CANVAS_CONFIG}
    >
      <Suspense fallback={null}>
        <CameraLogger />
        <Stats className="stats-panel" />
        <CursorIndicator />
        <Physics 
          gravity={[0, -0.05, 0]}    // Even lighter gravity
          timeStep="vary"
          interpolate={true}         // Enable interpolation
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
          makeDefault
          enableZoom={false}
          autoRotate={true}          // Enable auto rotation
          autoRotateSpeed={0.2}      // Very slow rotation speed
          enableDamping={true}
          dampingFactor={0.1}
          target={new Vector3(55, 25, 15)}  // Adjusted target for new spread
          maxPolarAngle={Math.PI * 0.65}
          minPolarAngle={Math.PI * 0.25}
          enablePan={true}
          panSpeed={0.5}
        />
        <Preload all />
      </Suspense>
    </Canvas>
  )
} 
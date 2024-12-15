'use client'

import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import { motion } from 'framer-motion-3d'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Vector3 } from 'three'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'

// Keep all the constants from Shapes.tsx
const ATTRACTION_THRESHOLD = 15
const STICK_THRESHOLD = 1.5
const ATTRACTION_FORCE = 0.8
const HOVER_FORCE = 1.2
const CLICK_FORCE = 25
const DAMPING = 0.95
const RESTITUTION = 0.3
const BOUNDARY_SIZE = 8
const CURSOR_REPULSION_RADIUS = 4
const CURSOR_REPULSION_FORCE = 2
const RANDOM_DIRECTION_RANGE = 2 * Math.PI
const BLOB_RADIUS = 2
const BLOB_JITTER = 0.15

// Modify initial positions for footer placement
const INITIAL_POSITIONS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2
  const radius = 5
  return [
    Math.cos(angle) * radius,
    Math.sin(angle) * radius + 5, // Moved up by 5 units
    0
  ] as const
})

// Keep the Shape component exactly as it was in Shapes.tsx
const Shape = ({ position, onClick, isSelected, onStick, triggerReturn, mousePosition }: any) => {
  const [hovered, setHovered] = useState(false)
  const [isStuck, setIsStuck] = useState(false)
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const velocityRef = useRef({ x: 0, y: 0, z: 0 })
  const isInitialRender = useRef(true)

  // Prevent movement on initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
    }
  }, [])

  const handleHover = useCallback((isHovering: boolean) => {
    if (isInitialRender.current) return
    setHovered(isHovering)
    if (rigidBodyRef.current && !isStuck) {
      const currentPos = new Vector3(
        rigidBodyRef.current.translation().x,
        rigidBodyRef.current.translation().y,
        rigidBodyRef.current.translation().z
      )
      
      const force = currentPos.clone()
        .normalize()
        .multiplyScalar(isHovering ? HOVER_FORCE : -HOVER_FORCE/2)
      
      rigidBodyRef.current.applyImpulse(
        { x: force.x, y: force.y, z: 0 },
        true
      )
    }
  }, [isStuck])

  const handleClick = useCallback((e: any) => {
    e.stopPropagation()
    
    if (isInitialRender.current) return
    if (rigidBodyRef.current && !isStuck) {
      setIsStuck(false)
      
      const randomAngle = Math.random() * RANDOM_DIRECTION_RANGE
      const force = {
        x: Math.cos(randomAngle) * CLICK_FORCE,
        y: Math.sin(randomAngle) * CLICK_FORCE,
        z: 0
      }

      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rigidBodyRef.current.applyImpulse(force, true)
      
      onClick(false)
    }
  }, [isStuck, onClick])

  // Keep in bounds
  const keepInBounds = (currentPos: Vector3) => {
    if (rigidBodyRef.current) {
      const bounds = BOUNDARY_SIZE
      if (Math.abs(currentPos.x) > bounds) {
        const force = new Vector3(-Math.sign(currentPos.x) * 10, 0, 0)
        rigidBodyRef.current.applyImpulse(
          { x: force.x, y: force.y, z: force.z },
          true
        )
      }
      if (Math.abs(currentPos.y) > bounds) {
        const force = new Vector3(0, -Math.sign(currentPos.y) * 10, 0)
        rigidBodyRef.current.applyImpulse(
          { x: force.x, y: force.y, z: force.z },
          true
        )
      }
    }
  }

  // Modified attraction behavior
  useEffect(() => {
    const interval = setInterval(() => {
      if (rigidBodyRef.current && !isStuck) {
        const currentPos = new Vector3(
          rigidBodyRef.current.translation().x,
          rigidBodyRef.current.translation().y,
          rigidBodyRef.current.translation().z
        )

        keepInBounds(currentPos)
        
        const distanceToCenter = currentPos.length()
        const currentVel = rigidBodyRef.current.linvel()
        const speed = new Vector3(currentVel.x, currentVel.y, currentVel.z).length()
        
        const proximityFactor = Math.max(0, distanceToCenter / ATTRACTION_THRESHOLD)
        const jitter = new Vector3(
          (Math.random() - 0.5) * BLOB_JITTER * proximityFactor,
          (Math.random() - 0.5) * BLOB_JITTER * proximityFactor,
          0
        )

        if (distanceToCenter < STICK_THRESHOLD) {
          const slowdownFactor = Math.max(0.1, distanceToCenter / STICK_THRESHOLD)
          const blobForce = jitter.multiplyScalar(0.3 * slowdownFactor)
          
          rigidBodyRef.current.setLinvel({
            x: currentVel.x * 0.95,
            y: currentVel.y * 0.95,
            z: 0
          }, true)
          
          rigidBodyRef.current.applyImpulse(
            { x: blobForce.x, y: blobForce.y, z: 0 },
            true
          )
        } else {
          const attractionMultiplier = Math.min(1.5, distanceToCenter / 4)
          const speedDamping = Math.max(0.2, 1 - speed * 0.1)
          
          const targetPos = currentPos.clone()
            .normalize()
            .multiplyScalar(BLOB_RADIUS)
            .add(jitter)
          
          const force = currentPos.clone()
            .sub(targetPos)
            .normalize()
            .multiplyScalar(-ATTRACTION_FORCE * attractionMultiplier * speedDamping)

          rigidBodyRef.current.applyImpulse(
            { x: force.x, y: force.y, z: 0 },
            true
          )
        }
      }
    }, 16)

    return () => clearInterval(interval)
  }, [isStuck])

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      type="dynamic"
      colliders="ball"
      restitution={RESTITUTION}
      friction={0.2}
      linearDamping={DAMPING}
      angularDamping={DAMPING}
      mass={1}
    >
      <motion.mesh
        animate={{
          scale: hovered ? 1.2 : 1,
        }}
        transition={{ 
          duration: 0.4,
          ease: "easeOut"
        }}
        onPointerEnter={() => handleHover(true)}
        onPointerLeave={() => handleHover(false)}
        onClick={handleClick}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial 
          color="#ff3333"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff0000"
          emissiveIntensity={hovered ? 0.5 : isStuck ? 0.4 : 0.2}
        />
      </motion.mesh>
    </RigidBody>
  )
}

export default function CollisionBalls() {
  const [selected, setSelected] = useState(false)
  const [stuckCount, setStuckCount] = useState(0)
  const [returnTrigger, setReturnTrigger] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleClick = useCallback((triggerGroup = true) => {
    setSelected(true)
    if (triggerGroup) {
      setReturnTrigger(prev => prev + 1)
    }
  }, [])

  const handleStick = useCallback(() => {
    setStuckCount(prev => prev + 1)
  }, [])

  const handleMouseMove = useCallback((event: any) => {
    const canvas = event.currentTarget
    const rect = canvas.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    setMousePosition({ x, y })
  }, [])

  const handleSceneClick = useCallback(() => {
    setReturnTrigger(prev => prev + 1)
  }, [])

  return (
    <Canvas 
      camera={{ position: [0, 0, 20], fov: 45 }}
      shadows
      style={{ 
        background: 'transparent',
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        touchAction: 'none'
      }}
      onMouseMove={handleMouseMove}
      onClick={handleSceneClick}
    >
      <ambientLight intensity={0.5} />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={1.5}
        castShadow 
      />
      <Physics 
        gravity={[0, -2, 0]}  // Added slight downward gravity for footer effect
        debug={false}
      >
        {INITIAL_POSITIONS.map((pos, i) => (
          <Shape 
            key={i}
            position={pos}
            onClick={() => {}}
            isSelected={selected}
            onStick={handleStick}
            triggerReturn={returnTrigger}
            mousePosition={mousePosition}
          />
        ))}
        
        {/* Add a floor for the balls */}
        <CuboidCollider 
          args={[20, 0.5, 5]} 
          position={[0, -5, 0]} 
          restitution={0.5}
        />
      </Physics>
    </Canvas>
  )
} 
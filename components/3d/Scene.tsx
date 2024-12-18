'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Preload, Stats, Grid } from '@react-three/drei'
import { Vector3, Plane, Raycaster, Vector2 } from 'three'
import TokenFace from './TokenFace'
import { Suspense, useRef, useState, useMemo, memo, useEffect } from 'react'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'
import styles from './Scene.module.css'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

// Minimal constants
const DAMPING = 0.98
const RESTITUTION = 0.2

// Single centered token
const TOKEN_POSITIONS = [[65, 25, 15]] as const

// Add force constants at the top with other constants
const ATTRACTION_FORCE = 150    // Increased base attraction (was 50)
const MAX_FORCE = 400          // Increased max force (was 150)
const FORCE_FALLOFF = 1.2      // Reduced falloff for stronger long-range attraction (was 1.5)

const PhysicsToken = ({ position }: { position: readonly [number, number, number] }) => {
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const { camera } = useThree()
  const [mousePos] = useState(new Vector3())
  const [isClicked, setIsClicked] = useState(false)
  const { gl } = useThree()
  const raycaster = useMemo(() => new Raycaster(), [])
  const tokenPlane = useMemo(() => new Plane(), [])
  const planeNormal = useMemo(() => new Vector3(0, 0, 1), [])
  const intersectionPoint = useMemo(() => new Vector3(), [])
  const mouseVector = useMemo(() => new Vector2(), [])

  const initialValues = useMemo(() => ({
    rotation: [0, 0, 0] as [number, number, number],  // Simple rotation for now
    scale: 8  // Fixed scale for testing
  }), [])

  useEffect(() => {
    const handleMouseDown = () => {
      setIsClicked(true)
      console.log('Mouse Down!')
      
      // Log both positions on click
      if (rigidBodyRef.current) {
        const tokenPos = rigidBodyRef.current.translation()
        console.log('=== Click Positions ===')
        console.log('Token Position:', {
          x: tokenPos.x.toFixed(2),
          y: tokenPos.y.toFixed(2),
          z: tokenPos.z.toFixed(2)
        })
        console.log('Mouse Position:', {
          x: mousePos.x.toFixed(2),
          y: mousePos.y.toFixed(2),
          z: mousePos.z.toFixed(2)
        })
        console.log('Distance:', mousePos.distanceTo(new Vector3(tokenPos.x, tokenPos.y, tokenPos.z)).toFixed(2))
      }
    }
    
    const handleMouseUp = () => {
      setIsClicked(false)
      console.log('Mouse Up!')
    }
    
    gl.domElement.addEventListener('mousedown', handleMouseDown)
    gl.domElement.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      gl.domElement.removeEventListener('mousedown', handleMouseDown)
      gl.domElement.removeEventListener('mouseup', handleMouseUp)
    }
  }, [gl, mousePos])

  useEffect(() => {
    console.log('isClicked state changed:', isClicked)
  }, [isClicked])

  useFrame((state) => {
    if (!rigidBodyRef.current) return
    
    const tokenPos = rigidBodyRef.current.translation()
    
    // Project mouse into scene
    tokenPlane.setFromNormalAndCoplanarPoint(
      planeNormal, 
      new Vector3(0, 0, tokenPos.z)
    )

    // Update mouse vector and use it for raycasting
    mouseVector.set(state.mouse.x, state.mouse.y)
    raycaster.setFromCamera(mouseVector, camera)

    // Get intersection point
    const hit = raycaster.ray.intersectPlane(tokenPlane, intersectionPoint)

    if (hit) {
      mousePos.copy(intersectionPoint)

      // Calculate direction and distance
      const direction = new Vector3()
      direction.subVectors(mousePos, new Vector3(tokenPos.x, tokenPos.y, tokenPos.z)).normalize()
      const distance = mousePos.distanceTo(new Vector3(tokenPos.x, tokenPos.y, tokenPos.z))

      // Calculate force with distance falloff
      const forceMagnitude = isClicked ? 
        MAX_FORCE / (distance + FORCE_FALLOFF) : 
        ATTRACTION_FORCE / (distance + FORCE_FALLOFF)

      // Apply force
      rigidBodyRef.current.applyImpulse({
        x: direction.x * forceMagnitude,
        y: direction.y * forceMagnitude,
        z: direction.z * forceMagnitude
      }, true)

      // Debug logs when clicked
      if (isClicked) {
        console.log('=== Click Positions ===')
        console.log('Token Position:', {
          x: tokenPos.x.toFixed(2),
          y: tokenPos.y.toFixed(2),
          z: tokenPos.z.toFixed(2)
        })
        console.log('Mouse Position:', {
          x: mousePos.x.toFixed(2),
          y: mousePos.y.toFixed(2),
          z: mousePos.z.toFixed(2)
        })
        console.log('Force Applied:', forceMagnitude.toFixed(2))
      }
    }
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      colliders="cuboid"
      restitution={RESTITUTION}
      linearDamping={DAMPING}
      angularDamping={DAMPING}
      friction={0.2}
      mass={1}
      type="dynamic"  // Make sure it's dynamic
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
      if (controls instanceof OrbitControlsImpl) {
        console.log('Camera Target:', {
          x: controls.target.x.toFixed(2),
          y: controls.target.y.toFixed(2),
          z: controls.target.z.toFixed(2)
        })
      }
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
        zIndex: 1,
        overflow: 'visible',
        background: 'transparent'
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
          autoRotate={true}          
          autoRotateSpeed={0.2}      
          enableDamping={true}
          dampingFactor={0.1}
          target={new Vector3(55, 25, 15)}
          maxPolarAngle={Math.PI * 0.65}
          minPolarAngle={Math.PI * 0.25}
          enablePan={false}           // Disabled panning
          enabled={false}            // Disable user control but keep autoRotate
        />
        <Preload all />
      </Suspense>
    </Canvas>
  )
} 
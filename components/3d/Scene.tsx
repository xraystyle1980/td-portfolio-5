'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Preload, Stats, Grid, Environment } from '@react-three/drei'
import { Vector3, Plane, Raycaster, Vector2 } from 'three'
import TokenFace from './TokenFace'
import { Suspense, useRef, useState, useMemo, memo, useEffect } from 'react'
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'
import styles from './Scene.module.css'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

// Minimal constants - adjust for more bouncy behavior
const DAMPING = 0.7        // Reduced further for more bounce
const RESTITUTION = 0.9    // Increased for more bounce

// Adjust force constants for strong click attraction
const REPULSION_FORCE = 150     // Keep gentle repulsion when not clicked
const MAX_FORCE = 2000         // Dramatically increased for strong click attraction
const FORCE_FALLOFF = 1.2      // Reduced for stronger long-range pull when clicked

// Generate random initial positions with much higher vertical placement
const generateRandomPositions = () => Array.from({ length: 48 }, () => [
  65 + (Math.random() * 80 - 40),    // x: moderate spread around 65 (±40)
  50 + (Math.random() * 30),         // y: lower height, 50-80 range
  26 + (Math.random() * 30 - 15)     // z: moderate spread around 15 (±15)
] as [number, number, number])

// Generate random initial rotations
const generateRandomRotation = () => [
  Math.random() * Math.PI * 2,  // Random rotation around X
  Math.random() * Math.PI * 2,  // Random rotation around Y
  Math.random() * Math.PI * 2   // Random rotation around Z
] as [number, number, number]

// Store positions and rotations
const TOKEN_POSITIONS = generateRandomPositions()
const INITIAL_POSITIONS = [...TOKEN_POSITIONS]
const TOKEN_ROTATIONS = Array.from({ length: 48 }, generateRandomRotation)

// Also update the camera and controls target to look higher
const CAMERA_TARGET = new Vector3(65, 40, 15)  // Slightly lowered target

const PhysicsToken = ({ position, index }: { position: readonly [number, number, number], index: number }) => {
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
  const [isHovered, setIsHovered] = useState(false)

  const initialValues = useMemo(() => ({
    rotation: TOKEN_ROTATIONS[index],
    scale: 8
  }), [index])

  useEffect(() => {
    const handleMouseDown = () => {
      setIsClicked(true)
      console.log('Mouse Down!')
      
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
    // Apply initial downward impulse
    if (rigidBodyRef.current) {
      rigidBodyRef.current.applyImpulse({
        x: 0,
        y: -100, // Increased from -20 for much stronger initial drop
        z: 0
      }, true)
    }
  }, [])

  useFrame((state) => {
    if (!rigidBodyRef.current) return
    
    const tokenPos = rigidBodyRef.current.translation()
    
    tokenPlane.setFromNormalAndCoplanarPoint(
      planeNormal, 
      new Vector3(0, 0, tokenPos.z)
    )

    mouseVector.set(state.mouse.x, state.mouse.y)
    raycaster.setFromCamera(mouseVector, camera)

    const hit = raycaster.ray.intersectPlane(tokenPlane, intersectionPoint)

    if (hit) {
      mousePos.copy(intersectionPoint)
      const direction = new Vector3()
      // Invert direction when clicked for attraction instead of repulsion
      if (isClicked) {
        direction.subVectors(mousePos, new Vector3(tokenPos.x, tokenPos.y, tokenPos.z)).normalize()
      } else {
        direction.subVectors(new Vector3(tokenPos.x, tokenPos.y, tokenPos.z), mousePos).normalize()
      }
      const distance = mousePos.distanceTo(new Vector3(tokenPos.x, tokenPos.y, tokenPos.z))

      const forceMagnitude = isClicked ? 
        MAX_FORCE / (distance + FORCE_FALLOFF) : 
        REPULSION_FORCE / (distance + FORCE_FALLOFF)

      rigidBodyRef.current.applyImpulse({
        x: direction.x * forceMagnitude,
        y: direction.y * forceMagnitude,
        z: direction.z * forceMagnitude
      }, true)

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
      rotation={initialValues.rotation}
      colliders="cuboid"
      restitution={RESTITUTION}
      linearDamping={DAMPING}
      angularDamping={DAMPING}
      friction={0.1}
      mass={5.0}
      type="dynamic"
      enabledRotations={[true, true, true]}
      enabledTranslations={[true, true, true]}
      ccd={true}
    >
      <TokenFace 
        rotation={[0, 0, 0]}
        scale={initialValues.scale}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        isHovered={isHovered}
      />
    </RigidBody>
  )
}

const Lights = memo(() => (
  <>
    <ambientLight intensity={1} />  // Base light for visibility
    <pointLight position={[15, 10, 10]} intensity={0.94} />  // Main highlight
    <pointLight position={[5, -10, -10]} intensity={0.92} />  // Fill light
    <directionalLight position={[10, 0, 5]} intensity={1} color="#ffffff" />  // Overall direction
  </>
))
Lights.displayName = 'Lights'

const GridFloor = memo(() => (
  <Grid
    position={[45, 40, 0]}  // Raised grid height
    args={[100, 100]}
    cellSize={5}
    cellThickness={1}
    cellColor="#000000"
    sectionSize={20}
    sectionThickness={1}
    sectionColor="#000000"
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
    // Calculate position for Math.PI * 0.45 angle (about 81 degrees from vertical)
    position: [160, 65, 50] as [number, number, number], // Adjusted for lowest angle
    fov: 45,
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
    alpha: true,
    outputEncoding: 3001,  // THREE.sRGBEncoding
    toneMapping: 4        // THREE.ReinhardToneMapping
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
          gravity={[0, -1.62, 0]}  // Moon gravity
          timeStep="vary"
          interpolate={true}
          colliders={false}
        >
          <Lights />
          <GridFloor />
          {TOKEN_POSITIONS.map((position, index) => (
            <PhysicsToken 
              key={index} 
              position={position}
              index={index}
            />
          ))}
          <CuboidCollider 
            args={[100, 1, 100]}
            position={[45, 39.5, 0]}
            restitution={RESTITUTION}
            friction={0.2}
            sensor={false}
          />
        </Physics>
        <OrbitControls
          makeDefault
          enableZoom={false}
          autoRotate={true}          
          autoRotateSpeed={0.1}
          enableDamping={true}
          dampingFactor={0.05}
          target={CAMERA_TARGET}
          maxPolarAngle={Math.PI * 0.45}  // Prevent viewing from below grid
          minPolarAngle={Math.PI * 0.15}  // Allow more vertical movement
          enablePan={false}
          enabled={true}
          rotateSpeed={0.4}
          minDistance={120}        // Increased for more zoomed out view
          maxDistance={300}        // Increased maximum distance
        />
        <Preload all />
      </Suspense>
    </Canvas>
  )
} 
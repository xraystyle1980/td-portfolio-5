'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useMemo, useEffect } from 'react'
import TokenFace from './TokenFace'
import { Vector3, Group, Euler } from 'three'
import { OrbitControls, Environment } from '@react-three/drei'
import styles from './Scene.module.css'
import CellularEffect from './CellularEffect'

const STAR_COUNT = 96
const SPHERE_RADIUS = 35
const CAMERA_ROTATION_SPEED = 0.075
const TOKEN_SCALE = 3.5

function fibonacciSphere(samples: number, radius: number) {
  const points: Vector3[] = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  const offset = 2 / samples

  for (let i = 0; i < samples; i++) {
    const y = ((i * offset) - 1) + (offset / 2)
    const r = Math.sqrt(1 - y * y)
    const phi = i * Math.PI * (3 - Math.sqrt(5))

    const x = Math.cos(phi) * r
    const z = Math.sin(phi) * r

    points.push(new Vector3(
      (x + Math.random() * 0.02 - 0.01) * radius,
      (y + Math.random() * 0.02 - 0.01) * radius,
      (z + Math.random() * 0.02 - 0.01) * radius
    ))
  }

  return points
}

function RotatingToken({ position }: { position: Vector3 }) {
  const tokenRef = useRef<Group>(null)
  
  const rotationSpeed = useMemo(() => 
    (Math.random() * 0.02 + 0.01) * 0.1 // Even slower random speed
  , [])

  useFrame(({ clock }) => {
    if (tokenRef.current) {
      tokenRef.current.rotation.y += rotationSpeed
    }
  })

  return (
    <group 
      ref={tokenRef}
      position={position}
    >
      <TokenFace 
        scale={TOKEN_SCALE}
        rotation={[0, 0, 0] as [number, number, number]}
      />
    </group>
  )
}

function StarField() {
  const groupRef = useRef<Group>(null)
  const positions = useMemo(() => fibonacciSphere(STAR_COUNT, SPHERE_RADIUS), [])
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2
      groupRef.current.rotation.x = Math.PI * 0.1
    }
  })

  return (
    <group 
      ref={groupRef}
      position={[SPHERE_RADIUS * 1.2, 0, 0]}
    >
      {positions.map((position, i) => (
        <RotatingToken 
          key={i} 
          position={position}
        />
      ))}
    </group>
  )
}

const CANVAS_CONFIG = {
  camera: {
    position: [0, 0, SPHERE_RADIUS * 2.5] as [number, number, number],
    fov: 30,
    near: 1,
    far: 2000
  },
  dpr: [1, 2] as [number, number],
  shadows: true
} as const

export default function Scene() {
  return (
    <div className={styles.canvasContainer}>
      <Canvas 
        {...CANVAS_CONFIG}
        className={styles.canvas}
        style={{ 
          position: 'absolute', 
          touchAction: 'pan-y'
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[50, 50, 50]} intensity={0.6} />
          <pointLight position={[-50, -50, -50]} intensity={0.4} />
          <spotLight
            position={[0, 100, 0]}
            angle={0.6}
            penumbra={1}
            intensity={0.7}
          />
          
          <Environment preset="sunset" />
          
          <StarField />
          
          <CellularEffect />
          
          <OrbitControls 
            makeDefault 
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            enableDamping={false}
            autoRotate={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI * 3/4}
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  )
} 
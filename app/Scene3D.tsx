'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import RetroGrid from '@/components/3d/RetroGrid'
import { useRef } from 'react'
import { Vector3, MathUtils, PerspectiveCamera as ThreePerspectiveCamera } from 'three'
import styles from './Scene3D.module.css'

interface Scene3DProps {
  scroll: number
}

function Scene({ scroll }: Scene3DProps) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null)
  
  // Define static camera positions for perspective
  const initialPosition = new Vector3(0, 500, -500)
  const targetPosition = new Vector3(0, 500, -8000) 
  const initialRotation: [number, number, number] = [-0.75, 0, 0]
  const targetRotation: [number, number, number] = [-0.75, 0, 0] // Rotation change

  useFrame(() => {
    if (cameraRef.current) {
      // Update the camera position based on scroll
      const progress = MathUtils.clamp(scroll, 0, 1)

      const lerpPosition = new Vector3()
      lerpPosition.lerpVectors(initialPosition, targetPosition, progress)

      cameraRef.current.position.lerp(lerpPosition, 0.1) // Smooth movement
      cameraRef.current.rotation.set(
        MathUtils.lerp(initialRotation[0], targetRotation[0], progress),
        MathUtils.lerp(initialRotation[1], targetRotation[1], progress),
        MathUtils.lerp(initialRotation[2], targetRotation[2], progress)
      )
      cameraRef.current.updateProjectionMatrix()
    }
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 500, 1500]} // Static initial position
        rotation={[0.1, 0, 0]} // Static initial rotation
        fov={75} // Fixed FOV to avoid zoom
        near={0.1}
        far={15000}
      />
      <RetroGrid scroll={scroll} />
      <ambientLight intensity={0.3} />
    </>
  )
}

export default function Scene3D({ scroll }: Scene3DProps) {
  return (
    <div id="retrogrid-section" className={styles.wrapper}>
      <Canvas className={styles.canvas}>
        <color attach="background" args={['#161616']} />
        <Scene scroll={scroll} />
      </Canvas>
    </div>
  )
}
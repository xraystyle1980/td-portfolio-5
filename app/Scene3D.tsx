'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import RetroGrid from '@/components/3d/RetroGrid'
import { useRef, useEffect } from 'react'
import { Vector3, MathUtils, PerspectiveCamera as ThreePerspectiveCamera } from 'three'
import styles from './Scene3D.module.css'

interface Scene3DProps {
  scroll: number
  currentSection: number
}

function Scene({ scroll }: { scroll: number }) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null)
  const currentPos = useRef(new Vector3(0, 600, 0))
  const targetPos = useRef(new Vector3(0, 1200, -800))
  const currentRot = useRef<[number, number, number]>([-0.1, 0, 0])
  const targetRot = useRef<[number, number, number]>([-0.7, 0, 0])
  const currentFov = useRef(80)
  const targetFov = useRef(45)
  const isAnimating = useRef(true)

  // Reset scene state
  const resetScene = () => {
    currentPos.current.set(0, 600, 0)
    targetPos.current.set(0, 1200, -800)
    currentRot.current = [-0.1, 0, 0]
    targetRot.current = [-0.7, 0, 0]
    currentFov.current = 80
    targetFov.current = 45
    isAnimating.current = true

    if (cameraRef.current) {
      cameraRef.current.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z)
      cameraRef.current.rotation.set(currentRot.current[0], currentRot.current[1], currentRot.current[2])
      cameraRef.current.fov = currentFov.current
      cameraRef.current.updateProjectionMatrix()
    }
  }

  useEffect(() => {
    // Initial setup
    if (cameraRef.current) {
      cameraRef.current.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z)
      cameraRef.current.rotation.set(currentRot.current[0], currentRot.current[1], currentRot.current[2])
      cameraRef.current.fov = currentFov.current
      cameraRef.current.updateProjectionMatrix()
    }

    // Listen for reset events
    const handleReset = () => resetScene()
    window.addEventListener('scene-reset', handleReset)
    return () => window.removeEventListener('scene-reset', handleReset)
  }, [])

  useFrame(({ camera }) => {
    if (!isAnimating.current) return

    const positionLerp = 0.0333
    currentPos.current.x = MathUtils.lerp(currentPos.current.x, targetPos.current.x, positionLerp)
    currentPos.current.y = MathUtils.lerp(currentPos.current.y, targetPos.current.y, positionLerp)
    currentPos.current.z = MathUtils.lerp(currentPos.current.z, targetPos.current.z, positionLerp)

    const rotationLerp = 0.0333
    currentRot.current[0] = MathUtils.lerp(currentRot.current[0], targetRot.current[0], rotationLerp)
    currentRot.current[1] = MathUtils.lerp(currentRot.current[1], targetRot.current[1], rotationLerp)
    currentRot.current[2] = MathUtils.lerp(currentRot.current[2], targetRot.current[2], rotationLerp)

    const fovLerp = 0.0333
    currentFov.current = MathUtils.lerp(currentFov.current, targetFov.current, fovLerp)

    camera.position.set(currentPos.current.x, currentPos.current.y, currentPos.current.z)
    camera.rotation.set(currentRot.current[0], currentRot.current[1], currentRot.current[2])
    if ('fov' in camera) {
      camera.fov = currentFov.current
      camera.updateProjectionMatrix()
    }

    const positionDelta = camera.position.distanceTo(new Vector3(...Object.values(targetPos.current)))
    const rotationDelta = Math.abs(currentRot.current[0] - targetRot.current[0])
    const fovDelta = Math.abs(currentFov.current - targetFov.current)
    if (positionDelta < 1 && rotationDelta < 0.01 && fovDelta < 0.1) {
      isAnimating.current = false
    }
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 1200, -800]}
        rotation={[-0.7, 0, 0]}
        fov={45}
        near={0.1}
        far={15000}
      />
      
      <RetroGrid scroll={scroll} />
      <ambientLight intensity={0.3} />
    </>
  )
}

export default function Scene3D({ scroll, currentSection }: Scene3DProps) {
  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        background: '#161616',
        zIndex: -2
      }} />
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        background: 'transparent'
      }}>
        <Canvas
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <color attach="background" args={['#161616']} />
          <Scene scroll={scroll} />
        </Canvas>
      </div>
    </>
  )
} 
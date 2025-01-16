'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import RetroGrid from '@/components/3d/RetroGrid'
import { useRef, useState, useEffect } from 'react'
import { Vector3, MathUtils, PerspectiveCamera as ThreePerspectiveCamera } from 'three'
import styles from './Scene3D.module.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Scene({ scroll }: { scroll: number }) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null)
  
  // Define static camera positions for perspective
  const initialPosition = new Vector3(0, 500, -500)
  const targetPosition = new Vector3(0, 500, -8000) 
  const initialRotation: [number, number, number] = [-0.75, 0, 0]
  const targetRotation: [number, number, number] = [-0.75, 0, 0]

  useFrame(() => {
    if (cameraRef.current) {
      // Update the camera position based on scroll
      const progress = MathUtils.clamp(scroll, 0, 1)

      const lerpPosition = new Vector3()
      lerpPosition.lerpVectors(initialPosition, targetPosition, progress)

      cameraRef.current.position.lerp(lerpPosition, 0.1)
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
        position={[0, 500, 1500]}
        rotation={[0.1, 0, 0]}
        fov={75}
        near={0.1}
        far={15000}
      />
      <RetroGrid scroll={scroll} />
      <ambientLight intensity={0.3} />
    </>
  )
}

export default function Scene3D() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=16000',
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      id="retrogrid-section"
      data-scroll-section
      className={styles.wrapper}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}
    >
      <Canvas className={styles.canvas}>
        <color attach="background" args={['#161616']} />
        <Scene scroll={scrollProgress} />
      </Canvas>
    </div>
  )
}
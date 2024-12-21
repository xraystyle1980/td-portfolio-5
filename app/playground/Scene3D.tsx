'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Scene from './Scene'
import { Vector3 } from 'three'
import RetroGrid from './shapes/RetroGrid'

interface Props {
  scroll: number
  currentSection: number
}

export default function Scene3D({ scroll, currentSection }: Props) {
  // Adjust camera to be higher and closer for a better top-down view
  const INITIAL_POSITION = new Vector3(0, 200, 1000)  // Moved up and forward
  const INITIAL_FOV = 50  // Adjusted from 120 to 90 for less distortion

  return (
    <Canvas
      style={{ 
        background: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1
      }}
      camera={{
        position: INITIAL_POSITION,
        fov: INITIAL_FOV,
        near: 0.1,
        far: 10000
      }}
    >
      <color attach="background" args={['#000B1F']} />
      <Suspense fallback={null}>
        <RetroGrid size={4} />
        <Scene 
          scroll={scroll} 
          currentSection={currentSection}
          initialPosition={{
            x: INITIAL_POSITION.x,
            y: INITIAL_POSITION.y,
            z: INITIAL_POSITION.z
          }}
        />
        <EffectComposer>
          <Bloom 
            intensity={85}
            luminanceThreshold={0.5}
            luminanceSmoothing={1}
            height={300}
            mipmapBlur={true}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
} 
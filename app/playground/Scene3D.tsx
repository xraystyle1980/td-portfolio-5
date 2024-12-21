'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Scene from './Scene'

interface Props {
  scroll: number
  currentSection: number
}

export default function Scene3D({ scroll, currentSection }: Props) {
  // Define initial camera settings as constants
  const INITIAL_POSITION = [500, 500, 1000] // [x, y, z]
  const INITIAL_FOV = 80

  return (
    <Canvas
      style={{ background: 'transparent' }}
      camera={{
        position: INITIAL_POSITION,
        fov: INITIAL_FOV,
        near: 0.1,
        far: 12000
      }}
    >
      <color attach="background" args={['#000B1F']} />
      <Suspense fallback={null}>
        <Scene 
          scroll={scroll} 
          currentSection={currentSection}
          initialPosition={{
            x: INITIAL_POSITION[0],
            y: INITIAL_POSITION[1],
            z: INITIAL_POSITION[2]
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
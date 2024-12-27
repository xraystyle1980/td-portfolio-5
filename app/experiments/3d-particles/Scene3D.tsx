'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Vector3 } from 'three'
import RetroGrid from '../shapes/RetroGrid'
import Scene from '../Scene'

interface Props {
  scroll: number
  currentSection: number
}

export default function Scene3D({ scroll, currentSection }: Props) {
  const INITIAL_POSITION = new Vector3(0, 200, 9000)
  const INITIAL_FOV = 30

  return (
    <Canvas
      style={{ 
        background: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1
      }}
    >
      <color attach="background" args={['#161616']} />
      <Suspense fallback={null}>
        <PerspectiveCamera
          makeDefault
          position={INITIAL_POSITION}
          fov={INITIAL_FOV}
          near={0.1}
          far={19000}
        />
        <RetroGrid size={4} scroll={scroll} />
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
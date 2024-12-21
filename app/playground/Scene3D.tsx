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
  return (
    <Canvas
      style={{ background: 'transparent' }}
      camera={{
        position: [0, 0, 10],
        fov: 75,
        near: 0.1,
        far: 2000
      }}
    >
      <color attach="background" args={['#000B1F']} />
      <Suspense fallback={null}>
        <Scene scroll={scroll} currentSection={currentSection} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <EffectComposer>
          <Bloom 
            intensity={3}
            luminanceThreshold={0}
            luminanceSmoothing={0.4}
            height={300}
            mipmapBlur={true}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
} 
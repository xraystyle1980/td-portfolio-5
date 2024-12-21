'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import RetroGrid from './components/RetroGrid'

interface Scene3DProps {
  scroll: number
  currentSection: number
}

function Scene({ scroll }: { scroll: number }) {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0, 1200, -800]}
        rotation={[-0.7, 0, 0]}
        fov={45}
        near={0.1}
        far={15000}
      />
      
      <RetroGrid scroll={scroll} />

      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.3} />
    </>
  )
}

export default function Scene3D({ scroll, currentSection }: Scene3DProps) {
  return (
    <Canvas
      style={{
        background: '#161616',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 1
      }}
    >
      <Scene scroll={scroll} />
    </Canvas>
  )
} 
'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import TokenFace from './TokenFace'

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{
        width: '100%',
        height: '100vh',
        background: 'transparent'
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      <TokenFace />
      
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
} 
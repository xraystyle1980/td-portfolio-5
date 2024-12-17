'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

// Define the type for our GLTF result
type GLTFResult = GLTF & {
  nodes: {
    Sphere: THREE.Mesh
  }
  materials: {
    balls: THREE.Material
  }
}

export default function CollisionBalls() {
  const ballsRef = useRef<RapierRigidBody[]>([])
  // Add type assertion to useGLTF
  const { nodes, materials } = useGLTF('/models/balls.glb') as GLTFResult

  useFrame((state) => {
    ballsRef.current?.forEach((ball, i) => {
      if (ball) {
        const time = state.clock.getElapsedTime()
        const y = Math.sin(time + i * Math.PI * 0.5) * 0.5
        ball.setNextKinematicTranslation({
          x: ball.translation().x,
          y: y + 2,
          z: ball.translation().z
        })
      }
    })
  })

  return (
    <group>
      {[...Array(3)].map((_, i) => (
        <RigidBody
          key={i}
          ref={(el) => (ballsRef.current[i] = el as RapierRigidBody)}
          type="kinematicPosition"
          position={[i * 2 - 2, 2, 0]}
        >
          <mesh
            geometry={nodes.Sphere.geometry}
            material={materials.balls}
            scale={[0.5, 0.5, 0.5]}
          />
        </RigidBody>
      ))}
    </group>
  )
}

// Preload the model
useGLTF.preload('/models/balls.glb') 
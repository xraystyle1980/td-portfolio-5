'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat'
import TokenFace from './TokenFace'
import { Vector3, Raycaster, Vector2, Plane } from 'three'
import type { ThreeEvent } from '@react-three/fiber'

export const DraggableToken = ({ position }: { position: [number, number, number] }) => {
  const { camera, viewport } = useThree()
  const [isDragging, setIsDragging] = useState(false)
  const rigidBodyRef = useRef<RigidBodyType>(null)
  const lastPos = useRef(new Vector3())
  const dragPlane = useRef(new Vector3(0, 0, 1))
  const raycaster = useRef(new Raycaster())
  const mouse = useRef(new Vector2())
  const intersectionPlane = useRef(new Plane(new Vector3(0, 0, 1)))

  useFrame(() => {
    if (isDragging && rigidBodyRef.current) {
      const pos = rigidBodyRef.current.translation()
      lastPos.current.set(pos.x, pos.y, pos.z)
    }
  })

  const handleDragStart = (event: ThreeEvent<PointerEvent>) => {
    setIsDragging(true)
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setLinearDamping(5.0)
      rigidBodyRef.current.setAngularDamping(5.0)
      const pos = rigidBodyRef.current.translation()
      lastPos.current.set(pos.x, pos.y, pos.z)
    }
  }

  const handleDragMove = (event: MouseEvent) => {
    if (!isDragging || !rigidBodyRef.current) return

    // Convert mouse position to normalized device coordinates
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1

    // Update raycaster
    raycaster.current.setFromCamera(mouse.current, camera)

    // Update intersection plane
    intersectionPlane.current.normal.copy(dragPlane.current)
    intersectionPlane.current.constant = -lastPos.current.dot(dragPlane.current)

    const intersection = new Vector3()
    raycaster.current.ray.intersectPlane(intersectionPlane.current, intersection)

    const currentPos = rigidBodyRef.current.translation()
    const force = new Vector3(
      (intersection.x - currentPos.x) * 500,
      (intersection.y - currentPos.y) * 500,
      0
    )
    rigidBodyRef.current.applyImpulse(force, true)
  }

  const handleDragEnd = () => {
    if (isDragging && rigidBodyRef.current) {
      rigidBodyRef.current.setLinearDamping(0.1)
      rigidBodyRef.current.setAngularDamping(0.05)
      const currentPos = rigidBodyRef.current.translation()
      const velocity = new Vector3(
        (currentPos.x - lastPos.current.x) * 2000,
        (currentPos.y - lastPos.current.y) * 2000,
        (currentPos.z - lastPos.current.z) * 2000
      )
      rigidBodyRef.current.setLinvel(velocity, true)
      rigidBodyRef.current.setAngvel({ x: velocity.y * 0.3, y: velocity.x * 0.3, z: 0 }, true)
    }
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove)
      window.addEventListener('mouseup', handleDragEnd)
      return () => {
        window.removeEventListener('mousemove', handleDragMove)
        window.removeEventListener('mouseup', handleDragEnd)
      }
    }
  }, [isDragging])

  useEffect(() => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setLinvel({
        x: -100,
        y: -50,
        z: 0
      }, true)
      rigidBodyRef.current.setAngvel({
        x: 0.5,
        y: 0.5,
        z: 0.5
      }, true)
    }
  }, [])

  return (
    <RigidBody 
      ref={rigidBodyRef} 
      position={position} 
      colliders="ball"
      mass={1}
      linearDamping={0.1}
      type="dynamic"
      gravityScale={0.5}
      enabledRotations={[true, true, true]}
      enabledTranslations={[true, true, true]}
      angularDamping={0.05}
    >
      <mesh visible={false} onPointerDown={handleDragStart}>
        <sphereGeometry args={[25, 32, 32]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <TokenFace 
        scale={50}
      />
    </RigidBody>
  )
} 
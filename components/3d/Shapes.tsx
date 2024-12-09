import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { motion } from 'framer-motion-3d';
import { useState, useRef } from 'react';
import { Vector3 } from 'three';
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat';

const Shape = ({ position, onClick, isSelected }: any) => {
  const [hovered, setHovered] = useState(false);
  const rigidBodyRef = useRef<RigidBodyType>(null);

  const attractToCenter = () => {
    if (rigidBodyRef.current) {
      const force = new Vector3(0, 0, 0)
        .sub(new Vector3(position[0], position[1], position[2]))
        .multiplyScalar(5);
      
      // Apply force safely
      try {
        rigidBodyRef.current.applyImpulse(
          { x: force.x, y: force.y, z: force.z }, 
          true
        );
      } catch (e) {
        console.error('Failed to apply impulse:', e);
      }
    }
  };

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      type="dynamic"
      colliders="hull"
      restitution={0.7}
      friction={0.2}
      linearDamping={0.5}
    >
      <motion.mesh
        animate={{
          scale: hovered ? 1.2 : 1,
        }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => {
          onClick();
          attractToCenter();
        }}
      >
        <cylinderGeometry args={[1, 1, 0.5, 32]} />
        <meshStandardMaterial 
          color="#ff3333"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff0000"
          emissiveIntensity={0.2}
        />
      </motion.mesh>
    </RigidBody>
  );
};

export default function Shapes() {
  const [selected, setSelected] = useState(false);

  const positions = [
    [-4, 4, 0],
    [4, -4, 0],
    [-4, -4, 0],
    [4, 4, 0],
  ];

  return (
    <Canvas 
      camera={{ position: [0, 0, 15], fov: 50 }}
      shadows
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={1.5}
        castShadow 
      />
      <Physics 
        gravity={[0, 0, 0]}
        debug
      >
        {/* Invisible walls */}
        <RigidBody type="fixed" position={[0, 0, -1]}>
          <CuboidCollider args={[20, 20, 0.1]} />
        </RigidBody>
        
        {positions.map((pos, i) => (
          <Shape 
            key={i}
            position={pos}
            onClick={() => setSelected(!selected)}
            isSelected={selected}
          />
        ))}
      </Physics>
    </Canvas>
  );
} 
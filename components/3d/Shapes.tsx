import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { useState, useRef, useCallback } from 'react';
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat';
import { useFrame } from '@react-three/fiber';

function Shape({ position, shape }: { position: [number, number, number]; shape: string }) {
  const rigidBodyRef = useRef<RigidBodyType>(null);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state) => {
    if (rigidBodyRef.current && isHovered) {
      const time = state.clock.getElapsedTime();
      const y = Math.sin(time) * 0.2;
      rigidBodyRef.current.setNextKinematicTranslation({
        x: position[0],
        y: position[1] + y,
        z: position[2]
      });
    }
  });

  const Geometry = useCallback(() => {
    switch (shape) {
      case 'box':
        return <boxGeometry />;
      case 'sphere':
        return <sphereGeometry />;
      case 'cylinder':
        return <cylinderGeometry />;
      default:
        return <boxGeometry />;
    }
  }, [shape]);

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      type="kinematicPosition"
    >
      <mesh
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <Geometry />
        <meshStandardMaterial 
          color={isHovered ? '#ff3399' : '#000000'} 
          opacity={0.7}
          transparent
        />
      </mesh>
    </RigidBody>
  );
}

export default function Shapes() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Physics>
        <Shape position={[-1, 0, 0]} shape="box" />
        <Shape position={[1, 0, 0]} shape="sphere" />
        <Shape position={[0, 1, 0]} shape="cylinder" />
        <CuboidCollider position={[0, -2, 0]} args={[5, 0.1, 5]} />
      </Physics>
    </Canvas>
  );
} 
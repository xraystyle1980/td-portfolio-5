import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useRef, useState } from 'react';
import * as THREE from 'three';

const Button3D = () => {
  const [hovered, setHovered] = useState(false);
  const buttonRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!buttonRef.current) return;
    
    // Magnetic effect
    const targetX = (mouse.x * 0.1);
    const targetY = (mouse.y * 0.1);
    
    buttonRef.current.rotation.x += (targetY - buttonRef.current.rotation.x) * 0.1;
    buttonRef.current.rotation.y += (targetX - buttonRef.current.rotation.y) * 0.1;
  });

  return (
    <motion.mesh
      ref={buttonRef}
      animate={{
        scale: hovered ? 1.2 : 1,
        rotateZ: hovered ? Math.PI / 4 : 0,
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <cylinderGeometry args={[1, 1, 0.5, 32]} />
      <meshStandardMaterial color="#ff3333" />
    </motion.mesh>
  );
};

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Button3D />
    </Canvas>
  );
} 
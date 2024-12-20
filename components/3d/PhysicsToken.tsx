import React, { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import TokenFace from './TokenFace';

interface PhysicsTokenProps {
  position: [number, number, number];
}

export const PhysicsToken: React.FC<PhysicsTokenProps> = ({ position }) => {
  const rigidBodyRef = useRef(null);

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
      <TokenFace
        scale={50}
      />
    </RigidBody>
  );
};

export default PhysicsToken; 
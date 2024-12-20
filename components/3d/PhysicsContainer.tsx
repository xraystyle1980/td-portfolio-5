import { CuboidCollider } from '@react-three/rapier'

export const PhysicsContainer = () => (
  <group>
    <CuboidCollider 
      args={[1, 40, 20]}
      position={[-45, 0, 0]}
      restitution={0.9}
      friction={0.1}
    />
    <CuboidCollider 
      args={[1, 40, 20]}
      position={[45, 0, 0]}
      restitution={0.9}
      friction={0.1}
    />
    <CuboidCollider 
      args={[45, 1, 20]}
      position={[0, -35, 0]}
      restitution={0.9}
      friction={0.1}
    />
    <CuboidCollider 
      args={[45, 1, 20]}
      position={[0, 35, 0]}
      restitution={0.9}
      friction={0.1}
    />
  </group>
) 
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { motion } from 'framer-motion-3d';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Vector3 } from 'three';
import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat';

const ATTRACTION_THRESHOLD = 15;    
const STICK_THRESHOLD = 1.5;        // Increased for earlier grouping
const ATTRACTION_FORCE = 0.8;       // Reduced for gentler attraction
const HOVER_FORCE = 1.2;           
const CLICK_FORCE = 25;            
const DAMPING = 0.95;              // Increased damping for more drag
const RESTITUTION = 0.3;           // Reduced bounce significantly
const BOUNDARY_SIZE = 8;
const CURSOR_REPULSION_RADIUS = 4;
const CURSOR_REPULSION_FORCE = 2;
const RANDOM_DIRECTION_RANGE = 2 * Math.PI;
const BLOB_RADIUS = 2;
const BLOB_JITTER = 0.15;          // Reduced jitter for calmer movement

// Move constants outside component
const INITIAL_POSITIONS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const radius = 5;
  return [
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    0
  ] as const;
});

const Shape = ({ position, onClick, isSelected, onStick, triggerReturn, mousePosition }: any) => {
  const [hovered, setHovered] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const rigidBodyRef = useRef<RigidBodyType>(null);
  const velocityRef = useRef({ x: 0, y: 0, z: 0 });
  const isInitialRender = useRef(true);

  // Prevent movement on initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    }
  }, []);

  const handleHover = useCallback((isHovering: boolean) => {
    if (isInitialRender.current) return;
    setHovered(isHovering);
    if (rigidBodyRef.current && !isStuck) {
      const currentPos = new Vector3(
        rigidBodyRef.current.translation().x,
        rigidBodyRef.current.translation().y,
        rigidBodyRef.current.translation().z
      );
      
      const force = currentPos.clone()
        .normalize()
        .multiplyScalar(isHovering ? HOVER_FORCE : -HOVER_FORCE/2);
      
      rigidBodyRef.current.applyImpulse(
        { x: force.x, y: force.y, z: 0 },
        true
      );
    }
  }, [isStuck]);

  const handleClick = useCallback((e: any) => {
    // Stop event propagation
    e.stopPropagation();
    
    if (isInitialRender.current) return;
    if (rigidBodyRef.current && !isStuck) {
      setIsStuck(false);
      
      const randomAngle = Math.random() * RANDOM_DIRECTION_RANGE;
      const force = {
        x: Math.cos(randomAngle) * CLICK_FORCE,
        y: Math.sin(randomAngle) * CLICK_FORCE,
        z: 0
      };

      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBodyRef.current.applyImpulse(force, true);
      
      // Call parent onClick
      onClick(false);
    }
  }, [isStuck, onClick]);

  // Modified attraction behavior for smoother grouping
  useEffect(() => {
    const interval = setInterval(() => {
      if (rigidBodyRef.current && !isStuck) {
        const currentPos = new Vector3(
          rigidBodyRef.current.translation().x,
          rigidBodyRef.current.translation().y,
          rigidBodyRef.current.translation().z
        );

        keepInBounds(currentPos);
        
        const distanceToCenter = currentPos.length();
        const currentVel = rigidBodyRef.current.linvel();
        const speed = new Vector3(currentVel.x, currentVel.y, currentVel.z).length();
        
        // Reduce jitter based on proximity to center
        const proximityFactor = Math.max(0, distanceToCenter / ATTRACTION_THRESHOLD);
        const jitter = new Vector3(
          (Math.random() - 0.5) * BLOB_JITTER * proximityFactor,
          (Math.random() - 0.5) * BLOB_JITTER * proximityFactor,
          0
        );

        if (distanceToCenter < STICK_THRESHOLD) {
          // Gradually slow down when near center
          const slowdownFactor = Math.max(0.1, distanceToCenter / STICK_THRESHOLD);
          const blobForce = jitter.multiplyScalar(0.3 * slowdownFactor);
          
          // Apply damping force based on current velocity
          rigidBodyRef.current.setLinvel({
            x: currentVel.x * 0.95,
            y: currentVel.y * 0.95,
            z: 0
          }, true);
          
          rigidBodyRef.current.applyImpulse(
            { x: blobForce.x, y: blobForce.y, z: 0 },
            true
          );
        } else {
          // Smoother attraction with velocity-based damping
          const attractionMultiplier = Math.min(1.5, distanceToCenter / 4);
          const speedDamping = Math.max(0.2, 1 - speed * 0.1); // Reduce force at high speeds
          
          const targetPos = currentPos.clone()
            .normalize()
            .multiplyScalar(BLOB_RADIUS)
            .add(jitter);
          
          const force = currentPos.clone()
            .sub(targetPos)
            .normalize()
            .multiplyScalar(-ATTRACTION_FORCE * attractionMultiplier * speedDamping);

          rigidBodyRef.current.applyImpulse(
            { x: force.x, y: force.y, z: 0 },
            true
          );
        }
      }
    }, 16);

    return () => clearInterval(interval);
  }, [isStuck]);

  // Keep shapes within boundaries
  const keepInBounds = (currentPos: Vector3) => {
    if (rigidBodyRef.current) {
      const bounds = BOUNDARY_SIZE;
      if (Math.abs(currentPos.x) > bounds) {
        const force = new Vector3(-Math.sign(currentPos.x) * 10, 0, 0);
        rigidBodyRef.current.applyImpulse(
          { x: force.x, y: force.y, z: force.z },
          true
        );
      }
      if (Math.abs(currentPos.y) > bounds) {
        const force = new Vector3(0, -Math.sign(currentPos.y) * 10, 0);
        rigidBodyRef.current.applyImpulse(
          { x: force.x, y: force.y, z: force.z },
          true
        );
      }
    }
  };

  // Add cursor repulsion effect
  useEffect(() => {
    if (rigidBodyRef.current && !isStuck && mousePosition) {
      const currentPos = new Vector3(
        rigidBodyRef.current.translation().x,
        rigidBodyRef.current.translation().y,
        0
      );

      // Convert mouse position to world space
      const mouseWorld = new Vector3(
        (mousePosition.x * BOUNDARY_SIZE * 2) - BOUNDARY_SIZE,
        -(mousePosition.y * BOUNDARY_SIZE * 2) + BOUNDARY_SIZE,
        0
      );

      // Calculate distance to mouse
      const distanceToMouse = currentPos.distanceTo(mouseWorld);

      if (distanceToMouse < CURSOR_REPULSION_RADIUS) {
        // Calculate repulsion direction
        const repulsionDirection = currentPos.clone().sub(mouseWorld).normalize();
        const repulsionStrength = 
          (1 - distanceToMouse / CURSOR_REPULSION_RADIUS) * CURSOR_REPULSION_FORCE;

        rigidBodyRef.current.applyImpulse(
          {
            x: repulsionDirection.x * repulsionStrength,
            y: repulsionDirection.y * repulsionStrength,
            z: 0
          },
          true
        );
      }
    }
  }, [mousePosition, isStuck]);

  // Apply random impulse to this sphere
  const applyRandomImpulse = useCallback(() => {
    if (rigidBodyRef.current && !isStuck) {
      const randomAngle = Math.random() * RANDOM_DIRECTION_RANGE;
      const randomForce = CLICK_FORCE * (0.5 + Math.random() * 1); // Random force magnitude
      
      const force = {
        x: Math.cos(randomAngle) * randomForce,
        y: Math.sin(randomAngle) * randomForce,
        z: 0
      };

      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBodyRef.current.applyImpulse(force, true);
    }
  }, [isStuck]);

  // React to triggerReturn changes (scene clicks)
  useEffect(() => {
    if (triggerReturn) {
      applyRandomImpulse();
    }
  }, [triggerReturn, applyRandomImpulse]);

  return (
    <RigidBody
      ref={rigidBodyRef}
      position={position}
      type="dynamic"
      colliders="ball"
      restitution={RESTITUTION}
      friction={0.2}        // Increased friction
      linearDamping={DAMPING}
      angularDamping={DAMPING}
      mass={1}
    >
      <motion.mesh
        animate={{
          scale: hovered ? 1.2 : 1,
        }}
        transition={{ 
          duration: 0.4,
          ease: "easeOut"
        }}
        onPointerEnter={() => handleHover(true)}
        onPointerLeave={() => handleHover(false)}
        onClick={handleClick}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial 
          color="#ff3333"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff0000"
          emissiveIntensity={hovered ? 0.5 : isStuck ? 0.4 : 0.2}
        />
      </motion.mesh>
    </RigidBody>
  );
};

export default function Shapes() {
  const [selected, setSelected] = useState(false);
  const [stuckCount, setStuckCount] = useState(0);
  const [returnTrigger, setReturnTrigger] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleClick = useCallback((triggerGroup = true) => {
    setSelected(true);
    if (triggerGroup) {
      setReturnTrigger(prev => prev + 1);
    }
  }, []);

  const handleStick = useCallback(() => {
    setStuckCount(prev => prev + 1);
  }, []);

  // Track mouse position
  const handleMouseMove = useCallback((event: any) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    setMousePosition({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height
    });
  }, []);

  // Handle any click within the scene
  const handleSceneClick = useCallback(() => {
    setReturnTrigger(prev => prev + 1); // This will trigger all spheres to move
  }, []);

  return (
    <Canvas 
      camera={{ position: [0, 0, 20], fov: 45 }}
      shadows
      style={{ background: 'transparent' }}
      onMouseMove={handleMouseMove}
      onClick={handleSceneClick} // Add click handler to Canvas
    >
      <ambientLight intensity={0.5} />
      <pointLight 
        position={[10, 10, 10]} 
        intensity={1.5}
        castShadow 
      />
      <Physics 
        gravity={[0, 0, 0]}
        debug={false}
      >
        {INITIAL_POSITIONS.map((pos, i) => (
          <Shape 
            key={i}
            position={pos}
            onClick={() => {}} // Empty click handler since we handle clicks at Canvas level
            isSelected={selected}
            onStick={handleStick}
            triggerReturn={returnTrigger}
            mousePosition={mousePosition}
          />
        ))}
      </Physics>
    </Canvas>
  );
} 
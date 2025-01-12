'use client';

import { useRef, useEffect, useState } from 'react';
import { Group } from 'three';
import TokenFace from './TokenFace';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollingTokens() {
  const tokensRef = useRef<(Group | null)[]>([]);
  const [positions, setPositions] = useState({
    spread: 2,
    scale: 0.75,
    finalScale: 1.2
  });
  
  // Update positions based on screen size
  useEffect(() => {
    const updatePositions = () => {
      const width = window.innerWidth;
      let newSpread, newScale, newFinalScale;
      
      if (width < 400) {
        newSpread = 1;        // Mobile portrait values
        newScale = 0.7;
        newFinalScale = 0.9;
      } else if (width < 768) {
        newSpread = 1.2;      // Mobile landscape values
        newScale = 0.75;
        newFinalScale = 0.95;
      } else if (width < 1000) {
        newSpread = 1.5;      // Tablet values
        newScale = 0.8;
        newFinalScale = 1;
      } else if (width < 1200) {
        newSpread = 1.8;      // Desktop small values
        newScale = 0.85;
        newFinalScale = 1.1;
      } else {
        newSpread = 2;        // Desktop large values
        newScale = 0.9;
        newFinalScale = 1.2;
      }
      
      setPositions({
        spread: newSpread,
        scale: newScale,
        finalScale: newFinalScale
      });
    };

    // Set initial positions
    updatePositions();

    // Add resize listener
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  const initialPositions = [
    { x: -1.5 * positions.spread, y: -12, scale: positions.scale, finalScale: positions.finalScale, speed: 0.8, rotation: { x: 0.2, y: -0.3, z: 0.1 } },
    { x: -0.5 * positions.spread, y: -15, scale: positions.scale, finalScale: positions.finalScale * 0.9, speed: 1, rotation: { x: -0.3, y: 0.2, z: -0.2 } },
    { x: 1.5 * positions.spread, y: -14, scale: positions.scale, finalScale: positions.finalScale, speed: 0.6, rotation: { x: 0.1, y: 0.3, z: 0.2 } }
  ];

  const finalPositions = [
    { x: -2 * positions.spread, y: 1 },
    { x: -0.75 * positions.spread, y: -1 },
    { x: 2 * positions.spread, y: 0.5 }
  ];

  useEffect(() => {
    tokensRef.current.forEach((token, i) => {
      if (token) {
        const scrollTrigger = {
          trigger: '#connect',
          start: 'top bottom+=20%',
          end: 'top center',
          scrub: initialPositions[i].speed,
          markers: false,
          smoothing: 1
        };

        // "top top"     = top of element hits top of viewport
        // "top center"  = top of element hits center of viewport
        // "top bottom"  = top of element hits bottom of viewport
        // "center top"  = center of element hits top of viewport
        // "bottom top"  = bottom of element hits top of viewport

        // Position animation
        gsap.fromTo(token.position,
          { y: initialPositions[i].y, x: initialPositions[i].x },
          {
            y: finalPositions[i].y,
            x: finalPositions[i].x,
            scrollTrigger,
            ease: "none"
          }
        );

        // Scale animation
        gsap.fromTo(token.scale,
          { x: initialPositions[i].scale, y: initialPositions[i].scale, z: initialPositions[i].scale },
          {
            x: initialPositions[i].finalScale,
            y: initialPositions[i].finalScale,
            z: initialPositions[i].finalScale,
            scrollTrigger,
            ease: "none"
          }
        );

        // Rotation animation
        gsap.fromTo(token.rotation,
          { 
            x: initialPositions[i].rotation.x,
            y: initialPositions[i].rotation.y,
            z: initialPositions[i].rotation.z 
          },
          {
            x: initialPositions[i].rotation.x * -2,
            y: initialPositions[i].rotation.y * -2,
            z: initialPositions[i].rotation.z * -2,
            scrollTrigger,
            ease: "none"
          }
        );
      }
    });
  }, []);

  return (
    <group position={[0, 0, 2]}>
      {/* Pink point lights for each token */}
      {initialPositions.map((pos, i) => (
        <group key={`lights-${i}`} position={[pos.x, pos.y, 0]} onClick={undefined} onPointerOver={undefined}>
          <pointLight
            position={[1, 1, 1]}
            intensity={20}
            color="#F39"
            distance={10}
            decay={1}
          />
          <pointLight
            position={[-1, -1, -1]}
            intensity={10}
            color="#F39"
            distance={10}
            decay={1}
          />
        </group>
      ))}

      {/* Tokens */}
      {initialPositions.map((pos, i) => (
        <group 
          key={i}
          ref={el => {
            if (tokensRef.current) tokensRef.current[i] = el;
          }}
          position={[pos.x, pos.y, 0]}
          rotation={[pos.rotation.x, pos.rotation.y, pos.rotation.z]}
          scale={[pos.scale, pos.scale, pos.scale]}
          onClick={undefined}
          onPointerOver={undefined}
        >
          <TokenFace />
        </group>
      ))}
    </group>
  );
} 
'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import TokenFace from '../3d/TokenFace';
import styles from './AboutMe.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Group } from 'three';

gsap.registerPlugin(ScrollTrigger);

function RotatingToken() {
  const groupRef = useRef<Group>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Initial check
    handleResize(mediaQuery);

    // Add listener for changes
    mediaQuery.addListener(handleResize);

    return () => {
      mediaQuery.removeListener(handleResize);
    };
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const group = groupRef.current;

      if (!group) return;

      gsap.fromTo(
        group.scale,
        {
          x: 3.2,
          y: 3.2,
          z: 3.2,
        },
        {
          scrollTrigger: {
            trigger: "#about",
            start: "top 90%",
            end: "top 40%",
            toggleActions: "play none none reverse",
            scrub: 0.5,
            id: "🤷‍♂️-token-scale",
            markers: process.env.NODE_ENV === "development", // Show markers in development
          },
          x: 2.8,
          y: 2.8,
          z: 2.8,
          ease: "none", // Linear scroll animation
        }
      );
    });

    // Force ScrollTrigger refresh
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
    };
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={[0.2, 0, 0]}
      scale={3.2}
      position={isMobile ? [0, 0, 0] : [2, 0, 0]}
    >
      <TokenFace />
    </group>
  );
}

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Delay GSAP initialization to stabilize layout
    const initGSAP = () => {
      let ctx = gsap.context(() => {
        gsap.fromTo(
          tokenRef.current,
          {
            top: '-50vh',
          },
          {
            scrollTrigger: {
              trigger: "#about",
              start: 'top 90%',
              end: 'center center',
              toggleActions: 'play none none reverse',
              scrub: true,
              id: "👀-toking",
              markers: true,
            },
            top: '50%',
            ease: "none",
          }
        );

        gsap.fromTo(
          containerRef.current,
          {
            scale: 0.95,
            opacity: 0,
            y: 30,
          },
          {
            scrollTrigger: {
              trigger: "#about",
              start: 'top 50%',
              end: 'top 30%',
              toggleActions: 'play none none reverse',
              scrub: 0.5,
              id: "💩-container-reveal",
              markers: true,
            },
            scale: 1,
            opacity: 1,
            y: 0,
            ease: "power2.out",
          }
        );

        gsap.fromTo(
          [headingRef.current, textRef.current],
          {
            y: 50,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: "#about",
              start: 'top 45%',
              end: 'top 25%',
              toggleActions: 'play none none reverse',
              scrub: 0.5,
              id: "🐳-text-reveal",
              markers: true,
            },
            y: 0,
            opacity: 1,
            stagger: 0.2,
            ease: "power2.out",
          }
        );
      });

      // Force ScrollTrigger refresh after all animations
      const rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        ctx.revert();
        cancelAnimationFrame(rafId);
      };
    };

    // Delay initialization to allow layout stabilization
    const timeout = setTimeout(initGSAP, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="about" className={styles.about}>
      <div ref={tokenRef} className={styles.tokenContainer}>
        <Canvas>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <RotatingToken />
          </Suspense>
        </Canvas>
      </div>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.content}>
          {/* WARNING: DO NOT MODIFY THE HEADLINE OR BIO TEXT BELOW */}
          <h1 ref={headingRef} className={styles.heading}>Hello 👋</h1>
          <p ref={textRef} className={styles.text}>
            I'm Matt Trice, an ATL-based Product Designer with a track record of design leadership, embracing complex problems, and crafting elegant solutions that deliver meaningful business impact.
          </p>
        </div>
      </div>
    </section>
  );
}
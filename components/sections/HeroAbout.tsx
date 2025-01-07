'use client';

import { useRef, useEffect, Suspense } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import TokenFace from '../3d/TokenFace';
import styles from './HeroAbout.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { Group } from 'three';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function RotatingToken({ groupRef }: { groupRef: React.RefObject<Group> }) {
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.15, 1]} scale={[1.9, 1.9, 1.9]}>
      <TokenFace />
    </group>
  );
}

export default function HeroAbout() {
  const groupRef = useRef<Group | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const tokenContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Initial Load Animation - Text Fade In
      const tl = gsap.timeline({
        delay: 0.2
      });
      
      tl.to(".heroText", {
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.inOut"
      });

      // Token Scroll Animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        markers: true,
        scrub: 2,
        pin: tokenContainerRef.current,
        onUpdate: (self) => {
          if (groupRef.current) {
            const progress = self.progress;
            
            // Basic downward movement
            const startY = 0.15;
            const endY = -0.85;
            groupRef.current.position.y = gsap.utils.interpolate(startY, endY, progress);
            
            // Scale animation through midpoint
            const initialScale = 1.9;
            const peakScale = 2.8;
            
            // Create a bell curve for scale
            let scale = initialScale;
            if (progress < 0.5) {
              scale = gsap.utils.interpolate(initialScale, peakScale, progress * 2);
            } else {
              scale = gsap.utils.interpolate(peakScale, initialScale, (progress - 0.5) * 2);
            }
            
            groupRef.current.scale.set(scale, scale, scale);
          }
        },
      });

      // About Section Animation
      gsap.set(aboutTextRef.current, {
        opacity: 0,
        x: -100
      });

      ScrollTrigger.create({
        trigger: aboutTextRef.current,
        start: "top center",
        onEnter: () => {
          gsap.to(aboutTextRef.current, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(aboutTextRef.current, {
            opacity: 0,
            x: -100,
            duration: 1
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.gradient}>
      <section ref={sectionRef} id="heroAbout" className={clsx(styles.heroAbout200vh)}> 
        <div id="hero" className={clsx(sharedStyles.container, styles.heroContent)}>
          <div ref={heroTextRef} className={styles.contentWrapper}>
            <h1 className={clsx(sharedStyles.displayText, styles.heroHeadline)}>
              <span className="heroText">Build</span>
              <span className="heroText">Cool</span>
              <span className="heroText">Stuff</span>
            </h1>
          </div>
        </div>
        <div ref={tokenContainerRef} className={styles.tokenContainer}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            style={{ width: '100%', height: '100%' }}
          >
            <Suspense fallback={null}>
              <Environment preset="city" />
              <RotatingToken groupRef={groupRef} />
            </Suspense>
          </Canvas>
        </div>
        <div id="about" ref={aboutTextRef} className={clsx(styles.aboutContainer, styles.aboutContent)}>
          <div className={styles.content}>
            <h1 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle, styles.aboutHeadline)}>Hello 👋</h1>
            <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>
              I'm Matt Trice, an ATL-based Product Designer with a track record of design leadership, embracing complex problems, and crafting elegant solutions that deliver meaningful business impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
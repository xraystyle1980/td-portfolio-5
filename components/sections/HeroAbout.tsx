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
    <group ref={groupRef} position={[0, 2, 0]} scale={[2, 2, 2]}>
      <TokenFace />
    </group>
  );
}

export default function HeroAbout() {
  const groupRef = useRef<Group | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const tokenContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        markers: true,
        scrub: 1,
        pin: tokenContainerRef.current,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (groupRef.current) {
            const progress = self.progress;
            groupRef.current.position.y = 2 - (progress * 6);
            
            groupRef.current.position.x = Math.sin(progress * Math.PI) * 1;
            
            const scale = 2 - (progress * 0.5);
            groupRef.current.scale.set(scale, scale, scale);
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.gradient}>
      <section ref={sectionRef} id="heroAbout" className={clsx(styles.heroAbout200vh)}> 
        <div id="hero" className={clsx(sharedStyles.container, styles.heroContent)}>
          <div className={styles.contentWrapper}>
            <h1 className={clsx(sharedStyles.displayText, styles.heroHeadline)}>
              <span>Build</span>
              <span>Cool</span>
              <span>Stuff</span>
            </h1>
          </div>
        </div>
        <div ref={tokenContainerRef} className={styles.tokenContainer}>
          <Canvas>
            <Suspense fallback={null}>
              <Environment preset="city" />
              <RotatingToken groupRef={groupRef} />
            </Suspense>
          </Canvas>
        </div>
        <div id="about" className={clsx(styles.aboutContainer, styles.aboutContent)}>
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
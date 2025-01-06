'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import TokenFace from '../3d/TokenFace';
import styles from './HeroAbout.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { Group } from 'three';

// gsap.registerPlugin(ScrollTrigger);

function RotatingToken() {
  const groupRef = useRef<Group | null>(null); // Explicitly typed

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <TokenFace />
    </group>
  );
}


export default function HeroAbout() {
  const headlineRef = useRef(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.fromTo(
  //       headlineRef.current.querySelectorAll('span'),
  //       { y: 100, opacity: 0 },
  //       {
  //         y: 0,
  //         opacity: 1,
  //         stagger: 0.2,
  //         ease: 'bounce.out',
  //         duration: 1.5,
  //       }
  //     );
  //   });

  //   return () => ctx.revert();
  // }, []);

  return (
    <div className={styles.gradient}>
      <section id="heroAbout" className={clsx(styles.heroAbout200vh)}> 
        <div id="hero" className={clsx(sharedStyles.container, styles.heroContent)}>
          <div className={styles.contentWrapper}>
            <h1 ref={headlineRef} className={clsx(sharedStyles.displayText, styles.heroHeadline)}>
              <span>Build</span>
              <span>Cool</span>
              <span>Stuff</span>
            </h1>
          </div>
        </div>
        <div className={styles.tokenContainer}>
          <Canvas>
            <Suspense fallback={null}>
              <Environment preset="city" />
              <RotatingToken />
            </Suspense>
          </Canvas>
        </div>
        <div id="about" className={clsx(sharedStyles.container, styles.aboutContent)}>
          <div className={sharedStyles.darkContainer}>
            <div className={styles.content}>
              <h1 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle, styles.aboutHeadline)}>Hello 👋</h1>
              <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>
                I'm Matt Trice, an ATL-based Product Designer with a track record of design leadership, embracing complex problems, and crafting elegant solutions that deliver meaningful business impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
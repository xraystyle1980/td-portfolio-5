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
import localFont from 'next/font/local';

const cooper = localFont({
  src: '../../public/fonts/Cooper-var.ttf',
  variable: '--font-cooper',
  preload: true,
});

gsap.registerPlugin(ScrollTrigger);

function RotatingToken() {
  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.5;
    }
  });

  useEffect(() => {
    const group = groupRef.current;

    if (!group) return;

    gsap.fromTo(
      group.scale,
      { x: 3.2, y: 3.2, z: 3.2 },
      {
        scrollTrigger: {
          trigger: "#about",
          start: "top 90%",
          end: "top 40%",
          toggleActions: "play none none reverse",
          scrub: 0.5,
          id: "token-scale",
        },
        x: 2.8,
        y: 2.8,
        z: 2.8,
        ease: "none",
      }
    );
  }, []);

  return (
    <group ref={groupRef}>
      <TokenFace />
    </group>
  );
}

export default function HeroAbout() {
  const headlineRef = useRef(null);
  const tokenRef = useRef(null);
  const contentRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Token scroll animation
      gsap.fromTo(
        tokenRef.current,
        { top: '-50vh' },
        {
          scrollTrigger: {
            trigger: "#about",
            start: 'top 90%',
            end: 'center center',
            toggleActions: 'play none none reverse',
            scrub: true,
            id: "token-position",
          },
          top: '50%',
          ease: "none",
        }
      );

      // Headline animation
      gsap.fromTo(
        headlineRef.current.querySelectorAll('span'),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: 'bounce.out',
          duration: 1.5,
        }
      );
    });

    return () => ctx.revert();
  }, [isLoaded]);

  // Loader animation
  useEffect(() => {
    const timeout = setTimeout(() => setIsLoaded(true), 2000); // Simulated loading delay
    return () => clearTimeout(timeout);
  }, []);

  if (!isLoaded) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <div className={styles.gradient}>
      <section id="hero" className={clsx(styles.hero, cooper.variable)}>
        <div className={clsx(sharedStyles.container, styles.heroContent)}>
          <div className={styles.content}>
            <h1 ref={headlineRef} className={clsx(sharedStyles.displayText, styles.heroHeadlineDisplay, styles.heroHeadline)} data-text="Build Cool Stuff">
              <span>Build</span>
              <span>Cool</span>
              <span>Stuff</span>
            </h1>
          </div>
        </div>
      </section>
      <section id="about" className={clsx(sharedStyles.container, styles.about)}>
        <div ref={tokenRef} className={styles.tokenContainer}>
          <Canvas>
            <Suspense fallback={null}>
              <Environment preset="city" />
              <RotatingToken />
            </Suspense>
          </Canvas>
        </div>
        <div className={sharedStyles.darkContainer}>
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
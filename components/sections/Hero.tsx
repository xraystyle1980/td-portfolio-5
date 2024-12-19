'use client';

import styles from './Hero.module.css';
import Scene from '@/components/3d/Scene';
import { Caveat } from 'next/font/google';
import Navigation from '@/components/Navigation'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
  markers: false
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

export default function Hero() {
  const waveRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!waveRef.current) return;

    const animation = gsap.to(waveRef.current, {
      scale: 2.5,
      force3D: true,
      scrollTrigger: {
        trigger: waveRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    return () => {
      animation.kill();
    };
  }, [])

  return (
    <section className={styles.hero} suppressHydrationWarning>
      <div className={styles.heroContent}>
        <div className={styles.sceneContainer}>
          <Scene />
        </div>
        <div className={styles.contentOverlay}>
          <div className={styles.content} ref={containerRef}>
            <div className={styles.logo}>
              Trice.Design
            </div>
            <h1>Build cool <span className={styles.strikethrough}></span> stuff.</h1>
            <p className={styles.heroText}>
              I'm Matt Trice, an Atlanta-based product & web designer. Let's work together & build{' '}
              <span className={`${styles.highlight} ${caveat.className}`}>
                cool
                <span aria-hidden="true" className={styles.caret}>^</span>
              </span>
              {' '}<span className={styles.strikethrough}></span> stuff.
            </p>
          </div>
        </div>
      </div>
      <img 
        ref={waveRef}
        src="/waveborder.svg"
        alt=""
        className={styles.waveBorder}
        aria-hidden="true"
      />
    </section>
  )
}

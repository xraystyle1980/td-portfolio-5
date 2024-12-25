'use client';

import styles from './Hero.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import localFont from 'next/font/local'

ScrollTrigger.defaults({
  markers: false
});

const cooper = localFont({
  src: '../../public/fonts/Cooper-var.ttf',
  variable: '--font-cooper'
})

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const buildWordRef = useRef<HTMLSpanElement>(null);

  return (
    <section id="hero" className={`${styles.hero} ${cooper.variable}`} suppressHydrationWarning>
      <div className={styles.heroContent}>
        <div className={styles.contentOverlay}>
          <div className={styles.content} ref={containerRef}>
            <div className={styles.headlineWrapper}>
              <h1 ref={headlineRef} className={styles.heroHeadline}>
                <span ref={buildWordRef}>Build</span>
                <br />
                <span className={styles.staticWord}>Cool</span>
                <br />
                <span ref={wordRef}>Stuff</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

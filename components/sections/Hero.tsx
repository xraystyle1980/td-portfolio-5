'use client';

import styles from './Hero.module.css';
import Scene from '@/components/3d/Scene';
import { Caveat } from 'next/font/google';
import Navigation from '@/components/Navigation'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import SplitType from 'split-type';
import VariableText from '@/components/VariableText'
import localFont from 'next/font/local'

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.defaults({
  markers: false
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

const cooper = localFont({
  src: '../../public/fonts/Cooper-var.ttf',
  variable: '--font-cooper'
})

export default function Hero() {
  const waveRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

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
  }, []);

  useEffect(() => {
    if (!textRef.current) return;

    // Initialize SplitType with proper type checking
    splitRef.current = new SplitType(textRef.current, {
      types: 'chars',
      tagName: 'span'
    });

    // Type guard for the animation
    if (splitRef.current?.chars) {
      gsap.from(splitRef.current.chars, {
        opacity: 0,
        y: 20,
        rotateX: -90,
        stagger: 0.02,
        duration: 0.5,
        ease: 'back.out'
      });
    }

    // Event handlers with proper type casting
    const handleCharacterHover = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) return;
      
      gsap.to(e.target, {
        scale: 1.5,
        color: '#00ffff',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleCharacterLeave = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) return;
      
      gsap.to(e.target, {
        scale: 1,
        color: 'white',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Add event listeners with proper type casting
    if (splitRef.current?.chars) {
      splitRef.current.chars.forEach((char) => {
        if (char instanceof HTMLElement) {
          char.addEventListener('mouseenter', handleCharacterHover);
          char.addEventListener('mouseleave', handleCharacterLeave);
        }
      });
    }

    // Cleanup
    return () => {
      if (splitRef.current?.chars) {
        splitRef.current.chars.forEach((char) => {
          if (char instanceof HTMLElement) {
            char.removeEventListener('mouseenter', handleCharacterHover);
            char.removeEventListener('mouseleave', handleCharacterLeave);
          }
        });
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className={`${styles.hero} ${cooper.variable}`} suppressHydrationWarning>
      <div className={styles.heroContent}>
        <div className={styles.sceneContainer}>
          <Scene />
        </div>
        <div className={styles.contentOverlay}>
          <div className={styles.content} ref={containerRef}>
            <button 
              onClick={scrollToTop}
              className={styles.logo}
            >
              Trice.Design
            </button>
            <h1 ref={textRef} className={styles.heroHeadline}>
              <VariableText 
                text="Build"
                className={styles.heroWord}
                style={{
                  fontSize: 'inherit',
                  fontWeight: 'variable',
                  fontVariationSettings: '"wght" 400',
                  letterSpacing: '-0.02em'
                }}
              />
              <br />
              <VariableText 
                text="Cool"
                className={styles.heroWord}
                style={{
                  fontSize: 'inherit',
                  fontWeight: 'variable',
                  fontVariationSettings: '"wght" 400',
                  letterSpacing: '-0.02em'
                }}
              />
              <br />
              <VariableText 
                text="Shit"
                className={styles.heroWord}
                style={{
                  fontSize: 'inherit',
                  fontWeight: 'variable',
                  fontVariationSettings: '"wght" 400',
                  letterSpacing: '-0.02em'
                }}
              />
            </h1>
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

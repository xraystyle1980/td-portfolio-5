'use client';

import styles from './Hero.module.css';
import Scene from '@/components/3d/Scene';
import { Caveat } from 'next/font/google';
import Navigation from '@/components/layout/Navigation/Navigation'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import SplitType from 'split-type';
import localFont from 'next/font/local'

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
  const wordRef = useRef<HTMLSpanElement>(null);
  const buildWordRef = useRef<HTMLSpanElement>(null);

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

  useEffect(() => {
    if (!wordRef.current || !buildWordRef.current) return;

    // Setup word swap animation for "Stuff/Shit"
    const word = wordRef.current;
    const buildWord = buildWordRef.current;
    let currentAnimation: gsap.core.Tween | null = null;
    let buildAnimation: gsap.core.Tween | null = null;
    
    // Build/Make swap handlers
    const handleBuildMouseEnter = () => {
      if (buildAnimation) buildAnimation.kill();
      buildAnimation = gsap.to(buildWord, {
        opacity: 0,
        y: -20,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          buildWord.textContent = 'Make';
          gsap.to(buildWord, {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2.out'
          });
        }
      });
    };

    const handleBuildMouseLeave = () => {
      if (buildAnimation) buildAnimation.kill();
      buildAnimation = gsap.to(buildWord, {
        opacity: 0,
        y: 20,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          buildWord.textContent = 'Build';
          gsap.to(buildWord, {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2.out'
          });
        }
      });
    };

    // Stuff/Shit swap handlers
    const handleMouseEnter = () => {
      if (currentAnimation) currentAnimation.kill();
      currentAnimation = gsap.to(word, {
        opacity: 0,
        y: -20,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          word.textContent = 'Shit';
          gsap.to(word, {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2.out'
          });
        }
      });
    };

    const handleMouseLeave = () => {
      if (currentAnimation) currentAnimation.kill();
      currentAnimation = gsap.to(word, {
        opacity: 0,
        y: 20,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          word.textContent = 'Stuff';
          gsap.to(word, {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2.out'
          });
        }
      });
    };

    // Add event listeners
    word.addEventListener('mouseenter', handleMouseEnter);
    word.addEventListener('mouseleave', handleMouseLeave);
    buildWord.addEventListener('mouseenter', handleBuildMouseEnter);
    buildWord.addEventListener('mouseleave', handleBuildMouseLeave);

    return () => {
      if (currentAnimation) currentAnimation.kill();
      if (buildAnimation) buildAnimation.kill();
      word.removeEventListener('mouseenter', handleMouseEnter);
      word.removeEventListener('mouseleave', handleMouseLeave);
      buildWord.removeEventListener('mouseenter', handleBuildMouseEnter);
      buildWord.removeEventListener('mouseleave', handleBuildMouseLeave);
    };
  }, []);

  return (
    <section className={`${styles.hero} ${cooper.variable}`} suppressHydrationWarning>
      <div className={styles.heroContent}>
        <div className={styles.sceneContainer}>
          <Scene />
        </div>
        <div className={styles.contentOverlay}>
          <div className={styles.content} ref={containerRef}>
            <div className={styles.headlineWrapper}>
              <h1 ref={textRef} className={styles.heroHeadline}>
                <span ref={buildWordRef} className={styles.heroWord}>Build</span>
                <br />
                <span className={styles.heroWord}>Cool</span>
                <br />
                <span ref={wordRef} className={styles.heroWord}>Stuff</span>
              </h1>
            </div>
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

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

  useEffect(() => {
    if (!wordRef.current || !buildWordRef.current) return;

    const words = {
      build: {
        element: buildWordRef.current,
        states: ['Build', 'Make'],
        current: 0,
        clicked: false,
        isHovered: false
      },
      stuff: {
        element: wordRef.current,
        states: ['Stuff', 'Shit'],
        current: 0,
        clicked: false,
        isHovered: false
      }
    };

    const swapWord = (word: keyof typeof words, index: number) => {
      const config = words[word];
      if (config.current === index) return;
      
      // Store the current width before the swap
      const currentWidth = config.element.offsetWidth;
      config.element.style.width = `${currentWidth}px`;
      
      gsap.to(config.element, {
        y: -10,
        opacity: 0,
        duration: 0.1,
        ease: 'power1.in',
        onComplete: () => {
          config.element.textContent = config.states[index];
          config.current = index;
          
          gsap.to(config.element, {
            y: 0,
            opacity: 1,
            duration: 0.1,
            ease: 'power1.out',
            onComplete: () => {
              // Remove the fixed width after animation completes
              config.element.style.width = '';
            }
          });
        }
      });
    };

    const handleHover = (word: keyof typeof words) => {
      const config = words[word];
      config.isHovered = true;
      swapWord(word, 1); // Always swap to alternate word on hover
    };

    const handleMouseLeave = (word: keyof typeof words) => {
      const config = words[word];
      config.isHovered = false;
      if (!config.clicked) {
        swapWord(word, 0); // Return to original only if not clicked
      }
    };

    const handleClick = (word: keyof typeof words) => {
      const config = words[word];
      config.clicked = !config.clicked;
      
      if (config.clicked) {
        swapWord(word, 1); // Swap to alternate word when clicking
      } else if (!config.isHovered) {
        swapWord(word, 0); // Return to original when unclicking (if not hovered)
      }
    };

    // Create persistent function references
    const buildHover = () => handleHover('build');
    const buildLeave = () => handleMouseLeave('build');
    const buildClick = (e: MouseEvent) => {
      e.stopPropagation();
      handleClick('build');
    };
    
    const stuffHover = () => handleHover('stuff');
    const stuffLeave = () => handleMouseLeave('stuff');
    const stuffClick = (e: MouseEvent) => {
      e.stopPropagation();
      handleClick('stuff');
    };

    // Add event listeners
    words.build.element.addEventListener('mouseenter', buildHover);
    words.build.element.addEventListener('mouseleave', buildLeave);
    words.build.element.addEventListener('click', buildClick);
    
    words.stuff.element.addEventListener('mouseenter', stuffHover);
    words.stuff.element.addEventListener('mouseleave', stuffLeave);
    words.stuff.element.addEventListener('click', stuffClick);

    return () => {
      words.build.element.removeEventListener('mouseenter', buildHover);
      words.build.element.removeEventListener('mouseleave', buildLeave);
      words.build.element.removeEventListener('click', buildClick);
      
      words.stuff.element.removeEventListener('mouseenter', stuffHover);
      words.stuff.element.removeEventListener('mouseleave', stuffLeave);
      words.stuff.element.removeEventListener('click', stuffClick);
    };
  }, []);

  return (
    <section id="hero" className={`${styles.hero} ${cooper.variable}`} suppressHydrationWarning>
      <div className={styles.heroContent}>
        <div className={styles.contentOverlay}>
          <div className={styles.content} ref={containerRef}>
            <div className={styles.headlineWrapper}>
              <h1 ref={headlineRef} className={styles.heroHeadline}>
                <span ref={buildWordRef} className={styles.heroWord}>Build</span>
                <br />
                <span className={styles.staticWord}>Cool</span>
                <br />
                <span ref={wordRef} className={styles.heroWord}>Stuff</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

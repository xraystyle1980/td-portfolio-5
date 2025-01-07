'use client';

import { useRef, useEffect, Suspense, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import TokenFace from '../3d/TokenFace';
import styles from './HeroAbout.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { Group } from 'three';
import { SplitText } from 'gsap/dist/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

function RotatingToken({ groupRef }: { groupRef: React.RefObject<Group> }) {
  const [xPosition, setXPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      const width = window.innerWidth;
      let newPosition;
      
      if (width > 1200) {
        newPosition = 0;      // Default position for large screens
      } else if (width > 1000) {
        newPosition = 2;      // Slightly right
      } else if (width > 768) {
        newPosition = 1.5;    // More centered
      } else if (width > 400) {
        newPosition = 1;      // Even more centered
      } else {
        newPosition = 0.5;    // Most centered for mobile
      }
      
      setXPosition(newPosition);
    };

    // Set initial position
    updatePosition();

    // Add resize listener
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[xPosition, 0.15, 2]} scale={[1.9, 1.9, 1.9]}>
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
      console.log('GSAP Context started');
      
      // Get the headline text
      const headline = heroTextRef.current?.querySelector('h1');
      console.log('Found headline:', headline);
      if (!headline) return;

      // Get the pre-split words
      const words = headline.querySelectorAll(`.${styles.splitWord}`);
      console.log('Found split words:', words);

      // Set initial state
      gsap.set(words, {
        opacity: 0,
        visibility: "hidden",
        fontVariationSettings: "'wght' 100"
      });

      // Initial Load Animation - Text Fade In with Weight and Letter Spacing
      const tl = gsap.timeline({
        delay: 0.2
      });
      
      // First step: Fade in and inflate weight
      tl.to(words, {
        opacity: 1,
        visibility: "visible",
        fontVariationSettings: "'wght' 900",
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.inOut",
        onStart: () => {
          if (headline) {
            headline.style.opacity = "1";
          }
        }
      })
      // Second step: Tighten letter spacing with bounce
      .to(words, {
        letterSpacing: "-0.05em",
        duration: 0.9,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }, "-=0.78"); // Start slightly before first animation ends

      // Add hover animation for individual words
      if (headline) {
        const wordElements = headline.querySelectorAll(`.${styles.splitWord}`);
        wordElements.forEach(word => {
          word.addEventListener('mouseenter', () => {
            gsap.to(word, {
              letterSpacing: "-0.02em",
              duration: 0.24,
              ease: "back.out(1.7)",
            });
          });

          word.addEventListener('mouseleave', () => {
            gsap.to(word, {
              letterSpacing: "-0.05em",
              duration: 0.4,
              ease: "power2.out"
            });
          });
        });
      }

      // Hero Text Scroll Animation - Move Up Only
      gsap.to(heroTextRef.current, {
        y: -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500",
          scrub: 1,
          markers: false
        }
      });

      // Token Scroll Animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "60% center",
        markers: false,
        scrub: 2,
        pin: tokenContainerRef.current,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (groupRef.current) {
            const progress = self.progress;
            
            // Basic downward movement
            const startY = 0.15;
            const endY = -1.2; // Reduced end position
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
      const aboutHeadline = aboutTextRef.current?.querySelector('h1');
      const aboutParagraph = aboutTextRef.current?.querySelector('p');

      if (aboutHeadline && aboutParagraph) {
        // Set initial states
        gsap.set([aboutHeadline, aboutParagraph], {
          opacity: 0,
          y: 50
        });

        ScrollTrigger.create({
          trigger: aboutTextRef.current,
          start: "top center+=330",
          onEnter: () => {
            // Create timeline for about section animations
            const aboutTl = gsap.timeline();
            
            // Animate headline first
            aboutTl.to(aboutHeadline, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "back.out(1.7)"
            })
            // Then animate paragraph
            .to(aboutParagraph, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "back.out(1.4)"
            }, "-=0.4"); // Start before headline animation finishes
          },
          onLeaveBack: () => {
            // Reverse animation when scrolling back up
            gsap.to([aboutHeadline, aboutParagraph], {
              opacity: 0,
              y: 50,
              duration: 0.5,
              ease: "power2.in",
              stagger: 0.1
            });
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.gradient}>
      <section ref={sectionRef} id="heroAbout" className={clsx(styles.heroAbout200vh)}> 
        <div id="hero" className={clsx(sharedStyles.container, styles.heroContent)}>
          <div ref={heroTextRef} className={styles.contentWrapper}>
            <h1 className={clsx(sharedStyles.displayText, styles.heroHeadline)}>
              <span className={styles.splitWord}>Build</span>
              <span className={styles.splitWord}>Cool</span>
              <span className={styles.splitWord}>Stuff</span>
            </h1>
          </div>
        </div>
        <div ref={tokenContainerRef} className={styles.tokenContainer}>
          <Canvas
            camera={{ position: [0, 0, 10], fov: 35 }}
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
            <h1 className={clsx(sharedStyles.displayText, styles.aboutHeadline)}>
              Hello <span className={styles.waveEmoji}>👋</span>
            </h1>
            <p className={clsx(styles.textBase, styles.aboutParagraph)}>
              I'm Matt Trice, an ATL-based Product Designer with a track record of design leadership, embracing complex problems, and crafting elegant solutions that deliver meaningful business impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
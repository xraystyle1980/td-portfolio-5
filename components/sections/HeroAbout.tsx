'use client';

import { useRef, useEffect, Suspense, useState } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import TokenFace from '../3d/TokenFace';
import styles from './HeroAbout.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { Group } from 'three';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

function RotatingToken({ groupRef, onFloatAnimCreated }: { 
  groupRef: React.RefObject<Group>;
  onFloatAnimCreated: (anim: gsap.core.Tween) => void;
}) {
  const [xPosition, setXPosition] = useState(0);
  const floatAnimRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      const width = window.innerWidth;
      let newPosition;
      
      if (width > 1200) {
        newPosition = 2.5;      // Slightly outside viewport on large screens
      } else if (width > 1000) {
        newPosition = 2;        // Aligned with text on medium-large screens
      } else if (width > 768) {
        newPosition = 1.5;      // Closer in on tablets
      } else if (width > 400) {
        newPosition = 1;        // Even closer on small devices
      } else {
        newPosition = 0.75;     // Closest on mobile
      }
      
      setXPosition(newPosition);
    };

    // Set initial position
    updatePosition();

    // Add resize listener
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;
    
    const group = groupRef.current;

    // Reset position and kill any existing animations
    if (floatAnimRef.current) {
      floatAnimRef.current.kill();
    }

    // Set initial position high above viewport
    gsap.set(group.position, {
      y: 6  // Start way above
    });

    // Create and store the bounce animation
    const bounceAnim = gsap.to(group.position, {
      y: 0,  // Final resting position
      duration: 1.2,
      ease: "bounce.out",
      delay: 0.5,  // Delay to sync with text
      paused: true, // Start paused
      onComplete: startFloating
    });

    // Start the bounce animation
    bounceAnim.play();

    // Start floating animation
    function startFloating() {
      // Kill any existing floating animation
      if (floatAnimRef.current) {
        floatAnimRef.current.kill();
      }

      // Create new floating animation that continues throughout
      floatAnimRef.current = gsap.to(group.position, {
        y: "+=0.3",  // Float up by 0.3 units
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,  // Go back and forth
        repeat: -1   // Repeat indefinitely
      });

      // Pass the animation reference up
      onFloatAnimCreated(floatAnimRef.current);
    }

    // Cleanup
    return () => {
      if (floatAnimRef.current) {
        floatAnimRef.current.kill();
      }
      bounceAnim.kill();
    };
  }, [onFloatAnimCreated]);

  return (
    <group ref={groupRef} position={[xPosition, 6, 0]} scale={[4.125, 4.125, 4.125]}>
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
  const floatAnimRef = useRef<gsap.core.Tween | null>(null);

  const handleFloatAnimCreated = (anim: gsap.core.Tween) => {
    floatAnimRef.current = anim;
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Get the headline text
      const headline = heroTextRef.current?.querySelector('h1');
      if (!headline) return;

      // Get the pre-split words
      const words = headline.querySelectorAll(`.${styles.splitWord}`);

      // Set initial state
      gsap.set(words, {
        opacity: 0,
        visibility: "hidden",
        xPercent: -150, // Start further off-screen left
        yPercent: 100,  // Start below the viewport
      });

      // Initial Load Animation - Text Fade In with Motion Path
      const tl = gsap.timeline({
        delay: 0.2
      });
      
      // Animate each word along a diagonal path
      words.forEach((word, index) => {
        tl.to(word, {
          opacity: 1,
          visibility: "visible",
          xPercent: 0,
          yPercent: 0,
          duration: 0.48,
          ease: "power2.out",
          onStart: () => {
            if (headline && index === 0) {
              headline.style.opacity = "1";
            }
          }
        }, index * 0.2); // Slightly longer stagger for more dramatic effect
      });

      // Token Scroll Animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        markers: false,
        scrub: 4,
        pin: tokenContainerRef.current,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (groupRef.current) {
            const progress = self.progress;
            const easedProgress = gsap.parseEase("power3.inOut")(progress);
            
            // Move the container down
            if (tokenContainerRef.current) {
              const startContainerY = 0;
              const endContainerY = window.innerHeight * 0.94;
              const currentContainerY = gsap.utils.interpolate(startContainerY, endContainerY, easedProgress);
              tokenContainerRef.current.style.transform = `translateY(${currentContainerY}px)`;
            }
            
            // Scale animation with eased progress
            const startScale = 4.125;
            const endScale = 2.8;
            const scale = gsap.utils.interpolate(startScale, endScale, easedProgress);
            groupRef.current.scale.set(scale, scale, scale);

            // Rotations with eased progress
            const startRotationY = 0;
            const endRotationY = Math.PI;
            const currentRotationY = gsap.utils.interpolate(startRotationY, endRotationY, easedProgress);
            
            const startRotationZ = 0;
            const endRotationZ = Math.PI * 0.05;
            const currentRotationZ = gsap.utils.interpolate(startRotationZ, endRotationZ, easedProgress);

            // Apply rotations
            groupRef.current.rotation.y = currentRotationY;
            groupRef.current.rotation.z = currentRotationZ;
          }
        }
      });

      // About Section Animation
      const aboutHeadline = aboutTextRef.current?.querySelector('h1');
      const aboutParagraph = aboutTextRef.current?.querySelector('p');

      if (aboutHeadline && aboutParagraph) {
        // Set initial states
        gsap.set([aboutHeadline, aboutParagraph], {
          opacity: 1,
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
            }, "-=0.4");
          },
          onLeaveBack: () => {
            // Reverse animation when scrolling back up
            gsap.to([aboutHeadline, aboutParagraph], {
              opacity: 1,
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
    <section ref={sectionRef} id="heroAbout" className={clsx(styles.heroAbout200vh, sharedStyles.gradientBottomTop)}> 
      <div id="hero" className={clsx(sharedStyles.container, styles.heroContent)}>
        <div ref={heroTextRef} className={styles.contentWrapper}>
          <h1 className={clsx(sharedStyles.displayText, styles.heroHeadline, sharedStyles.skew)}>
            <span className={styles.splitWord}>Build</span>
            <span className={styles.splitWord}>Cool</span>
            <span className={styles.splitWord}>Sh*t!</span>
          </h1>
        </div>
      </div>
      <div ref={tokenContainerRef} className={styles.tokenContainer}>
        <Canvas
          camera={{ 
            position: [0, 0, 10], 
            fov: 35,
            near: 0.1,
            far: 100 
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <Environment preset="city" />
            <RotatingToken groupRef={groupRef} onFloatAnimCreated={handleFloatAnimCreated} />
          </Suspense>
        </Canvas>
      </div>
      <div id="about" ref={aboutTextRef} className={clsx(sharedStyles.container, styles.aboutContent)}>
        <div className={styles.bioContent}>
          <h1 className={clsx(sharedStyles.displayText, styles.aboutHeadline)}>
            Hello <span className={styles.waveEmoji}>👋</span>
          </h1>
          <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>
            I'm Matt Trice, an ATL-based Product Designer with a track record of design leadership, embracing complex problems, and crafting elegant solutions that deliver meaningful business impact.
          </p>
        </div>
      </div>
    </section>
  );
}
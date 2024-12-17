'use client';

import styles from './FloatingShapes.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

interface FloatingShapeProps {
  src: string;
  className?: string;
  fromLeft?: boolean;
}

const FloatingShape = ({ src, className, fromLeft = true }: FloatingShapeProps) => {
  const shapeRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const ctx = gsap.context(() => {
      gsap.from(shapeRef.current, {
        x: fromLeft ? -100 : 100,
        opacity: 0,
        scrollTrigger: {
          trigger: shapeRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      } as gsap.TweenVars);
    });

    return () => ctx.revert();
  }, [fromLeft]);

  return (
    <div 
      ref={shapeRef}
      className={`${styles.floatingShape} ${className || ''}`}
    >
      <Image
        src={src}
        alt="Decorative shape"
        width={100}
        height={100}
        className={styles.shape}
      />
    </div>
  );
};

export default function FloatingShapes() {
  return (
    <div className={styles.shapesContainer}>
      <FloatingShape src="/shapes/circle.svg" className={styles.shape1} />
      <FloatingShape src="/shapes/square.svg" className={styles.shape2} fromLeft={false} />
      <FloatingShape src="/shapes/triangle.svg" className={styles.shape3} />
    </div>
  );
} 
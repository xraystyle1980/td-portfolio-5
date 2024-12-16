'use client';

import styles from './Hero.module.css';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Scene from '@/components/3d/Scene';
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const FloatingShape = ({ src, className, fromLeft = true }: { 
  src: string; 
  className: string;
  fromLeft?: boolean;
}) => {
  const { scrollYProgress } = useScroll();

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [fromLeft ? -200 : 200, 0]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5],
    [fromLeft ? -180 : 180, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.5, 1]
  );

  return (
    <motion.div 
      className={className}
      style={{ 
        x,
        rotate,
        scale,
        border: '2px solid red',
        background: 'rgba(255,0,0,0.1)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Image 
        src={src} 
        alt="Floating shape" 
        width={40} 
        height={40} 
        className={styles.shapeImage}
        onError={(e) => console.error('Image failed to load:', src)}
      />
    </motion.div>
  );
};

const MotionShape = ({ src, className }: { src: string; className: string }) => {
  const floatingAnimation = {
    y: {
      y: [0, -40, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div
      className={`${className} ${styles.motionShape}`}
      initial={{ scale: 0.5 }}
      animate={["y", "rotate"]}
      variants={floatingAnimation}
      whileHover={{
        scale: 2,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 15
        }
      }}
    >
      <Image 
        src={src} 
        alt="Motion floating shape" 
        width={40} 
        height={40} 
        className={styles.shapeImage}
        style={{ 
          filter: 'invert(12%) sepia(100%) saturate(5700%) hue-rotate(0deg) brightness(95%) contrast(115%)'
        }}
      />
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.contentSide}>
        <div className={styles.content}>
          <h1>Build cool shit.</h1>
          <p className={styles.heroText}>I'm Matt Trice, an Atlanta-based product designer. Let's work together and build cool shit.</p>
        </div>
        
        <div className={styles.shapes}>
          <FloatingShape src="/shapes/circle.svg" className={styles.shape1} fromLeft={true} />
          <FloatingShape src="/shapes/triangle.svg" className={styles.shape2} fromLeft={false} />
          <FloatingShape src="/shapes/square.svg" className={styles.shape3} fromLeft={true} />
          <MotionShape src="/shapes/circle.svg" className={styles.shape4} />
        </div>
      </div>

      <div className={styles.sceneSide}>
        <Scene />
      </div>
    </section>
  );
}

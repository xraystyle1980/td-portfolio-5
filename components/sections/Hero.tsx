'use client';

import styles from './Hero.module.css';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const FloatingShape = ({ src, className, fromLeft = true }: { 
  src: string; 
  className: string;
  fromLeft?: boolean;
}) => {
  const { scrollYProgress } = useScroll();

  const x = useTransform(
    scrollYProgress,
    [0, 0.3],
    [fromLeft ? -100 : 100, 0]
  );

  return (
    <motion.div 
      className={className}
      style={{ x }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 0.5 }}
    >
      <Image 
        src={src} 
        alt="Floating shape" 
        width={40} 
        height={40} 
        className={styles.shapeImage}
      />
    </motion.div>
  );
};

const MotionShape = ({ src, className }: { src: string; className: string }) => {
  const floatingAnimation = {
    y: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={`${className} ${styles.motionShape}`}
      initial={{ scale: 1 }}
      animate="y"
      variants={floatingAnimation}
      whileHover={{
        scale: 1.5,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
    >
      <Image 
        src={src} 
        alt="Motion floating shape" 
        width={40} 
        height={40} 
        className={styles.shapeImage}
        style={{ filter: 'invert(12%) sepia(100%) saturate(5700%) hue-rotate(0deg) brightness(95%) contrast(115%)' }}
      />
    </motion.div>
  );
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Welcome to My Site</h1>
        <p>Discover amazing things with floating shapes</p>
      </div>
      <div className={styles.shapes}>
        <FloatingShape src="/shapes/circle.svg" className={styles.shape1} fromLeft={true} />
        <FloatingShape src="/shapes/triangle.svg" className={styles.shape2} fromLeft={false} />
        <FloatingShape src="/shapes/square.svg" className={styles.shape3} fromLeft={true} />
        <MotionShape src="/shapes/circle.svg" className={styles.shape4} />
      </div>
    </section>
  );
}

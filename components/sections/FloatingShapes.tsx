'use client';

import styles from './FloatingShapes.module.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

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
      style={{ x, rotate, scale }}
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
      />
    </motion.div>
  );
};

export default function FloatingShapes() {
  return (
    <section className={styles.shapesSection}>
      <div className={styles.shapes}>
        <FloatingShape src="/shapes/circle.svg" className={styles.shape1} fromLeft={true} />
        <FloatingShape src="/shapes/triangle.svg" className={styles.shape2} fromLeft={false} />
        <FloatingShape src="/shapes/square.svg" className={styles.shape3} fromLeft={true} />
        <MotionShape src="/shapes/circle.svg" className={styles.shape4} />
      </div>
    </section>
  )
} 
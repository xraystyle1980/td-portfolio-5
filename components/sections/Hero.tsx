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
    <primitive 
      object={gltf.scene} 
      scale={1} 
      position={[0, 0, 0]} 
    />
  );
}

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Welcome to My Site</h1>
        <p>Discover amazing things with floating shapes</p>
      </div>
      
      {/* Original floating shapes */}
      <div className={styles.shapes}>
        <FloatingShape src="/shapes/circle.svg" className={styles.shape1} fromLeft={true} />
        <FloatingShape src="/shapes/triangle.svg" className={styles.shape2} fromLeft={false} />
        <FloatingShape src="/shapes/square.svg" className={styles.shape3} fromLeft={true} />
        <MotionShape src="/shapes/circle.svg" className={styles.shape4} />
      </div>
    </section>
  );
}

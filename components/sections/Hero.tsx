'use client';

import styles from './Hero.module.css';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const FloatingShape = ({ src, className }: { src: string; className: string }) => {
  return (
    <div className={className}>
      <Image 
        src={src} 
        alt="Floating shape" 
        width={40} 
        height={40} 
        className={styles.shapeImage}
      />
    </div>
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
        <FloatingShape src="/shapes/circle.svg" className={styles.shape1} />
        <FloatingShape src="/shapes/triangle.svg" className={styles.shape2} />
        <FloatingShape src="/shapes/square.svg" className={styles.shape3} />
      </div>
    </section>
  );
}

'use client';

import styles from './Hero.module.css';
import Scene from '@/components/3d/Scene';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Caveat } from 'next/font/google';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.contentSide}>
        <div className={styles.content}>
          <h1>
            Build cool shit.
          </h1>
          <p className={styles.heroText}>
            I'm Matt Trice, an Atlanta-based product designer. Let's work together and build{' '}
            <span 
              className={`${styles.highlight} ${caveat.className}`}
              aria-label="cool"
              role="text"
            >
              cool
              <span aria-hidden="true" className={styles.caret}>^</span>
            </span>
            {' '}shit.
          </p>
        </div>
      </div>
      <div className={styles.sceneSide}>
        <div className={styles.scene3d}>
          <Scene />
        </div>
      </div>
      <div className={styles.waveBorder} aria-hidden="true" />
    </section>
  )
}

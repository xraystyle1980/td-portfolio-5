'use client';

import styles from './Hero.module.css';
import Scene from '@/components/3d/Scene';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.contentSide}>
        <div className={styles.content}>
          <h1>
            Build cool<br />
            shit.
          </h1>
          <p className={styles.heroText}>
            I'm Matt Trice, an Atlanta-based product designer. Let's work together and build cool shit.
          </p>
        </div>
      </div>
      <div className={styles.sceneSide}>
        <div className={styles.scene3d}>
          <Scene />
        </div>
      </div>
    </section>
  )
}

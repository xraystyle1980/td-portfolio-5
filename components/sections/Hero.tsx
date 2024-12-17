'use client';

import styles from './Hero.module.css';
import Scene from '@/components/3d/Scene';
import { Caveat } from 'next/font/google';
import Navigation from '@/components/Navigation'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Navigation />
      <div className={styles.contentSide}>
        <div className={styles.content}>
          <div className={styles.logo}>
            Trice.Design
          </div>
          <h1>
            Build cool shit.
          </h1>
          <p className={styles.heroText}>
            I'm Matt Trice, an Atlanta-based product & web designer. Let's work together &{' '}
            <span className={styles.noBreak}>
              build{' '}
              <span 
                className={`${styles.highlight} ${caveat.className}`}
                aria-label="cool"
                role="text"
              >
                cool
                <span aria-hidden="true" className={styles.caret}>^</span>
              </span>
              {' '}shit
            </span>.
          </p>
        </div>
      </div>
      <div className={styles.sceneSide}>
        <div className={styles.scene3d}>
          <Scene />
        </div>
      </div>
      <img 
        src="/waveborder.svg"
        alt=""
        className={styles.waveBorder}
        aria-hidden="true"
      />
    </section>
  )
}

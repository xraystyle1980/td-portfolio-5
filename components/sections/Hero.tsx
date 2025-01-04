'use client';

import styles from './Hero.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import localFont from 'next/font/local'
import clsx from 'clsx'


const cooper = localFont({
  src: '../../public/fonts/Cooper-var.ttf',
  variable: '--font-cooper',
  preload: true
})

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const buildWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const initGSAP = async () => {
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      // Register plugins
      gsap.registerPlugin(ScrollTrigger)

      // Initialize GSAP defaults
      ScrollTrigger.defaults({
        markers: false
      })
    }

    initGSAP()
  }, [])

  return (
    <section id="hero" className={clsx(styles.hero, cooper.variable)}>
      <div className={clsx(sharedStyles.container, styles.heroContent)}>
          <div className={styles.content} ref={containerRef}>
              <h1 ref={headlineRef} className={clsx(sharedStyles.displayText, styles.heroHeadlineDisplay, styles.heroHeadline)}>
                <span ref={buildWordRef}>Build</span>
                <span>Cool</span>
                <span ref={wordRef}>Stuff</span>
              </h1>
          </div>
      </div>
    </section>
  )
}

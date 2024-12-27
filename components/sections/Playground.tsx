'use client'

import styles from './Playground.module.css'
import Link from 'next/link'

export default function Playground() {
  return (
    <section id="playground" className={styles.container}>
      <div className={styles.intro}>
        <h2 className={styles.title}>More Design</h2>
      </div>
      <div className={styles.experiments}>
        <Link href="/experiments" className={styles.experimentLink}>
          <div className={styles.experiment}>
            <h3 className={styles.experimentTitle}>3D Interactions</h3>
            <p className={styles.experimentText}>WebGL experiments with Three.js and React Three Fiber. Exploring creative ways to blend 3D graphics with web interfaces.</p>
          </div>
        </Link>
        <div className={styles.experiment}>
          <h3 className={styles.experimentTitle}>Creative Coding</h3>
          <p className={styles.experimentText}>Generative art and interactive animations using WebGL, Canvas, and SVG. Building unique visual experiences.</p>
        </div>
        <div className={styles.experiment}>
          <h3 className={styles.experimentTitle}>UI Experiments</h3>
          <p className={styles.experimentText}>Pushing the boundaries of web interfaces with experimental interactions and animations.</p>
        </div>
        <div className={styles.experiment}>
          <h3 className={styles.experimentTitle}>Design Systems</h3>
          <p className={styles.experimentText}>Building flexible and scalable design systems with modern web technologies.</p>
        </div>
      </div>
    </section>
  )
} 
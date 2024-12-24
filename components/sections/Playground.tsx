'use client'

import styles from './Playground.module.css'
import Link from 'next/link'

export default function Playground() {
  return (
    <div id="playground" className={styles.container}>
      <div className={styles.intro}>
        <h2 className={styles.title}>Playground</h2>
      </div>
      <div className={`${styles.experiments} experiments`}>
        <Link href="/experiments" className={styles.experimentLink}>
          <div className={styles.experiment}>
            <h3>3D Interactions</h3>
            <p>WebGL experiments with Three.js and React Three Fiber. Exploring creative ways to blend 3D graphics with web interfaces.</p>
          </div>
        </Link>
        <div className={styles.experiment}>
          <h3>Creative Coding</h3>
          <p>Generative art and interactive animations using WebGL, Canvas, and SVG. Building unique visual experiences.</p>
        </div>
        <div className={styles.experiment}>
          <h3>UI Experiments</h3>
          <p>Pushing the boundaries of web interfaces with experimental interactions and animations.</p>
        </div>
        <div className={styles.experiment}>
          <h3>Design Systems</h3>
          <p>Building flexible and scalable design systems with modern web technologies.</p>
        </div>
      </div>
    </div>
  )
} 
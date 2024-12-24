'use client'

import { useEffect, useRef } from 'react'
import styles from './Playground.module.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

export default function Playground() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
    }

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from(contentRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          toggleActions: 'play none none reverse'
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={styles.playground}>
      <div className={styles.container}>
        <h2 ref={headingRef}>Playground</h2>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.experiments}>
            <div className={styles.experiment}>
              <h3>3D Interactions</h3>
              <p>WebGL experiments with Three.js and React Three Fiber. Exploring creative ways to blend 3D graphics with web interfaces.</p>
            </div>
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
      </div>
    </section>
  )
} 
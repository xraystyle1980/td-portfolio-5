'use client'

import { useEffect, useRef } from 'react'
import styles from './UIDesign.module.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

export default function UIDesign() {
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
    <section ref={sectionRef} className={styles.uiDesign}>
      <div className={styles.container}>
        <h2 ref={headingRef}>UI Design</h2>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.gridItem}>
              <img src="/portfolio/sarcophagus_app--product1.png" alt="Frostbyte UI" />
            </div>
            <div className={styles.gridItem}>
              <img src="/portfolio/sarcophagus_app--product2.png" alt="Sarcophagus UI" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
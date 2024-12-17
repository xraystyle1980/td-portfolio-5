'use client'

import { useEffect, useRef } from 'react'
import styles from './Parallax.module.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

export default function Parallax() {
  const aboutRef = useRef(null)
  const contactRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
    }

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set('.aboutShape', { y: 100, opacity: 0 })
      gsap.set('.contactShape', { y: 100, opacity: 0 })

      // About section shapes
      gsap.to('.aboutShape', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
          markers: true,
          toggleActions: 'play none none reverse'
        }
      }, aboutRef.current)

      // Contact section shapes
      gsap.to('.contactShape', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '#contact',
          start: 'top bottom',
          end: 'top center',
          scrub: 1,
          markers: true,
          toggleActions: 'play none none reverse'
        }
      }, contactRef.current)
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <div ref={aboutRef} className={styles.aboutShapes}>
        <div className={`${styles.shape} ${styles.aboutShape} aboutShape`}></div>
        <div className={`${styles.shape} ${styles.aboutShape} aboutShape`}></div>
        <div className={`${styles.shape} ${styles.aboutShape} aboutShape`}></div>
      </div>
      <div ref={contactRef} className={styles.contactShapes}>
        <div className={`${styles.shape} ${styles.contactShape} contactShape`}></div>
        <div className={`${styles.shape} ${styles.contactShape} contactShape`}></div>
        <div className={`${styles.shape} ${styles.contactShape} contactShape`}></div>
      </div>
    </>
  )
} 
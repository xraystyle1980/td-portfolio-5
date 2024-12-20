'use client'

import styles from './AboutMe.module.css'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Parallax from '../Parallax'

export default function AboutMe() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const content = contentRef.current

    const ctx = gsap.context(() => {
      gsap.from(heading, {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 50,
        duration: 1
      })

      gsap.from(content, {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className={styles.aboutMe}>
      <div className={styles.container}>
        <h2 ref={headingRef}>About Me</h2>
        <div ref={contentRef} className={styles.content}>
          <p className={styles.heroText}>
            I'm Matt Trice, an Atlanta-based product & web designer. Let's work together & build cool stuff.
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </div>
      <div className={styles.shapesContainer}>
        <Parallax />
      </div>
    </section>
  )
} 
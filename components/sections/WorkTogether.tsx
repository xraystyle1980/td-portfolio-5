'use client'

import styles from './WorkTogether.module.css'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

export default function WorkTogether() {
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
        x: -50,
        duration: 1
      })

      gsap.from(content, {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -30,
        duration: 1,
        delay: 0.3
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className={styles.workTogether}>
      <div className={styles.container}>
        <h2 ref={headingRef}>Let's Work Together</h2>
        <div ref={contentRef} className={styles.content}>
          <p>Ready to start a project? Let's talk about your ideas and make them reality.</p>
        </div>
      </div>
    </section>
  )
} 
'use client'

import { useEffect, useRef } from 'react'
import styles from './Project.module.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

interface ProjectProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  inverted?: boolean
  index?: number
}

export default function Project({ title, description, imageSrc, imageAlt, inverted = false, index = 0 }: ProjectProps) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
    }

    const ctx = gsap.context(() => {
      const baseDelay = index * 0.1

      gsap.from(contentRef.current, {
        x: inverted ? 100 : -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: index ? 1 : false,
          toggleActions: 'play none none reverse'
        }
      })

      gsap.from(imageRef.current, {
        x: inverted ? -100 : 100,
        opacity: 0,
        duration: 1,
        delay: 0.2 + baseDelay,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: index ? 1 : false,
          toggleActions: 'play none none reverse'
        }
      })
    })

    return () => ctx.revert()
  }, [inverted, index])

  return (
    <section ref={sectionRef} className={`${styles.project} ${inverted ? styles.inverted : ''}`}>
      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div ref={imageRef} className={styles.imageContainer}>
          <img src={imageSrc} alt={imageAlt} />
        </div>
      </div>
    </section>
  )
} 
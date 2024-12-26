'use client'

import { useEffect, useRef } from 'react'
import styles from './Project.module.css'
import gsap from 'gsap'

interface ProjectProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  inverted?: boolean
  index?: number
}

export default function Project({ 
  title, 
  description, 
  imageSrc, 
  imageAlt,
  inverted = false,
  index = 0 
}: ProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      // Register plugins
      gsap.registerPlugin(ScrollTrigger)

      if (!containerRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom-=100',
          end: 'bottom top+=100',
          toggleActions: 'play none none reverse'
        }
      })

      tl.from(containerRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out'
      })
    }

    initGSAP()
  }, [index])

  return (
    <div 
      ref={containerRef}
      className={`${styles.project} ${inverted ? styles.inverted : ''}`}
    >
      <div className={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={imageAlt} />
      </div>
    </div>
  )
} 
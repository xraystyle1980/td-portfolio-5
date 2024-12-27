'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState, useRef } from 'react'
import styles from '../playground.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
import { SplitText } from 'gsap/dist/SplitText'

// Define interface for Scene3D props
interface Scene3DProps {
  scroll: number
  currentSection: number
}

// Dynamically import Three.js components with no SSR
const Scene3D = dynamic<Scene3DProps>(() => import('../Scene3D'), { 
  ssr: false 
})

// Create Sections component if missing
const Sections = dynamic(() => import('../Sections'), {
  ssr: true
})

export default function FlyAroundPage() {
  const [scroll, setScroll] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const smoothWrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

      let smoother = ScrollSmoother.create({
        wrapper: smoothWrapperRef.current,
        content: contentRef.current,
        smooth: 1.5,
        normalizeScroll: true,
        ignoreMobileResize: true,
        effects: true,
        onUpdate: (self) => {
          const progress = self.progress
          setScroll(progress)
          setCurrentSection(Math.floor(progress * 6))
        }
      })

      // Initialize text animations
      if (headingRef.current) {
        const splitText = new SplitText(headingRef.current, { 
          type: "words,chars",
          linesClass: "split-line"
        })

        // Animate each character with a stagger
        gsap.from(splitText.chars, {
          opacity: 0,
          y: 100,
          rotateX: -90,
          stagger: 0.02,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top center+=20%",
            toggleActions: "play none none reverse"
          }
        })

        // Apply scroll speed effects to all sections
        document.querySelectorAll('.section').forEach((section, i) => {
          // Create alternating scroll speeds
          const speed = i % 2 === 0 ? 0.8 : 1.2
          smoother.effects(section, { speed })

          // Add staggered parallax to section content
          const elements = section.querySelectorAll('h2, p')
          elements.forEach((el, j) => {
            smoother.effects(el, { 
              speed: speed + (j * 0.1),
              lag: (j + 1) * 0.15
            })
          })
        })
      }

      return () => {
        smoother && smoother.kill()
      }
    }
  }, [])

  return (
    <div className={styles.pageWrapper}>
      {/* 3D Scene Container */}
      <div className={styles.canvasContainer}>
        <Scene3D 
          scroll={scroll} 
          currentSection={currentSection} 
        />
      </div>

      {/* Scroll Container */}
      <div 
        id="smooth-wrapper" 
        ref={smoothWrapperRef} 
        className={styles.smoothWrapper}
      >
        <div id="smooth-content" ref={contentRef} className={styles.smoothContent}>
          <main className={styles.main}>
            <Sections headingRef={headingRef} />
          </main>
        </div>
      </div>
    </div>
  )
} 
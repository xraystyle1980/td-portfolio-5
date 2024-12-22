'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState, useRef } from 'react'
import styles from './page.module.css'
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
const Scene3D = dynamic<Scene3DProps>(() => import('./Scene3D'), { 
  ssr: false 
})

export default function HomePage() {
  const [scroll, setScroll] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const smoothWrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)

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
          setCurrentSection(Math.floor(progress * 5))
        }
      })

      // Setup word swap animation
      if (wordRef.current) {
        const word = wordRef.current
        let isAnimating = false
        let currentAnimation: gsap.core.Tween | null = null
        
        const handleMouseEnter = () => {
          if (isAnimating) return
          isAnimating = true
          
          // Kill any existing animation
          if (currentAnimation) currentAnimation.kill()
          
          currentAnimation = gsap.to(word, {
            keyframes: [
              { opacity: 0, y: -20, duration: 0.2 },
              { opacity: 0, y: 20, duration: 0, onComplete: () => { word.textContent = 'shit' } },
              { opacity: 1, y: 0, duration: 0.2 }
            ],
            ease: 'power2.inOut',
            onComplete: () => {
              isAnimating = false
            }
          })
        }

        const handleMouseLeave = () => {
          if (isAnimating) return
          isAnimating = true
          
          // Kill any existing animation
          if (currentAnimation) currentAnimation.kill()
          
          currentAnimation = gsap.to(word, {
            keyframes: [
              { opacity: 0, y: 20, duration: 0.2 },
              { opacity: 0, y: -20, duration: 0, onComplete: () => { word.textContent = 'stuff' } },
              { opacity: 1, y: 0, duration: 0.2 }
            ],
            ease: 'power2.inOut',
            onComplete: () => {
              isAnimating = false
            }
          })
        }

        word.addEventListener('mouseenter', handleMouseEnter)
        word.addEventListener('mouseleave', handleMouseLeave)

        return () => {
          smoother && smoother.kill()
          if (currentAnimation) currentAnimation.kill()
          word.removeEventListener('mouseenter', handleMouseEnter)
          word.removeEventListener('mouseleave', handleMouseLeave)
        }
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
            {/* Hero Section */}
            <section id="hero" className={styles.section}>
              <div className={styles.heroContent}>
                <h1 ref={headingRef} className={styles.mainHeading}>
                  Build
                  <br />
                  Cool
                  <br />
                  <span 
                    ref={wordRef}
                    className={styles.swapWord}
                  >
                    stuff
                  </span>
                </h1>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className={styles.section}>
              <div className={styles.sectionContent}>
                <h2 className={styles.sectionHeading}>About</h2>
                <p className={styles.sectionText}>
                  I'm Matt Trice, an Atlanta-based product & web designer. 
                  Let's work together & build cool shit.
                </p>
              </div>
            </section>

            {/* Work Section */}
            <section id="work" className={styles.section}>
              <div className={styles.sectionContent}>
                <h2 className={styles.sectionHeading}>Work</h2>
                <div className={styles.workGrid}>
                  {/* Work items will go here */}
                </div>
              </div>
            </section>

            {/* Playground Section */}
            <section id="playground" className={styles.section}>
              <div className={styles.sectionContent}>
                <h2 className={styles.sectionHeading}>Playground</h2>
                <div className={styles.playgroundGrid}>
                  {/* Playground items will go here */}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className={styles.section}>
              <div className={styles.sectionContent}>
                <h2 className={styles.sectionHeading}>Let's Create</h2>
                <p className={styles.sectionText}>Ready to bring your ideas to life?</p>
                <button className={styles.button}>Get Started</button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

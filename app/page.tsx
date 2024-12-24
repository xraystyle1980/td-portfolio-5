'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState, useRef } from 'react'
import styles from './page.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
import { SplitText } from 'gsap/dist/SplitText'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import AboutMe from '@/components/sections/AboutMe'
import Work from '@/components/sections/Work'
import Playground from '@/components/sections/Playground'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)

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
  const buildWordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!wordRef.current || !buildWordRef.current) return

    // Setup word swap animation for "Stuff/Shit"
    const word = wordRef.current
    const buildWord = buildWordRef.current
    let currentAnimation: gsap.core.Tween | null = null
    let buildAnimation: gsap.core.Tween | null = null
    
    // Build/Make swap handlers
    const handleBuildMouseEnter = () => {
      if (buildAnimation) buildAnimation.kill()
      buildAnimation = gsap.to(buildWord, {
        opacity: 0,
        y: -20,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          buildWord.textContent = 'Make'
          gsap.to(buildWord, {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2.out'
          })
        }
      })
    }

    const handleBuildMouseLeave = () => {
      if (buildAnimation) buildAnimation.kill()
      buildAnimation = gsap.to(buildWord, {
        opacity: 0,
        y: 20,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          buildWord.textContent = 'Build'
          gsap.to(buildWord, {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2.out'
          })
        }
      })
    }

    // Stuff/Shit swap handlers
    const handleMouseEnter = () => {
      if (currentAnimation) currentAnimation.kill()
      currentAnimation = gsap.to(word, {
        opacity: 0,
        y: -20,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          word.textContent = 'Shit'
          gsap.to(word, {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2.out'
          })
        }
      })
    }

    const handleMouseLeave = () => {
      if (currentAnimation) currentAnimation.kill()
      currentAnimation = gsap.to(word, {
        opacity: 0,
        y: 20,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          word.textContent = 'Stuff'
          gsap.to(word, {
            opacity: 1,
            y: 0,
            duration: 0.15,
            ease: 'power2.out'
          })
        }
      })
    }

    // Add event listeners
    word.addEventListener('mouseenter', handleMouseEnter)
    word.addEventListener('mouseleave', handleMouseLeave)
    buildWord.addEventListener('mouseenter', handleBuildMouseEnter)
    buildWord.addEventListener('mouseleave', handleBuildMouseLeave)

    return () => {
      if (currentAnimation) currentAnimation.kill()
      if (buildAnimation) buildAnimation.kill()
      word.removeEventListener('mouseenter', handleMouseEnter)
      word.removeEventListener('mouseleave', handleMouseLeave)
      buildWord.removeEventListener('mouseenter', handleBuildMouseEnter)
      buildWord.removeEventListener('mouseleave', handleBuildMouseLeave)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize ScrollSmoother
      let smoother = ScrollSmoother.create({
        wrapper: smoothWrapperRef.current,
        content: contentRef.current,
        smooth: 1,
        normalizeScroll: false,
        ignoreMobileResize: true,
        effects: true,
        smoothTouch: 0,
        onUpdate: (self) => {
          const progress = self.progress
          setScroll(progress)
          setCurrentSection(Math.floor(progress * 5))
        }
      })

      // Setup work section animation
      const workTrigger = ScrollTrigger.create({
        trigger: '#work',
        start: 'top 70%',
        once: true,
        id: 'work-content-reveal',
        onEnter: () => {
          const projectElements = document.querySelectorAll('.projects > *')
          if (projectElements.length > 0) {
            gsap.fromTo(projectElements, 
              { autoAlpha: 0, y: 100 },
              { 
                autoAlpha: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
              }
            )
          }
        }
      })

      return () => {
        smoother && smoother.kill()
        workTrigger.kill()
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
                  <span ref={buildWordRef} className={styles.swapWord}>Build</span>
                  <br />
                  Cool
                  <br />
                  <span ref={wordRef} className={styles.swapWord}>Stuff</span>
                </h1>
              </div>
            </section>

            {/* About Section */}
            <Suspense fallback={null}>
              <AboutMe />
            </Suspense>

            {/* Work Section */}
            <Work />

            {/* Playground Section */}
            <Playground />

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

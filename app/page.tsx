'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState, useRef } from 'react'
import styles from './page.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
import { SplitText } from 'gsap/dist/SplitText'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import Hero from '@/components/sections/Hero'
import AboutMe from '@/components/sections/AboutMe'
import Work from '@/components/sections/Work'
import Playground from '@/components/sections/Playground'
import UIDesign from '@/components/sections/UIDesign'

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
            <Hero />

            {/* About Section */}
            <Suspense fallback={null}>
              <AboutMe />
            </Suspense>

            {/* Work Section */}
            <Work />

            {/* Playground Section */}
            <Playground />

            {/* UI Design Section */}
            <UIDesign />

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

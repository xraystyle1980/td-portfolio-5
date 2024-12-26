'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState, useRef } from 'react'
import styles from './page.module.css'
import gsap from 'gsap'
import Hero from '@/components/sections/Hero'
import AboutMe from '@/components/sections/AboutMe'
import Work from '@/components/sections/Work'
import Playground from '@/components/sections/Playground'
import UIDesign from '@/components/sections/UIDesign'

// Define interface for Scene3D props
interface Scene3DProps {
  scroll: number
  currentSection: number
}

// Dynamically import Three.js components with no SSR
const Scene3D = dynamic<Scene3DProps>(() => import('./Scene3D'), { 
  ssr: false 
})

interface ScrollSmootherInstance {
  progress: number
  kill: () => void
}

export default function HomePage() {
  const [scroll, setScroll] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const smoothWrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    let ctx = gsap.context(() => {
      const initGSAP = async () => {
        try {
          // Import GSAP plugins
          const ScrollTrigger = (await import('@gsap/shockingly/ScrollTrigger')).default
          const ScrollSmoother = (await import('@gsap/shockingly/ScrollSmoother')).default
          const SplitText = (await import('@gsap/shockingly/SplitText')).default
          const ScrollToPlugin = (await import('@gsap/shockingly/ScrollToPlugin')).default

          // Register plugins
          gsap.registerPlugin(
            ScrollTrigger,
            ScrollSmoother,
            SplitText,
            ScrollToPlugin
          )

          // Initialize ScrollSmoother
          if (smoothWrapperRef.current && contentRef.current) {
            const smoother = ScrollSmoother.create({
              smooth: 1,
              effects: true,
              normalizeScroll: true,
              smoothTouch: 0.1,
              wrapper: smoothWrapperRef.current,
              content: contentRef.current,
              onUpdate: (self: ScrollSmootherInstance) => {
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
              smoother.kill()
              workTrigger.kill()
            }
          }
        } catch (error) {
          console.error('Error initializing GSAP:', error)
        }
      }

      initGSAP()
    })

    return () => ctx.revert()
  }, [isClient])

  if (!isClient) {
    return null // or a loading state
  }

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
        <div 
          id="smooth-content" 
          ref={contentRef} 
          className={styles.smoothContent}
        >
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

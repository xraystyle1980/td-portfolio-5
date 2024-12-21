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
            <section className={styles.section}>
              <h1 ref={headingRef} className={styles.mainHeading}>
                Build
                <br />
                Cool
                <br />
                Shit
              </h1>
            </section>

            <section className={styles.section}>
              <h2 data-speed="0.5">Innovation</h2>
              <p data-speed="0.8">Pushing the boundaries of what's possible in web development</p>
            </section>

            <section className={styles.section}>
              <h2 data-speed="0.5">Technology</h2>
              <p data-speed="0.8">Using cutting-edge tools to create immersive experiences</p>
            </section>

            <section className={styles.section}>
              <h2 data-speed="0.5">Design</h2>
              <p data-speed="0.8">Crafting beautiful and functional digital experiences</p>
            </section>

            <section className={styles.section}>
              <h2 data-speed="0.5">Interaction</h2>
              <p data-speed="0.8">Building engaging and responsive user interfaces</p>
            </section>

            <section className={styles.section}>
              <h2 data-speed="0.5">Let's Create</h2>
              <p data-speed="0.8">Ready to bring your ideas to life?</p>
              <button className={styles.button} data-speed="1.2">Get Started</button>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

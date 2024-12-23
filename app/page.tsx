'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useState, useRef } from 'react'
import styles from './page.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
import { SplitText } from 'gsap/dist/SplitText'
import AboutMe from '../components/sections/AboutMe'

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
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null)
  const aboutTextRef = useRef<HTMLParagraphElement>(null)
  const buildWordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)
      
      // Set default markers to false
      ScrollTrigger.defaults({
        markers: false
      })

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

      // Setup about section animation
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top 70%',
        once: true,
        id: 'about-content-reveal',
        onEnter: () => {
          const tl = gsap.timeline({
            defaults: {
              duration: 1,
              ease: 'power3.out'
            }
          })

          if (aboutContentRef.current && aboutHeadingRef.current && aboutTextRef.current) {
            tl.to(aboutContentRef.current, {
              opacity: 1,
              duration: 0.6
            })
            .to(aboutHeadingRef.current, {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: 'elastic.out(1, 0.75)'
            }, '-=0.3')
            .to(aboutTextRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out'
            }, '-=0.6')
          }
        }
      })

      const cleanupFunctions: (() => void)[] = []

      // Setup word swap animation for "Stuff/Shit"
      if (wordRef.current) {
        const word = wordRef.current
        let currentAnimation: gsap.core.Tween | null = null
        
        const handleMouseEnter = () => {
          if (currentAnimation) {
            currentAnimation.kill()
          }
          
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
          if (currentAnimation) {
            currentAnimation.kill()
          }
          
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

        word.addEventListener('mouseenter', handleMouseEnter)
        word.addEventListener('mouseleave', handleMouseLeave)

        cleanupFunctions.push(() => {
          if (currentAnimation) currentAnimation.kill()
          word.removeEventListener('mouseenter', handleMouseEnter)
          word.removeEventListener('mouseleave', handleMouseLeave)
        })
      }

      // Setup word swap animation for "Build/Make"
      if (buildWordRef.current) {
        const buildWord = buildWordRef.current
        let buildAnimation: gsap.core.Tween | null = null
        
        const handleBuildMouseEnter = () => {
          if (buildAnimation) {
            buildAnimation.kill()
          }
          
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
          if (buildAnimation) {
            buildAnimation.kill()
          }
          
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

        buildWord.addEventListener('mouseenter', handleBuildMouseEnter)
        buildWord.addEventListener('mouseleave', handleBuildMouseLeave)

        cleanupFunctions.push(() => {
          if (buildAnimation) buildAnimation.kill()
          buildWord.removeEventListener('mouseenter', handleBuildMouseEnter)
          buildWord.removeEventListener('mouseleave', handleBuildMouseLeave)
        })
      }

      return () => {
        smoother && smoother.kill()
        cleanupFunctions.forEach(cleanup => cleanup())
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
            <AboutMe />

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
                <a href="/playground" className={styles.button}>View Playground</a>
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

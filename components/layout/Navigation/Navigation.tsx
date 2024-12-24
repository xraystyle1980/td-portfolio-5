'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './Navigation.module.css'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
}

// Declare ScrollSmoother type
declare global {
  interface Window {
    ScrollSmoother?: {
      get(): {
        scrollTo(target: HTMLElement | string | number, smooth?: boolean): void
      }
    }
  }
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const logoRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<ScrollTrigger>()

  useEffect(() => {
    // Wait for DOM to be ready
    const initAnimation = () => {
      if (!logoRef.current) {
        console.log('No logo ref')
        return
      }

      const headline = document.querySelector('#hero h1')
      if (!headline) {
        console.log('No headline found')
        return
      }

      console.log('Setting up logo animation')
      const headlineBounds = headline.getBoundingClientRect()
      const startY = headlineBounds.top - 95 // Start above the headline

      console.log('Initial position:', { startY })

      // Set initial position
      gsap.set(logoRef.current, {
        y: startY,
        fontSize: '4rem'
      })

      // Timeline for nav animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: '+=200',
          scrub: 1,
          markers: true, // Add markers for debugging
          onEnter: () => console.log('ScrollTrigger: Enter'),
          onLeave: () => console.log('ScrollTrigger: Leave'),
          onEnterBack: () => console.log('ScrollTrigger: Enter Back'),
          onLeaveBack: () => {
            console.log('ScrollTrigger: Leave Back')
            // Return to hero position
            stRef.current?.disable()
            gsap.to(logoRef.current, {
              fontSize: '4rem',
              y: startY,
              duration: 0.3,
              ease: 'power2.inOut'
            })
            stRef.current?.enable()
          }
        }
      })

      // Animation to nav position
      tl.to(logoRef.current, {
        fontSize: '2rem',
        y: 0,
        ease: 'power2.inOut',
        onStart: () => console.log('Animation started'),
        onComplete: () => console.log('Animation completed')
      })

      // Store ScrollTrigger instance
      stRef.current = ScrollTrigger.getById(tl.scrollTrigger?.toString() || '')
      console.log('ScrollTrigger created:', stRef.current)
    }

    // Initialize after a short delay to ensure everything is ready
    setTimeout(initAnimation, 100)

    return () => {
      if (stRef.current) {
        console.log('Cleaning up ScrollTrigger')
        stRef.current.kill()
      }
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const smoother = window.ScrollSmoother?.get()
      if (smoother) {
        smoother.scrollTo(section, true)
      } else {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: section, offsetY: 0 },
          ease: "power3.inOut"
        })
      }
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <div 
          ref={logoRef}
          className={styles.logo}
          onClick={() => scrollToSection('hero')}
        >
          Trice.Design
        </div>
        <div className={`${styles.links} ${isMenuOpen ? styles.open : ''}`}>
          <button 
            className={styles.link}
            onClick={() => scrollToSection('about')}
          >
            About
          </button>
          <button 
            className={styles.link}
            onClick={() => scrollToSection('work')}
          >
            Work
          </button>
          <button 
            className={styles.link}
            onClick={() => scrollToSection('playground')}
          >
            Playground
          </button>
          <button 
            className={styles.link}
            onClick={() => scrollToSection('contact')}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
} 
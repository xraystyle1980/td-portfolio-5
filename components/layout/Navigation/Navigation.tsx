'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './Navigation.module.css'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

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
    if (!logoRef.current) return

    const headline = document.querySelector('#hero h1')
    if (!headline) return

    const headlineBounds = headline.getBoundingClientRect()
    const startY = headlineBounds.top - 100 // 100px above headline

    // Set initial state
    gsap.set(logoRef.current, {
      fontSize: '4rem',
      top: startY,
      yPercent: 0,
      zIndex: 1000
    })

    // Timeline for nav animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=50',
        scrub: 0.1,
        onLeaveBack: () => {
          // Instantly return to hero position
          stRef.current?.disable()
          gsap.set(logoRef.current, {
            fontSize: '4rem',
            top: startY
          })
          stRef.current?.enable()
        }
      }
    })

    // Animation to nav position
    tl.to(logoRef.current, {
      fontSize: '1.75rem',
      top: '1.5rem',
      ease: 'none'
    })

    // Store ScrollTrigger instance
    stRef.current = ScrollTrigger.getById(tl.scrollTrigger?.toString() || '')

    return () => {
      stRef.current?.kill()
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
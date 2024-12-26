'use client'

import { useState, useRef } from 'react'
import styles from './Navigation.module.css'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin)
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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const smoother = window.ScrollSmoother?.get()
      if (smoother) {
        smoother.scrollTo(section, false)
      } else {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: section, offsetY: 0 },
          ease: "power2.out"
        })
      }
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <div 
          className={styles.logo}
          onClick={() => scrollToSection('hero')}
        >
          Trice.Design
        </div>
        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
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
            onClick={() => scrollToSection('product-design')}
          >
            Product Design
          </button>
          <button 
            className={styles.link}
            onClick={() => scrollToSection('writing')}
          >
            Writing
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
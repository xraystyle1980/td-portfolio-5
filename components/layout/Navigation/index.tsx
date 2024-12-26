'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './Navigation.module.css'
import gsap from 'gsap'

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
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { default: ScrollToPlugin } = await import('gsap/ScrollToPlugin')
      
      // Register plugins
      gsap.registerPlugin(ScrollToPlugin)
    }

    initGSAP()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const smoother = window.ScrollSmoother?.get()
    if (smoother) {
      smoother.scrollTo(`#${sectionId}`, true)
    } else {
      gsap.to(window, {
        duration: 1,
        scrollTo: `#${sectionId}`,
        ease: 'power2.inOut'
      })
    }
    setIsOpen(false)
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
          className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`${styles.links} ${isOpen ? styles.open : ''}`}>
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
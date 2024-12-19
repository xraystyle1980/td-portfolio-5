'use client'

import { useEffect, useState } from 'react'
import styles from './Navigation.module.css'
import heroStyles from './sections/Hero.module.css'

export default function Navigation() {
  const [showLogo, setShowLogo] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const heroLogo = document.querySelector(`.${heroStyles.logo}`)
    if (!heroLogo) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowLogo(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: '-80px 0px 0px 0px'
      }
    )

    observer.observe(heroLogo)
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <button 
          className={`${styles.navLogo} ${showLogo ? styles.visible : ''}`}
          onClick={scrollToTop}
        >
          Trice.Design
        </button>
        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
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
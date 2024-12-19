'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './Navigation.module.css'
import heroStyles from './sections/Hero.module.css'
import gsap from 'gsap'

export default function Navigation() {
  const [showLogo, setShowLogo] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const logoRef = useRef(null)

  useEffect(() => {
    const heroLogo = document.querySelector(`.${heroStyles.logo}`)
    if (!heroLogo) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShowLogo(false), 50)
        } else {
          setShowLogo(true)
        }
      },
      {
        threshold: 0,
        rootMargin: '-80px 0px 0px 0px'
      }
    )

    observer.observe(heroLogo)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!logoRef.current) return

    if (showLogo) {
      gsap.set(logoRef.current, { visibility: 'visible' })
      gsap.fromTo(logoRef.current,
        {
          y: -20,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.15,
          ease: "back.out(3)",
        }
      )
    } else {
      gsap.to(logoRef.current, {
        y: -15,
        opacity: 0,
        scale: 0.95,
        duration: 0.1,
        ease: "back.in(2)",
        onComplete: () => {
          gsap.set(logoRef.current, { visibility: 'hidden' })
        }
      })
    }
  }, [showLogo])

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
          ref={logoRef}
          className={styles.navLogo}
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
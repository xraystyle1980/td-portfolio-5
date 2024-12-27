'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './Navigation.module.css'
import gsap from 'gsap'
import { usePathname, useRouter } from 'next/navigation'

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
  const pathname = usePathname()
  const router = useRouter()

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

  const handleLogoClick = async () => {
    if (pathname === '/') {
      // If on home page, scroll to top
      scrollToSection('hero')
    } else {
      // If on any other page, navigate to home and scroll to top
      await router.push('/')
      window.scrollTo(0, 0)
      const smoother = window.ScrollSmoother?.get()
      if (smoother) {
        smoother.scrollTo(0, true)
      }
    }
    setIsOpen(false)
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <div 
          className={styles.logo}
          onClick={handleLogoClick}
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
            onClick={async () => {
              if (pathname === '/') {
                scrollToSection('about')
              } else {
                await router.push('/')
                window.scrollTo(0, 0)
                const smoother = window.ScrollSmoother?.get()
                if (smoother) {
                  smoother.scrollTo('#about', true)
                }
              }
            }}
          >
            About
          </button>
          <button 
            className={styles.link}
            onClick={async () => {
              if (pathname === '/') {
                scrollToSection('work')
              } else {
                await router.push('/')
                window.scrollTo(0, 0)
                const smoother = window.ScrollSmoother?.get()
                if (smoother) {
                  smoother.scrollTo('#work', true)
                }
              }
            }}
          >
            Work
          </button>
          <button 
            className={styles.link}
            onClick={async () => {
              if (pathname === '/') {
                scrollToSection('playground')
              } else {
                await router.push('/')
                window.scrollTo(0, 0)
                const smoother = window.ScrollSmoother?.get()
                if (smoother) {
                  smoother.scrollTo('#playground', true)
                }
              }
            }}
          >
            More Design
          </button>
          <button 
            className={styles.link}
            onClick={async () => {
              if (pathname === '/') {
                scrollToSection('contact')
              } else {
                await router.push('/')
                window.scrollTo(0, 0)
                const smoother = window.ScrollSmoother?.get()
                if (smoother) {
                  smoother.scrollTo('#contact', true)
                }
              }
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
} 
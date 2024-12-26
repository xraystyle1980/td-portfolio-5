'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './layout.module.css'

interface ScrollSmootherInstance {
  progress: number
  kill: () => void
}

export default function ClientLayout({
  children
}: {
  children: React.ReactNode
}) {
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
          const ScrollTrigger = (await import('gsap/ScrollTrigger')).default
          const ScrollSmoother = (await import('gsap/ScrollSmoother')).default
          const SplitText = (await import('gsap/SplitText')).default
          const ScrollToPlugin = (await import('gsap/ScrollToPlugin')).default

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
                // Update scroll position for 3D scene
                const progress = self.progress || 0
                // Dispatch custom event for page component
                window.dispatchEvent(new CustomEvent('scroll-progress', { 
                  detail: { 
                    progress,
                    section: Math.floor(progress * 5)
                  }
                }))
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
    return null
  }

  return (
    <div className={styles.pageWrapper}>
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
          {children}
        </div>
      </div>
    </div>
  )
} 
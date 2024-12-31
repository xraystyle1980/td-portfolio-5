'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './layout.module.css'
import { usePathname } from 'next/navigation'

interface ScrollSmootherInstance {
  progress: number
  kill: () => void
  scrollTo: (target: string | number, smooth?: boolean) => void
  paused: (paused: boolean) => void
}

export default function ClientLayout({
  children
}: {
  children: React.ReactNode
}) {
  const smoothWrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const pathname = usePathname()
  const smootherRef = useRef<ScrollSmootherInstance | null>(null)

  // Set client-side flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize GSAP and ScrollSmoother
  useEffect(() => {
    if (!isClient) return

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
          // Kill existing instance if it exists
          if (smootherRef.current) {
            smootherRef.current.kill()
          }

          // Wait for content to be ready
          await new Promise(resolve => setTimeout(resolve, 100))

          const smoother = ScrollSmoother.create({
            smooth: 1,
            effects: true,
            normalizeScroll: true,
            smoothTouch: 0.1,
            ignoreMobileResize: true,
            wrapper: smoothWrapperRef.current,
            content: contentRef.current,
            onUpdate: (self: ScrollSmootherInstance) => {
              // Update scroll position for 3D scene
              const progress = self.progress || 0
              window.dispatchEvent(new CustomEvent('scroll-progress', { 
                detail: { 
                  progress,
                  section: Math.floor(progress * 5)
                }
              }))
            }
          })

          // Store smoother instance in ref
          smootherRef.current = smoother

          // Mark as ready after initialization
          setIsReady(true)

          return () => {
            smoother.kill()
          }
        }
      } catch (error) {
        console.error('Error initializing GSAP:', error)
      }
    }

    initGSAP()
  }, [isClient])

  // Handle pathname changes
  useEffect(() => {
    if (!isClient || !isReady) return

    const resetState = async () => {
      // Kill all existing ScrollTriggers
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())

      // Reset scroll position
      window.scrollTo(0, 0)

      // Reset ScrollSmoother
      if (smootherRef.current) {
        smootherRef.current.scrollTo(0, false)
      }

      // Reset scene state by dispatching a reset event
      window.dispatchEvent(new CustomEvent('scene-reset'))

      // Re-enable ScrollSmoother after a brief delay
      setTimeout(() => {
        if (smootherRef.current) {
          smootherRef.current.paused(false)
        }
      }, 100)
    }

    resetState()
  }, [pathname, isClient, isReady])

  // Don't render until client-side
  if (!isClient) return null

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
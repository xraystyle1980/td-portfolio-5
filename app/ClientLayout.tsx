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
  const pathname = usePathname()
  const smootherRef = useRef<ScrollSmootherInstance | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Wait for next frame to ensure DOM is ready
    requestAnimationFrame(() => {
      // Force immediate scroll to top
      window.scrollTo(0, 0)

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
                  // Dispatch custom event for page component
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

              // Force scroll position after initialization
              window.scrollTo(0, 0)
              smoother.scrollTo(0, false)

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
    })
  }, [isClient])

  // Reset scroll position when pathname changes
  useEffect(() => {
    if (!isClient) return

    // Force immediate scroll to top
    window.scrollTo(0, 0)

    // Wait for next frame then handle smooth scroller
    requestAnimationFrame(() => {
      if (smootherRef.current) {
        smootherRef.current.paused(true)
        window.scrollTo(0, 0)
        smootherRef.current.scrollTo(0, false)
        requestAnimationFrame(() => {
          smootherRef.current?.paused(false)
        })
      }
    })
  }, [pathname, isClient])

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
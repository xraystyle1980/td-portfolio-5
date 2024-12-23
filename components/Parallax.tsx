'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

export default function Parallax() {
  const parallaxRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger)
    
    // Wait for DOM to be ready
    const initParallax = () => {
      const aboutSection = document.getElementById('about')
      if (!aboutSection || !parallaxRef.current) return;

      const ctx = gsap.context(() => {
        gsap.to(parallaxRef.current, {
          scrollTrigger: {
            trigger: aboutSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          },
          y: -100,
          ease: 'none'
        })
      })

      return () => ctx.revert()
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initParallax, 100)
    
    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={parallaxRef}>
      {/* Your parallax content */}
    </div>
  )
} 
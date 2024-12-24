'use client'

import { useRef, useEffect } from 'react'
import styles from './Parallax.module.css'

interface Props {
  children: React.ReactNode
  speed?: number
  className?: string
}

export default function Parallax({ children, speed = 1, className = '' }: Props) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const scrolled = window.scrollY
      const yPos = -(scrolled * speed)
      
      // Only apply transform when element is in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.style.transform = `translate3d(0, ${yPos}px, 0)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial position

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return (
    <div 
      ref={elementRef} 
      className={`${styles.parallax} ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  )
} 
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
  const initialY = useRef<number>(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Store initial Y position
    initialY.current = element.getBoundingClientRect().top

    const handleScroll = () => {
      const scrolled = window.scrollY
      const yPos = -(scrolled * speed)
      element.style.transform = `translate3d(0, ${yPos}px, 0)`
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return (
    <div 
      ref={elementRef} 
      className={`${styles.parallax} ${className}`}
    >
      {children}
    </div>
  )
} 
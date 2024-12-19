'use client'

import { useEffect, useRef, useCallback } from 'react'
import styles from './VariableText.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register all GSAP plugins once
gsap.registerPlugin(ScrollTrigger, SplitText)

ScrollTrigger.defaults({
  markers: false
})

interface VariableTextProps {
  text: string
  className?: string
}

export default function VariableText({ text, className = '' }: VariableTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef<SplitText | null>(null)
  const frameRef = useRef<number>()
  const lastMouseX = useRef<number>(0)
  const charPositions = useRef<{ left: number, width: number }[]>([])

  // Cache character positions - only recalculate on resize
  const cacheCharPositions = useCallback(() => {
    if (!splitRef.current?.chars) return
    const containerLeft = containerRef.current?.getBoundingClientRect().left || 0
    
    charPositions.current = splitRef.current.chars.map(char => {
      const rect = char.getBoundingClientRect()
      return {
        left: rect.left - containerLeft,
        width: rect.width
      }
    })
  }, [])

  // Throttled mouse handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (frameRef.current) return // Skip if frame is already scheduled

    frameRef.current = requestAnimationFrame(() => {
      if (!containerRef.current || !splitRef.current?.chars) return

      const mouseX = e.clientX - containerRef.current.getBoundingClientRect().left
      
      // Skip if mouse hasn't moved much
      if (Math.abs(mouseX - lastMouseX.current) < 3) {
        frameRef.current = undefined
        return
      }
      
      lastMouseX.current = mouseX
      const maxDistance = containerRef.current.offsetWidth / 2

      splitRef.current.chars.forEach((char: HTMLElement, i) => {
        const pos = charPositions.current[i]
        const charX = pos.left + (pos.width / 2)
        const distance = Math.abs(mouseX - charX)
        
        const weight = gsap.utils.interpolate(
          900,
          400,
          gsap.utils.clamp(0, 1, distance / maxDistance)
        )

        // Only update if weight changed significantly
        const currentWeight = parseFloat(char.style.fontVariationSettings?.match(/\d+/)?.[0] || '400')
        if (Math.abs(currentWeight - weight) > 10) {
          char.style.fontVariationSettings = `"wght" ${weight}`
        }
      })

      frameRef.current = undefined
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Initial setup
    splitRef.current = new SplitText(container, {
      type: "chars",
      charsClass: styles.char
    })

    // Cache initial positions
    cacheCharPositions()

    // Set initial weights
    splitRef.current.chars.forEach(char => {
      char.style.fontVariationSettings = `"wght" 400`
    })

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', cacheCharPositions)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', cacheCharPositions)
      splitRef.current?.revert()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [handleMouseMove, cacheCharPositions])

  return (
    <div 
      ref={containerRef} 
      className={`${styles.container} ${className}`}
    >
      {text}
    </div>
  )
} 
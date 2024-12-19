'use client'

import { useEffect, useRef, useCallback } from 'react'
import styles from './VariableText.module.css'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

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

  const cacheCharPositions = useCallback(() => {
    if (!splitRef.current?.chars) return
    const containerLeft = containerRef.current?.getBoundingClientRect().left || 0
    
    charPositions.current = splitRef.current.chars.map(char => {
      const rect = (char as HTMLElement).getBoundingClientRect()
      return {
        left: rect.left - containerLeft,
        width: rect.width
      }
    })
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (frameRef.current) return

    frameRef.current = requestAnimationFrame(() => {
      if (!containerRef.current || !splitRef.current?.chars) return

      const mouseX = e.clientX - containerRef.current.getBoundingClientRect().left
      
      if (Math.abs(mouseX - lastMouseX.current) < 3) {
        frameRef.current = undefined
        return
      }
      
      lastMouseX.current = mouseX
      const maxDistance = containerRef.current.offsetWidth / 2

      splitRef.current.chars.forEach((char, i) => {
        const element = char as HTMLElement
        const pos = charPositions.current[i]
        const charX = pos.left + (pos.width / 2)
        const distance = Math.abs(mouseX - charX)
        
        const weight = gsap.utils.interpolate(
          900,
          400,
          gsap.utils.clamp(0, 1, distance / maxDistance)
        )

        const currentWeight = parseFloat(element.style.fontVariationSettings?.match(/\d+/)?.[0] || '400')
        if (Math.abs(currentWeight - weight) > 10) {
          element.style.fontVariationSettings = `"wght" ${weight}`
        }
      })

      frameRef.current = undefined
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    splitRef.current = new SplitText(container, {
      type: "chars",
      charsClass: styles.char
    })

    cacheCharPositions()

    splitRef.current.chars.forEach(char => {
      (char as HTMLElement).style.fontVariationSettings = `"wght" 400`
    })

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
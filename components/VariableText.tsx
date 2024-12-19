'use client'

import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Split the text into characters
    splitRef.current = new SplitText(container, {
      type: "chars",
      charsClass: styles.char
    })

    const chars = splitRef.current.chars

    // Set initial font variation settings
    chars.forEach(char => {
      char.style.fontVariationSettings = `"wght" 400`
      char.style.transition = 'font-variation-settings 0.2s ease-out'
    })

    // Handle hover effects
    const handleMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      
      chars.forEach((char: HTMLElement) => {
        const charRect = char.getBoundingClientRect()
        const charX = charRect.left - rect.left + (charRect.width / 2)
        const distance = Math.abs(mouseX - charX)
        const maxDistance = rect.width / 2
        
        // Calculate weight based on distance from mouse
        const weight = gsap.utils.interpolate(
          900, // max weight when close
          400, // min weight when far
          gsap.utils.clamp(0, 1, distance / maxDistance)
        )

        gsap.to(char, {
          fontVariationSettings: `"wght" ${weight}`,
          duration: 0.2,
          ease: "power2.out"
        })
      })
    }

    const handleMouseLeave = () => {
      chars.forEach((char: HTMLElement) => {
        gsap.to(char, {
          fontVariationSettings: `"wght" 400`,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    }

    container.addEventListener('mousemove', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      container.removeEventListener('mousemove', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      splitRef.current?.revert()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className={`${styles.container} ${className}`}
    >
      {text}
    </div>
  )
} 
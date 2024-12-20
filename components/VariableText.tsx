'use client'

import { useEffect, useRef } from 'react'
import { SplitText } from 'gsap/SplitText'
import gsap from 'gsap'

interface Props {
  text: string
  className?: string
}

export default function VariableText({ text, className }: Props) {
  const textRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef<SplitText | null>(null)

  useEffect(() => {
    if (!textRef.current) return

    // Split text into characters
    splitRef.current = new SplitText(textRef.current, {
      type: "chars",
    })

    // Set initial font weights
    splitRef.current.chars.forEach(char => {
      if (char instanceof HTMLElement) {
        const charText = char.textContent?.toLowerCase()
        if (charText && "cool".includes(charText)) {
          char.style.fontVariationSettings = `"wght" 900`
        } else {
          char.style.fontVariationSettings = `"wght" 400`
        }
      }
    })

    // Event handler functions with proper types
    const handleCharacterHover = (e: Event) => {
      const target = e.target
      if (!(target instanceof HTMLElement)) return

      const charText = target.textContent?.toLowerCase()
      if (charText && "cool".includes(charText)) {
        gsap.to(target, {
          fontVariationSettings: '"wght" 100',
          duration: 0.2,
          ease: "power1.out"
        })
      } else {
        gsap.to(target, {
          fontVariationSettings: '"wght" 900',
          duration: 0.2,
          ease: "power1.out"
        })
      }
    }

    const handleCharacterLeave = (e: Event) => {
      const target = e.target
      if (!(target instanceof HTMLElement)) return

      const charText = target.textContent?.toLowerCase()
      if (charText && "cool".includes(charText)) {
        gsap.to(target, {
          fontVariationSettings: '"wght" 900',
          duration: 0.2,
          ease: "power1.out"
        })
      } else {
        gsap.to(target, {
          fontVariationSettings: '"wght" 400',
          duration: 0.2,
          ease: "power1.out"
        })
      }
    }

    // Add event listeners with proper type casting
    if (splitRef.current?.chars) {
      splitRef.current.chars.forEach(char => {
        if (char instanceof HTMLElement) {
          char.addEventListener('mouseenter', handleCharacterHover)
          char.addEventListener('mouseleave', handleCharacterLeave)
        }
      })
    }

    // Cleanup
    return () => {
      if (splitRef.current?.chars) {
        splitRef.current.chars.forEach(char => {
          if (char instanceof HTMLElement) {
            char.removeEventListener('mouseenter', handleCharacterHover)
            char.removeEventListener('mouseleave', handleCharacterLeave)
          }
        })
        splitRef.current.revert()
      }
    }
  }, [])

  return (
    <div 
      ref={textRef}
      className={className}
    >
      {text}
    </div>
  )
} 
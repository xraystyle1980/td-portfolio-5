'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

export default function Scene3DWrapper() {
  const [scrollPosition, setScrollPosition] = useState(0) // Updated for clarity

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Set up ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: '#retrogrid-section', // Target section
      start: 'top top', // Start animation when section reaches viewport
      end: '+=16000', // Adjust scroll distance based on RetroGrid scaling
      scrub: true, // Smooth syncing with scroll
      onUpdate: (self) => {
        setScrollPosition(self.progress) // Pass progress (0–1) to Scene3D
      },
    })

    // Clean up ScrollTrigger on unmount
    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <Scene3D scroll={scrollPosition} /> // Pass the progress as prop
  )
}
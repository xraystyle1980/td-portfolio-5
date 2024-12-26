'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

export default function Scene3DWrapper() {
  const [scroll, setScroll] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const customEvent = e as CustomEvent
      setScroll(customEvent.detail.progress)
      setCurrentSection(customEvent.detail.section)
    }

    window.addEventListener('scroll-progress', handleScroll)
    return () => window.removeEventListener('scroll-progress', handleScroll)
  }, [])

  return <Scene3D scroll={scroll} currentSection={currentSection} />
} 
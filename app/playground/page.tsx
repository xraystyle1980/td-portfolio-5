'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import styles from './playground.module.css'
import { OrbitControls } from '@react-three/drei'
import Scene from './Scene'
import Sections from './Sections'

export default function PlaygroundPage() {
  const [scroll, setScroll] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setScroll(scrollPercent)
      
      // Calculate current section based on scroll position
      const section = Math.floor(scrollPercent * 4) // 4 sections total
      setCurrentSection(section)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.canvasContainer}>
        <Canvas
          camera={{
            position: [0, 2, 5],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
        >
          <Suspense fallback={null}>
            <Scene scroll={scroll} currentSection={currentSection} />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
      <Sections />
    </main>
  )
} 
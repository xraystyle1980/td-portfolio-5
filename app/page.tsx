'use client'

import dynamic from 'next/dynamic'
import styles from './page.module.css'
import HeroAbout from '@/components/sections/HeroAbout'
// import Hero from '@/components/sections/Hero'
// import AboutMe from '@/components/sections/AboutMe'
import Work from '@/components/sections/Work'
// import Playground from '@/components/sections/Playground'

// Define interface for Scene3D props
interface Scene3DProps {
  scroll: number
  currentSection: number
}

// Dynamically import Three.js components with no SSR
const Scene3D = dynamic<Scene3DProps>(() => import('./Scene3D'), { 
  ssr: false 
})

export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <HeroAbout />

      {/* About Section */}
      {/* <AboutMe /> */}

      {/* Work Section */}
      <Work />

      {/* Playground Section */}
      {/* <Playground /> */}

    </main>
  )
}

// App Home Page
'use client'

import dynamic from 'next/dynamic'
import sharedStyles from '@/styles/shared.module.css'
import HeroAbout from '@/components/sections/HeroAbout'
import CaseStudies from '@/components/sections/CaseStudies'

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
    <main className={sharedStyles.main}>
      {/* Hero Section */}
      <HeroAbout />

      {/* Case Studies Section */}
      <div id="case-studies-outer" className={sharedStyles.gradientBottomTop}>
        <CaseStudies />
      </div>

    </main>
  )
}

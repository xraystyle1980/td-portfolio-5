'use client'

import Hero from '@/components/sections/Hero'
import AboutMe from '@/components/sections/AboutMe'
import WorkTogether from '@/components/sections/WorkTogether'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <AboutMe />
      <WorkTogether />
      <Footer />
    </main>
  )
}

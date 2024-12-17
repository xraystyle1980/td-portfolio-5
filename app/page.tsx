'use client'

import Hero from '@/components/sections/Hero'
import AboutMe from '@/components/sections/AboutMe'
import WorkTogether from '@/components/sections/WorkTogether'
import Footer from '@/components/sections/Footer'
import Parallax from '@/components/Parallax'

export default function Home() {
  return (
    <main className="relative">
      <Parallax />
      <Hero />
      <AboutMe />
      <WorkTogether />
      <Footer />
    </main>
  )
}

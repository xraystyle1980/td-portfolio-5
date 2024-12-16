'use client'

import Hero from '@/components/sections/Hero'
import FloatingShapes from '@/components/sections/FloatingShapes'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Hero />
      <FloatingShapes />
      <Footer />
    </main>
  )
}

'use client'

import CollisionBalls from '@/components/3d/CollisionBalls'
import Footer from '@/components/sections/Footer'

export default function AboutPage() {
  return (
    <>
      <main className="relative w-full h-screen bg-black">
        <div className="absolute inset-0">
          <CollisionBalls />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 pt-20">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            About Us
          </h1>
        </div>
      </main>
      <Footer />
    </>
  )
} 
'use client'

import CollisionBalls from '@/components/3d/CollisionBalls'

export default function BallsPage() {
  return (
    <main className="relative w-full h-screen bg-black">
      <div className="absolute inset-0">
        <CollisionBalls />
      </div>
      
      {/* Optional overlay content */}
      <div className="relative z-10 container mx-auto px-6 pt-20">
        <h1 className="text-4xl font-bold text-white text-center">
          Interactive Balls
        </h1>
      </div>
    </main>
  )
} 
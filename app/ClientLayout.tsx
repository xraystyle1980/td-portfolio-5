'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Import plugins dynamically
    const registerPlugins = async () => {
      const [
        ScrollTrigger,
        ScrollSmoother,
        SplitText,
        ScrollToPlugin
      ] = await Promise.all([
        import('gsap/ScrollTrigger'),
        import('gsap/ScrollSmoother'),
        import('gsap/SplitText'),
        import('gsap/ScrollToPlugin')
      ])

      // Register plugins
      gsap.registerPlugin(
        ScrollTrigger.default,
        ScrollSmoother.default,
        SplitText.default,
        ScrollToPlugin.default
      )

      // Initialize GSAP defaults
      ScrollTrigger.default.defaults({
        markers: false
      })
    }

    registerPlugins()

    return () => {
      // Cleanup GSAP on unmount
      if (typeof window !== 'undefined') {
        const ScrollTrigger = require('gsap/ScrollTrigger').default
        ScrollTrigger.getAll().forEach((st: any) => st.kill())
        gsap.killTweensOf("*")
      }
    }
  }, [])

  return <>{children}</>
} 
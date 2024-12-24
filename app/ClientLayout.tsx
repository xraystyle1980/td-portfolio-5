'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
import { SplitText } from 'gsap/dist/SplitText'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'

// Register all GSAP plugins at the top level
if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    ScrollToPlugin
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Initialize GSAP defaults
    ScrollTrigger.defaults({
      markers: false
    });

    // Clear any existing GSAP instances on mount
    ScrollTrigger.getAll().forEach(st => st.kill());
    gsap.killTweensOf("*");

    return () => {
      // Cleanup GSAP on unmount
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf("*");
    };
  }, []);

  return <>{children}</>;
} 
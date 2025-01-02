'use client'

import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import TokenFace from '../3d/TokenFace'
import styles from './AboutMe.module.css'
import gsap from 'gsap'
import { Group } from 'three'

function RotatingToken() {
  const groupRef = useRef<Group>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches)
    }

    // Initial check
    handleResize(mediaQuery)

    // Add listener for changes
    mediaQuery.addListener(handleResize)

    return () => {
      mediaQuery.removeListener(handleResize)
    }
  }, [])

  useEffect(() => {
    const initGSAP = async () => {
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      // Register plugins
      gsap.registerPlugin(ScrollTrigger)

      if (!groupRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: 'top 90%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
          scrub: 0.5
        }
      })

      // Pop animation on the 3D object - only animate scale
      tl.fromTo(groupRef.current.scale, 
        {
          x: 3.2,
          y: 3.2,
          z: 3.2
        },
        {
          x: 2.8,
          y: 2.8,
          z: 2.8,
          duration: 0.8,
          ease: "elastic.out(1.2, 0.5)",
        }
      )

      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill())
      }
    }

    initGSAP()
  }, [])

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.2
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <group 
      ref={groupRef} 
      rotation={[0.2, 0, 0]} 
      scale={3.2}
      position={isMobile ? [0, 0, 0] : [2, 0, 0]}
    >
      <TokenFace />
    </group>
  )
}

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // CRITICAL: This initialization setup ensures proper loading of GSAP and ScrollTrigger
    // DO NOT modify the initialization order or timing as it affects the token animation
    const initGSAP = async () => {
      console.log('🚀 Initializing GSAP...')
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)
      console.log('📍 ScrollTrigger registered')

      // CRITICAL: This flag controls the initial animation behavior
      // DO NOT remove - it prevents unwanted animation triggers on page load
      let isFirstLoad = true

      // CRITICAL: Token Animation Configuration
      // This setup ensures proper token movement and positioning
      // The timeline must be paused and immediateRender false to prevent flashing
      const tokenTl = gsap.timeline({
        paused: true,
        immediateRender: false
      })

      // Element existence checks for debugging
      console.log('📌 Token ref exists:', !!tokenRef.current)
      console.log('📌 Container ref exists:', !!containerRef.current)

      // CRITICAL: Token Animation Definition
      // This animation moves the token from above viewport to the About section
      // DO NOT modify the position values without testing all scroll scenarios
      tokenTl.fromTo(tokenRef.current,
        {
          top: '-50vh',
        },
        {
          top: '50%',
          duration: 1,
          ease: "power2.inOut",
          onStart: () => console.log('🎬 Token animation started'),
          onComplete: () => {
            console.log('✅ Token animation completed')
            isFirstLoad = false
          }
        }
      )

      // CRITICAL: ScrollTrigger Configuration
      // This setup controls when the token animates based on scroll position
      // DO NOT modify these triggers without testing all scroll scenarios:
      // 1. Initial page load
      // 2. Scrolling down past About
      // 3. Scrolling back up
      // 4. Returning from case study pages
      ScrollTrigger.create({
        trigger: "#about",
        start: 'top 90%',
        end: 'center center',
        onEnter: () => {
          console.log('🎯 Token section entered viewport')
          if (!isFirstLoad || tokenTl.progress() === 0) {
            tokenTl.play()
          }
        },
        onLeaveBack: () => {
          console.log('⬆️ Token section left viewport (scrolling up)')
          if (tokenTl.progress() === 1) {
            tokenTl.reverse()
          }
        },
        onEnterBack: () => {
          console.log('⬇️ Token section entered viewport (scrolling down)')
          tokenTl.play()
        },
        onRefresh: () => {
          console.log('🔄 ScrollTrigger refreshed')
        }
      })

      // CRITICAL: Container Animation
      // This animation reveals the About section content
      // Synchronized with scroll position for smooth reveal
      const containerTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: 'top 50%',
          end: 'top 30%',
          toggleActions: 'play none none reverse',
          scrub: 0.5
        }
      })

      containerTl.fromTo(containerRef.current,
        {
          scale: 0.95,
          opacity: 0,
          y: 30
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        }
      )

      // CRITICAL: Text Animation
      // Staggers the reveal of heading and text content
      // Synchronized with container animation
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: 'top 45%',
          end: 'top 25%',
          toggleActions: 'play none none reverse',
          scrub: 0.5
        }
      })

      textTl
        .fromTo(headingRef.current,
          {
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          }
        )
        .fromTo(textRef.current,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out"
          },
          "-=0.8"
        )

      // CRITICAL: Cleanup
      // Ensures proper disposal of ScrollTrigger instances
      return () => {
        console.log('🧹 Cleaning up ScrollTrigger instances')
        ScrollTrigger.getAll().forEach((st: any) => st.kill())
      }
    }

    // CRITICAL: Initialization Timing
    // 300ms delay ensures proper setup of WebGL context and DOM
    // DO NOT remove or reduce this delay as it affects animation reliability
    const timer = setTimeout(() => {
      console.log('⏰ Starting delayed initialization')
      initGSAP()
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <section id="about" className={styles.about}>
      <div ref={tokenRef} className={styles.tokenContainer}>
        <Canvas>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <RotatingToken />
          </Suspense>
        </Canvas>
      </div>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.content}>
          {/* WARNING: DO NOT MODIFY THE HEADLINE OR BIO TEXT BELOW */}
          <h1 ref={headingRef} className={styles.heading}>Helloo 👋</h1>
          <p ref={textRef} className={styles.text}>
            I'm Matt Trice, an ATL-based Product Designer with a track record of design leadership, embracing complex problems, and crafting elegant solutions that deliver meaningful business impact.
          </p>
        </div>
      </div>
    </section>
  )
} 
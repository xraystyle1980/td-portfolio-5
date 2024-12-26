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
    const initGSAP = async () => {
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      // Register plugins
      gsap.registerPlugin(ScrollTrigger)

      // Token scale animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: 'top 90%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
          scrub: 0.5
        }
      })

      // Token container position animation
      const tokenTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: 'top 90%',
          end: 'center center',
          toggleActions: 'play none none reverse',
          scrub: true
        }
      })

      tokenTl.fromTo(tokenRef.current,
        {
          top: '-50vh',
        },
        {
          top: '50%',
          duration: 1,
          ease: "none"
        }
      )

      // Container reveal animation
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

      // Text animations timeline
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

      return () => {
        ScrollTrigger.getAll().forEach((st: any) => st.kill())
      }
    }

    initGSAP()
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
          <h2 ref={headingRef} className={styles.heading}>Hey, I'm Trice 👋</h2>
          <p ref={textRef} className={styles.text}>
            I'm a Product Designer based in Atlanta, GA. I specialize in creating digital experiences that are both beautiful and functional. With a background in both design and development, I bring a unique perspective to every project.
          </p>
        </div>
      </div>
    </section>
  )
} 
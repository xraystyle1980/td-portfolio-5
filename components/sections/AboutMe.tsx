'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import TokenFace from '../3d/TokenFace'
import styles from './AboutMe.module.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Group } from 'three'

function RotatingToken() {
  const groupRef = useRef<Group>(null)

  useEffect(() => {
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

    // Pop animation on the 3D object
    tl.fromTo(groupRef.current.scale, 
      {
        x: 3.2,
        y: 3.2,
        z: 3.2,
        opacity: 0
      },
      {
        x: 2.8,
        y: 2.8,
        z: 2.8,
        opacity: 1,
        duration: 0.8,
        ease: "elastic.out(1.2, 0.5)",
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
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
      position={[2, 0, 0]}
    >
      <TokenFace />
    </group>
  )
}

export default function AboutMe() {
  const contentRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const tokenRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.defaults({ markers: false })

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
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.content} ref={contentRef}>
          <h2 className={styles.heading} ref={headingRef}>Hello 👋</h2>
          <p className={styles.text} ref={textRef}>
            I'm Matt Trice, an Atlanta-based Product Designer, Design Leader, Complex Problem Solver, and Code Tinkerer. Let's work together and build something innovative and impactful.
          </p>
        </div>
      </div>
      
      <div className={styles.tokenContainer} ref={tokenRef}>
        <Canvas
          camera={{ 
            position: [0, 0, 10],
            fov: 45,
            near: 0.1,
            far: 1000
          }}
        >
          <ambientLight intensity={2.5} color="#FF3399" />
          <pointLight position={[10, 10, 10]} intensity={4} color="#FF3399" />
          <pointLight position={[-10, -10, -10]} intensity={3} color="#FF3399" />
          <pointLight position={[0, 0, 5]} intensity={3.5} color="#FF3399" />
          <spotLight position={[0, 5, 0]} intensity={5} color="#FF3399" angle={0.5} penumbra={1} />
          <Environment background={false} preset="warehouse" />
          <RotatingToken />
        </Canvas>
      </div>
    </section>
  )
} 
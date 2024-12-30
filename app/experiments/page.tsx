'use client'

import styles from '@/styles/casestudy.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/icons/Icon'

export default function ExperimentsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reset scroll position and handle loading state
    if (typeof window !== 'undefined') {
      // Set loading state
      setIsLoading(true)
      
      // Reset scroll position
      window.scrollTo(0, 0)
      
      // Ensure content is loaded before showing
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>Experiments</h1>
            <div className={styles.details}>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Category</h3>
                <p className={styles.detailText}>Interactive Experiences</p>
              </div>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Tools</h3>
                <p className={styles.detailText}>Three.js, WebGL, React</p>
              </div>
            </div>
            <Link href="/experiments/3d-particles" className={styles.primaryButton}>
              Try the 3D Experience
              <Icon name="arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Overview</h2>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>The Laboratory</h3>
                <p className={styles.subsectionText}>A collection of interactive experiments exploring the boundaries of web technology. From 3D graphics to generative art, each experiment pushes the limits of what's possible in the browser.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Projects</h2>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Interactive Experiences</h3>
                <p className={styles.subsectionText}>Each experiment explores different aspects of web technology and interaction design.</p>
                <div className={styles.buttonGroup}>
                  <Link href="/experiments/3d-particles" className={styles.primaryButton}>
                    Fly Around
                    <Icon name="arrow-right" />
                  </Link>
                  <Link href="/experiments/creative-coding" className={styles.primaryButton}>
                    Creative Coding
                    <Icon name="arrow-right" />
                  </Link>
                  <Link href="/experiments/generative-ui" className={styles.primaryButton}>
                    Generative UI
                    <Icon name="arrow-right" />
                  </Link>
                  <Link href="/experiments/design-systems" className={styles.primaryButton}>
                    Design Systems
                    <Icon name="arrow-right" />
                  </Link>
                </div>
                <div className={styles.imageGrid}>
                  {/* Add images here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
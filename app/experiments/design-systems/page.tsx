'use client'

import styles from '@/styles/casestudy.module.css'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function DesignSystemsCaseStudy() {
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
    return null // or a loading spinner if preferred
  }

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>Design Systems</h1>
            <div className={styles.details}>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Category</h3>
                <p className={styles.detailText}>System Design & Development</p>
              </div>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Tools</h3>
                <p className={styles.detailText}>React, TypeScript, Storybook</p>
              </div>
            </div>
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
                <h3 className={styles.subsectionTitle}>The Foundation</h3>
                <p className={styles.subsectionText}>Building scalable and maintainable design systems that bridge the gap between design and development. Creating a shared language and component library that ensures consistency across products.</p>
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
                <h3 className={styles.subsectionTitle}>Component Library</h3>
                <p className={styles.subsectionText}>A collection of reusable components built with React and TypeScript, documented with Storybook for easy integration and customization.</p>
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
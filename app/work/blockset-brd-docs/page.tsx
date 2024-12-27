'use client'

import styles from '@/styles/casestudy.module.css'
import { projects } from '@/data/projects'
import { useEffect } from 'react'

export default function BlocksetBRDDocsCaseStudy() {
  const project = projects.find(p => p.route === '/work/blockset-brd-docs')

  useEffect(() => {
    // Reset scroll position on mount
    window.scrollTo(0, 0)
  }, [])

  if (!project) return null

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{project.title}</h1>
          <div className={styles.details}>
            <p className={styles.role}>{project.role}</p>
            <p className={styles.duration}>{project.duration}</p>
            <p className={styles.company}>{project.company}</p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p className={styles.sectionText}>{project.description}</p>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Process</h2>
          <p className={styles.sectionText}>Coming soon...</p>
        </div>
      </section>

      {/* Solution Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Solution</h2>
          <p className={styles.sectionText}>Coming soon...</p>
        </div>
      </section>

      {/* Results Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Results</h2>
          <p className={styles.sectionText}>Coming soon...</p>
        </div>
      </section>
    </main>
  )
} 
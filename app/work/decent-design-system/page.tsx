'use client'

import styles from '@/styles/casestudy.module.css'
import { projects } from '@/data/projects'
import { useEffect } from 'react'
import Image from 'next/image'

export default function DecentDesignSystemCaseStudy() {
  const project = projects.find(p => p.route === '/work/decent-design-system')

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
          <div className={styles.heroText}>
            <h1 className={styles.title}>{project.title}</h1>
            <div className={styles.details}>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Role</h3>
                <p className={styles.detailText}>{project.role}</p>
              </div>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Duration</h3>
                <p className={styles.detailText}>{project.duration}</p>
              </div>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Team</h3>
                <p className={styles.detailText}>Decent Design and Engineering</p>
              </div>
            </div>
          </div>
          {project.imageUrl && (
            <div className={styles.heroImage}>
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={1200}
                height={800}
                priority
              />
            </div>
          )}
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
                <h3 className={styles.subsectionTitle}>The Challenge</h3>
                <p className={styles.subsectionText}>The Decent Design System was created to streamline the workflow for both developers and designers, making it easier and faster to build. It plays a key role in supporting Decent DAO's products by ensuring consistent, scalable, and efficient collaboration between design and development teams.</p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>The Approach</h3>
                <p className={styles.subsectionText}>By focusing on creating a standardized toolkit and framework, we developed a system that could be universally adopted across all Decent products. This included establishing design tokens, component libraries, and documentation that bridges the gap between design and development.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Process</h2>
              <h3 className={styles.sectionSubtitle}>Building a Foundation</h3>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Style Guide</h3>
                <p className={styles.subsectionText}>The core elements that underpin the design system, such as colors, typography, spacing, and grid systems. These components establish a consistent visual language across all platforms.</p>
                <div className={styles.imageGrid}>
                  <Image
                    src="/portfolio/decent-design-system--typography.png"
                    alt="Decent Typography"
                    width={1200}
                    height={800}
                  />
                  <Image
                    src="/portfolio/decent-design-system--spacing.png"
                    alt="Spacing system based on Chakra defaults"
                    width={1200}
                    height={800}
                  />
                  <Image
                    src="/portfolio/decent-design-system--brand.png"
                    alt="Decent brand specs"
                    width={1200}
                    height={800}
                  />
                </div>
              </div>

              {/* Components Section */}
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Components & Patterns</h3>
                <p className={styles.subsectionText}>Composable, reusable, and customizable, these building blocks promote efficiency and consistency across design and development.</p>
                <div className={styles.imageGrid}>
                  <Image
                    src="/portfolio/decent-design-system--inputs.png"
                    alt="UI text inputs from the Design System"
                    width={1200}
                    height={800}
                  />
                  <Image
                    src="/portfolio/decent-design-system--buttons.png"
                    alt="Buttons from the Design System"
                    width={1200}
                    height={800}
                  />
                  <Image
                    src="/portfolio/decent-design-system--atomic.png"
                    alt="Atomic design in action"
                    width={1200}
                    height={800}
                  />
                  <Image
                    src="/portfolio/decent-design-system--mobile.png"
                    alt="Mobile navigation patterns"
                    width={1200}
                    height={800}
                  />
                </div>
              </div>

              {/* Design Tokens Section */}
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Variables aka Design Tokens</h3>
                <p className={styles.subsectionText}>Design tokens are variables that store visual design attributes, such as colors, fonts, and spacing values. They enable dynamic updates and modifications, ensuring that design adjustments are efficiently implemented across all platforms and products.</p>
                <div className={styles.imageGrid}>
                  <Image
                    src="/portfolio/decent-design-system--colors.png"
                    alt="Color variables used as design tokens"
                    width={1200}
                    height={800}
                  />
                </div>
              </div>

              {/* Documentation Section */}
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Documentation</h3>
                <p className={styles.subsectionText}>Comprehensive resources that provide teams with clear guidelines on how to use and contribute to the design system. This documentation helps maintain alignment and enables the design system to evolve alongside the needs of the team and products.</p>
                <div className={styles.imageGrid}>
                  <Image
                    src="/portfolio/decent-design-system--notion.png"
                    alt="A Notion portal for the Design System"
                    width={1200}
                    height={800}
                  />
                  <Image
                    src="/portfolio/decent-design-system--qa.png"
                    alt="Capturing detailed QA in Notion"
                    width={1200}
                    height={800}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Implementation</h2>
              <h3 className={styles.sectionSubtitle}>Bringing it All Together</h3>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Documentation</h3>
                <p className={styles.subsectionText}>Comprehensive documentation was created to ensure both designers and developers could effectively use the system. This included usage guidelines, component specifications, and best practices for implementation.</p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Integration</h3>
                <p className={styles.subsectionText}>The design system was seamlessly integrated into the development workflow through a combination of Figma components and React components, ensuring a smooth handoff between design and development teams.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Impact</h2>
              <h3 className={styles.sectionSubtitle}>Measuring Success</h3>
            </div>
            <div className={styles.sectionText}>
              <p className={styles.subsectionText}>The implementation of the Decent Design System significantly improved development efficiency and design consistency across all Decent products. It reduced design decision-making time, streamlined the development process, and established a shared language between design and development teams.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
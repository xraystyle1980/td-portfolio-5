'use client'

import styles from '@/styles/casestudy.module.css'
import { projects } from '@/data/projects'
import { useEffect } from 'react'
import Image from 'next/image'

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
                <p className={styles.detailText}>{project.team}</p>
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
              <h3 className={styles.sectionSubtitle}>Wallet as a Service</h3>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>The Project</h3>
                <p className={styles.subsectionText}>In 2021, BRD was putting the finishing touches on their new whitelisting product called Blockset. Decent was hired to design and build a custom documentation site and marketing page, including a Developer Sandbox to test out API requests.</p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>The Collaboration</h3>
                <p className={styles.subsectionText}>Working closely with designers, engineers, product, and stakeholders from both Decent and BRD teams, we helped shape product and UX decisions while conducting in-depth research on product features.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Documentation</h2>
              <h3 className={styles.sectionSubtitle}>Building a Docs Site</h3>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Developer Sandbox</h3>
                <p className={styles.subsectionText}>A key feature of the documentation site was the Developer Sandbox, designed to allow developers to test API requests directly. Through multiple iterations and prototyping sessions with the BRD team, we created an intuitive and powerful testing environment.</p>
              </div>
              <div className={styles.imageGrid}>
                <Image
                  src="/portfolio/blockset_docs--home.png"
                  alt="Blockset Docs home"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/blockset_docs--sandbox.png"
                  alt="Blockset Docs Developer Sandbox"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/blockset_docs--example.png"
                  alt="Blockset Docs example page"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/blockset_docs--endpoint.png"
                  alt="Developer Sandbox Endpoint Wizard"
                  width={1200}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Marketing</h2>
              <h3 className={styles.sectionSubtitle}>The Marketing Website</h3>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Design & Interaction</h3>
                <p className={styles.subsectionText}>In collaboration with BRD's design and marketing teams, we created a fresh and clean marketing site to showcase the product. A standout feature was the interactive pricing slider for API calls and webhooks, which was designed to be responsive and transform into dropdown components on mobile devices.</p>
              </div>
              <div className={styles.imageGrid}>
                <Image
                  src="/portfolio/blockset_docs--brand.png"
                  alt="Clean design showcasing the BRD brand"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/blockset_docs--pricing.png"
                  alt="Desktop pricing sliders"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/blockset_docs--pricing-mobile.png"
                  alt="Mobile pricing slider components"
                  width={1200}
                  height={800}
                />
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
              <h3 className={styles.sectionSubtitle}>Delivering Value</h3>
            </div>
            <div className={styles.sectionText}>
              <p className={styles.subsectionText}>The project successfully delivered a comprehensive documentation platform and marketing site that effectively showcased Blockset's capabilities. The Developer Sandbox became a key tool for potential clients to evaluate the API, while the marketing site's interactive elements helped communicate the product's value proposition.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
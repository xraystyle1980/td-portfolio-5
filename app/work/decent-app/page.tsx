'use client'

import styles from '@/styles/casestudy.module.css'
import { projects } from '@/data/projects'
import { useEffect } from 'react'
import Image from 'next/image'

export default function DecentAppCaseStudy() {
  const project = projects.find(p => p.route === '/work/decent-app')

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
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Website</h3>
                <p className={styles.detailText}>
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    app.decentdao.org
                  </a>
                </p>
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
                <h3 className={styles.subsectionTitle}>The DAO</h3>
                <p className={styles.subsectionText}>Decent DAO aims to provide a standardized approach to building and managing DAOs, emphasizing the importance of decentralized governance and community ownership. By focusing on open-source principles and transparency, Decent DAO intends to enable a more equitable distribution of power and resources within digital communities.</p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>The App</h3>
                <p className={styles.subsectionText}>The Decent app focuses on a standardized toolkit and framework that can be universally adopted by new and existing DAOs. This includes creating interoperable smart contracts, governance models that can adapt to different communities' needs, and a comprehensive set of guidelines for launching and managing DAOs effectively.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesign Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Redesign</h2>
              <h3 className={styles.sectionSubtitle}>The redesign from Fractal to Decent</h3>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>We had to Pivot</h3>
                <p className={styles.subsectionText}>Before it became the Decent app, it was known as Fractal. Fractal enabled DAOs to customize their organizational structure with the intention of unlocking a new level of coordination both within and between DAO communities.</p>
                <p className={styles.subsectionText}>It became clear that the market needed Fractal less than we had initially forecasted. That said, we recognized that Fractal had good bones and a solid codebase. By analyzing market trends and customer feedback, we identified new opportunities. We had to pivot.</p>
              </div>
              <div className={styles.imageGrid}>
                <Image
                  src="/portfolio/decent-app--fractal-decent-1.png"
                  alt="Before and after of Fractal to Decent"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--fractal-decent-2.png"
                  alt="Before and after of Fractal to Decent"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--fractal-decent-3.png"
                  alt="Before and after of Fractal to Decent"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--fractal-decent-4.png"
                  alt="Before and after of Fractal to Decent"
                  width={1200}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Section - Collaboration */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Strategy</h2>
              <h3 className={styles.sectionSubtitle}>Collaborative effort to improve the user experience</h3>
            </div>
            <div className={styles.sectionText}>
              <p className={styles.subsectionText}>I worked closely with design, product, and engineering teams, leveraging a "pair programming" approach to shape our design strategy. Together with the product team, we developed structured feedback and testing sessions to gather user insights and identify key pain points, which guided our design iterations.</p>
              <div className={styles.imageGrid}>
                <Image
                  src="/portfolio/decent-app--brainstorm-1.png"
                  alt="Brainstorming new feature flows"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--brainstorm-2.png"
                  alt="Brainstorming how new features could work"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--whiteboard-1.png"
                  alt="White-boarding in Figjam"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--whiteboard-2.png"
                  alt="Mapping the Information Architecture"
                  width={1200}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Section - Rebranding */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Strategy</h2>
              <h3 className={styles.sectionSubtitle}>Rebranding & Scalability</h3>
            </div>
            <div className={styles.sectionText}>
              <p className={styles.subsectionText}>During the rebranding from Fractal to Decent, we focused on building scalable design components in both Figma and the application. This led to the creation of a UI component library, integrated with Chakra UI, which streamlined development and ensured scalability for future growth.</p>
              <div className={styles.imageGrid}>
                <Image
                  src="/portfolio/decent-app--components-1.png"
                  alt="Capturing reusable components in the Design System"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--components-2.png"
                  alt="Capturing reusable components in the Design System"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--complex-1.png"
                  alt="Complex components"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--complex-2.png"
                  alt="Complex components"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--ui-kit-1.png"
                  alt="A list of bespoke components for the Decent app"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--ui-kit-2.png"
                  alt="A full UI kit was created based on the Decent product"
                  width={1200}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Section - QA */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Strategy</h2>
              <h3 className={styles.sectionSubtitle}>QA, Testing, & Continuous Improvement</h3>
            </div>
            <div className={styles.sectionText}>
              <p className={styles.subsectionText}>As a continuous improvement champion and QA evangelist, I worked directly with the design team, engineers, and product to provide detailed GitHub feedback to refine designs. This hands-on approach ensured solutions were both user-friendly and technically sound.</p>
              <div className={styles.imageGrid}>
                <Image
                  src="/portfolio/decent-app--qa-1.png"
                  alt="Capturing detailed QA notes"
                  width={1200}
                  height={800}
                />
                <Image
                  src="/portfolio/decent-app--qa-2.png"
                  alt="Capturing detailed QA notes before entering into GitHub"
                  width={1200}
                  height={800}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Summary</h2>
              <h3 className={styles.sectionSubtitle}>What did we learn?</h3>
            </div>
            <div className={styles.sectionText}>
              <p className={styles.subsectionText}>The pre-existing Fractal design system streamlined the process of updating the brand, allowing for efficient changes without sacrificing consistency. By planning ahead and keeping the users' needs in focus, we ensured the updates were not only seamless but also impactful.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
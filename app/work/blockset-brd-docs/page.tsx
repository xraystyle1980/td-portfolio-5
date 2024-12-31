'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/casestudy.module.css'
import { projects } from '@/data/projects'

export default function BlocksetBRDDocsCaseStudy() {
  const project = projects.find(p => p.route === '/work/blockset-brd-docs')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set loading state
      setIsLoading(true)
      
      // Force immediate scroll to top
      window.scrollTo(0, 0)
      
      // Ensure content is loaded before showing
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [])

  if (!project || isLoading) return null

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
                <p className={styles.detailText}>Lead Product Designer</p>
              </div>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Duration</h3>
                <p className={styles.detailText}>Q1 2022 – Q4 2023</p>
              </div>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Team</h3>
                <p className={styles.detailText}>2 Designers, 3 Engineers, Product Manager</p>
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

      {/* Main Content Section */}
      <section className={styles.section} data-section="content">
        <div className={styles.sectionContent}>
          {/* Overview */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Overview</h2>
            </div>
            <div className={styles.sectionText}>
              <p className={styles.subsectionText}>
                Blockset, a blockchain data integration platform, enables engineering teams to build enterprise-grade blockchain applications. To enhance its adoption, the project required a robust documentation platform and a marketing website that could bridge the gap between technical nuance and user onboarding needs.
              </p>
              <p className={styles.subsectionText}>
                As Lead Product Designer, I collaborated with BRD's internal design team, external stakeholders, and my team to create a unified documentation site and marketing page. These efforts helped improve developer confidence, streamline integration processes, and elevate Blockset's market presence.
              </p>
            </div>
          </div>

          {/* The Journey */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>The Journey</h2>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Challenges</h3>
                <ul className={styles.subsectionList}>
                  <li>Developers needed a clearer, more accessible documentation platform to simplify their onboarding experience.</li>
                  <li>The marketing website had to present Blockset's technical capabilities in a way that resonated with enterprise clients.</li>
                </ul>
              </div>
              <p className={styles.subsectionText}>
                I led the design and execution of this initiative on the Decent side, focusing on delivering developer-centric tools while enhancing the platform's business appeal. This required synthesizing input across multiple teams, iterating based on user feedback, and ensuring the final product balanced technical depth with usability.
              </p>
            </div>
          </div>

          {/* Impact */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Impact</h2>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Design Outcomes</h3>
                <ul className={styles.subsectionList}>
                  <li>Streamlined Information Architecture: Restructured existing documentation to improve accessibility and logical flow for developers.</li>
                  <li>Synthesized Stakeholder Input: Integrated feedback from BRD's internal teams and external stakeholders to refine the platform's UX.</li>
                  <li>Developed Interactive Marketing Features: Designed engaging tools, such as a pricing slider and feature prototypes, to showcase Blockset's offerings.</li>
                  <li>Designed Developer Sandbox: Worked closely with engineers on both teams to design and refine a hands-on environment for testing API requests.</li>
                </ul>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Customer Outcomes</h3>
                <ul className={styles.subsectionList}>
                  <li>Enhanced Developer Experience: Developers felt more empowered and confident when integrating Blockset.</li>
                  <li>Increased Engagement: Clearer documentation and sandbox tools encouraged deeper exploration of Blockset's features.</li>
                  <li>Improved Perception among Clients: The professional design elevated trust in Blockset's capabilities.</li>
                </ul>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Business Outcomes</h3>
                <ul className={styles.subsectionList}>
                  <li>Accelerated Adoption: Enhanced resources streamlined onboarding for enterprises and developers.</li>
                  <li>Market Differentiation: High-quality documentation set Blockset apart from competitors.</li>
                  <li>Reduced Support Costs: Developers relied on self-service tools, minimizing the need for technical support.</li>
                </ul>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Financial Outcomes</h3>
                <ul className={styles.subsectionList}>
                  <li>Increased Revenue: Improved adoption rates contributed to new client acquisitions and higher revenue.</li>
                  <li>Lowered Operational Costs: Comprehensive resources reduced support tickets, driving operational efficiency.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy & Execution */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Strategy & Execution</h2>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Collaborative Design Process</h3>
                <p className={styles.subsectionText}>
                  I worked closely with BRD's internal design team, stakeholders, and my team to align on project goals. By conducting usability testing and gathering iterative feedback, we ensured that the design addressed user needs and business objectives.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Delivering Developer-Focused Solutions</h3>
                <p className={styles.subsectionText}>
                  The project prioritized developer tools, such as a sandbox and interactive documentation, to reduce onboarding friction and improve engagement. Clear, action-oriented resources made the integration process seamless.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Marketing Website Enhancements</h3>
                <p className={styles.subsectionText}>
                  To elevate Blockset's positioning, we designed an interactive and visually compelling website that communicated technical features in an accessible way.
                </p>
              </div>
            </div>
          </div>

          {/* Key Learnings */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Key Learnings & Reflections</h2>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Empowering Developers Enhances Engagement</h3>
                <p className={styles.subsectionText}>
                  By designing developer-centric tools, we significantly reduced friction in the onboarding process, boosting confidence and satisfaction.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Collaboration Drives Innovation</h3>
                <p className={styles.subsectionText}>
                  Synthesizing feedback across teams ensured that the final product resonated with both technical users and stakeholders.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Balancing Complexity and Clarity</h3>
                <p className={styles.subsectionText}>
                  Finding the right balance between technical depth and usability was critical in creating resources that were both functional and engaging.
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Summary</h2>
            </div>
            <div className={styles.sectionText}>
              <p className={styles.subsectionText}>
                The Blockset documentation and marketing project illustrates the power of design to align user needs with business goals. By delivering tools that empowered developers and presented Blockset's value clearly, we enhanced the user experience and drove toward measurable business goals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
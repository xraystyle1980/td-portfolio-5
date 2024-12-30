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
                <p className={styles.detailText}>Lead Product Designer</p>
              </div>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Duration</h3>
                <p className={styles.detailText}>Q3 2022 – Q4 2023</p>
              </div>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Team</h3>
                <p className={styles.detailText}>3 Designers, 5 Engineers, Product Manager</p>
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
                Scaling a product across a diverse ecosystem requires consistency, efficiency, and collaboration. The Decent Design System was built to address this challenge by creating a unified design language that streamlined workflows, improved team alignment, and delivered consistent user experiences.
              </p>
              <p className={styles.subsectionText}>
                As the Product Design Director, I spearheaded the development of the design system, working closely across the organization to ensure it met the needs of both developers and designers. Through this collaborative effort, the design system became a key enabler of scalability and innovation across the organization.
              </p>
            </div>
          </div>

          {/* The Journey */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>The Journey</h2>
            </div>
            <div className={styles.sectionText}>
              <p className={styles.subsectionText}>
                The lack of a cohesive design framework had created inefficiencies: duplicated efforts, inconsistent branding, and communication silos. These challenges were not only slowing development but also impacting the user experience.
              </p>
              <p className={styles.subsectionText}>
                Recognizing potential for improvement, I spearheaded the effort to build a design system MVP that bridged the divide between design and development.
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
                  <li>Contributed to a Unified Design Language: Developed a comprehensive style guide covering colors, typography, and grid systems, ensuring visual consistency.</li>
                  <li>Created Reusable Components: Designed modular UI elements that streamlined design and development processes.</li>
                  <li>Implemented Design Tokens: Integrated dynamic attributes that allowed for design ownership over color palettes.</li>
                  <li>Developed Comprehensive Documentation: Created and maintained documentation guidelines to assist teams in adopting and contributing to the system.</li>
                </ul>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Design Impacts Organizational Change</h3>
                <ul className={styles.subsectionList}>
                  <li>Reduced Cognitive Load for Developers: Simplified decision-making during development by providing clear design standards.</li>
                  <li>Increased Development Velocity: Enabled faster project timelines through reusable components and scalable workflows.</li>
                  <li>Enhanced Team Collaboration: Improved alignment between design and engineering teams, reducing bottlenecks and miscommunication.</li>
                  <li>Empowered Team Contributions: Equipped teams with tools and guidelines to independently create solutions that adhered to design standards.</li>
                </ul>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Business Outcomes</h3>
                <ul className={styles.subsectionList}>
                  <li>Improved Efficiency: Reduced duplication of efforts and streamlined collaboration, cutting down project timelines.</li>
                  <li>Accelerated Product Development: Supported faster feature rollouts and scalability as new requirements emerged.</li>
                  <li>Reinforced Brand Identity: A consistent visual language strengthened the brand's credibility and recognition.</li>
                </ul>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Financial Impact</h3>
                <ul className={styles.subsectionList}>
                  <li>Increased Revenue: Faster time-to-market and improved product adoption drove higher earnings.</li>
                  <li>Decreased Costs: Reduced design and development inefficiencies contribute to operational savings.</li>
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
                <h3 className={styles.subsectionTitle}>Collaborative Design & Development</h3>
                <p className={styles.subsectionText}>
                  I interviewed my teammates across the org to uncover pain points during their product design, design handoff processes. Through testing and feedback sessions, we refined the system and our approach iteratively to craft a design system that fits the needs of the organization.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Systematizing Scalability</h3>
                <p className={styles.subsectionText}>
                  The system was built with growth in mind. By implementing design tokens and modular components, the design system scaled seamlessly as new products and features were developed. Comprehensive documentation ensured that even as the organization expanded, the design system remained accessible and intuitive.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Outcome-Oriented Process</h3>
                <p className={styles.subsectionText}>
                  Every decision, from component naming conventions to documentation format, was aligned with measurable outcomes:
                </p>
                <ul className={styles.subsectionList}>
                  <li>Higher engagement: Team adoption metrics indicated increased usage of shared components.</li>
                  <li>Faster builds: Reduced iteration cycles led to measurable time savings on projects.</li>
                </ul>
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
                <h3 className={styles.subsectionTitle}>Design as a Tool for Empowerment</h3>
                <p className={styles.subsectionText}>
                  The system did more than improve efficiency—it empowered teams to innovate confidently within a unified framework.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Collaboration Drives Success</h3>
                <p className={styles.subsectionText}>
                  Bringing together diverse voices ensured the design system met the real-world needs of every stakeholder.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Scalability is Strategy</h3>
                <p className={styles.subsectionText}>
                  Building a flexible, scalable foundation allowed the system to adapt seamlessly to organizational growth and future needs.
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
                The Decent Design System represents the intersection of creativity, collaboration, and strategy. By unifying visual language, empowering teams, and enabling scalable development, the system became more than a tool—it became a driver of growth and efficiency across the organization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
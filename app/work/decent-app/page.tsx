'use client'

import styles from '@/styles/casestudy.module.css'
import { projects } from '@/data/projects'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function DecentAppCaseStudy() {
  const project = projects.find(p => p.route === '/work/decent-app')
  const [isLoading, setIsLoading] = useState(true)
  const heroImageRef = useRef(null)
  const contentRef = useRef(null)

  // Handle initial load
  useEffect(() => {
    if (typeof window === 'undefined' || !project) return

    const initPage = async () => {
      setIsLoading(true)

      // Force scroll to top
      window.scrollTo(0, 0)
      const smoother = window.ScrollSmoother?.get()
      if (smoother) {
        smoother.scrollTo(0, false)
      }

      // Small delay to ensure layout is ready
      await new Promise(resolve => setTimeout(resolve, 100))

      // Initialize content
      if (heroImageRef.current && contentRef.current) {
        // Animate hero image
        gsap.fromTo(heroImageRef.current,
          {
            opacity: 0,
            scale: 0.95,
            x: '100%'
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1.4,
            ease: "power3.out"
          }
        )

        // Show content
        setIsLoading(false)
      }
    }

    initPage()
  }, [project])

  if (!project) return null

  return (
    <main className={styles.main} ref={contentRef}>
      <section className={styles.hero}>
        {project.imageUrl && (
          <div 
            ref={heroImageRef}
            className={styles.heroImage}
          >
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1600}
              height={1000}
              priority
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <div className={styles.heroImageOverlay} />
          </div>
        )}
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>{project.title}</h1>
            <div className={styles.details}>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>ROLE</div>
                <div className={styles.detailText}>Lead Product Designer</div>
              </div>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>DURATION</div>
                <div className={styles.detailText}>Q1 2023 – Q3 2024</div>
              </div>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>TEAM</div>
                <div className={styles.detailText}>2 Designers, 4 Engineers, PM</div>
              </div>
              <div className={styles.detailGroup}>
                <div className={styles.detailLabel}>WEBSITE</div>
                <div className={styles.detailText}>
                  <a href="https://app.decentdao.org" target="_blank" rel="noopener noreferrer">
                    app.decentdao.org
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={`${styles.section} ${styles.gradientBg}`} data-section="content">
        <div className={styles.sectionContent}>
          {/* Overview */}
          <div className={`${styles.sectionOverview} ${styles.sectionOverviewText}`}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p>The Decent app was built to empower decentralized autonomous organizations (DAOs) with a standardized toolkit for governance, collaboration, and management. At its core, the app aimed to simplify and enhance the operational capabilities of DAOs. Achieving this goal required a pivot and redesign of the original Fractal app.</p>
            <p>As the Lead Product Designer, I worked closely with product, engineering, and brand designers to lead the transformation of the app from its original iteration, Fractal, into Decent. Along the way, we navigated challenges, uncovered opportunities, and delivered measurable results that extended beyond design into tangible business outcomes.</p>
          </div>

          {/* The Journey */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <Image
                src="/images/placeholder.jpg"
                alt="Journey illustration"
                width={400}
                height={400}
                className={styles.sectionImage}
              />
            </div>
            <div className={styles.sectionText}>
              <h2 className={styles.sectionTitle}>The Journey</h2>
              <p>When market feedback showed that Fractal's customizable DAO structure wasn't meeting user needs, the team decided to pivot. This shift brought a new challenge: redefining the product's value while ensuring scalability and ease of use.</p>
              <p>My role was to bridge the gap between user needs and business goals, crafting a solution that felt intuitive, trustworthy, and impactful. The journey involved aligning cross-functional teams, designing with scalability in mind, and creating an experience that met both user and stakeholder needs.</p>
            </div>
          </div>

          {/* Impact */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <Image
                src="/images/placeholder.jpg"
                alt="Impact illustration"
                width={400}
                height={400}
                className={styles.sectionImage}
              />
            </div>
            <div className={styles.sectionText}>
              <h2 className={styles.sectionTitle}>Impact</h2>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Design Outcomes</h3>
                <ul className={styles.subsectionList}>
                  <li className={styles.subsectionListItem}>Aligned brand vision with product goals: Established a consistent design system across platforms to build trust and relevance.</li>
                  <li className={styles.subsectionListItem}>Internal usability testing: Streamlined the app's core features, addressing key pain points to improve the user experience.</li>
                  <li className={styles.subsectionListItem}>Design system integration: Introduced scalable components to improve design-to-development efficiency.</li>
                </ul>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Customer Outcomes</h3>
                <ul className={styles.subsectionList}>
                  <li>Perceived the app as more modern and trustworthy, leading to quicker task completion.</li>
                  <li>Experienced less confusion and found the platform better aligned to their needs.</li>
                </ul>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Business Outcomes</h3>
                <ul className={styles.subsectionList}>
                  <li>Improved brand alignment, increasing trust in the product.</li>
                  <li>Reduced time-on-task and user friction, driving higher engagement.</li>
                  <li>Established a foundation for monetization by increasing adoption of DAO tooling.</li>
                </ul>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Financial Outcomes</h3>
                <ul className={styles.subsectionList}>
                  <li>Increased revenue through higher user engagement and reduced operational costs.</li>
                  <li>Boosted profitability by enabling efficient scaling.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Strategy & Execution */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <Image
                src="/images/placeholder.jpg"
                alt="Strategy illustration"
                width={400}
                height={400}
                className={styles.sectionImage}
              />
            </div>
            <div className={styles.sectionText}>
              <h2 className={styles.sectionTitle}>Strategy & Execution</h2>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Collaborative Design & Testing</h3>
                <p>To ensure the redesign met both user and business needs, I worked closely with engineers, product teams, and stakeholders. Through usability testing and rapid prototyping, we iterated on designs that addressed user pain points while maintaining operational efficiency.</p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Rebranding for Scalability</h3>
                <p>The rebrand included the development of a UI component library in Figma, seamlessly integrated with Chakra UI. This system reduced design and engineering debt, making it easier to scale as the app evolved.</p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Outcome-Oriented Design</h3>
                <p>Each design decision was framed around its potential to drive outcomes:</p>
                <ul className={styles.subsectionList}>
                  <li>Reducing user friction directly correlated with increased user engagement.</li>
                  <li>Streamlined design systems improved operational efficiency and reduced development costs.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Key Learnings */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <Image
                src="/images/placeholder.jpg"
                alt="Key Learnings illustration"
                width={400}
                height={400}
                className={styles.sectionImage}
              />
            </div>
            <div className={styles.sectionText}>
              <h2 className={styles.sectionTitle}>Key Learnings & Reflections</h2>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Design as a Catalyst for Trust</h3>
                <p>By prioritizing consistency and usability, we created a platform that users felt confident adopting.</p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Collaboration as a Growth Driver</h3>
                <p>Cross-functional alignment amplified the impact of the design system, reducing bottlenecks and fostering innovation.</p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Outcome-Oriented Decision Making</h3>
                <p>Shifting focus to measurable business outcomes during the design process created clarity, helping the team prioritize efforts that would maximize user impact and operational efficiency.</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <Image
                src="/images/placeholder.jpg"
                alt="Summary illustration"
                width={400}
                height={400}
                className={styles.sectionImage}
              />
            </div>
            <div className={styles.sectionText}>
              <h2 className={styles.sectionTitle}>Summary</h2>
              <p>The redesign of the Decent App showcases the power of thoughtful design to drive both customer satisfaction and business success. By focusing on user needs and operational scalability, we not only delivered a better product but also created value that resonated across the organization.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
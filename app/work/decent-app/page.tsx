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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoading(true)
      window.scrollTo(0, 0)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Initial animation with bounce effect
      gsap.fromTo(heroImageRef.current,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)", // Bouncy effect
        }
      )

      // Mouse move effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { innerWidth, innerHeight } = window
        
        // Calculate mouse position relative to center of screen (-1 to 1)
        const xPos = (clientX / innerWidth - 0.5) * 2
        const yPos = (clientY / innerHeight - 0.5) * 2
        
        // Apply subtle movement
        gsap.to(heroImageRef.current, {
          x: xPos * 15,
          y: yPos * 15,
          rotateX: yPos * -3,
          rotateY: xPos * 3,
          duration: 0.8,
          ease: "power2.out"
        })
      }

      window.addEventListener('mousemove', handleMouseMove)
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isLoading])

  if (!project || isLoading) return null

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero} style={{ margin: '2rem' }}>
        {project.imageUrl && (
          <div 
            ref={heroImageRef}
            className={styles.heroImage}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              opacity: 0,
              willChange: 'transform',
              zIndex: 0,
              border: '4px solid #000',
              boxShadow: '-12px 12px 0px #000'
            }}
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
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(22, 22, 22, 0.5) 0%, rgba(22, 22, 22, 0.85) 100%)',
              zIndex: 1
            }} />
          </div>
        )}
        <div className={styles.heroContent} style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>{project.title}</h1>
            <div className={styles.details}>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Role</h3>
                <p className={styles.detailText}>Lead Product Designer</p>
              </div>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Duration</h3>
                <p className={styles.detailText}>Q1 2023 – Q3 2024</p>
              </div>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Team</h3>
                <p className={styles.detailText}>2 Designers, 4 Engineers, PM</p>
              </div>
              <div className={styles.detailGroup}>
                <h3 className={styles.detailLabel}>Website</h3>
                <p className={styles.detailText}>
                  <a href="https://app.decentdao.org" target="_blank" rel="noopener noreferrer">
                    app.decentdao.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section 
        className={styles.section} 
        data-section="content"
      >
        <div className={styles.sectionContent}>
          {/* Overview */}
          <div className={styles.sectionGrid}>
            <div className={styles.sectionIntro}>
              <h2 className={styles.sectionTitle}>Overview</h2>
            </div>
            <div className={styles.sectionText}>
              <p className={styles.subsectionText}>
                The Decent app was built to empower decentralized autonomous organizations (DAOs) with a standardized toolkit for governance, collaboration, and management. At its core, the app aimed to simplify and enhance the operational capabilities of DAOs. Achieving this goal required a pivot and redesign of the original Fractal app.
              </p>
              <p className={styles.subsectionText}>
                As the Lead Product Designer, I worked closely with product, engineering, and brand designers to lead the transformation of the app from its original iteration, Fractal, into Decent. Along the way, we navigated challenges, uncovered opportunities, and delivered measurable results that extended beyond design into tangible business outcomes.
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
                When market feedback showed that Fractal's customizable DAO structure wasn't meeting user needs, the team decided to pivot. This shift brought a new challenge: redefining the product's value while ensuring scalability and ease of use.
              </p>
              <p className={styles.subsectionText}>
                My role was to bridge the gap between user needs and business goals, crafting a solution that felt intuitive, trustworthy, and impactful. The journey involved aligning cross-functional teams, designing with scalability in mind, and creating an experience that met both user and stakeholder needs.
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
                  <li>Aligned brand vision with product goals: Established a consistent design system across platforms to build trust and relevance.</li>
                  <li>Internal usability testing: Streamlined the app's core features, addressing key pain points to improve the user experience.</li>
                  <li>Design system integration: Introduced scalable components to improve design-to-development efficiency.</li>
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
              <h2 className={styles.sectionTitle}>Strategy & Execution</h2>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Collaborative Design & Testing</h3>
                <p className={styles.subsectionText}>
                  To ensure the redesign met both user and business needs, I worked closely with engineers, product teams, and stakeholders. Through usability testing and rapid prototyping, we iterated on designs that addressed user pain points while maintaining operational efficiency.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Rebranding for Scalability</h3>
                <p className={styles.subsectionText}>
                  The rebrand included the development of a UI component library in Figma, seamlessly integrated with Chakra UI. This system reduced design and engineering debt, making it easier to scale as the app evolved.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Outcome-Oriented Design</h3>
                <p className={styles.subsectionText}>
                  Each design decision was framed around its potential to drive outcomes:
                </p>
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
              <h2 className={styles.sectionTitle}>Key Learnings & Reflections</h2>
            </div>
            <div className={styles.sectionText}>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Design as a Catalyst for Trust</h3>
                <p className={styles.subsectionText}>
                  By prioritizing consistency and usability, we created a platform that users felt confident adopting.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Collaboration as a Growth Driver</h3>
                <p className={styles.subsectionText}>
                  Cross-functional alignment amplified the impact of the design system, reducing bottlenecks and fostering innovation.
                </p>
              </div>
              <div className={styles.subsection}>
                <h3 className={styles.subsectionTitle}>Outcome-Oriented Decision Making</h3>
                <p className={styles.subsectionText}>
                  Shifting focus to measurable business outcomes during the design process created clarity, helping the team prioritize efforts that would maximize user impact and operational efficiency.
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
                The redesign of the Decent App showcases the power of thoughtful design to drive both customer satisfaction and business success. By focusing on user needs and operational scalability, we not only delivered a better product but also created value that resonated across the organization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 
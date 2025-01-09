// Decent App Case Study Page
'use client';

import styles from '@/styles/casestudy-shared.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { projects } from '@/data/projects';
import { useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export default function DecentAppCaseStudy() {
  const project = projects.find((p) => p.route === '/case-studies/decent-app');
  const heroImageRef = useRef(null);

  if (!project) return null;

  return (
    <div>
      <main className={sharedStyles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          {project.imageUrl && (
            <div className={styles.heroImage} ref={heroImageRef}>
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                priority
                quality={100}
                sizes="90vw"
                style={{ 
                  objectFit: 'cover',
                  objectPosition: 'center 20%'
                }}
              />
              <div className={styles.heroImageOverlay} />
            </div>
          )}
          <div className={clsx(styles.heroContent, sharedStyles.container)}>
            <h1 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>{project.title}</h1>
            <div className={sharedStyles.projectDetails}>
              <div className={styles.detailGroup}>
                <div className={sharedStyles.projectDetailLabel}>ROLE</div>
                <div className={sharedStyles.projectDetailValue}>Lead Product Designer</div>
              </div>
              <div className={styles.detailGroup}>
                <div className={sharedStyles.projectDetailLabel}>DURATION</div>
                <div className={sharedStyles.projectDetailValue}>Q1 2023 – Q3 2024</div>
              </div>
              <div className={styles.detailGroup}>
                <div className={sharedStyles.projectDetailLabel}>TEAM</div>
                <div className={sharedStyles.projectDetailValue}>2 Designers, 4 Engineers, PM</div>
              </div>
              <div className={styles.detailGroup}>
                <div className={sharedStyles.projectDetailLabel}>WEBSITE</div>
                <div className={sharedStyles.projectDetailValue}>
                  <a href="https://app.decentdao.org" target="_blank" rel="noopener noreferrer">
                    app.decentdao.org
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
       
        {/* Content Sections */}
        <section className={styles.contentSections}>
          <div className={clsx(styles.outerContainerWithMaxWidth, sharedStyles.contentContainer)}>
            <div className={sharedStyles.darkContainer}>

              {/* Overview */}
              <div className={sharedStyles.contentContainer}>
                <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Overview</h2>
                <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>The Decent app was built to empower decentralized autonomous organizations (DAOs) with a standardized toolkit for governance, collaboration, and management. At its core, the app aimed to simplify and enhance the operational capabilities of DAOs. Achieving this goal required a pivot and redesign of the original Fractal app.</p>
                <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>As the Lead Product Designer, I worked closely with product, engineering, and brand designers to lead the transformation of the app from its original iteration, Fractal, into Decent. Along the way, we navigated challenges, uncovered opportunities, and delivered measurable results that extended beyond design into tangible business outcomes.</p>
              </div>

              {/* Journey */}
              <div className={sharedStyles.contentContainer}>
                <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>The Journey</h2>
                <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>When market feedback showed that Fractal's customizable DAO structure wasn't meeting user needs, the team decided to pivot. This shift brought a new challenge: redefining the product's value while ensuring scalability and ease of use.</p>
                <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>My role was to bridge the gap between user needs and business goals, crafting a solution that felt intuitive, trustworthy, and impactful. The journey involved aligning cross-functional teams, designing with scalability in mind, and creating an experience that met both user and stakeholder needs.</p>
              </div>
          
              {/* Impact */}
              <div className={sharedStyles.contentContainer}>
                <div className={sharedStyles.gridColumns2}>
                  <div>
                    <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Impact</h2>
                  </div>
                  <div>
                    <h3 className={styles.subsectionTitle}>Design Impact</h3>
                      <ul className={styles.subsectionList}>
                        <li>Aligned brand vision with product goals: Established a consistent design system across platforms to build trust and relevance.</li>
                        <li>Internal usability testing: Streamlined the app's core features, addressing key pain points to improve the user experience.</li>
                        <li>Design system integration: Introduced scalable components to improve design-to-development efficiency.</li>
                      </ul>
                  
                      <h3 className={styles.subsectionTitle}>Customer Impact</h3>
                      <ul className={styles.subsectionList}>
                        <li>Perceived the app as more modern and trustworthy, leading to quicker task completion.</li>
                        <li>Experienced less confusion and found the platform better aligned to their needs.</li>
                      </ul>
                  
                      <h3 className={styles.subsectionTitle}>Business Impact</h3>
                      <ul className={styles.subsectionList}>
                        <li>Improved brand alignment, increasing trust in the product.</li>
                        <li>Reduced time-on-task and user friction, driving higher engagement.</li>
                        <li>Established a foundation for monetization by increasing adoption of DAO tooling.</li>
                      </ul>
                
                      <h3 className={styles.subsectionTitle}>Financial Impact</h3>
                      <ul className={styles.subsectionList}>
                        <li>Increased revenue through higher user engagement and reduced operational costs.</li>
                        <li>Boosted profitability by enabling efficient scaling.</li>
                      </ul>
                  </div>
                </div>
              </div>

              {/* Strategy & Execution */}
              <div className={sharedStyles.contentContainer}>
                <div className={sharedStyles.gridColumns2}>
                  <div>
                    <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Strategy & Execution</h2>
                  </div>
                  <div>
                    <h3 className={styles.subsectionTitle}>Collaborative Design & Testing</h3>
                    <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>To ensure the redesign met both user and business needs, I worked closely with engineers, product teams, and stakeholders. Through usability testing and rapid prototyping, we iterated on designs that addressed user pain points while maintaining operational efficiency.</p>
                
                    <h3 className={styles.subsectionTitle}>Rebranding for Scalability</h3>
                    <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>The rebrand included the development of a UI component library in Figma, seamlessly integrated with Chakra UI. This system reduced design and engineering debt, making it easier to scale as the app evolved.</p>
                
                    <h3 className={styles.subsectionTitle}>Outcome-Oriented Design</h3>
                    <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>Each design decision was framed around its potential to drive outcomes:</p>
                    <ul className={styles.subsectionList}>
                      <li>Reducing user friction directly correlated with increased user engagement.</li>
                      <li>Streamlined design systems improved operational efficiency and reduced development costs.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Learnings */}
              <div className={sharedStyles.contentContainer}>
                <div className={sharedStyles.gridColumns2}>
                  <div>
                    <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Key Learnings & Reflections</h2>
                  </div>
                  <div>
                    <h3 className={styles.subsectionTitle}>Design as a Catalyst for Trust</h3>
                    <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>By prioritizing consistency and usability, we created a platform that users felt confident adopting.</p>
                
                    <h3 className={styles.subsectionTitle}>Collaboration as a Growth Driver</h3>
                    <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>Cross-functional alignment amplified the impact of the design system, reducing bottlenecks and fostering innovation.</p>
                  
                    <h3 className={styles.subsectionTitle}>Outcome-Oriented Decision Making</h3>
                    <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>Shifting focus to measurable business outcomes during the design process created clarity, helping the team prioritize efforts that would maximize user impact and operational efficiency.</p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className={sharedStyles.contentContainer}>
                <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Summary</h2>
                <p className={clsx(sharedStyles.textBase, sharedStyles.larger)}>The redesign of the Decent App showcases the power of thoughtful design to drive both customer satisfaction and business success. By focusing on user needs and operational scalability, we not only delivered a better product but also created value that resonated across the organization.</p>
              </div>
              
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 
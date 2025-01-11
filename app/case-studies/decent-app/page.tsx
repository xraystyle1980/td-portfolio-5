// Decent App Case Study Page
'use client';

import styles from '@/styles/casestudy-shared.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { projects } from '@/data/projects';
import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import ParallaxHeroImage from '@/components/sections/case-studies/ParallaxHeroImage';
import ImageGallery from '@/components/sections/case-studies/ImageGallery';
import CaseStudyImage from '@/components/sections/case-studies/CaseStudyImage';
import { Icon } from '@/components/icons/Icon';
import { galleryImages } from './galleryData';

export default function DecentAppCaseStudy() {
  const project = projects.find((p) => p.route === '/case-studies/decent-app');
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when component mounts
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  if (!project) return null;

  return (
      <main className={sharedStyles.main}>
        {/* Hero Section */}
        <section className={clsx(styles.hero, sharedStyles.gradientBottomTop)}>
          {project.imageUrl && (
            <ParallaxHeroImage
              imageUrl={project.imageUrl}
              alt={project.title}
              heroContentRef={heroContentRef}
            />
          )}
          <div ref={heroContentRef} className={clsx(styles.heroContent)}>
            <h1 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>{project.title}</h1>
            <div className={styles.projectDetails}>
              
              <div className={styles.detailGroup}>
                <div className={styles.projectDetailLabel}>
                  <Icon name="coffee-alt" size={48} className={styles.subsectionIcon} />
                  <h6 className={sharedStyles.displayBase}>Role</h6>
                </div>
                <div className={styles.projectDetailValue}>
                  Lead Product Designer
                </div>
              </div>

              <div className={styles.detailGroup}>
                <div className={styles.projectDetailLabel}>
                  <Icon name="calendar-tomorrow" size={48} className={styles.subsectionIcon} />
                  <h6 className={sharedStyles.displayBase}>Duration</h6>
                </div>
                <div className={styles.projectDetailValue}>
                  Q1 2023 – Q3 2024
                </div>
              </div>

              <div className={styles.detailGroup}>
                <div className={styles.projectDetailLabel}>
                  <Icon name="users" size={48} className={styles.subsectionIcon} />
                  <h6 className={sharedStyles.displayBase}>Team</h6>
                </div>
                <div className={styles.projectDetailValue}>
                  2 Designers, 4 Engineers, PM
                </div>
              </div>

              <div className={styles.detailGroup}>
                <div className={styles.projectDetailLabel}>
                  <Icon name="device-laptop" size={48} className={styles.subsectionIcon} />
                  <h6 className={sharedStyles.displayBase}>Website</h6>
                </div>
                <div className={styles.projectDetailValue}>
                  <a className={sharedStyles.link} href="https://app.decentdao.org" target="_blank" rel="noopener noreferrer">
                    app.decentdao.org
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
       
        {/* Content Sections */}
        <section className={clsx(styles.contentSections, sharedStyles.darkOverlayBg)}>
          <div className={clsx(sharedStyles.container)}>
            <div className={sharedStyles.darkContainer}>

              {/* Overview */}       
              <div className={sharedStyles.contentContainer}>
                <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Overview</h2>
                <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>The Decent app was built to empower decentralized autonomous organizations (DAOs) with a standardized toolkit for governance, collaboration, and management. At its core, the app aimed to simplify and enhance the operational capabilities of DAOs. Achieving this goal required a pivot and redesign of the original Fractal app.</p>
                <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>As the Lead Product Designer, I worked closely with product, engineering, and brand designers to lead the transformation of the app from its original iteration, Fractal, into Decent. Along the way, we navigated challenges, uncovered opportunities, and delivered measurable results that extended beyond design into tangible business outcomes.</p>
              </div>

              {/* Journey */}
              <div className={sharedStyles.contentContainer}>
                <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Journey</h2>
                <p className={sharedStyles.textBase}>When market feedback showed that Fractal's customizable DAO structure wasn't meeting user needs, the team decided to pivot. This shift brought a new challenge: redefining the product's value while ensuring scalability and ease of use.</p>
                
                <CaseStudyImage
                  src="/images/decent-app/gallery/fractal-before.png"
                  alt="Original Fractal interface"
                  width={1920}
                  height={1080}
                  caption="The original Fractal interface"
                />
                
                <p className={sharedStyles.textBase}>My role was to bridge the gap between user needs and business goals, crafting a solution that felt intuitive, trustworthy, and impactful. The journey involved aligning cross-functional teams, designing with scalability in mind, and creating an experience that met both user and stakeholder needs.</p>
              </div>

              {/* Strategy & Execution */}
              <div className={sharedStyles.contentContainer}>
                <div>
                  <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Strategy & Execution</h2>
                </div>
                <div className={sharedStyles.gridColumns3}>
                  <div>
                    {/* <Icon name="arrow-right" size={48} className={styles.subsectionIcon} /> */}
                    <h3 className={sharedStyles.subsectionTitle}>Collaborative Design & Testing</h3>
                    <p className={sharedStyles.textBase}>To ensure the redesign met both user and business needs, I worked closely with engineers, product teams, and stakeholders. Through usability testing and rapid prototyping, we iterated on designs that addressed user pain points while maintaining operational efficiency.</p>
                  </div>
                  <div>
                    {/* <Icon name="arrow-right" size={48} className={styles.subsectionIcon} /> */}
                    <h3 className={sharedStyles.subsectionTitle}>Rebranding for Scalability</h3>
                    <p className={sharedStyles.textBase}>The rebrand included the development of a UI component library in Figma, seamlessly integrated with Chakra UI. This system reduced design and engineering debt, making it easier to scale as the app evolved.</p>
                  </div>
                  <div>
                    {/* <Icon name="arrow-right" size={48} className={styles.subsectionIcon} /> */}
                    <h3 className={sharedStyles.subsectionTitle}>Outcome-Oriented Design</h3>
                    <p className={sharedStyles.textBase}>Each design decision was framed around its potential to drive outcomes:</p>
                    <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                      <li>Reducing user friction directly correlated with increased user engagement.</li>
                      <li>Streamlined design systems improved operational efficiency and reduced development costs.</li>
                    </ul>
                  </div>
                </div>
                <CaseStudyImage
                  src="/images/decent-app/gallery/decent-app-after.png"
                  alt="The Redesigned Decent App"
                  width={4520}
                  height={2402}
                  caption="The Redesigned Decent App"
                />
              </div>

              
          
              {/* Impact */}
              <div className={sharedStyles.contentContainer}>
                <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Impact</h2>
                <div className={sharedStyles.gridColumns2}>
                  
                  <div>
                    {/* <Icon name="chart-up" size={48} className={styles.subsectionIcon} /> */}
                    <h3 className={sharedStyles.subsectionTitle}>
                      Design Impact
                    </h3>
                    <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                      <li>Aligned brand vision with product goals: Established a consistent design system across platforms to build trust and relevance.</li>
                      <li>Internal usability testing: Streamlined the app's core features, addressing key pain points to improve the user experience.</li>
                      <li>Design system integration: Introduced scalable components to improve design-to-development efficiency.</li>
                    </ul>
                  </div>
                  
                  <div>
                    {/* <Icon name="arrow-right" size={48} className={styles.subsectionIcon} /> */}
                    <h3 className={sharedStyles.subsectionTitle}>
                      Customer Impact
                    </h3>
                    <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                      <li>Perceived the app as more modern and trustworthy, leading to quicker task completion.</li>
                      <li>Experienced less confusion and found the platform better aligned to their needs.</li>
                    </ul>
                  </div>

                  <div>
                    {/* <Icon name="arrow-right" size={48} className={styles.subsectionIcon} /> */}
                    <h3 className={sharedStyles.subsectionTitle}>
                      Business Impact
                    </h3>
                    <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                      <li>Improved brand alignment, increasing trust in the product.</li>
                      <li>Reduced time-on-task and user friction, driving higher engagement.</li>
                      <li>Established a foundation for monetization by increasing adoption of DAO tooling.</li>
                    </ul>
                  </div>

                  <div>
                    {/* <Icon name="chart-up" size={48} className={styles.subsectionIcon} /> */}
                    <h3 className={sharedStyles.subsectionTitle}>
                      Financial Impact
                    </h3>
                    <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                      <li>Increased revenue through higher user engagement and reduced operational costs.</li>
                      <li>Boosted profitability by enabling efficient scaling.</li>
                    </ul>
                  </div>
                </div>
              </div>


              {/* Interface Gallery */}
              <div className={sharedStyles.contentContainer}>
                <h3 className={sharedStyles.subsectionTitle}>Improvements</h3>
                <p className={sharedStyles.textBase}>Key screens from the Decent app showcasing the redesigned interface and improved user experience.</p>
                <ImageGallery images={galleryImages} />
              </div>


              {/* Key Learnings */}
              <div className={sharedStyles.contentContainer}>
                <div>
                  <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Learning & Reflection</h2>
                </div>
                <div className={sharedStyles.gridColumns3}>
                  <div>
                    {/* <Icon name="arrow-right" size={48} className={styles.subsectionIcon} /> */}
                    <h3 className={sharedStyles.subsectionTitle}>Design as a Catalyst for Trust</h3>
                    <p className={sharedStyles.textBase}>By prioritizing consistency and usability, we created a platform that users felt confident adopting.</p>
                  </div>
                  <div>
                    {/* <Icon name="arrow-right" size={48} className={styles.subsectionIcon} /> */}
                    <h3 className={sharedStyles.subsectionTitle}>Collaboration as a Growth Driver</h3>
                    <p className={sharedStyles.textBase}>Cross-functional alignment amplified the impact of the design system, reducing bottlenecks and fostering innovation.</p>
                  </div>
                  <div>
                    {/* <Icon name="arrow-right" size={48} className={styles.subsectionIcon} /> */}
                    <h3 className={sharedStyles.subsectionTitle}>Outcome-Oriented Decision Making</h3>
                    <p className={sharedStyles.textBase}>Shifting focus to measurable business outcomes during the design process created clarity, helping the team prioritize efforts that would maximize user impact and operational efficiency.</p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className={sharedStyles.contentContainer}>
                <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Summary</h2>
                <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>The redesign of the Decent App showcases the power of thoughtful design to drive both customer satisfaction and business success. By focusing on user needs and operational scalability, we not only delivered a better product but also created value that resonated across the organization.</p>
              </div>
              
            </div>
          </div>
        </section>
      </main>
  );
} 
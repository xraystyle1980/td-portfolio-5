// Decent App Case Study Page
'use client';

import styles from '@/styles/casestudy-shared.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { projects } from '@/data/projects';
import { useRef } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/icons/Icon';
import ImageGallery from '@/components/sections/case-studies/ImageGallery';
import CaseStudyImage from '@/components/sections/case-studies/CaseStudyImage';
import { galleryImages } from './galleryData';
import ContactMe from '@/components/sections/ContactMe';

export default function DecentAppCaseStudy() {
  const project = projects.find((p) => p.route === '/case-studies/decent-app');

  if (!project) return null;

  return (
      <main className={sharedStyles.main}>
        {/* Hero Section */}
        <section className={clsx(styles.hero, sharedStyles.gradientBottomTop)}>
          {project.imageUrl && (
            <div className={styles.heroImage}>
              <img src={project.imageUrl} alt={project.title} />
            </div>
          )}
          <div className={clsx(styles.heroContent)}>
            <h1 className={clsx(sharedStyles.displayText)}>{project.title}</h1>
          </div>
        </section>
          
        <section className={clsx(sharedStyles.lightSection,sharedStyles.paddingTopBottom)}>
          <div className={sharedStyles.containerSmall}>
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

          <div>
            <CaseStudyImage
              src="/images/decent-app/gallery/decent-app-after.png"
              alt="The Redesigned Decent App"
              width={2880}
              height={1800}
              caption="The Redesigned Decent App"
              size="large"
              priority={true}
            />
          </div>

          {/* The Challenge */}
          <div className={sharedStyles.containerSmall}>
            <h2 className={styles.subsectionSmallTitle}>The Challenge</h2>
            <h3 className={styles.subsectionTitle}>A Need for Evolution</h3>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Fractal, the original product, was falling short of user expectations. The decentralized governance space had evolved, and Fractal's rigid smart contract structures limited adoption. User feedback revealed frustration with its complexity, lack of flexibility, and an outdated brand identity.</p>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>I led the product design aspect of the transition to Decent alongside product and engineering—rethinking the product to better serve DAOs with adaptable governance models and an intuitive experience.</p>
          </div>

          <div>
            <CaseStudyImage
              src="/images/decent-app/gallery/fractal-before.png"
              alt="The original Fractal interface"
              width={2880}
              height={1800}
              caption="The original Fractal interface"
              size="large"
            />
          </div>

          {/* Approach & Key Contributions */}
          <div className={sharedStyles.containerSmall}>
            <div className={sharedStyles.contentContainer}>
              <h2 className={clsx(styles.subsectionSmallTitle)}>Approach & Key Contributions</h2>
              <h3 className={styles.subsectionTitle}>Strategic Repositioning & Product Redesign</h3>
              <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                <li>I conducted user research & market analysis to identify gaps in Fractal's offering.</li>
                <li>I facilitated cross-functional workshops to align stakeholders on the Decent vision.</li>
                <li>I defined core UX principles for Decent, emphasizing scalability, usability, and modularity.</li>
              </ul>

              <h3 className={styles.subsectionTitle}>Collaborative & Iterative Design Process</h3>
              <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                <li>I worked closely with engineers in a pair-programming-inspired design process, refining usability at every stage.</li>
                <li>I conducted weekly user feedback sessions to validate design decisions and uncover friction points.</li>
                <li>I led multiple rounds of prototyping & usability testing, ensuring an intuitive DAO creation process.</li>
              </ul>
            </div>
          </div>

          <div className={sharedStyles.gridColumns2}>
            <CaseStudyImage
              src="/images/decent-app/gallery/decent-app-edit-role.png"
              alt="The Redesigned Decent App"
              width={724}
              height={1724}
              caption="The Redesigned Decent App"
              size="small"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/decent-app-role-list.png"
              alt="The Redesigned Decent App"
              width={724}
              height={1724}
              caption="The Redesigned Decent App"
              size="small"
            />
          </div>

          <div className={sharedStyles.containerSmall}>
            <h3 className={styles.subsectionTitle}>Scalable UI System & Brand Evolution</h3>
            <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
              <li>I designed a scalable UI component library using Chakra UI, enabling rapid development and a cohesive experience.
              </li>
              <li>I was instrumental in implementing the visual rebrand—modernizing the UI, color schemes, and interaction patterns based on the branding team's direction to align with Decent's positioning.</li>
              <li>I developed design guidelines & documentation to maintain consistency across the product.
              </li>
            </ul>

            <h3 className={styles.subsectionTitle}>Quality Assurance & Continuous Improvement</h3>
            <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
              <li>I integrated design QA workflows into the engineering pipeline, proactively catching inconsistencies before launch.</li>
              <li>I provided detailed GitHub design feedback, ensuring pixel-perfect execution and seamless UX.</li>
              <li>I iterated post-launch based on real user analytics, refining UI components for better engagement.</li>
            </ul>
          </div>

          <div>
            <CaseStudyImage
              src="/images/decent-app/gallery/decent-app-after.png"
              alt="The Redesigned Decent App"
              width={2880}
              height={1800}
              caption="The Redesigned Decent App"
              size="large"
            />
          </div>
                
          {/* <div>
            <p className={sharedStyles.textBase}>Key screens from the Decent app showcasing the redesigned interface and improved user experience.</p>
            <ImageGallery images={galleryImages} />
          </div> */}
        
          {/* Outcome & Impact */}
          <div className={sharedStyles.containerSmall}>
            <h2 className={clsx(styles.subsectionSmallTitle)}>Outcome & Impact</h2>
            <h3 className={styles.subsectionTitle}>Improved Product Trajectory</h3>
            <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
              <li>Improved adoption: Decent saw a significant increase in active DAOs within the first few months post-launch.</li>
              <li>Streamlined governance: Streamlined smart contract deployment, making decentralized governance more accessible.</li>
              <li>Enhanced user experience: Usability tests indicated a significant reduction in onboarding friction, leading to improved retention.</li>
            </ul>
            <p className={sharedStyles.textBase}>The transition from Fractal to Decent was more than just a redesign—it was a strategic overhaul that reshaped the product's core value. By leveraging user insights, design iteration, and seamless cross-team collaboration, we delivered a scalable and user-friendly DAO toolkit that meets the evolving needs of decentralized governance.</p>
            <h3 className={styles.subsectionTitle}>Final Thoughts</h3>
            <p className={sharedStyles.textBase}>This case study highlights my ability to lead product transformations, aligning business goals with user needs through strategic design. The Decent App now stands as a more intuitive, flexible, and impactful tool for the future of decentralized governance.</p>
          </div>

          <div>
            <CaseStudyImage
              src="/images/decent-app/gallery/decent-app-after.png"
              alt="The Redesigned Decent App"
              width={2880}
              height={1800}
              caption="The Redesigned Decent App"
              size="large"
            />
          </div>
          
        </section>  

        {/* Contact Section */}
        <div className={sharedStyles.darkOverlayBg}>
          <ContactMe id="case-study-connect" />
        </div>
      </main>
  );
} 
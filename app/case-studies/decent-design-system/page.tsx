// Decent Design System Case Study Page
'use client';

import styles from '@/styles/casestudy-shared.module.css';
import { projects } from '@/data/projects';
import { useRef } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import clsx from 'clsx';
import ParallaxHeroImage from '@/components/sections/case-studies/ParallaxHeroImage';
import ImageGallery from '@/components/sections/case-studies/ImageGallery';
import CaseStudyImage from '@/components/sections/case-studies/CaseStudyImage';
import { Icon } from '@/components/icons/Icon';
import { galleryImages } from './galleryData';
import sharedStyles from '@/styles/shared.module.css';

export default function DecentDesignSystemCaseStudy() {
  const project = projects.find((p) => p.route === '/case-studies/decent-design-system');
  const heroContentRef = useRef<HTMLDivElement>(null);

  if (!project) return null;

  return (
    <main className={sharedStyles.main}>
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
                Q3 2022 – Q4 2023
              </div>
            </div>
        
            <div className={styles.detailGroup}>
              <div className={styles.projectDetailLabel}>
                <Icon name="users" size={48} className={styles.subsectionIcon} />
                <h6 className={sharedStyles.displayBase}>Team</h6>
              </div>
              <div className={styles.projectDetailValue}>
                3 Designers, 5 Engineers
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className={clsx(styles.contentSections, sharedStyles.darkOverlayBg)}>
        <div className={clsx(sharedStyles.container)}>
          <div className={sharedStyles.darkContainer}>

            <div className={sharedStyles.contentContainer}>
              <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Overview</h2>
              <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Scaling a product across a diverse ecosystem requires consistency, efficiency, and collaboration. The Decent Design System was built to address this challenge by creating a unified design language that streamlined workflows, improved team alignment, and delivered consistent user experiences.</p>
              <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>As the Product Design Director, I spearheaded the development of the design system, working closely across the organization to ensure it met the needs of both developers and designers. Through this collaborative effort, the design system became a key enabler of scalability and innovation across the organization.</p>
            </div>

            <CaseStudyImage
              src="/images/decent-design-system/gallery/dds-spacing.png"
              alt="Spacing guidelines establish foundational consistency"
              width={2048}
              height={1185}
              caption="Spacing guidelines establish foundational consistency"
            />

            <div className={sharedStyles.contentContainer}>
              <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>The Journey</h2>
              <p className={sharedStyles.textBase}>The lack of a cohesive design framework had created inefficiencies: duplicated efforts, inconsistent branding, and communication silos. These challenges were not only slowing development but also impacting the user experience.</p>
              <p className={sharedStyles.textBase}>Recognizing potential for improvement, I spearheaded the effort to build a design system MVP that bridged the divide between design and development.</p>
            </div>

            <CaseStudyImage
              src="/images/decent-design-system/gallery/dds-brand-align.png"
              alt="I worked with the brand team to align the design system with the brand"
              width={2864}
              height={1426}
              caption="I worked with the brand team to align the design system with the brand"
            />

            <div className={sharedStyles.contentContainer}>
              <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Impact</h2>
              <div className={sharedStyles.gridColumns2}>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Design Impact</h3>
                  <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                    <li>Contributed to a Unified Design Language: Developed a comprehensive style guide covering colors, typography, and grid systems, ensuring visual consistency.</li>
                    <li>Created Reusable Components: Designed modular UI elements that streamlined design and development processes.</li>
                    <li>Implemented Design Tokens: Integrated dynamic attributes that allowed for design ownership over color palettes.</li>
                  </ul>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Customer Impact</h3>
                  <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                    <li>Reduced Cognitive Load for Developers: Simplified decision-making during development by providing clear design standards.</li>
                    <li>Increased Development Velocity: Enabled faster project timelines through reusable components and scalable workflows.</li>
                  </ul>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Business Impact</h3>
                  <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                    <li>Improved Efficiency: Reduced duplication of efforts and streamlined collaboration, cutting down project timelines.</li>
                    <li>Accelerated Product Development: Supported faster feature rollouts and scalability as new requirements emerged.</li>
                  </ul>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Financial Impact</h3>
                  <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                    <li>Increased Revenue: Faster time-to-market and improved product adoption drove higher earnings.</li>
                    <li>Decreased Costs: Reduced design and development inefficiencies contribute to operational savings.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={sharedStyles.contentContainer}>
              <h3 className={sharedStyles.subsectionTitle}>Design System Gallery</h3>
              <p className={sharedStyles.textBase}>Key screens from the Decent Design System showcasing the unified design language.</p>
              <ImageGallery images={galleryImages} />
            </div>

            <div className={sharedStyles.contentContainer}>
              <div>
                <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Strategy & Execution</h2>
              </div>
              <div className={sharedStyles.gridColumns3}>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Collaborative Design & Development</h3>
                  <p className={sharedStyles.textBase}>I interviewed my teammates across the org to uncover pain points during their product design, design handoff processes. Through testing and feedback sessions, we refined the system and our approach iteratively to craft a design system that fits the needs of the organization.</p>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Systematizing Scalability</h3>
                  <p className={sharedStyles.textBase}>The system was built with growth in mind. By implementing design tokens and modular components, the design system scaled seamlessly as new products and features were developed. Comprehensive documentation ensured that even as the organization expanded, the design system remained accessible and intuitive.</p>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Outcome-Oriented Process</h3>
                  <p className={sharedStyles.textBase}>Every decision, from component naming conventions to documentation format, was aligned with measurable outcomes:</p>
                  <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                    <li>Higher engagement: Team adoption metrics indicated increased usage of shared components.</li>
                    <li>Faster builds: Reduced iteration cycles led to measurable time savings on projects.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={sharedStyles.contentContainer}>
              <div>
                <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Key Learnings & Reflections</h2>
              </div>
              <div className={sharedStyles.gridColumns3}>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Design as a Tool for Empowerment</h3>
                  <p className={sharedStyles.textBase}>The system did more than improve efficiency—it empowered teams to innovate confidently within a unified framework.</p>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Collaboration Drives Success</h3>
                  <p className={sharedStyles.textBase}>Bringing together diverse voices ensured the design system met the real-world needs of every stakeholder.</p>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Scalability is Strategy</h3>
                  <p className={sharedStyles.textBase}>Building a flexible, scalable foundation allowed the system to adapt seamlessly to organizational growth and future needs.</p>
                </div>
              </div>
            </div>

            <div className={sharedStyles.contentContainer}>
              <div className={sharedStyles.gridColumns2}>
                <CaseStudyImage
                  src="/images/decent-design-system/gallery/dds-ui-topnav.png"
                  alt="Redesigned top navigation components"
                  width={2864}
                  height={1826}
                  caption="Redesigned top navigation components"
                />
                <CaseStudyImage
                  src="/images/decent-design-system/gallery/dds-menu-components.png"
                  alt="Menu components in the design system"
                  width={2864}
                  height={1826}
                  caption="Menu components in the design system"
                />
              </div>
            </div>

            <div className={sharedStyles.contentContainer}>
              <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Summary</h2>
              <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>The Decent Design System represents the intersection of creativity, collaboration, and strategy. By unifying visual language, empowering teams, and enabling scalable development, the system became more than a tool—it became a driver of growth and efficiency across the organization.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
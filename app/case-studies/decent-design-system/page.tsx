'use client';

import styles from '@/styles/casestudy-shared.module.css';
import { projects } from '@/data/projects';
import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import ImageGallery from '@/components/sections/case-studies/ImageGallery';
import CaseStudyImage from '@/components/sections/case-studies/CaseStudyImage';
import { Icon } from '@/components/icons/Icon';
import { galleryImages } from './galleryData';
import sharedStyles from '@/styles/shared.module.css';
import ContactMe from '@/components/sections/ContactMe';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function DecentDesignSystemCaseStudy() {
  const project = projects.find((p) => p.route === '/case-studies/decent-design-system');
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        gsap.to(window, { duration: 1, scrollTo: hash, ease: 'power2.out' });
      }
    }
  }, []);

  if (!project) return null;

  return (
    <main className={sharedStyles.main}>
      {/* Hero Section */}
      <section className={clsx(styles.hero)}>
        {project.imageUrl && (
          <div className={styles.heroImage}>
            <img src={project.imageUrl} alt={project.title} />
          </div>
        )}
        <div ref={heroContentRef} className={clsx(styles.heroContent)}>
          <h1 className={clsx(sharedStyles.displayText)}>{project.title}</h1>
        </div>
      </section>

      <section className={clsx(sharedStyles.lightSection, sharedStyles.paddingTopBottom)}>
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

        <div>
          <CaseStudyImage
            src="/images/decent-design-system/gallery/dds-spacing.png"
            alt="Spacing guidelines establish foundational consistency"
            width={2048}
            height={1185}
            caption="Spacing guidelines establish foundational consistency"
            size="large"
            priority={true}
          />
        </div>

        {/* Overview */}
        <div className={sharedStyles.containerSmall}>
          <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Overview</h2>
          <h3 className={styles.subsectionTitle}>A Need for Consistency</h3>
          <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Scaling a product across a diverse ecosystem requires consistency, efficiency, and collaboration. The Decent Design System was built to address this challenge by creating a unified design language that streamlined workflows, improved team alignment, and delivered consistent user experiences.</p>
          <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>As the Product Design Director, I spearheaded the development of the design system, working closely across the organization to ensure it met the needs of both developers and designers. Through this collaborative effort, the design system became a key enabler of scalability and innovation across the organization.</p>
        </div>

        <div>
          <CaseStudyImage
            src="/images/decent-design-system/gallery/dds-brand-align.png"
            alt="I worked with the brand team to align the design system with the brand"
            width={2864}
            height={1426}
            caption="I worked with the brand team to align the design system with the brand"
            size="large"
          />
        </div>

        {/* Impact */}
        <div className={sharedStyles.containerSmall}>
          <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Impact</h2>
          <h3 className={styles.subsectionTitle}>Design Impact</h3>
          <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
            <li>Contributed to a Unified Design Language: Developed a comprehensive style guide covering colors, typography, and grid systems, ensuring visual consistency.</li>
            <li>Created Reusable Components: Designed modular UI elements that streamlined design and development processes.</li>
            <li>Implemented Design Tokens: Integrated dynamic attributes that allowed for design ownership over color palettes.</li>
          </ul>

          <h3 className={styles.subsectionTitle}>Customer Impact</h3>
          <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
            <li>Reduced Cognitive Load for Developers: Simplified decision-making during development by providing clear design standards.</li>
            <li>Increased Development Velocity: Enabled faster project timelines through reusable components and scalable workflows.</li>
          </ul>

          <h3 className={styles.subsectionTitle}>Business Impact</h3>
          <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
            <li>Improved Efficiency: Reduced duplication of efforts and streamlined collaboration, cutting down project timelines.</li>
            <li>Accelerated Product Development: Supported faster feature rollouts and scalability as new requirements emerged.</li>
          </ul>

          <h3 className={styles.subsectionTitle}>Financial Impact</h3>
          <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
            <li>Increased Revenue: Faster time-to-market and improved product adoption drove higher earnings.</li>
            <li>Decreased Costs: Reduced design and development inefficiencies contribute to operational savings.</li>
          </ul>
        </div>

        <div className={sharedStyles.container}>
          <div className={sharedStyles.contentContainer}>
            <h3 className={styles.subsectionTitle}>Design System Gallery</h3>
            <p className={sharedStyles.textBase}>Key screens from the Decent Design System showcasing the unified design language.</p>
            <ImageGallery images={galleryImages} />
          </div>
        </div>

        {/* Strategy & Execution */}
        <div className={sharedStyles.containerSmall}>
          <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Strategy & Execution</h2>
          <h3 className={styles.subsectionTitle}>Collaborative Design & Development</h3>
          <p className={sharedStyles.textBase}>I interviewed my teammates across the org to uncover pain points during their product design, design handoff processes. Through testing and feedback sessions, we refined the system and our approach iteratively to craft a design system that fits the needs of the organization.</p>

          <h3 className={styles.subsectionTitle}>Systematizing Scalability</h3>
          <p className={sharedStyles.textBase}>The system was built with growth in mind. By implementing design tokens and modular components, the design system scaled seamlessly as new products and features were developed. Comprehensive documentation ensured that even as the organization expanded, the design system remained accessible and intuitive.</p>

          <h3 className={styles.subsectionTitle}>Outcome-Oriented Process</h3>
          <p className={sharedStyles.textBase}>Every decision, from component naming conventions to documentation format, was aligned with measurable outcomes:</p>
          <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
            <li>Higher engagement: Team adoption metrics indicated increased usage of shared components.</li>
            <li>Faster builds: Reduced iteration cycles led to measurable time savings on projects.</li>
          </ul>
        </div>

        <div className={sharedStyles.gridColumns2}>
          <CaseStudyImage
            src="/images/decent-design-system/gallery/dds-ui-topnav.png"
            alt="Redesigned top navigation components"
            width={2864}
            height={1826}
            caption="Redesigned top navigation components"
            size="medium"
          />
          <CaseStudyImage
            src="/images/decent-design-system/gallery/dds-menu-components.png"
            alt="Menu components in the design system"
            width={2864}
            height={1826}
            caption="Menu components in the design system"
            size="medium"
          />
        </div>

        {/* Summary */}
        <div className={sharedStyles.containerSmall}>
          <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Summary</h2>
          <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>The Decent Design System represents the intersection of creativity, collaboration, and strategy. By unifying visual language, empowering teams, and enabling scalable development, the system became more than a tool—it became a driver of growth and efficiency across the organization.</p>
        </div>
      </section>

      {/* Contact Section */}
      <div className={sharedStyles.darkOverlayBg}>
        <ContactMe id="case-study-connect" />
      </div>
    </main>
  );
} 
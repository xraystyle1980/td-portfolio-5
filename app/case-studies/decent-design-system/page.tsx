// Decent Design System Case Study Page
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
            <div className={styles.heroImageOverlay} />
          </div>
        )}
        <div ref={heroContentRef} className={clsx(styles.heroContent)}>
          <h1 className={clsx(sharedStyles.displayText)}>{project.title}</h1>
        </div>
      </section>

      <section className={clsx(sharedStyles.lightSection, sharedStyles.paddingTopBottom)}>
        <div className={sharedStyles.container}>
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
                Q3 2022 – Q4 2024
              </div>
            </div>

            <div className={styles.detailGroup}>
              <div className={styles.projectDetailLabel}>
                <Icon name="users" size={48} className={styles.subsectionIcon} />
                <h6 className={sharedStyles.displayBase}>Team</h6>
              </div>
              <div className={styles.projectDetailValue}>
                3 Designers, 5 Engineers across
              </div>
            </div>
          </div>
        </div>

        <div className={styles.imageWrapperPadding}>
          <CaseStudyImage
            src="/images/decent-design-system/gallery/dds-spacing.png"
            alt="Spacing guidelines establish foundational consistency"
            width={2048}
            height={1185}
            caption="Comprehensive spacing guidelines ensure consistent component layouts across the platform"
            size="large"
            priority={true}
          />
        </div>

        {/* Overview */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Overview</h2>
            <h3 className={styles.subsectionTitle}>A Need for Consistency</h3>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Scaling a product across a diverse ecosystem requires consistency, efficiency, and collaboration. The Decent Design System was built to address this challenge by creating a unified design language that streamlined workflows, improved team alignment, and delivered consistent user experiences.</p>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>I spearheaded the development of the design system, working closely across the organization to ensure it met the needs of both developers and designers. Through this collaborative effort, the design system became a key enabler of scalability and innovation across the organization.</p>
          </div>
        </div>

        <div className={styles.imageWrapperPadding}>
          <CaseStudyImage
            src="/images/decent-design-system/gallery/dds-brand-align.png"
            alt="Brand alignment in the design system"
            width={2864}
            height={1426}
            caption="Close collaboration with the brand team ensured the design system reflected Decent's visual identity"
            size="large"
          />
        </div>

        {/* Impact */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Impact</h2>
            <h3 className={styles.subsectionTitle}>Design Impact</h3>
            <h4 className={styles.subsectionListTitle}>Unified Design Language</h4>
            <p className={sharedStyles.textBase}>Developed a comprehensive style guide covering colors, typography, and grid systems, ensuring visual consistency.</p>
            
            <h4 className={styles.subsectionListTitle}>Component Library</h4>
            <p className={sharedStyles.textBase}>Designed modular UI elements that streamlined design and development processes.</p>
            
            <h4 className={styles.subsectionListTitle}>Design Tokens</h4>
            <p className={sharedStyles.textBase}>Integrated JSON tokens that allowed for design ownership over color palettes and typography.</p>

            <h5 className={styles.subsectionSubTitle}>What was the biggest challenge?</h5>
            <p className={sharedStyles.textBase}>Defining where and how the design system fit within the organization. What processes needed to change? What would become new? And most importantly, how do we make people want to use it? Adoption was a major hurdle, with myself and a front-end engineer as the primary advocates. Despite these challenges, the design system left a lasting impact, and I'm eager to see how it continues to evolve.</p>
          </div>
        </div>

        <div className={sharedStyles.container}>
          <div className={sharedStyles.contentContainer}>
            <h3 className={styles.subsectionTitle}>Design System Gallery</h3>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Key screens from the Decent Design System showcasing the unified design language.</p>
            <ImageGallery images={galleryImages} />
          </div>
        </div>

        {/* Strategy & Execution */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Strategy & Execution</h2>
            <h3 className={styles.subsectionTitle}>Collaborative Design & Development</h3>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>I interviewed my teammates across the org to uncover pain points during their product design, design handoff processes. Through testing and feedback sessions, we refined the system and our approach iteratively to craft a design system that fits the needs of the organization.</p>

            <h4 className={styles.subsectionListTitle}>Scalability First</h4>
            <p className={sharedStyles.textBase}>The system was built with growth in mind. By implementing design tokens and modular components, the design system scaled seamlessly as new products and features were developed.</p>

            <h4 className={styles.subsectionListTitle}>Documentation Focus</h4>
            <p className={sharedStyles.textBase}>Comprehensive documentation ensured that even as the organization expanded, the design system remained accessible and intuitive.</p>

            <h5 className={styles.subsectionSubTitle}>What worked well?</h5>
            <p className={sharedStyles.textBase}>Our focus on documentation and clear component guidelines encouraged high adoption rates. Teams could easily understand and implement components, reducing development time and inconsistencies.</p>
          </div>
        </div>

        <div className={sharedStyles.container}>
          <div className={clsx(sharedStyles.gridColumns2, sharedStyles.alignCenter)}>
            <CaseStudyImage
              src="/images/decent-design-system/gallery/dds-ui-topnav.png"
              alt="Redesigned top navigation components"
              width={2864}
              height={1826}
              caption="Standardized navigation components ensure consistent user experience across all products"
              size="medium"
            />
            <CaseStudyImage
              src="/images/decent-design-system/gallery/dds-menu-components.png"
              alt="Menu components in the design system"
              width={2864}
              height={1826}
              caption="Modular menu components adapt to various use cases while maintaining visual consistency"
              size="medium"
            />
          </div>
        </div>

        {/* Summary */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(styles.subsectionSmallTitle)}>Summary</h2>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>The Decent Design System laid the foundation for future development and collaboration. The Design System established a unified visual language, contributed to streamlined workflows, and helped to foster continued collaboration.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className={sharedStyles.darkOverlayBg}>
        <ContactMe id="case-study-connect" />
      </div>
    </main>
  );
} 
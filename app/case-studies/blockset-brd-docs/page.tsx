// Blockset BRD Docs Case Study Page
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

export default function BlocksetBRDDocsCaseStudy() {
  const project = projects.find((p) => p.route === '/case-studies/blockset-brd-docs');
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
      <section className={clsx(styles.hero, sharedStyles.gradientBottomTop)}>
        {project.imageUrl && (
          <div className={styles.heroImage}>
            <img src={project.imageUrl} alt={project.title} />
          </div>
        )}
        <div ref={heroContentRef} className={clsx(styles.heroContent)}>
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
              Q4 2020 – Q2 2021
            </div>
          </div>

          <div className={styles.detailGroup}>
            <div className={styles.projectDetailLabel}>
              <Icon name="users" size={48} className={styles.subsectionIcon} />
              <h6 className={sharedStyles.displayBase}>Team</h6>
            </div>
            <div className={styles.projectDetailValue}>
              2 organizations, 2 Designers, 3 Engineers, Product Manager
            </div>
          </div>

          <div className={styles.detailGroup}>
            <div className={styles.projectDetailLabel}>
              <Icon name="device-laptop" size={48} className={styles.subsectionIcon} />
              <h6 className={sharedStyles.displayBase}>Website</h6>
            </div>
          </div>

          </div>
        </div>

        <div>
          <CaseStudyImage
            src="/images/blockset-docs/gallery/bset-docs-home.png"
            alt="Blockset Docs Home"
            width={2880}
            height={1690}
            caption="Blockset Docs Home"
            size="large"
            priority={true}
          />
        </div>

        {/* Overview */}
        <div className={sharedStyles.containerSmall}>
          <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Overview</h2>
          <h3 className={styles.subsectionTitle}>Longer Headline</h3>
          <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Blockset, a blockchain data integration platform, enables engineering teams to build enterprise-grade blockchain applications. To enhance its adoption, the project required a robust documentation platform and a marketing website that could bridge the gap between technical nuance and user onboarding needs.</p>
          <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>As Lead Product Designer, I collaborated with BRD's internal design team, external stakeholders, and my team to create a unified documentation site and marketing page. These efforts helped improve developer confidence, streamline integration processes, and elevate Blockset's market presence.</p>
        </div>

        <div>
          <CaseStudyImage
            src="/images/blockset-docs/gallery/bset-sandbox.png"
            alt="Developer sandbox to test API requests"
            width={2880}
            height={2698}
            caption="Developer sandbox to test API requests"
            size="large"
            priority={true}
          />
        </div>

        {/* Approach & Key Contributions */}
        <div className={sharedStyles.containerSmall}>
          <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Approach & Key Contributions</h2>
          <h3 className={styles.subsectionTitle}>Strategic Design Process</h3>
          <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
            <li>Streamlined Information Architecture: Restructured existing documentation to improve accessibility and logical flow for developers.</li>
            <li>Synthesized Stakeholder Input: Integrated feedback from BRD's internal teams and external stakeholders to refine the platform's UX.</li>
            <li>Developed Interactive Marketing Features: Designed engaging tools, such as a pricing slider and feature prototypes, to showcase Blockset's offerings.</li>
          </ul>

          <h3 className={styles.subsectionTitle}>Developer-Focused Solutions</h3>
          <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
            <li>Enhanced Developer Experience: Developers felt more empowered and confident when integrating Blockset.</li>
            <li>Increased Engagement: Clearer documentation and sandbox tools encouraged deeper exploration of Blockset's features.</li>
          </ul>

          <h3 className={styles.subsectionTitle}>Business & Financial Impact</h3>
          <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
            <li>Accelerated Adoption: Enhanced resources streamlined onboarding for enterprises and developers.</li>
            <li>Market Differentiation: High-quality documentation set Blockset apart from competitors.</li>
            <li>Increased Revenue: Improved adoption rates contributed to new client acquisitions and higher revenue.</li>
            <li>Lowered Operational Costs: Comprehensive resources reduced support tickets, driving operational efficiency.</li>
          </ul>
        </div>

        <div className={sharedStyles.gridColumns2}>
          <CaseStudyImage
            src="/images/blockset-docs/gallery/bset-page-products.png"
            alt="Blockset Marketing Products Page"
            width={2880}
            height={4400}
            caption="Blockset Marketing Products Page"
            size="small"
          />
          <CaseStudyImage
            src="/images/blockset-docs/gallery/bset-page-pricing.png"
            alt="Blockset Marketing Pricing Page"
            width={2880}
            height={3752}
            caption="Blockset Marketing Pricing Page"
            size="small"
          />
        </div>

        <div className={sharedStyles.containerSmall}>
          <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Strategy & Execution</h2>
          <h3 className={styles.subsectionTitle}>Collaborative Design Process</h3>
          <p className={sharedStyles.textBase}>I worked closely with BRD's internal design team, stakeholders, and my team to align on project goals. By conducting usability testing and gathering iterative feedback, we ensured that the design addressed user needs and business objectives.</p>

          <h3 className={styles.subsectionTitle}>Delivering Developer-Focused Solutions</h3>
          <p className={sharedStyles.textBase}>The project prioritized developer tools, such as a sandbox and interactive documentation, to reduce onboarding friction and improve engagement. Clear, action-oriented resources made the integration process seamless.</p>

          <h3 className={styles.subsectionTitle}>Marketing Website Enhancements</h3>
          <p className={sharedStyles.textBase}>To elevate Blockset's positioning, we designed an interactive and visually compelling website that communicated technical features in an accessible way.</p>
        </div>

        <div>
          <CaseStudyImage
            src="/images/blockset-docs/gallery/bset-home-full.png"
            alt="Blockset Marketing Home Page"
            width={2880}
            height={4072}
            caption="Blockset Marketing Home Page"
            size="large"
          />
        </div>

        <div className={sharedStyles.containerSmall}>
          <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Summary</h2>
          <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>The Blockset documentation and marketing project illustrates the power of design to align user needs with business goals. By delivering tools that empowered developers and presented Blockset's value clearly, we enhanced the user experience and drove toward measurable business goals.</p>
        </div>
      </section>
  

    {/* Contact Section */}
    <div className={sharedStyles.darkOverlayBg}>
      <ContactMe id="case-study-connect" />
    </div>
  </main>
);
} 
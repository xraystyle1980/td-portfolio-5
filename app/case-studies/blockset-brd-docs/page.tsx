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

      <section className={clsx(sharedStyles.lightSection,sharedStyles.paddingTopBottom)}>
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

          {/* <div className={styles.detailGroup}>
            <div className={styles.projectDetailLabel}>
              <Icon name="device-laptop" size={48} className={styles.subsectionIcon} />
              <h6 className={sharedStyles.displayBase}>Website</h6>
            </div>
          </div> */}

          </div>
        </div>


        {/* Overview */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Overview</h2>
            <h3 className={styles.subsectionTitle}>Empowering Developer Success</h3>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Blockset, a blockchain data integration platform, enables engineering teams to build enterprise-grade blockchain applications. To enhance its adoption, the project required a robust documentation platform and a marketing website that could bridge the gap between technical nuance and user onboarding needs.</p>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>As Lead Product Designer, I collaborated with BRD's internal design team, external stakeholders, and my team to create a unified documentation site and marketing page. These efforts helped improve developer confidence, streamline integration processes, and elevate Blockset's market presence.</p>
          </div>
        </div>

        <div className={styles.imageWrapperPadding}>
          <CaseStudyImage
            src="/images/blockset-docs/gallery/bset-docs-home.png"
            alt="Blockset Docs Home"
            width={2880}
            height={1690}
            caption="The redesigned Blockset documentation homepage provides clear navigation and easy access to key resources"
            size="large"
            priority={true}
          />
        </div>

        {/* Approach & Key Contributions */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Approach & Key Contributions</h2>
            <h3 className={styles.subsectionTitle}>Strategic Design Process</h3>
            <h4 className={styles.subsectionListTitle}>Information Architecture</h4>
            <p className={sharedStyles.textBase}>Restructured existing documentation to improve accessibility and logical flow for developers.</p>
            
            <h4 className={styles.subsectionListTitle}>Stakeholder Collaboration</h4>
            <p className={sharedStyles.textBase}>Integrated feedback from BRD's internal teams and external stakeholders to refine the platform's UX.</p>
            <div className={styles.imageWrapperPadding}>
              <CaseStudyImage
                src="/images/blockset-docs/gallery/bset-sandbox.png"
                alt="Developer sandbox to test API requests"
                width={2880}
                height={2698}
                caption="Interactive API sandbox enables developers to test requests and explore endpoints in real-time"
                size="large"
                priority={true}
              />
            </div>
            <h4 className={styles.subsectionListTitle}>Interactive Features</h4>
            <p className={sharedStyles.textBase}>Designed engaging tools, such as a pricing slider and feature prototypes, to showcase Blockset's offerings.</p>

            <h5 className={styles.subsectionSubTitle}>What was the biggest challenge?</h5>
            <p className={sharedStyles.textBase}>Balancing technical depth with accessibility was our main challenge. We needed to provide comprehensive API documentation while ensuring the content remained approachable for developers at different experience levels.</p>
          </div>
        </div>

        <div className={sharedStyles.container}>
          <div className={clsx(sharedStyles.gridColumns2, sharedStyles.alignCenter)}>
            <CaseStudyImage
              src="/images/blockset-docs/gallery/bset-page-products.png"
              alt="Blockset Marketing Products Page"
              width={2880}
              height={4400}
              caption="Product features page highlighting Blockset's core capabilities and integration options"
              size="small"
            />
            <CaseStudyImage
              src="/images/blockset-docs/gallery/bset-page-pricing.png"
              alt="Blockset Marketing Pricing Page"
              width={2880}
              height={3752}
              caption="Interactive pricing page with customizable plans and feature comparison"
              size="small"
            />
          </div>
        </div>

        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Strategy & Execution</h2>
            <h3 className={styles.subsectionTitle}>Collaborative Design Process</h3>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>I worked closely with BRD's internal design team, stakeholders, and my team to align on project goals. By conducting usability testing and gathering iterative feedback, we ensured that the design addressed user needs and business objectives.</p>

            <h4 className={styles.subsectionListTitle}>Developer-First Approach</h4>
            <p className={sharedStyles.textBase}>The project prioritized developer tools, such as a sandbox and interactive documentation, to reduce onboarding friction and improve engagement.</p>

            <h4 className={styles.subsectionListTitle}>Marketing Integration</h4>
            <p className={sharedStyles.textBase}>To elevate Blockset's positioning, we designed an interactive and visually compelling website that communicated technical features in an accessible way.</p>

            <h5 className={styles.subsectionSubTitle}>What worked well?</h5>
            <p className={sharedStyles.textBase}>The interactive API sandbox proved to be a game-changer, allowing developers to experiment with endpoints before committing to integration. This hands-on approach significantly reduced the time from discovery to implementation.</p>
          </div>
        </div>

        <div className={styles.imageWrapperPadding}>
          <CaseStudyImage
            src="/images/blockset-docs/gallery/bset-home-full.png"
            alt="Blockset Marketing Home Page"
            width={2880}
            height={4072}
            caption="The marketing homepage combines technical credibility with clear value propositions"
            size="large"
          />
        </div>

        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Summary</h2>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>The Blockset documentation and marketing project illustrates the power of design to align user needs with business goals. By delivering tools that empowered developers and presented Blockset's value clearly, we enhanced the user experience and drove toward measurable business goals.</p>
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
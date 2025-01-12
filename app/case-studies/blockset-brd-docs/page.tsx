// Blockset BRD Docs Case Study Page
'use client';

import styles from '@/styles/casestudy-shared.module.css';
import { projects } from '@/data/projects';
import { useRef } from 'react';
import clsx from 'clsx';
import ParallaxHeroImage from '@/components/sections/case-studies/ParallaxHeroImage';
import ImageGallery from '@/components/sections/case-studies/ImageGallery';
import CaseStudyImage from '@/components/sections/case-studies/CaseStudyImage';
import { Icon } from '@/components/icons/Icon';
import { galleryImages } from './galleryData';
import sharedStyles from '@/styles/shared.module.css';
import ContactMe from '@/components/sections/ContactMe';

export default function BlocksetBRDDocsCaseStudy() {
  const project = projects.find((p) => p.route === '/case-studies/blockset-brd-docs');
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
                <Icon name="coffee-alt" className={styles.subsectionIcon} />
                <h6 className={sharedStyles.displayBase}>Role</h6>
              </div>
              <div className={styles.projectDetailValue}>
                Product Design Director
              </div>
            </div>

            <div className={styles.detailGroup}>
              <div className={styles.projectDetailLabel}>
                <Icon name="calendar-tomorrow" size={48} className={styles.subsectionIcon} />
                <h6 className={sharedStyles.displayBase}>Duration</h6>
              </div>
              <div className={styles.projectDetailValue}>
                Q1 2022 – Q4 2023
              </div>
            </div>

            <div className={styles.detailGroup}>
              <div className={styles.projectDetailLabel}>
                <Icon name="users" size={48} className={styles.subsectionIcon} />
                <h6 className={sharedStyles.displayBase}>Team</h6>
              </div>
              <div className={styles.projectDetailValue}>
                2 Designers, 3 Engineers, Product Manager
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
              <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Blockset, a blockchain data integration platform, enables engineering teams to build enterprise-grade blockchain applications. To enhance its adoption, the project required a robust documentation platform and a marketing website that could bridge the gap between technical nuance and user onboarding needs.</p>
              <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>As Lead Product Designer, I collaborated with BRD's internal design team, external stakeholders, and my team to create a unified documentation site and marketing page. These efforts helped improve developer confidence, streamline integration processes, and elevate Blockset's market presence.</p>
            </div>

            <div className={sharedStyles.contentContainer}>
              <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>The Journey</h2>
              <p className={sharedStyles.textBase}>Developers needed a clearer, more accessible documentation platform to simplify their onboarding experience. The marketing website had to present Blockset's technical capabilities in a way that resonated with enterprise clients.</p>
              <CaseStudyImage
                src="/images/blockset-docs/gallery/bset-docs-home.png"
                alt="Blockset Docs Home"
                width={2880}
                height={1690}
                caption="Blockset Docs Home"
              />
              <p className={sharedStyles.textBase}>I led the design and execution of this initiative on the Decent side, focusing on delivering developer-centric tools while enhancing the platform's business appeal. This required synthesizing input across multiple teams, iterating based on user feedback, and ensuring the final product balanced technical depth with usability.</p>
            </div>

            <div className={sharedStyles.contentContainer}>
              <h3 className={sharedStyles.subsectionTitle}>Interface Gallery</h3>
              <p className={sharedStyles.textBase}>Key screens from the Blockset BRD Docs showcasing the redesigned interface and improved user experience.</p>
              <ImageGallery images={galleryImages} />
            </div>

            <div className={sharedStyles.contentContainer}>
              <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Impact</h2>
              <div className={sharedStyles.gridColumns2}>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Design Impact</h3>
                  <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                    <li>Streamlined Information Architecture: Restructured existing documentation to improve accessibility and logical flow for developers.</li>
                    <li>Synthesized Stakeholder Input: Integrated feedback from BRD's internal teams and external stakeholders to refine the platform's UX.</li>
                    <li>Developed Interactive Marketing Features: Designed engaging tools, such as a pricing slider and feature prototypes, to showcase Blockset's offerings.</li>
                  </ul>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Customer Impact</h3>
                  <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                    <li>Enhanced Developer Experience: Developers felt more empowered and confident when integrating Blockset.</li>
                    <li>Increased Engagement: Clearer documentation and sandbox tools encouraged deeper exploration of Blockset's features.</li>
                  </ul>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Business Impact</h3>
                  <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                    <li>Accelerated Adoption: Enhanced resources streamlined onboarding for enterprises and developers.</li>
                    <li>Market Differentiation: High-quality documentation set Blockset apart from competitors.</li>
                  </ul>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Financial Impact</h3>
                  <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
                    <li>Increased Revenue: Improved adoption rates contributed to new client acquisitions and higher revenue.</li>
                    <li>Lowered Operational Costs: Comprehensive resources reduced support tickets, driving operational efficiency.</li>
                  </ul>
                </div>
              </div>
            </div>

            <CaseStudyImage
              src="/images/blockset-docs/gallery/bset-sandbox.png"
              alt="Developer sandbox to test API requests"
              width={2880}
              height={2698}
              caption="Developer sandbox to test API requests"
            />

            <div className={sharedStyles.contentContainer}>
              <div>
                <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Strategy & Execution</h2>
              </div>
              <div className={sharedStyles.gridColumns3}>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Collaborative Design Process</h3>
                  <p className={sharedStyles.textBase}>I worked closely with BRD's internal design team, stakeholders, and my team to align on project goals. By conducting usability testing and gathering iterative feedback, we ensured that the design addressed user needs and business objectives.</p>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Delivering Developer-Focused Solutions</h3>
                  <p className={sharedStyles.textBase}>The project prioritized developer tools, such as a sandbox and interactive documentation, to reduce onboarding friction and improve engagement. Clear, action-oriented resources made the integration process seamless.</p>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Marketing Website Enhancements</h3>
                  <p className={sharedStyles.textBase}>To elevate Blockset's positioning, we designed an interactive and visually compelling website that communicated technical features in an accessible way.</p>
                </div>
              </div>
            </div>

            <div className={sharedStyles.contentContainer}>
              <div>
                <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Key Learnings & Reflections</h2>
              </div>
              <div className={sharedStyles.gridColumns3}>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Empowering Developers Enhances Engagement</h3>
                  <p className={sharedStyles.textBase}>By designing developer-centric tools, we significantly reduced friction in the onboarding process, boosting confidence and satisfaction.</p>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Collaboration Drives Innovation</h3>
                  <p className={sharedStyles.textBase}>Synthesizing feedback across teams ensured that the final product resonated with both technical users and stakeholders.</p>
                </div>
                <div>
                  <h3 className={sharedStyles.subsectionTitle}>Balancing Complexity and Clarity</h3>
                  <p className={sharedStyles.textBase}>Finding the right balance between technical depth and usability was critical in creating resources that were both functional and engaging.</p>
                </div>
              </div>
            </div>

            <div className={sharedStyles.contentContainer}>
              <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Summary</h2>
              <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>The Blockset documentation and marketing project illustrates the power of design to align user needs with business goals. By delivering tools that empowered developers and presented Blockset's value clearly, we enhanced the user experience and drove toward measurable business goals.</p>
            </div>
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
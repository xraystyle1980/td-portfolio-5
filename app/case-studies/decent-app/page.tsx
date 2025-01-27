// Decent App Case Study Page
'use client';

import styles from '@/styles/casestudy-shared.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { projects } from '@/data/projects';
import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/icons/Icon';
import ImageGallery from '@/components/sections/case-studies/ImageGallery';
import CaseStudyImage from '@/components/sections/case-studies/CaseStudyImage';
import { galleryImages } from './galleryData';
import ContactMe from '@/components/sections/ContactMe';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function DecentAppCaseStudy() {
  const project = projects.find((p) => p.route === '/case-studies/decent-app');
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

        

        {/* The Challenge */}
        <div className={sharedStyles.containerSmall}>
          <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>The Challenge</h2>
          <h3 className={styles.subsectionTitle}>A Need for Evolution</h3>
          <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Fractal, the original product, was falling short of user expectations. The decentralized governance space had evolved, and Fractal's rigid smart contract structures limited adoption. Users found it complex, inflexible, and outdated.</p>
          <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>I led the product design aspect of the transition to Decent, working closely with product and engineering. My role was pivotal in shaping an intuitive, adaptable experience  while ensuring that the experience met both user and business needs. My team leaned on me to bring structure to an ambiguous problem space, translating research into action and ensuring that our design decisions balanced usability with technical feasibility.</p>
        </div>

        <div className={styles.imageWrapperPadding}>
          <CaseStudyImage
            src="/images/decent-app/gallery/fractal-before.png"
            alt="The original Fractal interface"
            width={2020}
            height={1100}
            caption="The original Fractal interface"
            size="large"
          />
          <CaseStudyImage
            src="/images/decent-app/gallery/decent-app-after.png"
            alt="The Redesigned Decent App"
            width={2020}
            height={1100}
            caption="The Redesigned Decent App"
            size="large"
          />
        </div>

        {/* Approach & Key Contributions */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Approach & Key Contributions</h2>
            <h3 className={styles.subsectionTitle}>Strategic Repositioning & Product Redesign</h3>
            
            <h6 className={styles.subsectionListTitle}>Bridging user insights with business needs</h6>
            <p className={sharedStyles.textBase}>I conducted extensive user research & market analysis, identifying gaps in Fractal's offering that hindered adoption.</p>
            <h6 className={styles.subsectionListTitle}>Aligning stakeholders</h6>
            <p className={sharedStyles.textBase}>I facilitated cross-functional workshops, ensuring alignment across product, engineering, and leadership.</p>
            <h6 className={styles.subsectionListTitle}>Creating a design foundation</h6>
            <p className={sharedStyles.textBase}>I defined core UX principles, focusing on scalability, usability, and modularity to ensure the product could evolve efficiently.</p>

            <h4 className={styles.subsectionSubTitle}>Biggest challenge?</h4>
            <p className={sharedStyles.textBase}>Rethinking traditional UX within the constraints of blockchain. I had to bridge the gap between user expectations and technical limitations, advocating for usability improvements while ensuring feasibility for engineers. This required a mix of strategic negotiation, creative problem-solving, and a deep understanding of decentralized systems.</p>
          </div>
        </div>

        <div className={sharedStyles.container}>
          <div className={sharedStyles.gridColumns3}>
            <CaseStudyImage
              src="/images/decent-app/gallery/mobile-variants.png"
              alt=""
              width={1283}
              height={852}
              caption=""
              size="large"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/mobile-variants.png"
              alt=""
              width={1283}
              height={852}
              caption=""
              size="large"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/mobile-variants.png"
              alt=""
              width={1283}
              height={852}
              caption=""
              size="large"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/mobile-variants.png"
              alt=""
              width={1283}
              height={852}
              caption=""
              size="large"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/mobile-variants.png"
              alt=""
              width={1283}
              height={852}
              caption=""
              size="large"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/mobile-variants.png"
              alt=""
              width={1283}
              height={852}
              caption=""
              size="large"
            />
          </div>
        </div>
        {/* Collaborative & Iterative Design Process */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h3 className={styles.subsectionTitle}>Collaborative & Iterative Design Process</h3>

            <h4 className={styles.subsectionListTitle}>Refining UX through engineering collaboration</h4>
            <p className={sharedStyles.textBase}>I worked closely with engineers in a pair-programming-inspired design process, ensuring usability was considered at every stage.</p>
            <h4 className={styles.subsectionListTitle}>Validating through rapid feedback loops</h4>
            <p className={sharedStyles.textBase}>I conducted weekly user feedback sessions, testing prototypes to uncover pain points and refine key flows.</p>
            <h4 className={styles.subsectionListTitle}>Ensuring accessibility & intuitive interactions</h4>
            <p className={sharedStyles.textBase}>I led multiple rounds of prototyping & usability testing, iterating designs based on real-world friction.</p>

            <h5 className={styles.subsectionSubTitle}>What was the hardest part?</h5>
            <p className={sharedStyles.textBase}>Designing for decentralized governance was complex and unpredictable—each DAO had unique needs. Balancing customization with simplicity took multiple iterations and deep collaboration with engineers.</p>
          </div>
        </div>

        {/* What did my team lean on me for?
            • Translating user research into clear, actionable design decisions
            • Problem-solving UX complexities within governance models
            • Ensuring designs were scalable and technically feasible */}

        {/* <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
          <li></li>
        </ul> */}

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

        {/* Scalable UI System & Brand Evolution */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h3 className={styles.subsectionTitle}>Scalable Design System & Brand Evolution</h3>

            <h4 className={styles.subsectionListTitle}>Building a scalable foundation</h4>
            <p className={sharedStyles.textBase}>I designed a UI component library using Chakra UI, ensuring rapid development and consistency.</p>
            <h4 className={styles.subsectionListTitle}>Collaborating with brand designers</h4>
            <p className={sharedStyles.textBase}>I worked closely with Decent's brand and visual designers, who developed the new brand identity. I translated their vision into a functional and cohesive UI, ensuring that the design system reflected their branding principles.</p>
            <h4 className={styles.subsectionListTitle}>Maintaining design consistency</h4>
            <p className={sharedStyles.textBase}>I developed comprehensive design guidelines & documentation, ensuring alignment across teams and seamless implementation of the new branding.</p>

            <h5 className={styles.subsectionSubTitle}>What mistakes cost time & energy?</h5>
            <p className={sharedStyles.textBase}>Early on, we underestimated the complexity of integrating business features into a blockchain based governance app. I had to rework key components after realizing that certain design decisions wouldn't scale effectively.</p>
          </div>
        </div>

        {/* Quality Assurance & Continuous Improvement */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h3 className={styles.subsectionTitle}>Quality Assurance & Continuous Improvement</h3>

            <h4 className={styles.subsectionListTitle}>Design QA as a proactive process</h4>
            <p className={sharedStyles.textBase}>I integrated QA workflows into the engineering pipeline, catching inconsistencies before launch.</p>
            <h4 className={styles.subsectionListTitle}>Pixel-perfect execution</h4>
            <p className={sharedStyles.textBase}>I provided detailed GitHub design feedback, ensuring designs translated accurately into code.</p>
            <h4 className={styles.subsectionListTitle}>Post-launch iteration</h4>
            <p className={sharedStyles.textBase}>I analyzed user behavior and usability tests, making iterative improvements to enhance the experience.</p>

            <h5 className={styles.subsectionSubTitle}>Was this a successful project?</h5>
            <p className={sharedStyles.textBase}>Yes—while the transition was challenging, Decent successfully launched with a **scalable and user-friendly design**. My work made governance easier to adopt, more intuitive, and visually aligned with the brand.</p>
          </div>
        </div>

        <div className={styles.imageWrapperPadding}>
          <CaseStudyImage
            src="/images/decent-app/gallery/decent-app-after.png"
            alt="The Redesigned Decent App"
            width={2880}
            height={1800}
            caption="The Redesigned Decent App"
            size="large"
          />
        </div>

        <div className={sharedStyles.container}>
          <div className={sharedStyles.contentContainer}>
            <h3 className={styles.subsectionTitle}>Design System Gallery</h3>
            <p className={sharedStyles.textBase}>Key screens from the Decent Design System showcasing the unified design language.</p>
            <ImageGallery images={galleryImages} />
          </div>
        </div>


        {/* Final Thoughts */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Final Thoughts</h2>
            <h3 className={styles.subsectionTitle}>A Strategic Transformation</h3>
            <p className={sharedStyles.textBase}>The shift from Fractal to Decent was more than a redesign—it was a strategic transformation that redefined the product's value. Through user insights, iterative design, and seamless cross-functional collaboration, we built a scalable DAO toolkit that meets the evolving needs of decentralized governance.</p>

            <h4 className={styles.subsectionTitle}>Key Outcomes</h4>
            <h5 className={styles.subsectionListTitle}>Increased adoption</h5>
            <p className={sharedStyles.textBase}>Active DAOs grew in the first few months post-launch.</p>
            <h5 className={styles.subsectionListTitle}>Enhanced UX</h5>
            <p className={sharedStyles.textBase}>Usability testing showed reduced onboarding friction, boosting retention.</p>

            <h4 className={styles.subsectionListTitle}>My Contributions</h4>
            <ul className={clsx(sharedStyles.subsectionList, sharedStyles.textBase)}>
              <li>I defined the UX vision, translating research into actionable design improvements.</li>
              <li>I led the development of a scalable UI system for long-term flexibility.</li>
              <li>I aligned branding and UI to reflect Decent's new identity.</li>
              <li>I streamlined governance workflows to reduce friction for DAOs.</li>
              <li>I integrated QA workflows and iterated post-launch for continuous improvement.</li>
            </ul>
    
            <p className={sharedStyles.textBase}>Decent is now a more intuitive, flexible, and scalable product, empowering DAOs to govern effectively. This case study highlights my ability to navigate ambiguity, balance user needs with technical constraints, and drive strategic design impact.</p>
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




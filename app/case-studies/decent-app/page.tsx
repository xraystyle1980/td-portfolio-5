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
import CaseStudyVideo from '@/components/sections/case-studies/CaseStudyVideo';
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
          <h2 className={clsx(styles.subsectionSmallTitle)}>The Challenge</h2>
          <h3 className={styles.subsectionTitle}>A Need for Evolution</h3>
          <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Fractal, the original product, was falling short of user expectations. The decentralized governance space had evolved, and Fractal's rigid smart contract structures limited adoption. Users found it complex, inflexible, and outdated.</p>
          <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>I led the product design aspect of the transition to Decent, working closely with product and engineering. My role was pivotal in shaping an intuitive, adaptable experience while ensuring that the experience met both user and business needs. My team leaned on me to bring structure to an ambiguous problem space, translating research into action and ensuring that our design decisions balanced usability with technical feasibility. A key challenge was bridging the usability gap between Web2 and Web3 by integrating familiar business features into the platform, making decentralized governance more accessible to traditional organizations.</p>
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
            <h2 className={clsx(styles.subsectionSmallTitle)}>Approach & Key Contributions</h2>
            <h3 className={styles.subsectionTitle}>Strategic Repositioning & Product Redesign</h3>
            <p className={sharedStyles.textBase}>Fractal's transition to Decent wasn't just a redesign—it was a strategic shift to redefine its value in the market. The challenge? Balancing blockchain's technical constraints with user expectations while ensuring the product remained scalable and intuitive.</p>
            <h6 className={styles.subsectionListTitle}>Bridging user insights with business needs</h6>
            <p className={sharedStyles.textBase}>I conducted extensive user research & market analysis, identifying gaps in Fractal's offering that hindered adoption.</p>
            <h6 className={styles.subsectionListTitle}>Aligning stakeholders</h6>
            <p className={sharedStyles.textBase}>I facilitated cross-functional workshops, ensuring alignment across product, engineering, and leadership.</p>
            <h6 className={styles.subsectionListTitle}>Creating a design foundation</h6>
            <p className={sharedStyles.textBase}>I defined core UX principles, focusing on scalability, usability, and modularity to ensure the product could evolve efficiently.</p>
            <h4 className={styles.subsectionSubTitle}>Biggest challenge?</h4>
            <p className={sharedStyles.textBase}>Rethinking traditional UX within the constraints of blockchain technology. I had to bridge the gap between user expectations and technical limitations, advocating for usability improvements while ensuring feasibility for engineers. This required a mix of strategic negotiation, creative problem-solving, and a deep understanding of decentralized systems. By integrating traditional business features into the platform, I helped make Web3 governance feel more familiar and intuitive for users transitioning from Web2 environments.</p>
          </div>
        </div>

        <div className={sharedStyles.container}>
          <div className={clsx(sharedStyles.gridColumns2, sharedStyles.alignCenter)}>
            <CaseStudyImage
              src="/images/decent-app/gallery/mobile-variants.png"
              alt="Mobile variants of possible home page designs"
              width={1283}
              height={852}
              caption="Mobile variants of possible home page designs"
              size="large"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/home-page-a.png"
              alt="Desktop variant designs exporing search bar placement"
              width={1280}
              height={832}
              caption="Desktop variant designs exporing search bar placement"
              size="large"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/home-page-b.png"
              alt="Exploring multiple ways to present the features"
              width={1280}
              height={832}
              caption="Exploring multiple ways to present the features"
              size="large"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/home-page-e.png"
              alt="Placing emphasis on search"
              width={1280}
              height={832}
              caption="Placing emphasis on search"
              size="large"
            />
          </div>
        </div>
        {/* Collaborative & Iterative Design Process */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h3 className={styles.subsectionTitle}>Collaborative & Iterative Design Process</h3>
            <p className={sharedStyles.textBase}>Working closely with the Head of Design, Product, and Engineering teams, I translated user research into clear, actionable design decisions, navigated complex UX challenges while preserving a familiar user experience, and ensured that designs were both scalable and technically feasible.</p>

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

        <div className={sharedStyles.container}>
          <div className={clsx(sharedStyles.gridColumns2, sharedStyles.alignCenter)}>
            <CaseStudyImage
              src="/images/decent-app/gallery/decent-brand-1.png"
              alt="Decent's Creative Director and Visual Branding Designer established a new brand direction"
              width={1756}
              height={1287}
              caption="Decent's Creative Director and Visual Branding Designer established a new brand direction"
              size="large"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/decent-brand-2.png"
              alt="New brand direction establishes foundational spacing"
              width={1355}
              height={1303}
              caption="New brand direction establishes foundational spacing"
              size="large"
            />
          </div>
          <div className={clsx(sharedStyles.gridColumns3, sharedStyles.alignCenter)}>
            <CaseStudyImage
              src="/images/decent-app/gallery/decent-brand-error-mobile.png"
              alt="Custom illustrations give the app a unique personality"
              width={835}
              height={844}
              caption="Custom illustrations give the app a unique personality"
              size="large"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/decent-brand-error-desktop-1.png"
              alt="Proper error handling informs the user"
              width={1280}
              height={882}
              caption="Proper error handling informs the user"
              size="large"
            />
            <CaseStudyImage
              src="/images/decent-app/gallery/decent-brand-error-desktop-2.png"
              alt="The ability to collect feedback allows user to add context"
              width={1280}
              height={882}
              caption="The ability to collect feedback allows user to add context"
              size="large"
            />
          </div>
        </div>


        {/* Scalable UI System & Brand Evolution */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h3 className={styles.subsectionTitle}>Scalable Design System & Brand Evolution</h3>
            <p className={sharedStyles.textBase}>Design systems thrive on continuous communication—early and often. Supporting the builders, tending to the system like a garden, and finding overlapping touchpoints between teams were key to ensuring a smooth collaboration. Documenting these workflows became just as important as the designs themselves, creating a shared language across teams.</p>
            <h4 className={styles.subsectionListTitle}>Building a scalable foundation</h4>
            <p className={sharedStyles.textBase}>I based the UI component library on classes and properties from Chakra UI, ensuring alignment and easier handoff to the engineering team.</p>
            <h4 className={styles.subsectionListTitle}>Collaborating with brand designers</h4>
            <p className={sharedStyles.textBase}>I worked closely with Decent's brand and visual designers to translate their new identity into a functional UI, ensuring the design system aligned with their branding principles.</p>
            <h4 className={styles.subsectionListTitle}>Maintaining design consistency</h4>
            <p className={sharedStyles.textBase}>I contributed to comprehensive design guidelines and documentation, ensuring alignment across teams and providing org-wide direction. Specifically, my contribution was creating and maintaining a Notion database for components, documenting their usage and properties.</p>

            <h5 className={styles.subsectionSubTitle}>What mistakes cost time & energy?</h5>
            <p className={sharedStyles.textBase}>Early on, we underestimated the complexity of integrating business features into a blockchain based governance app. I had to rework key components after realizing that certain design decisions wouldn't scale effectively.</p>
          </div>
        </div>
        
        <div className={sharedStyles.containerSmall}>
          <CaseStudyVideo
            src="/images/decent-app/gallery/decent-withdraw-desktop-hb.mp4"
            caption="Prototyping the withdrawal flow"
            size="large"
          />
        </div>

        {/* Quality Assurance & Continuous Improvement */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h3 className={styles.subsectionTitle}>Quality Assurance & Continuous Improvement</h3>
            <p className={sharedStyles.textBase}>I championed internal QA at every opportunity, advocating for thorough design reviews and detailed feedback to ensure a polished final product. As the company formalized weekly QA sessions, I actively supported the process, reinforcing its value across teams.</p>
            <h4 className={styles.subsectionListTitle}>Pixel-perfect execution</h4>
            <p className={sharedStyles.textBase}>I provided detailed GitHub design feedback, working directly with engineers to ensure designs were accurately translated into code. This facilitated rapid iteration and created a strong feedback loop between design and development.</p>
            <h4 className={styles.subsectionListTitle}>Post-launch iteration</h4>
            <p className={sharedStyles.textBase}>I analyzed user behavior and usability tests to make continuous improvements, refining the experience based on real-world usage.</p>

            <h5 className={styles.subsectionSubTitle}>Was this a successful project?</h5>
            <p className={sharedStyles.textBase}>Yes—while the transition was challenging, Decent successfully launched with a scalable and user-friendly design. My work helped bridge the gap between Web3 and Web2 users, making governance easier to adopt, more intuitive, and visually aligned with the brand.</p>
          </div>
        </div>


        <div className={sharedStyles.container}>
          <div className={clsx(sharedStyles.gridColumns2, sharedStyles.alignCenter)}>
          <CaseStudyVideo
            src="/images/decent-app/gallery/decent-roles-mobile-hb.mp4"
            caption="Mobile prototype of user adding a payment to a role"
            size="small"
          />
            <CaseStudyImage
              src="/images/decent-app/gallery/decent-spacing-notes.png"
              alt="Annotated notes for pixel perfect spacing"
              width={741}
              height={1171}
              caption="Annotated notes for pixel perfect spacing"
              size="medium"
            />
          </div>
        </div>
  


        {/* Final Thoughts */}
        <div className={sharedStyles.containerSmall}>
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(styles.subsectionSmallTitle, styles.pullDown)}>Final Thoughts</h2>
            <h3 className={styles.subsectionTitle}>A Strategic Transformation</h3>
            <p className={sharedStyles.textBase}>The shift from Fractal to Decent was more than a redesign—it was a strategic transformation that redefined the product's value. Through user insights, iterative design, and seamless cross-functional collaboration, we built a scalable DAO toolkit that meets the evolving needs of decentralized governance. A major success was integrating traditional business features to make decentralized governance more accessible to Web2 users.</p>

            <h4 className={styles.subsectionTitle}>Key Outcomes</h4>
            <h5 className={styles.subsectionListTitle}>Increased adoption</h5>
            <p className={sharedStyles.textBase}>Active DAOs grew in the first few months post-launch, driving an increase in user base and total value locked (TVL) on the platform.</p>
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
    
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Decent is now a more intuitive, flexible, and scalable product, empowering DAOs to govern effectively. This case study highlights my ability to navigate ambiguity, balance user needs with technical constraints, and drive strategic design impact.</p>
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




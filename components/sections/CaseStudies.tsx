'use client';

import { projects } from '@/data/projects'
import ProjectSection from './case-studies/ProjectSection'
import sharedStyles from '@/styles/shared.module.css'
import styles from './CaseStudies.module.css'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Work() {
  const headingRef = useRef<HTMLDivElement>(null);
  const diagonalSplitRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<number>(0);

  // Effect for height tracking
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Function to update height
    const updateHeight = () => {
      if (diagonalSplitRef.current) {
        const height = diagonalSplitRef.current.offsetHeight;
        setSectionHeight(height);
        // Set the CSS custom property
        document.documentElement.style.setProperty('--diagonal-split-height', `${height}px`);
        console.log('Diagonal Split height:', height); // For debugging
      }
    };

    // Initial measurement after a brief delay to ensure styles are applied
    setTimeout(updateHeight, 100);

    // Use ResizeObserver for more reliable size tracking
    const resizeObserver = new ResizeObserver(updateHeight);
    if (diagonalSplitRef.current) {
      resizeObserver.observe(diagonalSplitRef.current);
    }

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      // Clean up the CSS custom property
      document.documentElement.style.removeProperty('--diagonal-split-height');
    };
  }, []);

  // Effect for scroll animation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const headline = headingRef.current?.querySelector('h2');
      if (!headline) return;

      // Calculate angle-based movement
      const distance = 800; // Increased from 200 for more dramatic effect
      const angle = 15; // 15 degrees
      const radians = angle * (Math.PI / 180);
      const xDistance = Math.cos(radians) * distance;
      const yDistance = Math.sin(radians) * distance;

      gsap.set(headline, {
        opacity: 0,
        visibility: "hidden",
        x: -xDistance,
        y: yDistance,
      });

      gsap.to(headline, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
          markers: true,
          scrub: 1
        },
        opacity: 1,
        visibility: "visible",
        x: 0,
        y: 0,
        duration: 0.48,
        ease: "power2.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={clsx(sharedStyles.gridRows3SectionWrapper)}>
      <div ref={diagonalSplitRef} className={sharedStyles.diagonalSplit}>
        <div ref={headingRef} className={clsx(sharedStyles.sectionHeadingWrapper, sharedStyles.container)}>
          <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionHeading, sharedStyles.skew, styles.caseStudiesHeading)}>
            Case Studies
          </h2>
        </div>
      </div>
      <div className={sharedStyles.lightSection}>
        <section id="case-studies" className={clsx(sharedStyles.paddingBottom, sharedStyles.container, sharedStyles.lightSection)}>
          <div className={`${styles.projects} projects`}>
            {projects.map((project) => (
              <ProjectSection 
                key={project.title} 
                project={project}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
} 
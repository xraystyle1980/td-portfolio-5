'use client';

import { projects } from '@/data/projects'
import ProjectSection from './case-studies/ProjectSection'
import sharedStyles from '@/styles/shared.module.css'
import styles from './CaseStudies.module.css'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function Work() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingWrapperRef = useRef<HTMLDivElement>(null);
  const diagonalSplitRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState<number>(0);

  // Effect for height tracking
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateHeight = () => {
      if (diagonalSplitRef.current) {
        const height = diagonalSplitRef.current.offsetHeight;
        setSectionHeight(height);
        document.documentElement.style.setProperty('--diagonal-split-height', `${height}px`);
      }
    };

    setTimeout(updateHeight, 100);

    const resizeObserver = new ResizeObserver(updateHeight);
    if (diagonalSplitRef.current) {
      resizeObserver.observe(diagonalSplitRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      document.documentElement.style.removeProperty('--diagonal-split-height');
    };
  }, []);

  // Effect for scroll animation with MotionPath
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const headlineWrapper = headingWrapperRef.current;
      if (!headlineWrapper) return;

      // Calculate the straight line path at 15 degrees
      const distance = 800;
      const angle = 15;
      const radians = angle * (Math.PI / 180);
      const xDistance = Math.cos(radians) * distance;
      const yDistance = Math.sin(radians) * distance;

      // Define the straight line path
      const path = [
        { x: -xDistance, y: yDistance },  // Start point
        { x: 0, y: 0 }                    // End point
      ];

      // Initial setup
      gsap.set(headlineWrapper, {
        opacity: 0,
        visibility: "hidden",
        x: -xDistance,
        y: yDistance,
      });

      // Create the motion path animation
      gsap.to(headlineWrapper, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
          markers: false,
          scrub: 1
        },
        motionPath: {
          path: path,
          autoRotate: false
        },
        opacity: 1,
        visibility: "visible",
        duration: 1.5,
        ease: "power2.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={clsx(sharedStyles.gridRows3SectionWrapper)}>
      <div ref={diagonalSplitRef} className={sharedStyles.diagonalSplit}>
        <div ref={headingRef} className={clsx(sharedStyles.sectionHeadingWrapper, sharedStyles.container)}>
          <div ref={headingWrapperRef} className={styles.headingWrapper}>
            <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionHeading, sharedStyles.skew, styles.caseStudiesHeading)}>
              Case Studies
            </h2>
          </div>
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
      <div className={sharedStyles.diagonalSplitReverse} />
    </div>
  )
} 
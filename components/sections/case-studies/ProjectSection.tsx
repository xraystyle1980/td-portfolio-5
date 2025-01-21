import { ProjectSectionProps } from '@/types/project';
import clsx from 'clsx';
import sharedStyles from '@/styles/shared.module.css';
import styles from './ProjectSection.module.css';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function ProjectSection({ project, className = '' }: ProjectSectionProps) {
  const buttonClasses = clsx(
    sharedStyles.primaryButton
  );
  const imageClasses = clsx(styles.image, sharedStyles.responsiveImage);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const images = containerRef.current?.querySelectorAll(`.${styles.image}`);
      const imageContainer = imageContainerRef.current;
      if (!images || !imageContainer) return;

      // Calculate the straight line path at 15 degrees
      const distance = 800;
      const angle = 15;
      const radians = angle * (Math.PI / 180);
      const xDistance = Math.cos(radians) * distance;
      const yDistance = Math.sin(radians) * distance;

      // Define the straight line path (reversed direction)
      const path = [
        { x: xDistance, y: -yDistance },  // Start point (top right)
        { x: 0, y: 0 }                    // End point (bottom left)
      ];

      // Set initial positions
      images.forEach((image) => {
        gsap.set(image, {
          opacity: 0.5,
          visibility: "hidden",
          x: xDistance,
          y: -yDistance,
          rotation: -15  // Initial rotation
        });
      });

      // Create the motion path animation for each image with staggered scroll positions
      images.forEach((image, index) => {
        const staggerOffset = index * 100; // Offset each image's trigger point by 100px

        gsap.to(image, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top+=${staggerOffset} bottom+=200`,
            end: `center+=${staggerOffset} center`,
            toggleActions: "play none none reverse",
            scrub: 0.8
          },
          motionPath: {
            path: path,
            autoRotate: false
          },
          rotation: -15,  // Maintain rotation throughout animation
          opacity: 1,
          visibility: "visible",
          duration: 1.5,
          ease: "power2.out"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={clsx(styles.projectContentContainer)}>
      <div className={styles.content}>
        <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>{project.title}</h2>
        <div className={styles.details}>
          <span>{project.role}</span>
          {project.duration && <span>{project.duration}</span>}
          {project.company && <span>{project.company}</span>}
        </div>
        <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>{project.description}</p>

        <Link href={project.route || '/default-path'} className={buttonClasses}>
          <span>View Case Study</span>
          <span><Icon name="arrow-right" className={sharedStyles.buttonIcon} /></span>
        </Link>
      </div>

      {/* Render Images */}
      {project.additionalImages && project.additionalImages.length > 0 && (
        <div ref={imageContainerRef} className={styles.imageContainer}>
          {project.additionalImages.map((imgUrl, index) => (
            <img 
              key={imgUrl} 
              src={imgUrl} 
              alt={`${project.title} - View ${index + 1}`} 
              className={imageClasses} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
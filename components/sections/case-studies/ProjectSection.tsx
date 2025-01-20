import { ProjectSectionProps } from '@/types/project';
import clsx from 'clsx';
import sharedStyles from '@/styles/shared.module.css';
import styles from './ProjectSection.module.css';
import Link from 'next/link';
import { Icon } from '@/components/icons/Icon';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
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

      // Calculate angle-based movement
      const distance = 800;
      const angle = 15;
      const radians = angle * (Math.PI / 180);
      const xDistance = Math.cos(radians) * distance;
      const yDistance = Math.sin(radians) * distance;

      // Main scroll animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom+=200",
          end: "center center",
          toggleActions: "play none none reverse",
          scrub: 0.8
        }
      });

      // Set initial positions
      images.forEach((image) => {
        gsap.set(image, {
          x: xDistance,
          y: -yDistance,
          rotation: -15,
          opacity: 0,
          scale: 0.9,
          visibility: "hidden"
        });
      });

      // Add each image to the timeline with stagger
      images.forEach((image, index) => {
        tl.to(image, {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          visibility: "visible",
          duration: 0.8,
          ease: "power3.out",
          onStart: () => {
            image.classList.add(styles.animated);
          },
          onReverseComplete: () => {
            image.classList.remove(styles.animated);
          }
        }, index * 0.2);
      });

      // Hover animations
      const handleMouseEnter = () => {
        images.forEach((image, index) => {
          const xMove = index === 0 ? "5%" : index === 1 ? "25%" : "-5%";
          const yMove = index === 0 ? "-5%" : "5%";
          
          gsap.to(image, {
            scale: 1.02,
            x: `+=${xMove}`,
            y: `+=${yMove}`,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      };

      const handleMouseLeave = () => {
        images.forEach((image) => {
          gsap.to(image, {
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power3.inOut"
          });
        });
      };

      imageContainer.addEventListener("mouseenter", handleMouseEnter);
      imageContainer.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        imageContainer.removeEventListener("mouseenter", handleMouseEnter);
        imageContainer.removeEventListener("mouseleave", handleMouseLeave);
      };
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
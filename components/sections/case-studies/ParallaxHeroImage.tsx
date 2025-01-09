import { useEffect, useRef } from 'react';
import styles from '@/styles/casestudy-shared.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ParallaxHeroImageProps {
  imageUrl: string;
  alt: string;
  heroContentRef: React.RefObject<HTMLDivElement>;
}

export default function ParallaxHeroImage({ imageUrl, alt, heroContentRef }: ParallaxHeroImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const heroContent = heroContentRef.current;
    
    if (!container || !image || !heroContent) return;

    // Create a GSAP context
    const ctx = gsap.context(() => {
      console.log('Initializing GSAP animations'); // Debug log

      // Initial setup
      gsap.set([container, heroContent], {
        transformOrigin: "center center",
        force3D: true
      });

      // Parallax effect on scroll
      gsap.to(container, {
        yPercent: 11,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: false // Debug markers
        }
      });

      // Mouse enter/leave effects
      const handleMouseEnter = () => {
        console.log('Mouse enter'); // Debug log
        gsap.to(container, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        console.log('Mouse leave'); // Debug log
        gsap.to(container, {
          scale: 1,
          duration: 0.6,
          ease: "power3.out"
        });
      };

      // Add event listeners to the entire hero section
      const heroSection = container.closest('section');
      if (heroSection) {
        heroSection.addEventListener('mouseenter', handleMouseEnter);
        heroSection.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup
        return () => {
          heroSection.removeEventListener('mouseenter', handleMouseEnter);
          heroSection.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });

    return () => ctx.revert();
  }, [heroContentRef]);

  return (
    <div
      ref={containerRef}
      className={styles.heroImage}
    >
      <img 
        ref={imageRef}
        src={imageUrl} 
        alt={alt}
      />
      <div className={styles.heroImageOverlay} />
    </div>
  );
} 
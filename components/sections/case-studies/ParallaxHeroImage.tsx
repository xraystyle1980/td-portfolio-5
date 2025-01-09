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
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: true // Debug markers
        }
      });

      // Mouse movement effect
      let imageXTo = gsap.quickTo(container, "rotationY", {duration: 0.6, ease: "power3.out"}),
          imageYTo = gsap.quickTo(container, "rotationX", {duration: 0.6, ease: "power3.out"}),
          contentXTo = gsap.quickTo(heroContent, "x", {duration: 0.6, ease: "power3.out"}),
          contentYTo = gsap.quickTo(heroContent, "y", {duration: 0.6, ease: "power3.out"});

      const handleMouseMove = (e: MouseEvent) => {
        console.log('Mouse moving'); // Debug log
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Image rotation
        const rotateY = (e.clientX - centerX) / 15;
        const rotateX = (e.clientY - centerY) / 15;
        imageXTo(-rotateX);
        imageYTo(rotateY);

        // Hero content movement (opposite direction for parallax effect)
        const moveX = (e.clientX - centerX) / 15; // Made more noticeable
        const moveY = (e.clientY - centerY) / 15;
        contentXTo(-moveX);
        contentYTo(-moveY);
      };

      const handleMouseEnter = () => {
        console.log('Mouse enter'); // Debug log
        gsap.to(container, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
        window.addEventListener('mousemove', handleMouseMove);
      };

      const handleMouseLeave = () => {
        console.log('Mouse leave'); // Debug log
        gsap.to(container, {
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: "power3.out"
        });
        gsap.to(heroContent, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out"
        });
        window.removeEventListener('mousemove', handleMouseMove);
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
          window.removeEventListener('mousemove', handleMouseMove);
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
'use client';

import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './ClientLayout.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // Disable all GSAP-specific hooks and logic
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This useEffect is kept for potential smoothscroll setup; currently disabled.
    const smoothScrollContainer = scrollContainerRef.current;
    if (!smoothScrollContainer) return;

    // Create a GSAP context for this component
    const ctx = gsap.context(() => {
      // Any GSAP animations can be added here
    }, smoothScrollContainer);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scrollContainerRef} className={clsx(styles.smoothScrollWrapper)}>
      {/* The children render inside the default structure */}
      <div className={styles.smoothScrollContent}>
        {children}
      </div>
    </div>
  );
}
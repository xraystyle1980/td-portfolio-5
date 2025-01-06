'use client';

import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './ClientLayout.module.css';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // Disable all GSAP-specific hooks and logic
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This useEffect is kept for potential smoothscroll setup; currently disabled.
    const smoothScrollContainer = scrollContainerRef.current;
    if (!smoothScrollContainer) return;

    // Removed GSAP initialization code
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
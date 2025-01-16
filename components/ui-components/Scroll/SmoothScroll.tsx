'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const smootherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !smootherRef.current) return;

    // Create ScrollSmoother
    const smoother = ScrollSmoother.create({
      wrapper: smootherRef.current,
      content: smootherRef.current.querySelector('[data-scroll-content]'),
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobileResize: true,
    });

    // Refresh ScrollTrigger after a short delay to ensure all content is mounted
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      smoother.kill();
    };
  }, []);

  return (
    <div ref={smootherRef} style={{ overflow: 'hidden' }}>
      <div data-scroll-content data-scroll-section>
        {children}
      </div>
    </div>
  );
}
'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Navigation.module.css';
import gsap from 'gsap';
import { usePathname, useRouter } from 'next/navigation';

// Declare ScrollSmoother type
declare global {
  interface Window {
    ScrollSmoother?: {
      get(): {
        scrollTo(target: HTMLElement | string | number, smooth?: boolean): void;
        paused(paused: boolean): void;
      };
    };
  }
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // GSAP Initialization
  useEffect(() => {
    const initGSAP = async () => {
      const { default: ScrollToPlugin } = await import('gsap/ScrollToPlugin');
      gsap.registerPlugin(ScrollToPlugin);
    };
    initGSAP();
  }, []);

  // Scroll listener to toggle styles
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Window resize listener to determine mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll logic
  const scrollToSection = (sectionId: string) => {
    const smoother = window.ScrollSmoother?.get();
    if (smoother) {
      smoother.scrollTo(`#${sectionId}`, true);
    } else {
      gsap.to(window, {
        duration: 1,
        scrollTo: `#${sectionId}`,
        ease: 'power2.inOut',
      });
    }
    setIsOpen(false);
  };

  // Handle logo click for smooth scroll to top
  const handleLogoClick = () => {
    const smoother = window.ScrollSmoother?.get();
    if (smoother) {
      smoother.scrollTo(0, true);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        {/* Logo */}
        <div
          className={`${styles.logo} ${isScrolled ? styles.scrolled : ''}`}
          onClick={handleLogoClick}
        >
          {isMobile ? 'TD' : 'Trice.Design'}
        </div>

        {/* Hamburger Menu */}
        <button
          className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`${styles.links} ${isOpen ? styles.open : ''}`}>
          <button
            className={styles.link}
            onClick={async () => {
              await router.push('/');
              setIsOpen(false);
            }}
          >
            Home
          </button>
          <button
            className={styles.link}
            onClick={async () => {
              if (pathname === '/') {
                scrollToSection('about');
              } else {
                await router.push('/');
                window.scrollTo(0, 0);
                const smoother = window.ScrollSmoother?.get();
                if (smoother) {
                  smoother.scrollTo('#about', true);
                }
              }
            }}
          >
            About
          </button>
          <button
            className={styles.link}
            onClick={async () => {
              if (pathname === '/') {
                scrollToSection('work');
              } else {
                await router.push('/');
                window.scrollTo(0, 0);
                const smoother = window.ScrollSmoother?.get();
                if (smoother) {
                  smoother.scrollTo('#work', true);
                }
              }
            }}
          >
            Work
          </button>
          <button
            className={styles.link}
            onClick={async () => {
              if (pathname === '/') {
                scrollToSection('playground');
              } else {
                await router.push('/');
                window.scrollTo(0, 0);
                const smoother = window.ScrollSmoother?.get();
                if (smoother) {
                  smoother.scrollTo('#playground', true);
                }
              }
            }}
          >
            Playground
          </button>
          <button
            className={styles.link}
            onClick={async () => {
              if (pathname === '/') {
                scrollToSection('contact');
              } else {
                await router.push('/');
                window.scrollTo(0, 0);
                const smoother = window.ScrollSmoother?.get();
                if (smoother) {
                  smoother.scrollTo('#contact', true);
                }
              }
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
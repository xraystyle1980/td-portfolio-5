'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './Navigation.module.css';
import { usePathname, useRouter } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

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

  // Simplified scroll-to-section logic
  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  // Simplified logo click to scroll to top
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.wrapper}>
        {/* Logo */}
        <div
          className={styles.logo}
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
            onClick={() => scrollToSection('about')}
          >
            About
          </button>
          <button
            className={styles.link}
            onClick={() => scrollToSection('case-studies')}
          >
            Case Studies
          </button>
        </div>
      </div>
    </nav>
  );
}
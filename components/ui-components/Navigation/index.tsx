'use client';

import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import gsap from 'gsap';

gsap.registerPlugin(ScrollToPlugin);

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile menu state
  const [isMobile, setIsMobile] = useState(false); // Track if viewport is mobile

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP animation logic for swapping navbars
  useEffect(() => {
    const tl = gsap.timeline();
    if (pathname === '/') {
      // Show home navbar
      tl.to('.case-study-nav', {
        y: -100,
        autoAlpha: 0,
        duration: 0.5,
        onComplete: () => gsap.set('.case-study-nav', { display: 'none' }),
      }).to(
        '.home-nav',
        {
          y: 0,
          autoAlpha: 1,
          display: 'block',
          duration: 0.5,
        },
        '<'
      );
    } else {
      // Show case study navbar
      tl.set('.case-study-nav', { display: 'block' })
        .to('.home-nav', {
          y: -100,
          autoAlpha: 0,
          duration: 0.5,
          onComplete: () => gsap.set('.home-nav', { display: 'none' }),
        })
        .to(
          '.case-study-nav',
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
          },
          '<'
        );
    }
  }, [pathname]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);

    if (!isMobileOpen) {
      gsap.to('.mobile-menu', { x: 0, autoAlpha: 1, duration: 0.3 });
    } else {
      gsap.to('.mobile-menu', { x: '100%', autoAlpha: 0, duration: 0.3 });
    }
  };

  // Handle navigation and scrolling
  const handleNavigation = (event: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    event.preventDefault(); // Prevent default browser navigation behavior
  
    if (pathname === '/' && targetId.startsWith('#')) {
      // Smooth scroll to section using GSAP
      gsap.to(window, { duration: 1, scrollTo: targetId, ease: 'power2.out' });
    } else if (targetId.startsWith('#')) {
      // Navigate to home page and scroll to section after load
      router.push(`/${targetId}`);
    } else {
      // Navigate to other pages
      router.push(targetId);
    }
  };

  return (
    <>
      {/* Home Navbar */}
      <nav className={`${styles.nav} home-nav`}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>Home Logo</div>
          <div className={styles.links}>
            {isMobile ? (
              <button className={styles.hamburger} onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            ) : (
              <>
                <button className={styles.link} onClick={(e) => handleNavigation(e, '#about')}>
                  About
                </button>
                <button className={styles.link} onClick={(e) => handleNavigation(e, '#case-studies')}>
                  Case Studies
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Case Study Navbar */}
      <nav className={`${styles.nav} case-study-nav`} style={{ display: 'none' }}>
        <div className={styles.wrapper}>
          <div className={styles.logo}>Case Study Logo</div>
          <div className={styles.links}>
            {isMobile ? (
              <button className={styles.hamburger} onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            ) : (
              <>
                <button className={styles.link} onClick={() => handleNavigation('/')}>Home</button>
                <button className={styles.link} onClick={() => handleNavigation('/case-study-1')}>Other Case Study</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${styles.mobileMenu}`} style={{ transform: 'translateX(100%)', opacity: 0 }}>
        {pathname === '/' ? (
          <>
            <button className={styles.mobileLink} onClick={() => handleNavigation('#about')}>About</button>
            <button className={styles.mobileLink} onClick={() => handleNavigation('#case-studies')}>Case Studies</button>
          </>
        ) : (
          <>
            <button className={styles.mobileLink} onClick={() => handleNavigation('/')}>Home</button>
            <button className={styles.mobileLink} onClick={() => handleNavigation('/case-study-1')}>Other Case Study</button>
          </>
        )}
      </div>
    </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import sharedStyles from '../../../styles/shared.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import gsap from 'gsap';
import { Icon } from '@/components/icons/Icon';
import SocialLinks from '../SocialLinks';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
gsap.registerPlugin(ScrollToPlugin);

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);

    if (!isMobileOpen) {
      document.body.style.overflow = 'hidden';
      const menu = document.querySelector(`.${styles.mobileMenu}`);
      gsap.set(menu, { 
        visibility: 'visible',
        pointerEvents: 'auto',
        x: '100%'
      });
      gsap.to(menu, {
        x: '0%',
        duration: 0.5,
        ease: 'power3.out'
      });
    } else {
      document.body.style.overflow = 'auto';
      const menu = document.querySelector(`.${styles.mobileMenu}`);
      gsap.to(menu, {
        x: '100%',
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(menu, { 
            visibility: 'hidden',
            pointerEvents: 'none'
          });
        }
      });
    }
  };

  // Set initial state for mobile menu with GSAP
  useEffect(() => {
    const menu = document.querySelector(`.${styles.mobileMenu}`);
    gsap.set(menu, { 
      x: '100%',
      visibility: 'hidden',
      pointerEvents: 'none'
    });
  }, []);

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle scroll to top
  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.out' });
  };

  // Handle navigation and scrolling
  const handleNavigation = (event: React.MouseEvent<HTMLElement>, targetId: string) => {
    event.preventDefault();
    setIsCaseStudiesOpen(false);
    
    // Close mobile menu if it's open
    if (isMobileOpen) {
      toggleMobileMenu();
    }

    // If we're on a case study page and clicking About, go home first
    if (targetId === '#about' && pathname.includes('/case-studies/')) {
      router.push('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        gsap.to(window, { 
          duration: 1, 
          scrollTo: '#about', 
          ease: 'power2.out' 
        });
      }, 100);
      return;
    }
    
    // Handle smooth scrolling for about and connect sections
    if (targetId === '#about' || targetId === '#connect') {
      gsap.to(window, { 
        duration: 1, 
        scrollTo: targetId, 
        ease: 'power2.out' 
      });
      return;
    }
    
    // For other links, use normal navigation
    router.push(targetId);
  };

  // Close dropdown on pathname change
  useEffect(() => {
    setIsCaseStudiesOpen(false);
  }, [pathname]);

  const caseStudies = [
    { title: 'Decent App', href: '/case-studies/decent-app' },
    { title: 'Blockset BRD Docs', href: '/case-studies/blockset-brd-docs' },
    { title: 'Decent Design System', href: '/case-studies/decent-design-system' },
  ];

  return (
    <>
      <nav className={clsx(styles.nav, isScrolled && styles.scrolled)}>
        <div className={styles.wrapper}>
          {/* Left Navigation Links */}
          <div className={styles.leftLinks}>
            {!isMobile && (
              <>
                <Link 
                  href="/#about" 
                  className={styles.navLink}
                  onClick={(e) => handleNavigation(e, '#about')}
                >
                  About
                </Link>
                <div 
                  className={styles.dropdownContainer}
                  onMouseEnter={() => setIsCaseStudiesOpen(true)}
                  onMouseLeave={() => setIsCaseStudiesOpen(false)}
                >
                  <button 
                    className={styles.navLink}
                    onClick={() => setIsCaseStudiesOpen(!isCaseStudiesOpen)}
                    aria-expanded={isCaseStudiesOpen}
                    aria-haspopup="true"
                  >
                    Case Studies <Icon name="chevron-down" size={24} />
                  </button>
                  
                  {isCaseStudiesOpen && (
                    <div className={styles.dropdown}>
                      {caseStudies.map((study) => (
                        <Link
                          key={study.href}
                          href={study.href}
                          className={styles.dropdownItem}
                          onClick={() => setIsCaseStudiesOpen(false)}
                        >
                          {study.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link 
                  href="/#connect" 
                  className={styles.navLink}
                  onClick={(e) => handleNavigation(e, '#connect')}
                >
                  Connect
                </Link>
              </>
            )}
          </div>

          {/* Centered Logo */}
          <div className={styles.logo} onClick={scrollToTop}>
            <Link href="/" className={styles.logoLink}>
              <Image
                src="/portfolio/logo-skewed.svg"
                alt="Trice Design Logo"
                fill
                priority
              />
            </Link>
          </div>

          {/* Right Navigation Links */}
          <div className={styles.rightLinks}>
            {!isMobile && <SocialLinks />}
          </div>

          {/* Mobile Hamburger Button */}
          {isMobile && (
            <button 
              className={clsx(styles.hamburger, isMobileOpen && styles.open)}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={styles.mobileMenu}>
        <button 
          className={styles.closeButton}
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          ×
        </button>
        <Link 
          href="/#about" 
          className={styles.navLink}
          onClick={(e) => handleNavigation(e, '#about')}
        >
          About
        </Link>
        <div 
          className={styles.dropdownContainer}
          onMouseEnter={() => setIsCaseStudiesOpen(true)}
          onMouseLeave={() => setIsCaseStudiesOpen(false)}
        >
          <button 
            className={styles.navLink}
            onClick={() => setIsCaseStudiesOpen(!isCaseStudiesOpen)}
            aria-expanded={isCaseStudiesOpen}
            aria-haspopup="true"
          >
            Case Studies <Icon name="chevron-down" size={24} />
          </button>
          
          {isCaseStudiesOpen && (
            <div className={styles.dropdown}>
              {caseStudies.map((study) => (
                <Link
                  key={study.href}
                  href={study.href}
                  className={styles.dropdownItem}
                  onClick={() => setIsCaseStudiesOpen(false)}
                >
                  {study.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        <Link 
          href="/#connect" 
          className={styles.navLink}
          onClick={(e) => handleNavigation(e, '#connect')}
        >
          Connect
        </Link>
        <SocialLinks />
      </div>
    </>
  );
}
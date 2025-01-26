'use client';

import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import gsap from 'gsap';
import { Icon } from '@/components/icons/Icon';
import SocialLinks from '../SocialLinks';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
gsap.registerPlugin(ScrollToPlugin);

interface LogoProps {
  onClick: (e: React.MouseEvent) => void;
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <div className={styles.logo}>
      <Link 
        href="#"
        className={styles.logoLink}
        onClick={onClick}
      >
        <Image
          src="/images/logo-skewed.svg"
          alt="Trice Design Logo"
          width={270}
          height={80}
          className={styles.desktopLogo}
          priority
        />
        <Image
          src="/images/logo-skewed-mobile.svg"
          alt="Trice Design Logo"
          width={270}
          height={80}
          className={styles.mobileLogo}
          priority
        />
      </Link>
    </div>
  );
};

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCaseStudiesOpen, setIsCaseStudiesOpen] = useState(false);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
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
        autoAlpha: 1,
        pointerEvents: 'auto',
        xPercent: 100
      });
      gsap.to(menu, {
        xPercent: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
    } else {
      document.body.style.overflow = 'auto';
      const menu = document.querySelector(`.${styles.mobileMenu}`);
      gsap.to(menu, {
        xPercent: 100,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(menu, { 
            autoAlpha: 0,
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
      xPercent: 100,
      autoAlpha: 0,
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

    // If we're not on the home page and clicking a home section link, navigate home first
    if (pathname !== '/' && (targetId === '#about' || targetId === '#connect')) {
      router.push('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        gsap.to(window, { 
          duration: 1, 
          scrollTo: targetId === '#connect' ? '#connect' : targetId,
          ease: 'power2.out' 
        });
      }, 100);
      return;
    }
    
    // Handle smooth scrolling for home page sections
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
      {/* Mobile Hamburger Button - moved outside nav */}
      <button 
        className={clsx(styles.hamburger, isMobileOpen && styles.open)}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={clsx(styles.nav, isScrolled && styles.scrolled)}>
        <div className={styles.wrapper}>
          {/* Site Navigation Links */}
          <div className={styles.siteLinksWrapper}>
            {!isMobile && (
              <>
                <Link 
                  href="/"
                  className={styles.navLink}
                  onClick={(e) => {
                    e.preventDefault();
                    if (pathname !== '/') {
                      router.push('/');
                      setTimeout(scrollToTop, 100);
                    } else {
                      scrollToTop();
                    }
                  }}
                >
                  Home
                </Link>
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
                  <Link 
                    href="#"
                    className={styles.navLink}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsCaseStudiesOpen(!isCaseStudiesOpen);
                    }}
                    aria-expanded={isCaseStudiesOpen}
                    aria-haspopup="true"
                  >
                    <span className={styles.caseStudiesText}>Case Studies</span>
                    <Icon name="chevron-down" size={24} />
                  </Link>
                  
                  {isCaseStudiesOpen && (
                    <div className={styles.dropdown}>
                      {caseStudies.map((study) => (
                        <Link
                          key={study.href}
                          href={study.href}
                          className={styles.dropdownItem}
                          onClick={() => {
                            setIsCaseStudiesOpen(false);
                            if (isMobile) {
                              toggleMobileMenu();
                            }
                          }}
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
          <Logo onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }} />

          {/* Social Links */}
          <div className={styles.socialLinksWrapper}>
            <SocialLinks flexDirection={isMobile ? "column" : "row"} />
          </div>
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
          href="/"
          className={styles.navLink}
          onClick={(e) => {
            e.preventDefault();
            if (pathname !== '/') {
              router.push('/');
              setTimeout(scrollToTop, 100);
            } else {
              scrollToTop();
            }
            toggleMobileMenu();
          }}
        >
          Home
        </Link>
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
          <Link 
            href="#"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              setIsCaseStudiesOpen(!isCaseStudiesOpen);
            }}
            aria-expanded={isCaseStudiesOpen}
            aria-haspopup="true"
          >
            <span className={styles.caseStudiesText}>Case Studies</span>
            <Icon name="chevron-down" size={24} />
          </Link>
          
          {isCaseStudiesOpen && (
            <div className={styles.dropdown}>
              {caseStudies.map((study) => (
                <Link
                  key={study.href}
                  href={study.href}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setIsCaseStudiesOpen(false);
                    if (isMobile) {
                      toggleMobileMenu();
                    }
                  }}
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
        <SocialLinks flexDirection={isMobile ? "column" : "row"} />
      </div>
    </>
  );
}
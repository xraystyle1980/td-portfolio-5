'use client';

import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';
import sharedStyles from '../../../styles/shared.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import gsap from 'gsap';
import { Icon } from '@/components/icons/Icon';
import SocialLinks from '../SocialLinks';
gsap.registerPlugin(ScrollToPlugin);

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile menu state
  const [isMobile, setIsMobile] = useState(false); // Track if viewport is mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        onComplete: () => { gsap.set('.case-study-nav', { display: 'none' }); }
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
          onComplete: () => { gsap.set('.home-nav', { display: 'none' }); }
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
      document.body.style.overflow = 'hidden';
      gsap.to('.mobile-menu', { x: 0, autoAlpha: 1, duration: 0.3 });
    } else {
      document.body.style.overflow = 'auto';
      gsap.to('.mobile-menu', { x: '100%', autoAlpha: 0, duration: 0.3 });
    }
  };

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
  const handleNavigation = (event: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    event.preventDefault(); // Prevent default browser navigation behavior
    setIsDropdownOpen(false); // Close dropdown when navigating
  
    // If we're on a case study page and clicking connect, scroll to the case study's connect section
    if (pathname.includes('/case-studies/') && targetId.includes('connect')) {
      gsap.to(window, { duration: 1, scrollTo: '#case-study-connect', ease: 'power2.out' });
      return;
    }
    
    // If we're on the home page and clicking a section link
    if (pathname === '/' && targetId.startsWith('#')) {
      gsap.to(window, { duration: 1, scrollTo: targetId, ease: 'power2.out' });
      return;
    }
    
    // If we're navigating to a different page
    if (!targetId.startsWith('#')) {
      router.push(targetId);
      return;
    }
    
    // Default case: navigate to home page with hash
    router.push(`/${targetId}`);
  };

  // Close dropdown on pathname change
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Home Navbar */}
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''} home-nav`}>
        <div className={styles.wrapper}>
          {/* Left Navigation Links */}
          <div className={styles.leftLinks}>
            {!isMobile && (
              <>
                <button className={styles.navLink} onClick={(e) => handleNavigation(e, '#about')}>
                  About
                </button>
                <button className={styles.navLink} onClick={(e) => handleNavigation(e, '#case-studies')}>
                  Case Studies
                </button>
                <button className={styles.navLink} onClick={(e) => handleNavigation(e, '#connect')}>
                  Connect
                </button>
              </>
            )}
          </div>

          {/* Centered Logo */}
          <div className={styles.logo} onClick={scrollToTop}>
            <img src="/portfolio/logo-skewed.svg" alt="Trice.Design" />
          </div>

          {/* Right Navigation Links */}
          <div className={styles.rightLinks}>
            {isMobile ? (
              <button 
                className={`${styles.hamburger} ${isMobileOpen ? styles.open : ''}`} 
                onClick={toggleMobileMenu}
                style={{ position: 'fixed', right: '1rem', top: '1rem' }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            ) : (
              <><SocialLinks /></>
            )}
          </div>
        </div>
      </nav>

      {/* Case Study Navbar */}
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''} case-study-nav`} style={{ display: 'none' }}>
        <div className={styles.wrapper}>
          {/* Left Navigation Links */}
          <div className={styles.leftLinks}>
            {!isMobile && (
              <button className={sharedStyles.secondaryButton} onClick={(e) => handleNavigation(e, '/')}>Home</button>
            )}
          </div>

          {/* Centered Logo */}
          <div className={styles.logo} onClick={scrollToTop}>
            <img src="/portfolio/logo-skewed.svg" alt="Trice.Design" />
          </div>

          {/* Right Navigation Links */}
          <div className={styles.rightLinks}>
            {isMobile ? (
              <button className={styles.hamburger} onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            ) : (
              <>
                <div className={styles.dropdownContainer}>
                  <button 
                    className={`${sharedStyles.secondaryButton} ${isDropdownOpen ? styles.active : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    All Case Studies <Icon name="chevron-down" size={24} />
                  </button>
                  {isDropdownOpen && (
                    <div className={styles.dropdown}>
                      <button className={styles.dropdownItem} onClick={(e) => handleNavigation(e, '/case-studies/decent-app')}>
                        Decent App
                      </button>
                      <button className={styles.dropdownItem} onClick={(e) => handleNavigation(e, '/case-studies/decent-design-system')}>
                        Design System
                      </button>
                      <button className={styles.dropdownItem} onClick={(e) => handleNavigation(e, '/case-studies/blockset-brd-docs')}>
                        Blockset Docs
                      </button>
                    </div>
                  )}
                </div>
                <button className={sharedStyles.secondaryButton} onClick={(e) => handleNavigation(e, pathname === '/' ? '#connect' : '#case-study-connect')}>
                  Connect
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${styles.mobileMenu} ${isMobileOpen ? styles.open : ''}`} style={{ transform: 'translateX(100%)', opacity: 0 }}>
        <button 
          className={styles.closeButton}
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          ×
        </button>
        {pathname === '/' ? (
          <>
            <button className={sharedStyles.textLink} onClick={(e) => {
              handleNavigation(e, '#about');
              toggleMobileMenu();
            }}>About</button>
            <button className={sharedStyles.textLink} onClick={(e) => {
              handleNavigation(e, '#case-studies');
              toggleMobileMenu();
            }}>Case Studies</button>
            <button className={sharedStyles.textLink} onClick={(e) => {
              handleNavigation(e, '#connect');
              toggleMobileMenu();
            }}>Connect</button>
          </>
        ) : (
          <>
            <button className={sharedStyles.textLink} onClick={(e) => {
              handleNavigation(e, '/');
              toggleMobileMenu();
            }}>Home</button>
            <button className={sharedStyles.textLink} onClick={(e) => {
              handleNavigation(e, '/case-studies/decent-app');
              toggleMobileMenu();
            }}>
              Decent App
            </button>
            <button className={sharedStyles.textLink} onClick={(e) => {
              handleNavigation(e, '/case-studies/decent-design-system');
              toggleMobileMenu();
            }}>
              Design System
            </button>
            <button className={sharedStyles.textLink} onClick={(e) => {
              handleNavigation(e, '/case-studies/blockset-brd-docs');
              toggleMobileMenu();
            }}>
              Blockset Docs
            </button>
            <button className={sharedStyles.textLink} onClick={(e) => {
              handleNavigation(e, pathname === '/' ? '#connect' : '#case-study-connect');
              toggleMobileMenu();
            }}>Connect</button>
          </>
        )}
      </div>
    </>
  );
}
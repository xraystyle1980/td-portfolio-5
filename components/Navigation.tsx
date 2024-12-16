'use client'

import Link from 'next/link'
import styles from './Navigation.module.css'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          Trice.Design
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopLinks}>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </div>

        {/* Mobile Burger Button */}
        <button 
          className={`${styles.burgerButton} ${isMenuOpen ? styles.open : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          <Link href="/about" className={styles.mobileLink}>About</Link>
          <Link href="/contact" className={styles.mobileLink}>Contact</Link>
        </div>
      </div>
    </nav>
  )
}
'use client'

import styles from './Navigation.module.css'

export default function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.links}>
          <button 
            onClick={() => scrollToSection('about')} 
            className={styles.link}
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')} 
            className={styles.link}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  )
}
'use client'

import Link from 'next/link'
import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link href="/" className={styles.logo}>
            Trice.Design
          </Link>
          <div className={styles.links}>
            <Link href="/about" className={styles.link}>About</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
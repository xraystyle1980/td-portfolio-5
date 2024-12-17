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
      </div>
    </nav>
  )
}
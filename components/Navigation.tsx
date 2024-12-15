'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navigation.module.css'

export default function Navigation() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Link 
            href="/" 
            className={styles.logo}
          >
            Loogo
          </Link>
          
          <div className={styles.links}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${pathname === href ? styles.activeLink : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
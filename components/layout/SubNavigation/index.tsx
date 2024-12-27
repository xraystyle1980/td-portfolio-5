'use client'

import { useRouter } from 'next/navigation'
import styles from './SubNavigation.module.css'

export default function SubNavigation() {
  const router = useRouter()

  const handleLogoClick = async () => {
    await router.push('/')
    window.scrollTo(0, 0)
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <div 
          className={styles.logo}
          onClick={handleLogoClick}
        >
          Trice.Design
        </div>
      </div>
    </nav>
  )
} 
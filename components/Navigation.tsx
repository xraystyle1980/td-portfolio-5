'use client'

import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        {/* <div className={styles.stickyLogo}>
          Trice.Design
        </div> */}
        <div className={styles.links}>
          <button className={styles.link}>About</button>
          <button className={styles.link}>Contact</button>
        </div>
      </div>
    </nav>
  )
}
'use client';

import styles from './Footer.module.css';
import localFont from 'next/font/local'

const cooper = localFont({
  src: '../../../public/fonts/Cooper-var.ttf',
  variable: '--font-cooper'
})

export default function Footer() {
  return (
    <footer className={`${styles.footer} ${cooper.variable}`}>
      <div className={styles.socialLinks}>
        <a href="https://dribbble.com/trice" target="_blank" rel="noopener noreferrer">
          <div className={styles.socialIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20px">
              <path className={styles.cls1} d="M9.95,0C4.45,0-.05,4.5-.05,10s4.5,10,10,10,10-4.5,10-10S15.45,0,9.95,0ZM9.98,1.3c2.3,0,4.37,1,5.87,2.5-1.2,1.3-2.6,2.3-4.2,3-1.1-1.9-2.5-3.6-4.5-5,.9-.3,1.8-.5,2.8-.5h.03ZM5.75,2.5h0c1.9,1.3,3.4,2.9,4.5,4.8-1.8.6-3.9.9-6,.9s-1.6,0-2.7-.3c.6-2.3,2.1-4.3,4.1-5.5l.1.1ZM1.35,10v-.6c1.1.3,1.6.3,2.9.3,2.4,0,4.6-.3,6.7-1.1.4.8.6,1.6.9,2.4-3,.9-5.4,2.8-7.4,5.5-1.9-1.6-3.1-3.9-3.1-6.5h0ZM12.25,18.3c-.7.2-1.5.3-2.3.3-1.6,0-3.1-.4-4.4-1.2,1.4-1.9,3-3.3,4.9-4.3.5-.3,1.1-.5,1.6-.7.2,1.1.3,2.3.3,3.6s.1,1.5-.1,2.3h0ZM12.25,8.1c1.7-.8,3.2-1.8,4.6-3.2,1.1,1.4,1.7,3.2,1.7,5.1v.3h-1.4c-1.4,0-2.7.1-4,.4-.2-.9-.5-1.8-.9-2.6ZM13.75,17.7v-1.6c0-1.4-.1-2.8-.3-4,1.2-.3,2.4-.4,3.7-.4s.8,0,1.2,0c-.5,2.6-2.3,4.8-4.6,6Z" />
            </svg>
          </div>
          <span>Dribbbbbble</span>
        </a>
        <a href="https://www.linkedin.com/in/tricedigital/" target="_blank" rel="noopener noreferrer">
          <div className={styles.socialIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20px">
              <path d="M15.1,1.5c1.93,0,3.5,1.57,3.5,3.5v10c0,1.93-1.57,3.5-3.5,3.5H5c-1.93,0-3.5-1.57-3.5-3.5V5c0-1.93,1.57-3.5,3.5-3.5h10.1M15.1,0H5C2.24,0,0,2.24,0,5v10C0,17.76,2.24,20,5,20h10.1c2.76,0,5-2.24,5-5V5c0-2.76-2.24-5-5-5h0Z" />
              <path d="M6.6,7.75h-2.6v8.4h2.6V7.75Z" />
              <path d="M12.4,9.85c-1.4,0-1.6,1.1-1.6,2.2v4.2h-2.6V7.75h2.5v1.2h0c.4-.7,1.2-1.4,2.5-1.4,2.7,0,3.1,1.7,3.1,4v4.6h-2.6v-4.1c0-1,0-2.2-1.4-2.2h.1Z" />
              <path d="M7,5.35c0,.9-.7,1.6-1.6,1.6s-1.6-.7-1.6-1.6.7-1.6,1.6-1.6,1.6.7,1.6,1.6Z" />
            </svg>
          </div>
          <span>LinkedIn</span>
        </a>
        <a href="https://warpcast.com/trice.eth" target="_blank" rel="noopener noreferrer">
          <div className={styles.socialIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20px">
              <path d="M15.1,1.5c1.93,0,3.5,1.57,3.5,3.5v10c0,1.93-1.57,3.5-3.5,3.5H5c-1.93,0-3.5-1.57-3.5-3.5V5c0-1.93,1.57-3.5,3.5-3.5h10.1M15.1,0H5C2.24,0,0,2.24,0,5v10C0,17.76,2.24,20,5,20h10.1c2.76,0,5-2.24,5-5V5c0-2.76-2.24-5-5-5h0Z" />
              <path d="M13.38,6.9l-1,3.7-1-3.7h-2.3l-1,3.7-1-3.7h-2.6l2.4,8.2h2.2l1.1-3.8,1.1,3.8h2.2l2.4-8.2h-2.6.1Z" />
            </svg>
          </div>
          <span>Warpcast</span>
        </a>
      </div>
    </footer>
  );
} 
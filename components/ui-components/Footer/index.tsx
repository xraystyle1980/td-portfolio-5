'use client';

import styles from './Footer.module.css';
import SocialLinks from '../SocialLinks';

export default function Footer() {
  return (
    <footer className={`${styles.footer}`}>
      <SocialLinks />
    </footer>
  );
} 
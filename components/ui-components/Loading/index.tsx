'use client'

import React from 'react';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingText}>
        {'Loading....'.split('').map((char, i) => (
          <span key={i} className={styles.letter} style={{ animationDelay: `${i * 0.1}s` }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
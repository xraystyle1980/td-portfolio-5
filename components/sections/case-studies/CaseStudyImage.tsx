import Image from 'next/image';
import styles from './CaseStudyImage.module.css';
import clsx from 'clsx';
import sharedStyles from '@/styles/shared.module.css';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import casestudyStyles from '@/styles/casestudy-shared.module.css';

interface CaseStudyImageProps {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
}

export default function CaseStudyImage({ 
  src, 
  alt, 
  caption, 
  width, 
  height,
  priority = false,
  className = '',
  size = 'full'
}: CaseStudyImageProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isLightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore scrolling when modal is closed
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen, handleClose]);

  return (
    <figure className={clsx(styles.figure, className)}>
      <div 
        className={clsx(styles.imageWrapper, styles[size])}
        role="button"
        tabIndex={0}
        onClick={() => setIsLightboxOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={styles.image}
          quality={90}
          priority={priority}
          sizes={
            size === 'small' 
              ? '(max-width: 768px) 100vw, 400px'
              : size === 'medium'
                ? '(max-width: 768px) 100vw, 800px'
                : size === 'large'
                  ? '(max-width: 768px) 100vw, 1200px'
                  : '100vw'
          }
        />
      </div>
      {caption && (
        <figcaption className={casestudyStyles.imageCaption}>
          {caption}
        </figcaption>
      )}

      {mounted && isLightboxOpen && createPortal(
        <div 
          className={styles.modalOverlay} 
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.imageContainer}>
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={styles.fullSizeImage}
                quality={100}
                priority={true}
                loading="eager"
              />
            </div>
            {caption && (
              <div className={styles.modalCaption}>
                {caption}
              </div>
            )}
            <button 
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close lightbox"
            >
              ×
            </button>
          </div>
        </div>,
        document.body
      )}
    </figure>
  );
} 
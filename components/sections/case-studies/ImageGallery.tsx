import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import styles from './ImageGallery.module.css';
import clsx from 'clsx';
import sharedStyles from '@/styles/shared.module.css';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
}

export default function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore scrolling when modal is closed
      document.body.style.overflow = '';
    };
  }, [selectedImage, handleClose]);

  const modalContent = selectedImage && (
    <div 
      className={styles.modalOverlay} 
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image Gallery"
    >
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          width={selectedImage.width}
          height={selectedImage.height}
          className={styles.fullSizeImage}
          quality={100}
          priority={true}
          loading="eager"
        />
        <button 
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close gallery"
        >
          ×
        </button>
      </div>
    </div>
  );

  return (
    <div className={clsx(styles.galleryContainer, className)}>
      <div className={styles.thumbnailGrid}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className={styles.thumbnailWrapper}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedImage(image)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedImage(image);
              }
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={200}
              className={styles.thumbnail}
              quality={60}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
              sizes="300px"
            />
          </div>
        ))}
      </div>

      {mounted && modalContent && createPortal(
        modalContent,
        document.body
      )}
    </div>
  );
} 
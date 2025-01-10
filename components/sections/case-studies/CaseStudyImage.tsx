import Image from 'next/image';
import styles from './CaseStudyImage.module.css';
import clsx from 'clsx';
import sharedStyles from '@/styles/shared.module.css';

interface CaseStudyImageProps {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}

export default function CaseStudyImage({ 
  src, 
  alt, 
  caption, 
  width, 
  height,
  priority = false,
  className = ''
}: CaseStudyImageProps) {
  return (
    <figure className={clsx(styles.figure, className)}>
      <div className={styles.imageWrapper}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={styles.image}
          quality={90}
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className={clsx(styles.caption, sharedStyles.textBase)}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
} 
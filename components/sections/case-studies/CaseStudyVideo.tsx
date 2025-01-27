import styles from './CaseStudyVideo.module.css';
import clsx from 'clsx';
import casestudyStyles from '@/styles/casestudy-shared.module.css';
import { useEffect, useRef } from 'react';

interface CaseStudyVideoProps {
  src: string;
  caption?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
}

export default function CaseStudyVideo({ 
  src, 
  caption,
  className = '',
  size = 'full'
}: CaseStudyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  return (
    <figure className={clsx(styles.figure, className)}>
      <div className={clsx(styles.videoWrapper, styles[size])}>
        <video 
          ref={videoRef}
          className={styles.video}
          autoPlay
          playsInline
          loop
          muted
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {caption && (
        <figcaption className={casestudyStyles.imageCaption}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
} 
import sharedStyles from '@/styles/shared.module.css'
import styles from './ContactMe.module.css'
import clsx from 'clsx'
import { Icon } from '@/components/icons/Icon';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';
import ScrollingTokens from '../3d/ScrollingTokens';

interface ContactMeProps {
  id?: string;
}

export default function ContactMe({ id = 'connect' }: ContactMeProps) {
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'mailto:matt@trice.design';
  };

  return (        
    <section id={id} className={styles.contentSections}>
      <div className={styles.tokenBackground}>
        <Canvas
          camera={{ 
            position: [0, 0, 20], 
            fov: 25,
            near: 0.1,
            far: 100 
          }}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ScrollingTokens />
          </Suspense>
        </Canvas>
      </div>
      <div className={sharedStyles.container}>
        <div className={sharedStyles.sectionHeadingWrapper}>
          <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionHeading)}>Let's Connect</h2>
        </div>
        <div className={sharedStyles.darkContainer}>
        {/* Connect */}       
          <div className={sharedStyles.contentContainer}>
            <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>Working on a project?</h2>
            <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>Drop me a line and let's build cool shit.</p>
            <a onClick={handleEmailClick} href="mailto:matt@trice.design" className={clsx(sharedStyles.primaryButton, styles.half)}>
              <span>matt@trice.design</span>
              <span><Icon name="mail-arrow-right" className={sharedStyles.buttonIcon} /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 
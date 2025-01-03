import { ProjectSectionProps } from '@/types/project';
import clsx from 'clsx';
import styles from './ProjectSection.module.css';
import sharedStyles from '@/styles/shared.module.css';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons/ArrowRight';

export default function ProjectSection({ project, className = '' }: ProjectSectionProps) {
  // Combine container classes
  const containerClasses = clsx(
    sharedStyles.darkContainer, // Centralized dark container styling
    sharedStyles.cardFlex,
    className                  // Any additional custom className
  );

  const buttonClasses = clsx(styles.button, sharedStyles.primaryButton);
  const imageClasses = clsx(styles.image, sharedStyles.responsiveImage);

  return (
    <section className={styles.projectSection}>
      <div className={containerClasses}>
        <div className={styles.content}>
          <h2 className={styles.title}>{project.title}</h2>
          <div className={styles.details}>
            <p className={styles.role}>{project.role}</p>
            {project.duration && <p className={styles.duration}>{project.duration}</p>}
            {project.company && <p className={styles.company}>{project.company}</p>}
          </div>
          <p className={styles.description}>{project.description}</p>

          {/* Button with static label */}
          <Link href={project.route || '#'} className={buttonClasses} scroll={true}>
            View Case Study
            <ArrowRight className={styles.buttonIcon} />
          </Link>
        </div>

        {/* Render Image */}
        {project.imageUrl && (
          <div className={styles.imageContainer}>
            <img src={project.imageUrl} alt={project.title} className={imageClasses} />
          </div>
        )}
      </div>
    </section>
  );
}
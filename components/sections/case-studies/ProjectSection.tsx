import { ProjectSectionProps } from '@/types/project';
import clsx from 'clsx';
import sharedStyles from '@/styles/shared.module.css';
import styles from './ProjectSection.module.css';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons/ArrowRight';

export default function ProjectSection({ project, className = '' }: ProjectSectionProps) {
  const buttonClasses = clsx(
    sharedStyles.primaryButton
  );
  const imageClasses = clsx(styles.image, sharedStyles.responsiveImage);

  return (
    <div className={clsx(sharedStyles.darkContainer, styles.projectContentContainer)}>
      <div className={styles.content}>
        <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionTitle)}>{project.title}</h2>
        <div className={styles.details}>
          <span>{project.role}</span>
          {project.duration && <span>{project.duration}</span>}
          {project.company && <span>{project.company}</span>}
        </div>
        <p className={clsx(sharedStyles.textBase, sharedStyles.large)}>{project.description}</p>

        {/* Button with static label */}
        <Link href={project.route || '/default-path'} className={buttonClasses}>
          <span>View Case Study</span>
          <span><ArrowRight className={sharedStyles.buttonIcon} /></span>
        </Link>
      </div>

      {/* Render Image */}
      {project.imageUrl && (
        <div className={styles.imageContainer}>
          <img src={project.imageUrl} alt={project.title} className={imageClasses} />
        </div>
      )}
    </div>
  );
}
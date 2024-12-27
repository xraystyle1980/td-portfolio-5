import { ProjectSectionProps } from '@/types/project'
import styles from './ProjectSection.module.css'
import Link from 'next/link'
import { ArrowRight } from '@/components/icons/ArrowRight'

export default function ProjectSection({ project, className = '' }: ProjectSectionProps) {
  return (
    <section className={`${styles.projectSection} ${className}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{project.title}</h2>
          <div className={styles.details}>
            <p className={styles.role}>{project.role}</p>
            {project.duration && (
              <p className={styles.duration}>{project.duration}</p>
            )}
            {project.company && (
              <p className={styles.company}>{project.company}</p>
            )}
          </div>
          <p className={styles.description}>{project.description}</p>
          
          {project.route ? (
            <Link 
              href={project.route} 
              className={styles.button}
              scroll={true}
            >
              View Case Study
              <ArrowRight className={styles.buttonIcon} />
            </Link>
          ) : project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.button}
            >
              View Project
              <ArrowRight className={styles.buttonIcon} />
            </a>
          )}
        </div>
        {project.imageUrl && (
          <div className={styles.imageContainer}>
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className={styles.image}
            />
          </div>
        )}
      </div>
    </section>
  )
} 
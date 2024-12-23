import { ProjectSectionProps } from '@/types/project'
import styles from './ProjectSection.module.css'


export default function ProjectSection({ project, className = '' }: ProjectSectionProps) {
  return (
    <section className={`${styles.projectSection} ${className}`}>
    
      <div className={styles.container}>
        <div className={styles.content}>
          
            <h2 className={styles.title}>{project.title}</h2>
            <div className={styles.details}>
              <p className={styles.role}>{project.role}</p>
              <p className={styles.year}>{project.year}</p>
              {project.company && (
                <p className={styles.company}>{project.company}</p>
              )}
            </div>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.technologies}>
              {project.technologies.map((tech, index) => (
                <span key={index} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.link}
              >
                View Project →
              </a>
            )}
        </div>
        {project.imageUrl && (
          <div className={styles.imageContainer}>
            {/* <Parallax speed={0.3}> */}
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className={styles.image}
              />
            {/* </Parallax> */}
          </div>
        )}
      </div>
    </section>
  )
} 
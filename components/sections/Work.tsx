import { projects } from '@/data/projects'
import ProjectSection from './projects/ProjectSection'
import styles from './Work.module.css'
import { Parallax } from '@/components/effects'

export default function Work() {
  return (
    <Parallax speed={0.25}> 
        <div id="work" className={styles.container}>
        <div className={styles.intro}>
            <h2 className={styles.title}>Work</h2>
        </div>
        <div className={`${styles.projects} projects`}>
            {projects.map((project, index) => (
            <ProjectSection 
                key={project.title} 
                project={project}
                className={index % 2 === 0 ? styles.even : styles.odd}
            />
            ))}
        </div>
        </div>
    </Parallax>
  )
} 
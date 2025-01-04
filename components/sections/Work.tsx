import { projects } from '@/data/projects'
import ProjectSection from './projects/ProjectSection'
import sharedStyles from '@/styles/shared.module.css'
import styles from './Work.module.css'
import clsx from 'clsx'


export default function Work() {
  return (
    <section id="work" className={clsx(sharedStyles.paddingBottom, styles.work)}>
      <div className={clsx(sharedStyles.container, styles.intro)}>
        <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionHeading)}>Case Studies</h2>
      </div>
      <div className={`${styles.projects} projects`}>
        {projects.map((project) => (
          <ProjectSection 
            key={project.title} 
            project={project}
          />
        ))}
      </div>
    </section>
  )
} 
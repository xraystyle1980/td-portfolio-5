import { projects } from '@/data/projects'
import ProjectSection from './case-studies/ProjectSection'
import sharedStyles from '@/styles/shared.module.css'
import styles from './CaseStudies.module.css'
import clsx from 'clsx'


export default function Work() {
  return (
    <div className={clsx(sharedStyles.gridRows3SectionWrapper)}>
      <div className={sharedStyles.diagonalSplit}></div>
      <div className={sharedStyles.lightSection}>
        <div className={clsx(sharedStyles.sectionHeadingWrapper, sharedStyles.container, sharedStyles.offsetTop)}>
          <h2 className={clsx(sharedStyles.displayText, sharedStyles.sectionHeading, sharedStyles.skew)}>Case Studies</h2>
        </div>
        <section id="case-studies" className={clsx(sharedStyles.paddingBottom, sharedStyles.container, sharedStyles.lightSection)}>
          <div className={`${styles.projects} projects`}>
            {projects.map((project) => (
              <ProjectSection 
                key={project.title} 
                project={project}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
} 







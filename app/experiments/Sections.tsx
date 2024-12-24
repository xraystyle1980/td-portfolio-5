import styles from './playground.module.css'

interface SectionsProps {
  headingRef: React.RefObject<HTMLHeadingElement>
}

export default function Sections({ headingRef }: SectionsProps) {
  return (
    <div className={styles.sections}>
      <section className={styles.section}>
        <h1 ref={headingRef} className={styles.mainHeading}>
          Welcome to the Future
        </h1>
        <p className={styles.subtitle}>
          Explore the intersection of design and technology
        </p>
      </section>

      <section className={styles.section}>
        <h2 data-speed="0.5">Innovation</h2>
        <p data-speed="0.8">Pushing the boundaries of what's possible in web development</p>
      </section>

      <section className={styles.section}>
        <h2 data-speed="0.5">Technology</h2>
        <p data-speed="0.8">Using cutting-edge tools to create immersive experiences</p>
      </section>

      <section className={styles.section}>
        <h2 data-speed="0.5">Design</h2>
        <p data-speed="0.8">Crafting beautiful and functional digital experiences</p>
      </section>

      <section className={styles.section}>
        <h2 data-speed="0.5">Interaction</h2>
        <p data-speed="0.8">Building engaging and responsive user interfaces</p>
      </section>

      <section className={styles.section}>
        <h2 data-speed="0.5">Let's Create</h2>
        <p data-speed="0.8">Ready to bring your ideas to life?</p>
        <button className={styles.button} data-speed="1.2">Get Started</button>
      </section>
    </div>
  )
} 
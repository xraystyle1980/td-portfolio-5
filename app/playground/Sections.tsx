import styles from './playground.module.css'

export default function Sections() {
  return (
    <div className={styles.sections}>
      <section className={styles.section}>
        <h1>Welcome to the Future</h1>
        <p>Explore the intersection of design and technology</p>
      </section>

      <section className={styles.section}>
        <h2>About Our Vision</h2>
        <p>We create immersive digital experiences that push the boundaries of web technology</p>
        <ul>
          <li>3D Visualization</li>
          <li>Interactive Design</li>
          <li>Creative Development</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Featured Work</h2>
        <div className={styles.workGrid}>
          <div className={styles.workItem}>
            <h3>Project Alpha</h3>
            <p>3D visualization platform</p>
          </div>
          <div className={styles.workItem}>
            <h3>Project Beta</h3>
            <p>Interactive dashboard</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Let's Connect</h2>
        <p>Ready to create something amazing?</p>
        <button className={styles.button}>Get in Touch</button>
      </section>
    </div>
  )
} 
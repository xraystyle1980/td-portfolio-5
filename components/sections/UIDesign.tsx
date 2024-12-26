'use client'

import styles from './UIDesign.module.css'

export default function UIDesign() {
  return (
    <div id="ui-design" className={styles.container}>
      <div className={styles.intro}>
        <h2 className={styles.title}>UI Design</h2>
      </div>
      <div className={styles.experiments}>
        <div className={styles.experiment}>
          <h3>Frostbyte</h3>
          <img src="/portfolio/frostbye_website--product2.png" alt="Frostbyte UI" />
        </div>
        <div className={styles.experiment}>
          <h3>Sarcophagus</h3>
          <img src="/portfolio/sarcophagus_app--product1.png" alt="Sarcophagus UI" />
        </div>
        <div className={styles.experiment}>
          <h3>Frostbyte Scan</h3>
          <img src="/portfolio/frostbyte_scan--product1.png" alt="Frostbyte Scan" />
        </div>
        <div className={styles.experiment}>
          <h3>Sarcophagus App</h3>
          <img src="/portfolio/sarcophagus_app--product2.png" alt="Sarcophagus App" />
        </div>
      </div>
    </div>
  )
} 




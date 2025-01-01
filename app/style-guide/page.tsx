'use client'

import styles from './style-guide.module.css'
import Scene3D from '@/app/Scene3D'

export default function StyleGuidePage() {
  return (
    <main className={styles.main}>
      <Scene3D scroll={0} currentSection={0} />

      <div className={styles.contentWrapper}>
        <section className={styles.section}>
          <h1 className={styles.title}>TD Portfolio Style Guide</h1>
          
          <div className={styles.category}>
            <h2 className={styles.categoryTitle}>Base Card Styles</h2>
            
            <div className={styles.example}>
              <div className={styles.label}>Standard Card</div>
              <div className={styles.card}>
                <p>Standard card with default styling</p>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.label}>Dark Container</div>
              <div className={styles.darkContainer}>
                <div>Flex item 1</div>
                <div>Flex item 2</div>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.label}>Section Content Card</div>
              <div className={styles.sectionContent}>
                <h3>Section Title</h3>
                <p>Section content with flex column layout</p>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.label}>Work Item Card</div>
              <div className={styles.workItem}>
                <h3>Work Item</h3>
                <p>Card with blur effect background</p>
              </div>
            </div>
          </div>

          <div className={styles.category}>
            <h2 className={styles.categoryTitle}>Container Patterns</h2>
            
            <div className={styles.example}>
              <div className={styles.label}>Base Container</div>
              <div className={styles.container}>
                <p>Base container with max-width and auto margins</p>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.label}>Section Container</div>
              <div className={styles.sectionContainer}>
                <p>Section container with relative positioning</p>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.label}>Grid Container</div>
              <div className={styles.gridContainer}>
                <div>Grid Item 1</div>
                <div>Grid Item 2</div>
                <div>Grid Item 3</div>
                <div>Grid Item 4</div>
              </div>
            </div>
          </div>

          <div className={styles.category}>
            <h2 className={styles.categoryTitle}>Consolidated Components</h2>
            
            <div className={styles.example}>
              <div className={styles.label}>Card Base</div>
              <div className={styles.cardBase}>
                <p>Base card with CSS variable styling</p>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.label}>Card Flex</div>
              <div className={styles.cardFlex}>
                <div>Flex Child 1</div>
                <div>Flex Child 2</div>
              </div>
            </div>

            <div className={styles.example}>
              <div className={styles.label}>Card Grid</div>
              <div className={styles.cardGrid}>
                <div>Grid Child 1</div>
                <div>Grid Child 2</div>
                <div>Grid Child 3</div>
                <div>Grid Child 4</div>
              </div>
            </div>
          </div>

          <div className={styles.category}>
            <h2 className={styles.categoryTitle}>Common Properties</h2>
            
            <div className={styles.propertyGroup}>
              <h3 className={styles.propertyGroupHeading}>Spacing</h3>
              <div className={styles.spacingExample}>
                <div className={styles.spacing} data-size="xs">XS: 1rem</div>
                <div className={styles.spacing} data-size="sm">SM: 2rem</div>
                <div className={styles.spacing} data-size="md">MD: 3rem</div>
                <div className={styles.spacing} data-size="lg">LG: 4rem</div>
              </div>
            </div>

            <div className={styles.propertyGroup}>
              <h3 className={styles.propertyGroupHeading}>Colors</h3>
              <div className={styles.colorGrid}>
                <div className={styles.colorSwatch} data-color="background">#1d2329</div>
                <div className={styles.colorSwatch} data-color="text">#FFFFFF</div>
                <div className={styles.colorSwatch} data-color="accent">#FF3399</div>
                <div className={styles.colorSwatch} data-color="border">#000000</div>
                <div className={styles.colorSwatch} data-color="transparent">rgba(255, 255, 255, 0.1)</div>
              </div>
            </div>

            <div className={styles.propertyGroup}>
              <h3 className={styles.propertyGroupHeading}>Shadows</h3>
              <div className={styles.shadowGrid}>
                <div className={styles.shadowExample} data-shadow="lg">Large Shadow</div>
                <div className={styles.shadowExample} data-shadow="md">Medium Shadow</div>
                <div className={styles.shadowExample} data-shadow="sm">Small Shadow</div>
              </div>
            </div>

            <div className={styles.propertyGroup}>
              <h3 className={styles.propertyGroupHeading}>Border Radius</h3>
              <div className={styles.radiusGrid}>
                <div className={styles.radiusExample} data-radius="lg">Large Radius (1rem)</div>
                <div className={styles.radiusExample} data-radius="sm">Small Radius (0.5rem)</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 
# TD Portfolio Style Audit Report

## Current Style Patterns

### 1. Base Card Styles

#### Standard Card
```css
.card {
  border: 4px solid black;
  background: #1d2329;
  color: #FFF;
  box-shadow: -12px 12px 0px #000;
  padding: 4rem;
}
```

#### Dark Container
```css
.darkContainer {
  border: 4px solid black;
  background: #1d2329;
  color: #FFF;
  box-shadow: -12px 12px 0px #000;
  display: flex;
  gap: 2rem;
}
```

#### Section Content Card
```css
.sectionContent {
  background: #1d2329;
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}
```

#### Work Item Card
```css
.workItem {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  backdrop-filter: blur(10px);
}
```

### 2. Container Patterns

#### Base Container
```css
.container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 4rem;
}
```

#### Section Container
```css
.section {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  padding: 0 2rem;
}
```

#### Grid Container
```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
}
```

### 3. Common Properties

#### Spacing
- Large: 4rem (64px)
- Medium: 3rem (48px)
- Small: 2rem (32px)
- XSmall: 1rem (16px)

#### Colors
- Primary Background: #1d2329
- Text: #FFF
- Accent: #F39
- Border: #000
- Transparent Background: rgba(255, 255, 255, 0.1)

#### Shadows
- Large: -12px 12px 0px #000
- Medium: -8px 8px 0px #000
- Small: -6px 6px 0px #000

#### Borders
- Desktop: 4px solid
- Mobile: 2px solid

#### Border Radius
- Large: 1rem (16px)
- Small: 0.5rem (8px)

### 4. Responsive Patterns

#### Desktop (1200px+)
```css
.card {
  padding: 4rem;
  border: 4px solid;
  box-shadow: -12px 12px 0px #000;
}

.grid {
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
}
```

#### Laptop (max-width: 1200px)
```css
.card {
  padding: 3rem;
}

.grid {
  gap: 3rem;
}
```

#### Tablet (max-width: 768px)
```css
.card {
  padding: 2rem;
}

.grid {
  grid-template-columns: 1fr;
  gap: 2rem;
}

.darkContainer {
  flex-direction: column;
}
```

#### Mobile (max-width: 480px)
```css
.card {
  padding: 1rem;
  border-width: 2px;
  box-shadow: -6px 6px 0px #000;
}

.grid {
  padding: 0 1rem;
}
```

## Recommended Consolidation

### 1. CSS Variables
```css
:root {
  /* Colors */
  --card-background: #1d2329;
  --card-background-transparent: rgba(255, 255, 255, 0.1);
  --text-color: #FFF;
  --accent-color: #F39;
  --border-color: #000;

  /* Spacing */
  --spacing-xs: 1rem;
  --spacing-sm: 2rem;
  --spacing-md: 3rem;
  --spacing-lg: 4rem;

  /* Borders */
  --border-width: 4px;
  --border-width-mobile: 2px;
  --border-radius: 1rem;
  --border-radius-mobile: 0.5rem;

  /* Shadows */
  --shadow-lg: -12px 12px 0px var(--border-color);
  --shadow-md: -8px 8px 0px var(--border-color);
  --shadow-sm: -6px 6px 0px var(--border-color);

  /* Layout */
  --max-width: 1400px;
  --container-padding: 4rem;
  --grid-gap: 4rem;
}
```

### 2. Base Components
```css
/* Base Card */
.cardBase {
  border: var(--border-width) solid var(--border-color);
  background: var(--card-background);
  color: var(--text-color);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-lg);
}

/* Flex Card */
.cardFlex {
  composes: cardBase;
  display: flex;
  gap: var(--spacing-md);
}

/* Grid Card */
.cardGrid {
  composes: cardBase;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

/* Container */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--container-padding);
}

/* Section */
.section {
  position: relative;
  width: 100%;
  padding: var(--spacing-lg) var(--spacing-md);
}
```

### 3. Responsive Styles
```css
/* Laptop */
@media (max-width: 1200px) {
  :root {
    --container-padding: 3rem;
    --grid-gap: 3rem;
  }

  .cardBase {
    padding: var(--spacing-md);
  }
}

/* Tablet */
@media (max-width: 768px) {
  :root {
    --container-padding: 2rem;
    --grid-gap: 2rem;
  }

  .cardBase {
    padding: var(--spacing-sm);
  }

  .cardFlex {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .cardGrid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
}

/* Mobile */
@media (max-width: 480px) {
  :root {
    --container-padding: 1rem;
    --border-width: 2px;
    --border-radius: 0.5rem;
  }

  .cardBase {
    padding: var(--spacing-xs);
    border-width: var(--border-width-mobile);
    box-shadow: var(--shadow-sm);
  }
}
```

### 4. Usage Example
```css
.myComponent {
  composes: cardBase;
  /* Additional specific styles */
}

.myFlexComponent {
  composes: cardFlex;
  /* Additional specific styles */
}

.myGridComponent {
  composes: cardGrid;
  /* Additional specific styles */
}
```

This consolidation:
- Establishes consistent spacing, colors, and visual properties
- Reduces code duplication
- Makes maintenance easier
- Ensures consistent responsive behavior
- Provides flexibility through composition 
import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    title: "Decent App",
    description: "The Decent app focuses on a standardized toolkit and framework that can be universally adopted by new and existing DAOs.",
    role: "Lead Product Designer",
    technologies: [],
    route: "/case-studies/decent-app",
    year: "2023",
    company: "Decent DAO",
    duration: "Q1 2023 - Q3 2024",
    team: "2 Designers, 4 Engineers, Product",
    imageUrl: "/images/decent-app/gallery/decent_app--hero.png",
    additionalImages: [
      "/images/decent-app/decent-app-desktop.png",
      "/images/decent-app/decent-app-mobile-1.png",
      "/images/decent-app/decent-app-mobile-2.png"
    ]
  },
  {
    title: "Decent Design System",
    description: "The Decent Design System is designed to streamline the workflow for both developers and designers, making it easier and faster to build. It plays a key role in supporting Decent DAO's products by ensuring consistent, scalable, and efficient collaboration between design and development teams.",
    role: "Lead Product Designer",
    technologies: ["Chakra UI", "Storybook", "Figma API", "React", "TypeScript"],
    route: "/case-studies/decent-design-system",
    year: "2023",
    company: "Decent Labs",
    duration: "2023 - Ongoing",
    team: "Front End Engineer, Design Team",
    imageUrl: "/images/decent-design-system/gallery/decent_ds--hero.png",
    additionalImages: [
      "/images/decent-design-system/gallery/dds-menu-components.png",
      "/images/decent-design-system/gallery/dds-spacing.png",
      "/images/decent-design-system/gallery/dds-ui-color-tokens.png"
    ]
  },
  {
    title: "Blockset BRD Docs",
    description: "In 2020, BRD was putting the finishing touches on their new whitelisting product called Blockset. Decent was hired to design and build a custom documentation site and marketing page, including a Developer Sandbox to test out API requests.",
    role: "Lead Product Designer",
    technologies: ["React", "Markdown", "JavaScript"],
    route: "/case-studies/blockset-brd-docs",
    year: "2021",
    company: "BRD",
    duration: "Q4 2020 – Q2 2021",
    team: "Decent Design and Engineering + BRD Design and Engineering",
    imageUrl: "/images/blockset-docs/gallery/bset-blockset-hero.png",
    additionalImages: [
      "/images/blockset-docs/gallery/bset-sandbox.png",
      "/images/blockset-docs/gallery/bset-pricing-mobile.png",
      "/images/blockset-docs/gallery/bset-page-tokens.png"
      
    ]
  }
] 
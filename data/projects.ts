import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    title: "Decent App",
    description: "The Decent app focuses on a standardized toolkit and framework that can be universally adopted by new and existing DAOs. By focusing on open-source principles and transparency, Decent DAO intends to enable a more equitable distribution of power and resources within digital communities.",
    role: "Lead Product Designer",
    technologies: ["React Native", "TypeScript", "Bitcoin", "Lightning Network", "Nostr"],
    route: "/case-studies/decent-app",
    year: "2023",
    company: "Decent Labs",
    duration: "Q1 2023 - Q3 2024",
    team: "2 Designers, 4 Engineers, Product",
    imageUrl: "/portfolio/decent_app--hero.png"
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
    imageUrl: "/portfolio/decent_ds--hero.png"
  },
  {
    title: "Blockset BRD Docs",
    description: "In 2021, BRD was putting the finishing touches on their new whitelisting product called Blockset. Decent was hired to design and build a custom documentation site and marketing page, including a Developer Sandbox to test out API requests.",
    role: "Lead Product Designer",
    technologies: ["Docusaurus", "React", "Markdown", "JavaScript"],
    route: "/case-studies/blockset-brd-docs",
    year: "2021",
    company: "BRD",
    duration: "Q1 2021 - Q3 2021",
    team: "Decent Design and Engineering + BRD Design and Engineering",
    imageUrl: "/portfolio/blockset_docs--hero.png"
  }
] 
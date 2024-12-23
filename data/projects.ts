import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    title: "Decent App",
    description: "A decentralized social media platform built on Bitcoin, focusing on user sovereignty and data ownership. The app enables users to create, share, and monetize content while maintaining control over their digital identity.",
    role: "Lead Designer & Frontend Developer",
    technologies: ["React Native", "TypeScript", "Bitcoin", "Lightning Network", "Nostr"],
    link: "https://decent.social",
    year: "2023",
    company: "Decent Labs"
  },
  {
    title: "Decent Design System",
    description: "A comprehensive design system and component library built to unify the user experience across Decent's products. Features a dark mode-first approach with accessibility and performance at its core.",
    role: "Design System Architect",
    technologies: ["React", "TypeScript", "Storybook", "Styled Components", "Figma"],
    year: "2023",
    company: "Decent Labs"
  },
  {
    title: "Sarcophagus",
    description: "A decentralized dead man's switch built on Ethereum. The platform allows users to encrypt and schedule the delivery of sensitive information to designated recipients after a specified time period.",
    role: "UI/UX Designer",
    technologies: ["React", "Ethereum", "Web3.js", "TypeScript", "Figma"],
    link: "https://sarcophagus.io",
    year: "2022",
    company: "Decent Labs"
  },
  {
    title: "Lumen",
    description: "A Bitcoin wallet and Lightning Network node management interface. The project focuses on making Lightning Network operations accessible to non-technical users while maintaining security.",
    role: "Product Designer",
    technologies: ["React", "TypeScript", "Bitcoin", "Lightning Network", "Electron"],
    year: "2022",
    company: "Decent Labs"
  },
  {
    title: "BRD Docs",
    description: "A comprehensive documentation platform for BRD's blockchain infrastructure and wallet SDK. The project aimed to make blockchain integration easier for developers.",
    role: "Technical Writer & Designer",
    technologies: ["Docusaurus", "React", "Markdown", "JavaScript"],
    link: "https://developer.brd.com",
    year: "2021",
    company: "BRD"
  }
] 
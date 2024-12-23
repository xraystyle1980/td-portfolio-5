export interface Project {
  title: string
  description: string
  role: string
  technologies: string[]
  link?: string
  imageUrl?: string
  year: string | number
  company?: string
}

export interface ProjectSectionProps {
  project: Project
  className?: string
} 
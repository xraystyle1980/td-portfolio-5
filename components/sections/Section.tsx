import WaveBorder from './WaveBorder'

interface SectionProps {
  children: React.ReactNode;
  isDark?: boolean;
}

export default function Section({ children, isDark }: SectionProps) {
  return (
    <section className={`relative ${isDark ? 'bg-black' : ''}`}>
      {children}
    </section>
  )
} 
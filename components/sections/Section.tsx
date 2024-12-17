import WaveBorder from './WaveBorder'

interface SectionProps {
  children: React.ReactNode;
  hasWaveBorder?: boolean;
  isDark?: boolean;
}

export default function Section({ children, hasWaveBorder, isDark }: SectionProps) {
  return (
    <section className={`relative ${isDark ? 'bg-black' : ''}`}>
      {children}
      {hasWaveBorder && <WaveBorder />}
    </section>
  )
} 
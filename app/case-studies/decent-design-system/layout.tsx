import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Decent Design System Case Study',
  description: 'A unified design system for streamlining workflows and delivering consistent user experiences',
  openGraph: {
    title: 'Decent Design System Case Study',
    description: 'A unified design system for streamlining workflows and delivering consistent user experiences',
    images: ['/images/decent-design-system/gallery/dds-spacing.png'],
  },
  metadataBase: new URL(''),
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 
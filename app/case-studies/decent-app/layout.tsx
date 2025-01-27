import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Decent App Case Study',
  description: 'A case study outlining the comprehensive redesign of the Fractal App into the Decent App, the role I played, and the impact of my contributions.',
  openGraph: {
    title: 'Decent App Case Study',
    description: 'A case study outlining the comprehensive redesign of the Fractal App into the Decent App, the role I played, and the impact of my contributions.',
    images: ['/images/decent-app/gallery/decent-withdraw-desktop-hb.png'],
  },
  metadataBase: new URL('https://trice.design')
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blockset BRD Docs Case Study',
  description: 'Documentation and marketing website for Blockset, a blockchain data integration platform by BRD',
  openGraph: {
    title: 'Blockset BRD Docs Case Study',
    description: 'Documentation and marketing website for Blockset, a blockchain data integration platform by BRD',
    images: ['/images/blockset-docs/gallery/bset-docs-home.png'],
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
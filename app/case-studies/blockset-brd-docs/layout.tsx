import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blockset BRD Docs Case Study',
  description: 'Documentation and marketing website for Blockset, a blockchain data integration platform',
  openGraph: {
    title: 'Blockset BRD Docs Case Study',
    description: 'Documentation and marketing website for Blockset, a blockchain data integration platform',
    images: ['/images/blockset-docs/gallery/bset-docs-home.png'],
  },
  metadataBase: new URL('http://localhost:3000'),
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 
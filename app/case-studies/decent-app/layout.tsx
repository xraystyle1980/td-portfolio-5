import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Decent App Case Study',
  description: 'Your case study description',
  openGraph: {
    title: 'Decent App Case Study',
    description: 'Your case study description',
    images: ['/path-to-your-image.jpg'],
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
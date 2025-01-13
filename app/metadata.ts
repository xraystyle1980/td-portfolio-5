import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Matt Trice • Product Designer',
  description: 'ATL-based Product Designer with a track record of design leadership, embracing complex problems, and crafting elegant solutions that deliver meaningful business impact.',
  keywords: ['Product Design', 'Design Systems', 'UX Design', 'Web Development', 'Developer Tools'],
  authors: [{ name: 'Matt Trice' }],
  creator: 'Matt Trice',
  publisher: 'Matt Trice',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://trice.design',
    siteName: 'Trice.Design',
    title: 'Matt Trice • Product Designer',
    description: 'ATL-based Product Designer with a track record of design leadership, embracing complex problems, and crafting elegant solutions that deliver meaningful business impact.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Matt Trice Design Portfolio'
      }
    ]
  }
};
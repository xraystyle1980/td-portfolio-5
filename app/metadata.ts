import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Matt Trice • Product Designer',
  description: 'ATL-based Product Designer with a track record of design leadership, embracing complex problems, and crafting elegant solutions that deliver meaningful business impact.',
  keywords: ['Product Design', 'Design Systems', 'UX Design', 'Web Development', 'Developer Tools'],
  authors: [{ name: 'Matt Trice' }],
  creator: 'Matt Trice',
  publisher: 'Matt Trice',
  robots: 'index, follow',
  
  // Manifest and icons
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ]
  },

  // Theme and mobile configuration
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Trice Design'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover'
  },

  // OpenGraph
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
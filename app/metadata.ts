import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Matt Trice | ATL Product Designer, Design Leader, Creative Engineer',
  description: 'ATL-based Senior Product Designer, Design Leader, and Creative Engineer. I have a track record of helping startups launch, leading design teams, and getting a product from zero to one.',
  keywords: [
    'Product Design',
    'Design Systems', 
    'UX Design',
    'Web Development',
    'Developer Tools',
    'Design Leadership',
    'Design Engineer',
    'Creative Engineer',
    'Startup Design',
    'Documentation Design',
    'Marketing Design',
    'Blockchain Design',
    'User Experience',
    'User Interface',
    'ATL Designer'
  ],
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
    description: 'ATL-based Senior Product Designer, Design Leader, and Creative Engineer. I have a track record of helping startups launch, leading design teams, and getting a product from zero to one.',
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


.
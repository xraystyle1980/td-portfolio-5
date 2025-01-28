import "./globals.css";
import { spaceGrotesk, forceMajeure } from '@/styles/fonts';
import { AppProvider } from '@/contexts/AppContext';
import ClientLayout from './ClientLayout';
import Footer from '@/components/ui-components/Footer';
import Scene3DWrapper from './Scene3DWrapper';
import { Metadata, Viewport } from 'next'
import Navigation from '@/components/ui-components/Navigation';
import SmoothScroll from '@/components/ui-components/Scroll/SmoothScroll';
import LoadingWrapper from '@/components/ui-components/LoadingWrapper';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://trice.design'),
  title: {
    template: '%s | Matt Trice • Senior Designer & Creative Engineer',
    default: 'Matt Trice • Senior Designer & Creative Engineer',
  },
  description: 'ATL-based Senior Product Designer, Design Leader, and Creative Engineer. I have a track record of helping startups launch, leading design teams, and getting a product from zero to one.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${forceMajeure.variable}`}
      style={{ fontFamily: 'var(--font-space)' }}
    >
      <head>
        <Script 
          defer 
          data-domain="trice.design" 
          src="https://plausible.io/js/script.outbound-links.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-events" strategy="afterInteractive">
          {`
            window.plausible = window.plausible || function() { 
              (window.plausible.q = window.plausible.q || []).push(arguments) 
            }
          `}
        </Script>
      </head>
      <body>
        <AppProvider>
          <LoadingWrapper>
            <Scene3DWrapper />
            <Navigation />
            <SmoothScroll>
              <ClientLayout>
                {children}
                <Footer />
              </ClientLayout>
            </SmoothScroll>
          </LoadingWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
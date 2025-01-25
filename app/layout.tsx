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
    template: '%s | Your Site Name',
    default: 'Your Site Name',
  },
  description: 'Your site description',
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
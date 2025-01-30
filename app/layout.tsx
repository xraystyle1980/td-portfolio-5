import "./globals.css";
import { spaceGrotesk, forceMajeure } from '@/styles/fonts';
import { AppProvider } from '@/contexts/AppContext';
import ClientLayout from './ClientLayout';
import Footer from '@/components/ui-components/Footer';
import Scene3DWrapper from './Scene3DWrapper';
import { Viewport } from 'next'
import Navigation from '@/components/ui-components/Navigation';
import SmoothScroll from '@/components/ui-components/Scroll/SmoothScroll';
import LoadingWrapper from '@/components/ui-components/LoadingWrapper';
import { Analytics } from '@vercel/analytics/next';
import { metadata } from './metadata';

export { metadata };

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  userScalable: false
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
          <Analytics />
        </AppProvider>
      </body>
    </html>
  );
}
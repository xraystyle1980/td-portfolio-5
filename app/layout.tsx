import "./globals.css";
import { sourceSerif, cooper } from '@/styles/fonts'
import { AppProvider } from '@/contexts/AppContext'
import ClientLayout from './ClientLayout'
import Footer from '@/components/ui-components/Footer'
import Scene3DWrapper from './Scene3DWrapper'
import { metadata } from './metadata'
import Navigation from '@/components/ui-components/Navigation'
import SmoothScroll from '@/components/ui-components/Scroll/SmoothScroll'
// import Loading from '@/components/Loading';


export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cooper.variable} ${sourceSerif.variable}`} style={{ fontFamily: 'var(--font-source-serif), var(--font-cooper)' }}>
      <body>
        <AppProvider>
          {/* Place Scene3DWrapper and Navigation outside of SmoothScroll */}
          <Scene3DWrapper />
          <Navigation />
          <SmoothScroll>
            <ClientLayout>
              {children}
              <Footer />
            </ClientLayout>
          </SmoothScroll>
        </AppProvider>
      </body>
      {/* <body>
        <SmoothScroll>
          <AppProvider>
            <Scene3DWrapper />
            <Navigation />
            <ClientLayout>
              {children}
              <Footer />
            </ClientLayout>
          </AppProvider>
        </SmoothScroll>
      </body> */}
    </html>
  )
}
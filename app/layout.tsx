import "./globals.css";
import { sourceSerif, cooper } from '@/styles/fonts'
import { AppProvider } from '@/contexts/AppContext'
import ClientLayout from './ClientLayout'
import Footer from '@/components/layout-components/Footer'
import Scene3DWrapper from './Scene3DWrapper'
import { metadata } from './metadata'
import Navigation from '@/components/layout-components/Navigation'
import SmoothScroll from '@/components/layout-components/Scroll/SmoothScroll'
// import Loading from '@/components/Loading';


export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cooper.variable} ${sourceSerif.variable}`}>
      <body>
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
      </body>
    </html>
  )
}
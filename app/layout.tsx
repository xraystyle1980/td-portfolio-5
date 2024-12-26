import "./globals.css";
import { Caveat, Source_Serif_4 } from 'next/font/google'
import Navigation from '@/components/layout/Navigation'
import localFont from 'next/font/local'
import ClientLayout from './ClientLayout'
import Footer from '@/components/layout/Footer'
import Scene3DWrapper from './Scene3DWrapper'
import { metadata } from './metadata'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif'
})

const cooper = localFont({
  src: '../public/fonts/Cooper-var.ttf',
  variable: '--font-cooper'
})

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cooper.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Scene3DWrapper />
        <ClientLayout>
          <Navigation />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  )
}

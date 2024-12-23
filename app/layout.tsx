import type { Metadata } from "next";
import "./globals.css";
import { Caveat, Source_Serif_4 } from 'next/font/google'
import Navigation from '@/components/layout/Navigation/Navigation'
import localFont from 'next/font/local'

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

export const metadata: Metadata = {
  title: 'Trice.Design',
  description: 'Portfolio of Trice Design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cooper.variable} ${sourceSerif.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

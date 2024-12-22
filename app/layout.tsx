import type { Metadata } from "next";
import "./globals.css";
import { Caveat } from 'next/font/google'
import Navigation from '@/components/Navigation'
import localFont from 'next/font/local'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

const cooper = localFont({
  src: '../public/fonts/Cooper-var.ttf',
  variable: '--font-cooper'
})

export const metadata: Metadata = {
  title: 'Matt Trice - Product Designer & Developer',
  description: 'Atlanta-based product designer and developer specializing in web applications and user interfaces.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cooper.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

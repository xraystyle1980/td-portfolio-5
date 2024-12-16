import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/Navigation'
import { Caveat } from 'next/font/google'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Your Site",
  description: "Interactive portfolio site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div 
          className="fixed inset-0 z-[-1]"
          style={{
            backgroundImage: 'url(/grid-full-screen.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'right top',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Navigation />
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from "next";
import "./globals.css";
import { Caveat } from 'next/font/google'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
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
        {children}
      </body>
    </html>
  )
}

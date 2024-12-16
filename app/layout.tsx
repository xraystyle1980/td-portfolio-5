import type { Metadata } from "next";
import "./globals.css";
import Navigation from '@/components/Navigation'

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
      <body className="min-h-screen bg-white">
        <Navigation />
        {children}
      </body>
    </html>
  )
}

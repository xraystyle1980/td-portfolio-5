'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <footer className="relative h-[100px] w-full bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="text-sm text-gray-600">
            © 2024 Your Company. All rights reserved.
          </div>
          
          <div className="flex gap-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors
                  ${pathname === href 
                    ? 'text-[#6366F1]' 
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

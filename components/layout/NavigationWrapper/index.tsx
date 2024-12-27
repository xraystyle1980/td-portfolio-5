'use client'

import { usePathname } from 'next/navigation'
import Navigation from '../Navigation'
import SubNavigation from '../SubNavigation'

export default function NavigationWrapper() {
  const pathname = usePathname()
  const isSubPage = pathname?.startsWith('/work/')

  return isSubPage ? <SubNavigation /> : <Navigation />
} 
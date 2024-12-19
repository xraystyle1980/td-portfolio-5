'use client'

import { useEffect } from 'react'
import Stats from 'stats.js'

export default function PerformanceStats() {
  useEffect(() => {
    const stats = new Stats()
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.cssText = 'position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:99999;'
    document.body.appendChild(stats.dom)

    let frame: number
    function loop() {
      frame = requestAnimationFrame(loop)
      stats.update()
    }
    loop()

    return () => {
      cancelAnimationFrame(frame)
      document.body.removeChild(stats.dom)
    }
  }, [])

  return null
} 
'use client'

import { useState, useEffect } from 'react'
import { fonts } from '@/lib/constants'

export function useFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    const loadFonts = async () => {
      setFontsLoaded(false)
      const fontPromises = fonts.map(font =>
        new Promise((resolve) => {
          const link = document.createElement('link')
          link.href = `https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}&display=swap`
          link.rel = 'stylesheet'
          link.onload = resolve
          document.head.appendChild(link)
        })
      )
      await Promise.all(fontPromises)
      setFontsLoaded(true)
    }

    loadFonts()
  }, [])

  return fontsLoaded
}
'use client'

import { VisualEditing } from 'next-sanity'
import { useEffect, useState } from 'react'

export function VisualEditingWrapper() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Add debug logging for visual editing
    if (typeof window !== 'undefined') {
      console.log('🎨 Visual Editing Wrapper mounted')
      console.log('🎨 Current URL:', window.location.href)
      console.log('🎨 Environment:', {
        NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
      })
    }
  }, [])

  // Only render on client side to avoid hydration issues
  if (!isClient) {
    return null
  }

  return (
    <VisualEditing
      zIndex={1000}
      refresh={(payload) => {
        console.log('🎨 Visual editing refresh triggered:', payload)
        if (payload.source === 'manual') {
          console.log('🎨 Manual refresh - reloading page')
          window.location.reload()
          return false
        }
        return true
      }}
    />
  )
}

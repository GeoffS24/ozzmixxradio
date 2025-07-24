'use client'

import { VisualEditing } from 'next-sanity'
import { useEffect, useState } from 'react'

export function VisualEditingWrapper() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Only render on client side to avoid hydration issues
  if (!isClient) {
    return null
  }

  return (
    <VisualEditing
      zIndex={1000}
      refresh={(payload) => {
        if (payload.source === 'manual') {
          window.location.reload()
          return false
        }
      }}
    />
  )
}

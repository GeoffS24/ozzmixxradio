"use client"

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { cn } from '@/lib/utils'

interface GoogleAdsenseProps {
  adClient: string
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
  className?: string
  testMode?: boolean
  lazyLoading?: boolean
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export function GoogleAdsense({
  adClient,
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
  className,
  testMode = false,
  lazyLoading = true,
}: GoogleAdsenseProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const isLoaded = useRef(false)
  const [scriptReady, setScriptReady] = useState(false)

  // Check for script readiness
  useEffect(() => {
    const checkScript = () => {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        console.log('[AdSense] Script is ready')
        setScriptReady(true)
        return true
      }
      return false
    }

    // Check immediately
    if (checkScript()) return

    // Poll for script availability
    const interval = setInterval(() => {
      if (checkScript()) {
        clearInterval(interval)
      }
    }, 100)

    // Cleanup after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval)
      console.error('[AdSense] Script loading timeout after 10 seconds')
    }, 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (!scriptReady) return

    if (!lazyLoading) {
      loadAd()
      return
    }

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded.current) {
            loadAd()
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (adRef.current) {
      observer.observe(adRef.current)
    }

    return () => observer.disconnect()
  }, [lazyLoading, scriptReady])

  const loadAd = () => {
    if (isLoaded.current) return

    console.log(`[AdSense] Attempting to load ad - Client: ${adClient}, Slot: ${adSlot}, Format: ${adFormat}`)

    try {
      if (typeof window !== 'undefined') {
        if (!window.adsbygoogle) {
          console.error('[AdSense] adsbygoogle array not found. Script may not be loaded.')
          // Try to initialize the array
          window.adsbygoogle = window.adsbygoogle || []
          console.log('[AdSense] Initialized adsbygoogle array')
        }

        console.log('[AdSense] Pushing ad to adsbygoogle array')
        window.adsbygoogle.push({})
        isLoaded.current = true
        console.log('[AdSense] Ad loaded successfully')
      }
    } catch (error) {
      console.error('[AdSense] Error loading Google AdSense ad:', error)
      console.error('[AdSense] Ad details:', { adClient, adSlot, adFormat, testMode })
    }
  }

  // Don't render ads in development unless test mode is enabled
  if (process.env.NODE_ENV === 'development' && !testMode) {
    return (
      <div 
        className={cn(
          "bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500",
          className
        )}
        style={style}
      >
        <div className="text-sm font-medium">Google AdSense Ad</div>
        <div className="text-xs mt-1">Slot: {adSlot}</div>
        <div className="text-xs">Format: {adFormat}</div>
      </div>
    )
  }

  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      
      <div ref={adRef} className={cn("google-ad-container w-full", className)}>
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            minWidth: '300px',
            minHeight: '250px',
            ...style
          }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive.toString()}
          data-ad-test={testMode ? 'on' : undefined}
        />
      </div>
    </>
  )
}

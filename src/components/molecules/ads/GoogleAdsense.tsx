"use client"

import { useEffect, useRef } from 'react'
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

  useEffect(() => {
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
  }, [lazyLoading])

  const loadAd = () => {
    if (isLoaded.current) return
    
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({})
        isLoaded.current = true
      }
    } catch (error) {
      console.error('Error loading Google AdSense ad:', error)
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
      
      <div ref={adRef} className={cn("google-ad-container", className)}>
        <ins
          className="adsbygoogle"
          style={style}
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

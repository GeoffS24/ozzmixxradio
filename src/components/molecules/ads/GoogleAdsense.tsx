"use client"

import { useCallback, useEffect, useRef, useState } from 'react'
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
  const insRef = useRef<HTMLModElement>(null)

  const isLoaded = useRef(false)
  const [scriptReady, setScriptReady] = useState(false)

  // Check for script readiness
  useEffect(() => {
    // Proceed always (no CMP gating)

    const checkScript = () => {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        setScriptReady(true)
        return true
      }
      return false
    }

    if (checkScript()) return

    const interval = setInterval(() => {
      if (checkScript()) {
        clearInterval(interval)
      }
    }, 100)

    const timeout = setTimeout(() => {
      clearInterval(interval)
    }, 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [])
  const loadAd = useCallback(() => {
    if (isLoaded.current) return

    const insEl = insRef.current as HTMLElement | null
    if (!insEl) return

    // Avoid duplicate pushes (StrictMode double effects, re-renders)
    if (insEl.getAttribute('data-ad-initialized') === 'true') return
    const status = insEl.getAttribute('data-ad-status')
    if (status === 'filled') {
      isLoaded.current = true
      return
    }

    // Mark initialized before pushing to avoid double push
    insEl.setAttribute('data-ad-initialized', 'true')
    isLoaded.current = true

    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
      }
    } catch (error) {
      console.error('[AdSense] Error loading Google AdSense ad:', error)
    }
  }, [])

  // Load ad once the script is ready
  useEffect(() => {
    if (!scriptReady) return
    loadAd()
  }, [scriptReady, loadAd])


  return (
    <>
      <Script
        id={`adsense-${adClient}`}
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
        crossOrigin="anonymous"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            window.adsbygoogle = window.adsbygoogle || []
          }
          setScriptReady(true)
        }}
        onError={(error) => {
          console.error('[AdSense] Script loading error:', error)
        }}
      />

      {!scriptReady ? (
        <div className={cn("google-ad-placeholder w-full", className)}>
          <div className="flex items-center justify-center h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Ad placeholder</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={adRef}
          className={cn("google-ad-container w-full", className)}
          style={{
            width: "100%",
            maxWidth: "2000px",
            margin: "0 auto"
          }}
        >
          <ins
            ref={insRef}
            key={`${adClient}-${adSlot}`}
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
      )}
    </>
  )
}

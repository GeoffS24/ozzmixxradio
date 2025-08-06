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
    _iub: any
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
  const adRef = useRef<HTMLModElement>(null)
  const isLoaded = useRef(false)
  const [scriptReady, setScriptReady] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)

  // Check for consent
  useEffect(() => {
    const handleConsentGiven = () => {
      setConsentGiven(true)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('iubenda_consent_given', handleConsentGiven)
      window.addEventListener('iubenda_consent_given_purpose_1', handleConsentGiven)

      // Check if consent was already given
      if (window._iub && window._iub.cs && window._iub.cs.api && window._iub.cs.api.isConsentGiven()) {
        setConsentGiven(true)
      }

      // For testing: temporarily allow ads without consent in development
      if (process.env.NODE_ENV === 'development' || testMode) {
        setConsentGiven(true)
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('iubenda_consent_given', handleConsentGiven)
        window.removeEventListener('iubenda_consent_given_purpose_1', handleConsentGiven)
      }
    }
  }, [testMode])

  // Check for script readiness
  useEffect(() => {
    if (!consentGiven) return

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
  }, [consentGiven])

  useEffect(() => {
    if (!consentGiven || !scriptReady) return

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
  }, [consentGiven, lazyLoading, scriptReady])

  const loadAd = () => {
    if (isLoaded.current || !consentGiven) return
    if (adRef.current?.getAttribute("data-ad-status") === "filled") {
      return
    }

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

  // Don't render anything if consent not given
  if (!consentGiven) return null

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

  // Don't render anything if script is not ready
  if (!scriptReady) {
    return (
      <div className={cn("google-ad-placeholder w-full", className)}>
        <div className="flex items-center justify-center h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Loading AdSense...</div>
            {testMode && (
              <div className="text-xs text-muted-foreground mt-1">Test Mode</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Script
        id={`adsense-${adClient}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
                var script = document.createElement('script');
                script.async = true;
                script.crossOrigin = 'anonymous';
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}';
                document.head.appendChild(script);
              }
            })();
          `
        }}
      />
      
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
          key={adSlot}
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

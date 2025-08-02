"use client"

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { GoogleAdsData } from '@/types/sanity'

interface AdDebuggerProps {
  adsData?: GoogleAdsData | null
  className?: string
}

export function AdDebugger({ adsData, className }: AdDebuggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [adsbygoogleExists, setAdsbygoogleExists] = useState(false)
  const [consoleErrors, setConsoleErrors] = useState<string[]>([])

  useEffect(() => {
    // Check if AdSense script is loaded
    const checkScript = () => {
      const script = document.querySelector('script[src*="adsbygoogle.js"]')
      setScriptLoaded(!!script)
      
      // Check if adsbygoogle array exists
      setAdsbygoogleExists(typeof window !== 'undefined' && !!window.adsbygoogle)
    }

    checkScript()
    
    // Monitor for script loading
    const interval = setInterval(checkScript, 1000)
    
    // Capture console errors
    const originalError = console.error
    console.error = (...args) => {
      const message = args.join(' ')
      if (message.toLowerCase().includes('adsense') || message.toLowerCase().includes('adsbygoogle')) {
        setConsoleErrors(prev => [...prev, message])
      }
      originalError.apply(console, args)
    }

    return () => {
      clearInterval(interval)
      console.error = originalError
    }
  }, [])

  const getEnvironmentInfo = () => {
    return {
      nodeEnv: process.env.NODE_ENV,
      isDevelopment: process.env.NODE_ENV === 'development',
      isProduction: process.env.NODE_ENV === 'production',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A'
    }
  }

  const getAdsStatus = () => {
    if (!adsData) return 'No ads data received'
    if (!adsData.enabled) return 'Ads disabled in Sanity'
    if (!adsData.adClient) return 'No ad client ID configured'
    if (!adsData.adSlots || adsData.adSlots.length === 0) return 'No ad slots configured'
    
    const enabledSlots = adsData.adSlots.filter(slot => slot.enabled)
    if (enabledSlots.length === 0) return 'No enabled ad slots'
    
    return `${enabledSlots.length} enabled ad slots`
  }

  const getRecommendations = () => {
    const recommendations = []
    
    if (!adsData?.enabled) {
      recommendations.push('Enable ads in Sanity CMS')
    }
    
    if (!adsData?.adClient) {
      recommendations.push('Add your Google AdSense client ID (ca-pub-xxxxxxxxxx) in Sanity')
    } else if (!adsData.adClient.match(/^ca-pub-\d+$/)) {
      recommendations.push('Fix AdSense client ID format (should be ca-pub-xxxxxxxxxx)')
    }
    
    if (!adsData?.adSlots?.some(slot => slot.enabled)) {
      recommendations.push('Enable at least one ad slot in Sanity')
    }
    
    if (!scriptLoaded) {
      recommendations.push('AdSense script not loading - check network or ad blockers')
    }
    
    if (consoleErrors.length > 0) {
      recommendations.push('Fix console errors related to AdSense')
    }
    
    if (process.env.NODE_ENV === 'development' && !adsData?.settings?.testMode) {
      recommendations.push('Enable test mode in Sanity for development testing')
    }

    return recommendations
  }

  const envInfo = getEnvironmentInfo()
  const adsStatus = getAdsStatus()
  const recommendations = getRecommendations()

  if (!isOpen) {
    return (
      <div className={cn("fixed bottom-4 right-4 z-50", className)}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors"
        >
          🐛 Debug Ads
        </button>
      </div>
    )
  }

  return (
    <div className={cn("fixed inset-4 z-50 bg-black/80 flex items-center justify-center", className)}>
      <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Google AdSense Debug Info</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Environment Info */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Environment</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>NODE_ENV: <span className="font-mono">{envInfo.nodeEnv}</span></div>
              <div>Is Production: <span className={envInfo.isProduction ? 'text-green-600' : 'text-red-600'}>{envInfo.isProduction ? 'Yes' : 'No'}</span></div>
            </div>
          </div>

          {/* Ads Configuration */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Ads Configuration</h3>
            <div className="space-y-2 text-sm">
              <div>Status: <span className={adsData?.enabled ? 'text-green-600' : 'text-red-600'}>{adsStatus}</span></div>
              <div>Client ID: <span className="font-mono">{adsData?.adClient || 'Not set'}</span></div>
              <div>Test Mode: <span className={adsData?.settings?.testMode ? 'text-green-600' : 'text-gray-600'}>{adsData?.settings?.testMode ? 'Enabled' : 'Disabled'}</span></div>
              <div>Lazy Loading: <span className={adsData?.settings?.lazyLoading !== false ? 'text-green-600' : 'text-gray-600'}>{adsData?.settings?.lazyLoading !== false ? 'Enabled' : 'Disabled'}</span></div>
            </div>
          </div>

          {/* Ad Slots */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Ad Slots</h3>
            {adsData?.adSlots && adsData.adSlots.length > 0 ? (
              <div className="space-y-2">
                {adsData.adSlots.map((slot, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded text-sm">
                    <div className="font-medium">{slot.name}</div>
                    <div className="grid grid-cols-2 gap-2 mt-1 text-xs text-gray-600">
                      <div>Slot ID: {slot.slotId}</div>
                      <div>Placement: {slot.placement}</div>
                      <div>Format: {slot.format}</div>
                      <div>Enabled: <span className={slot.enabled ? 'text-green-600' : 'text-red-600'}>{slot.enabled ? 'Yes' : 'No'}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-red-600">No ad slots configured</div>
            )}
          </div>

          {/* Script Status */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Script Status</h3>
            <div className="space-y-2 text-sm">
              <div>AdSense Script Loaded: <span className={scriptLoaded ? 'text-green-600' : 'text-red-600'}>{scriptLoaded ? 'Yes' : 'No'}</span></div>
              <div>adsbygoogle Array: <span className={adsbygoogleExists ? 'text-green-600' : 'text-red-600'}>{adsbygoogleExists ? 'Available' : 'Not Available'}</span></div>
            </div>
          </div>

          {/* Console Errors */}
          {consoleErrors.length > 0 && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3 text-red-600">Console Errors</h3>
              <div className="space-y-1">
                {consoleErrors.map((error, index) => (
                  <div key={index} className="bg-red-50 p-2 rounded text-sm font-mono text-red-700">
                    {error}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3 text-orange-600">Recommendations</h3>
              <ul className="space-y-1">
                {recommendations.map((rec, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Raw Data */}
          <details className="border rounded-lg p-4">
            <summary className="font-semibold text-lg cursor-pointer">Raw Ads Data</summary>
            <pre className="mt-3 bg-gray-100 p-3 rounded text-xs overflow-x-auto">
              {JSON.stringify(adsData, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  )
}

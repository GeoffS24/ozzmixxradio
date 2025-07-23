"use client"

import { useEffect } from 'react'

interface SEOMonitoringProps {
  pageTitle?: string
  pageType?: 'homepage' | 'article' | 'listing' | 'other'
}

export function SEOMonitoring({ pageTitle, pageType = 'other' }: SEOMonitoringProps) {
  useEffect(() => {
    // Track page views for SEO analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageTitle || document.title,
        page_location: window.location.href,
        page_type: pageType,
      })
    }

    // Track Core Web Vitals
    if (typeof window !== 'undefined' && 'web-vital' in window) {
      // This would integrate with web-vitals library if installed
      // You can add web-vitals tracking here
    }

    // SEO debugging in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🔍 SEO Debug Info')
      console.log('Page Title:', document.title)
      console.log('Meta Description:', document.querySelector('meta[name="description"]')?.getAttribute('content'))
      console.log('Canonical URL:', document.querySelector('link[rel="canonical"]')?.getAttribute('href'))
      console.log('Open Graph Title:', document.querySelector('meta[property="og:title"]')?.getAttribute('content'))
      console.log('Open Graph Image:', document.querySelector('meta[property="og:image"]')?.getAttribute('content'))
      console.log('Structured Data:', document.querySelectorAll('script[type="application/ld+json"]').length + ' scripts found')
      console.groupEnd()
    }
  }, [pageTitle, pageType])

  // Performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor page load performance
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
          
          if (window.gtag && perfData) {
            // Track Core Web Vitals metrics
            window.gtag('event', 'page_performance', {
              dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
              load_complete: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
              first_byte: Math.round(perfData.responseStart - perfData.requestStart),
            })
          }
        }, 0)
      })
    }
  }, [])

  return null // This component doesn't render anything
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

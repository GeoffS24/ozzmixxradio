"use client"

import { GoogleAdsense } from './GoogleAdsense'
import { cn } from '@/lib/utils'

interface AdSlotData {
  name: string
  slotId: string
  format: string
  placement: string
  enabled: boolean
  showOnMobile: boolean
  showOnDesktop: boolean
  customCSS?: string
}

interface AdPlacementProps {
  adClient: string
  adSlot: AdSlotData
  placement: string
  className?: string
  testMode?: boolean
  lazyLoading?: boolean
}

export function AdPlacement({
  adClient,
  adSlot,
  placement,
  className,
  testMode = false,
  lazyLoading = true,
}: AdPlacementProps) {
  // Don't render if ad is disabled or placement doesn't match
  if (!adSlot.enabled || adSlot.placement !== placement) {
    return null
  }

  const getAdDimensions = (format: string) => {
    const dimensions = {
      'auto': { width: '100%', height: 'auto' },
      'rectangle': { width: '300px', height: '250px' },
      'large-rectangle': { width: '336px', height: '280px' },
      'leaderboard': { width: '728px', height: '90px' },
      'banner': { width: '468px', height: '60px' },
      'skyscraper': { width: '120px', height: '600px' },
      'wide-skyscraper': { width: '160px', height: '600px' },
      'mobile-banner': { width: '320px', height: '50px' },
      'large-mobile-banner': { width: '320px', height: '100px' },
    }
    return dimensions[format as keyof typeof dimensions] || dimensions.auto
  }

  const getPlacementStyles = (placement: string) => {
    const styles = {
      'header': 'my-4',
      'sidebar': 'my-6',
      'content-top': 'my-6',
      'content-middle': 'my-8',
      'content-bottom': 'my-6',
      'footer': 'my-4',
      'between-sections': 'my-8',
      'article-top': 'my-4',
      'article-bottom': 'my-6',
    }
    return styles[placement as keyof typeof styles] || 'my-4'
  }

  const dimensions = getAdDimensions(adSlot.format)
  const placementClass = getPlacementStyles(placement)

  return (
    <div
      className={cn(
        "ad-placement flex justify-center items-center w-full",
        placementClass,
        // Responsive visibility
        !adSlot.showOnMobile && "hidden md:flex",
        !adSlot.showOnDesktop && "flex md:hidden",
        adSlot.customCSS,
        className
      )}
      data-ad-placement={placement}
      data-ad-name={adSlot.name}
      style={{
        minWidth: adSlot.format === 'auto' ? '300px' : dimensions.width,
        minHeight: adSlot.format === 'auto' ? '250px' : dimensions.height,
      }}
    >
      <GoogleAdsense
        adClient={adClient}
        adSlot={adSlot.slotId}
        adFormat={adSlot.format}
        style={{
          display: 'block',
          width: adSlot.format === 'auto' ? '100%' : dimensions.width,
          height: adSlot.format === 'auto' ? 'auto' : dimensions.height,
          minWidth: '300px',
          minHeight: '250px',
        }}
        testMode={testMode}
        lazyLoading={lazyLoading}
        className="w-full"
      />
    </div>
  )
}

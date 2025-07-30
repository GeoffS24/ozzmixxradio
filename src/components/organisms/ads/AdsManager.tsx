"use client"

import { AdPlacement } from '@/components/molecules/ads/AdPlacement'
import type { GoogleAdsData } from '@/types/sanity'

interface AdsManagerProps {
  adsData?: GoogleAdsData | null
  placement: string
  className?: string
}

export function AdsManager({ adsData, placement, className }: AdsManagerProps) {
  // Don't render if ads are disabled or no data
  if (!adsData?.enabled || !adsData.adClient) {
    return null
  }

  // Find ads for this placement
  const placementAds = adsData.adSlots?.filter(
    (ad) => ad.placement === placement && ad.enabled
  ) || []

  if (placementAds.length === 0) {
    return null
  }

  return (
    <div className={className} data-ads-placement={placement}>
      {placementAds.map((adSlot, index) => (
        <AdPlacement
          key={`${placement}-${adSlot.slotId}-${index}`}
          adClient={adsData.adClient}
          adSlot={adSlot}
          placement={placement}
          testMode={adsData.settings?.testMode || false}
          lazyLoading={adsData.settings?.lazyLoading !== false}
        />
      ))}
    </div>
  )
}

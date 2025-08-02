"use client"

import { AdPlacement } from '@/components/molecules/ads/AdPlacement'
import type { GoogleAdsData } from '@/types/sanity'

interface AdsManagerProps {
  adsData?: GoogleAdsData | null
  placement: string
  className?: string
}

export function AdsManager({ adsData, placement, className }: AdsManagerProps) {
  // Debug logging
  console.log(`[AdsManager] ${placement}:`, {
    hasAdsData: !!adsData,
    enabled: adsData?.enabled,
    hasClient: !!adsData?.adClient,
    adSlotsCount: adsData?.adSlots?.length || 0
  })

  // Don't render if ads are disabled or no data
  if (!adsData?.enabled || !adsData.adClient) {
    console.log(`[AdsManager] ${placement}: Not rendering - ads disabled or no client ID`)
    return null
  }

  // Find ads for this placement
  const placementAds = adsData.adSlots?.filter(
    (ad) => ad.placement === placement && ad.enabled
  ) || []

  console.log(`[AdsManager] ${placement}: Found ${placementAds.length} enabled ads for this placement`)
  console.log(`[AdsManager] ${placement}: Available slots:`, adsData.adSlots?.map(slot => ({
    name: slot.name,
    placement: slot.placement,
    enabled: slot.enabled,
    slotId: slot.slotId
  })))

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

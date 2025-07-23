import Script from 'next/script'
import { urlFor } from '@/sanity/lib/image'
import type { RadioStationData } from '@/types/sanity'

interface StructuredDataProps {
  stationData?: RadioStationData | null
}

export function StructuredData({ stationData }: StructuredDataProps) {
  if (!stationData) return null

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    "name": stationData.title || "OZZ Dance Radio",
    "description": stationData.description || "Your favorite dance music station",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": stationData.logo?.asset?._ref ? {
      "@type": "ImageObject",
      "url": urlFor(stationData.logo).width(400).height(400).url()
    } : undefined,
    "contactPoint": stationData.contactInfo ? {
      "@type": "ContactPoint",
      "telephone": stationData.contactInfo.phone,
      "email": stationData.contactInfo.email,
      "contactType": "customer service",
      "areaServed": "Global",
      "availableLanguage": "English"
    } : undefined,
    "address": stationData.contactInfo?.address ? {
      "@type": "PostalAddress",
      "streetAddress": stationData.contactInfo.address
    } : undefined,
    "sameAs": [
      stationData.socialMedia?.facebook,
      stationData.socialMedia?.instagram,
      stationData.socialMedia?.twitter,
      stationData.socialMedia?.linkedin,
      stationData.socialMedia?.youtube,
      stationData.socialMedia?.tiktok,
    ].filter(Boolean),
    "broadcastAffiliateOf": {
      "@type": "Organization",
      "name": stationData.title || "OZZ Dance Radio"
    },
    "genre": ["Dance Music", "Electronic Music", "House Music"],
    "audience": {
      "@type": "Audience",
      "audienceType": "Music Lovers"
    }
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": stationData.title || "OZZ Dance Radio",
    "description": stationData.description || "Your favorite dance music station",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": stationData.logo?.asset?._ref ? {
      "@type": "ImageObject",
      "url": urlFor(stationData.logo).width(400).height(400).url()
    } : undefined,
    "contactPoint": stationData.contactInfo ? {
      "@type": "ContactPoint",
      "telephone": stationData.contactInfo.phone,
      "email": stationData.contactInfo.email,
      "contactType": "customer service"
    } : undefined,
    "sameAs": [
      stationData.socialMedia?.facebook,
      stationData.socialMedia?.instagram,
      stationData.socialMedia?.twitter,
      stationData.socialMedia?.linkedin,
      stationData.socialMedia?.youtube,
      stationData.socialMedia?.tiktok,
    ].filter(Boolean)
  }

  return (
    <>
      <Script
        id="radio-station-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
    </>
  )
}

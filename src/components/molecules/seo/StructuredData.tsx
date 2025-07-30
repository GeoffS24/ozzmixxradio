import Script from 'next/script'
import { urlFor } from '@/sanity/lib/image'
import type { RadioStationData } from '@/types/sanity'

interface StructuredDataProps {
  stationData?: RadioStationData | null
}

export function StructuredData({ stationData }: StructuredDataProps) {
  if (!stationData) return null

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ozzmixxradio.com"

  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["RadioStation", "LocalBusiness"],
    "name": stationData.title || "OZZ Dance Radio",
    "alternateName": "OzzMixx Radio",
    "description": stationData.description || "Australia's premier dance music radio station broadcasting 24/7 from Melbourne",
    "url": baseUrl,
    "logo": stationData.logo?.asset?._ref ? {
      "@type": "ImageObject",
      "url": urlFor(stationData.logo).width(400).height(400).url(),
      "width": 400,
      "height": 400
    } : {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo.jpg`,
      "width": 400,
      "height": 400
    },
    "image": stationData.logo?.asset?._ref ? urlFor(stationData.logo).width(1200).height(630).url() : `${baseUrl}/logo.jpg`,
    "contactPoint": stationData.contactInfo ? {
      "@type": "ContactPoint",
      "telephone": stationData.contactInfo.phone,
      "email": stationData.contactInfo.email,
      "contactType": "customer service",
      "areaServed": ["AU", "Australia"],
      "availableLanguage": ["en-AU", "English"]
    } : undefined,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": stationData.contactInfo?.address || "Melbourne",
      "addressLocality": "Melbourne",
      "addressRegion": "Victoria",
      "addressCountry": "AU",
      "postalCode": "3000"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -37.8136,
      "longitude": 144.9631
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Australia",
        "sameAs": "https://en.wikipedia.org/wiki/Australia"
      },
      {
        "@type": "State",
        "name": "Victoria",
        "sameAs": "https://en.wikipedia.org/wiki/Victoria_(Australia)"
      },
      {
        "@type": "City",
        "name": "Melbourne",
        "sameAs": "https://en.wikipedia.org/wiki/Melbourne"
      }
    ],
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
    "genre": ["Dance Music", "Electronic Music", "House Music", "EDM", "Techno"],
    "audience": {
      "@type": "Audience",
      "audienceType": "Dance Music Fans",
      "geographicArea": "Australia"
    },
    "inLanguage": "en-AU",
    "currenciesAccepted": "AUD",
    "paymentAccepted": "Cash, Credit Card"
  }

  // Website Schema
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": stationData.title || "OZZ Dance Radio",
    "url": baseUrl,
    "description": stationData.description || "Australia's premier dance music radio station",
    "inLanguage": "en-AU",
    "isAccessibleForFree": true,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/news?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": stationData.title || "OZZ Dance Radio",
      "logo": {
        "@type": "ImageObject",
        "url": stationData.logo?.asset?._ref ? urlFor(stationData.logo).width(400).height(400).url() : `${baseUrl}/logo.jpg`
      }
    }
  }

  // Broadcast Service Schema
  const broadcastServiceData = {
    "@context": "https://schema.org",
    "@type": "BroadcastService",
    "name": `${stationData.title || "OZZ Dance Radio"} Live Stream`,
    "description": "24/7 Dance Music Radio Stream - Australia's Best Electronic Music",
    "broadcaster": {
      "@type": "Organization",
      "name": stationData.title || "OZZ Dance Radio"
    },
    "broadcastAffiliateOf": {
      "@type": "RadioStation",
      "name": stationData.title || "OZZ Dance Radio"
    },
    "genre": "Dance Music",
    "inLanguage": "en-AU",
    "areaServed": "AU",
    "isLiveBroadcast": true
  }

  // Local Business Schema for Australian SEO
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": stationData.title || "OZZ Dance Radio",
    "description": "Melbourne's premier dance music radio station",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": stationData.contactInfo?.address || "Melbourne",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "addressCountry": "AU",
      "postalCode": "3000"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -37.8136,
      "longitude": 144.9631
    },
    "url": baseUrl,
    "telephone": stationData.contactInfo?.phone,
    "email": stationData.contactInfo?.email,
    "openingHours": "Mo-Su 00:00-23:59",
    "priceRange": "Free"
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
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <Script
        id="broadcast-service-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(broadcastServiceData),
        }}
      />
      <Script
        id="local-business-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
    </>
  )
}

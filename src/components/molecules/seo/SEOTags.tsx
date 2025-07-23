import Script from 'next/script'

interface SEOTagsProps {
  canonicalUrl?: string
  noIndex?: boolean
  noFollow?: boolean
  alternateLanguages?: Array<{
    hrefLang: string
    href: string
  }>
}

export function SEOTags({ 
  canonicalUrl, 
  noIndex = false, 
  noFollow = false,
  alternateLanguages = []
}: SEOTagsProps) {
  return (
    <>
      {/* Canonical URL */}
      {canonicalUrl && (
        <link rel="canonical" href={canonicalUrl} />
      )}

      {/* Robots meta tag */}
      <meta 
        name="robots" 
        content={`${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'},max-snippet:-1,max-image-preview:large,max-video-preview:-1`} 
      />

      {/* Additional SEO meta tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="OZZ Radio" />
      <meta name="application-name" content="OZZ Radio" />
      <meta name="msapplication-TileColor" content="#ff6b35" />
      <meta name="theme-color" content="#ff6b35" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.sanity.io" />
      <link rel="preconnect" href="https://a2.asurahosting.com" />

      {/* DNS prefetch for better performance */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://connect.facebook.net" />

      {/* Alternate language versions */}
      {alternateLanguages.map((lang) => (
        <link
          key={lang.hrefLang}
          rel="alternate"
          hrefLang={lang.hrefLang}
          href={lang.href}
        />
      ))}

      {/* Security headers - Remove X-Frame-Options as it can't be set via meta */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

      {/* Rich snippets for radio station */}
      <Script
        id="radio-station-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RadioStation",
            "name": "OZZ Dance Radio",
            "description": "Your favorite dance music station broadcasting 24/7",
            "url": process.env.NEXT_PUBLIC_SITE_URL || "https://ozzmixxradio.com/",
            "sameAs": [
              "https://facebook.com/ozzradio",
              "https://instagram.com/ozzradio",
              "https://twitter.com/ozzradio"
            ],
            "broadcastFrequency": "Online Streaming",
            "genre": ["Dance Music", "Electronic Music", "House Music"],
            "audience": {
              "@type": "Audience",
              "audienceType": "Music Lovers"
            }
          }),
        }}
      />

      {/* Local Business markup for better local SEO */}
      <Script
        id="local-business-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "OZZ Dance Radio",
            "description": "Online dance music radio station",
            "url": process.env.NEXT_PUBLIC_SITE_URL || "https://ozzmixxradio.com/",
            "telephone": "1800 123 4567",
            "email": "info@ozzradio.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Level 1, 12 Sample St",
              "addressLocality": "Sydney",
              "addressRegion": "NSW",
              "postalCode": "2000",
              "addressCountry": "AU"
            },
            "openingHours": "Mo-Su 00:00-23:59",
            "priceRange": "Free",
            "currenciesAccepted": "AUD",
            "paymentAccepted": "Free Service"
          }),
        }}
      />
    </>
  )
}

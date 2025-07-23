import Script from 'next/script'
import type { LegalPage } from '@/types/sanity'

interface LegalPageStructuredDataProps {
  page: LegalPage
  baseUrl?: string
}

export function LegalPageStructuredData({ page, baseUrl = '' }: LegalPageStructuredDataProps) {
  const pageUrl = `${baseUrl}/legal/${page.slug?.current}`

  // Get page type display name
  const getPageTypeDisplay = (pageType: string) => {
    const typeMap = {
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Policy',
      disclaimer: 'Disclaimer',
      dmca: 'DMCA Policy',
      other: 'Legal Document',
    }
    return typeMap[pageType as keyof typeof typeMap] || 'Legal Document'
  }

  // WebPage structured data for legal documents
  const webPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.metaDescription || `${getPageTypeDisplay(page.pageType || 'other')} for OZZ Dance Radio`,
    "url": pageUrl,
    "datePublished": page.effectiveDate,
    "dateModified": page.lastUpdated,
    "version": page.version,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "OZZ Dance Radio",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": getPageTypeDisplay(page.pageType || 'other'),
      "description": `Legal document outlining ${getPageTypeDisplay(page.pageType || 'other').toLowerCase()}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "OZZ Dance Radio",
      "url": baseUrl
    },
    "mainEntity": {
      "@type": "Article",
      "headline": page.title,
      "datePublished": page.effectiveDate,
      "dateModified": page.lastUpdated,
      "author": {
        "@type": "Organization",
        "name": "OZZ Dance Radio"
      },
      "publisher": {
        "@type": "Organization",
        "name": "OZZ Dance Radio"
      },
      "articleSection": "Legal",
      "genre": "Legal Document"
    }
  }

  // Organization structured data with legal information
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OZZ Dance Radio",
    "url": baseUrl,
    "legalName": "OZZ Dance Radio",
    "contactPoint": page.contactEmail ? {
      "@type": "ContactPoint",
      "email": page.contactEmail,
      "contactType": "Legal Inquiries",
      "areaServed": page.jurisdiction || "Global"
    } : undefined,
    "address": page.jurisdiction ? {
      "@type": "PostalAddress",
      "addressCountry": page.jurisdiction
    } : undefined,
    "hasPolicy": [
      {
        "@type": "PrivacyPolicy",
        "url": `${baseUrl}/legal/privacy`,
        "name": "Privacy Policy"
      },
      {
        "@type": "TermsOfService", 
        "url": `${baseUrl}/legal/terms`,
        "name": "Terms of Service"
      }
    ]
  }

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Legal",
        "item": `${baseUrl}/legal`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": page.title,
        "item": pageUrl
      }
    ]
  }

  // Legal document specific structured data
  const legalDocumentStructuredData = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    "name": page.title,
    "description": page.metaDescription,
    "url": pageUrl,
    "dateCreated": page.effectiveDate,
    "dateModified": page.lastUpdated,
    "version": page.version,
    "genre": getPageTypeDisplay(page.pageType || 'other'),
    "inLanguage": "en-US",
    "author": {
      "@type": "Organization",
      "name": "OZZ Dance Radio"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "OZZ Dance Radio"
    },
    "license": page.jurisdiction ? `Governed by the laws of ${page.jurisdiction}` : undefined,
    "keywords": page.seoKeywords?.join(', '),
    "audience": {
      "@type": "Audience",
      "audienceType": "General Public"
    }
  }

  return (
    <>
      <Script
        id="legal-webpage-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageStructuredData),
        }}
      />
      <Script
        id="legal-organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <Script
        id="legal-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="legal-document-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalDocumentStructuredData),
        }}
      />
    </>
  )
}

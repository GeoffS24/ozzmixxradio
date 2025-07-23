import Script from 'next/script'
import { urlFor } from '@/sanity/lib/image'
import type { BlogPost } from '@/types/sanity'

interface NewsListingStructuredDataProps {
  posts: BlogPost[]
  baseUrl?: string
  currentPage?: number
}

export function NewsListingStructuredData({ 
  posts, 
  baseUrl = '', 
  currentPage = 1 
}: NewsListingStructuredDataProps) {
  
  // Generate ItemList structured data for the news listing
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Latest Music News and Articles",
    "description": "Stay updated with the latest music industry insights, artist interviews, and radio news from OZZ Dance Radio.",
    "url": `${baseUrl}/news${currentPage > 1 ? `?page=${currentPage}` : ''}`,
    "numberOfItems": posts.length,
    "itemListElement": posts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "@id": `${baseUrl}/news/${post.slug?.current}`,
        "headline": post.title,
        "description": post.body?.find((block: any) => block._type === 'block')?.children
          ?.filter((child: any) => child._type === 'span')
          ?.map((child: any) => child.text)
          ?.join(' ')
          ?.substring(0, 200) + '...' || '',
        "image": post.mainImage?.asset?._ref 
          ? urlFor(post.mainImage).width(800).height(600).url()
          : undefined,
        "datePublished": post.publishedAt,
        "dateModified": post._updatedAt || post.publishedAt,
        "author": post.author ? {
          "@type": "Person",
          "name": post.author.name
        } : {
          "@type": "Organization",
          "name": "OZZ Dance Radio"
        },
        "publisher": {
          "@type": "Organization",
          "name": "OZZ Dance Radio"
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${baseUrl}/news/${post.slug?.current}`
        },
        "url": `${baseUrl}/news/${post.slug?.current}`,
        "articleSection": post.categories?.[0]?.title || "Music News",
        "keywords": post.categories?.map(cat => cat.title).filter(Boolean).join(', ')
      }
    }))
  };

  // Generate CollectionPage structured data
  const collectionPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Music News & Blog - OZZ Dance Radio",
    "description": "Latest music industry insights, artist interviews, and radio news from OZZ Dance Radio.",
    "url": `${baseUrl}/news`,
    "mainEntity": {
      "@type": "ItemList",
      "name": "Music News Articles",
      "numberOfItems": posts.length,
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `${baseUrl}/news/${post.slug?.current}`
      }))
    },
    "breadcrumb": {
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
          "name": "News",
          "item": `${baseUrl}/news`
        }
      ]
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "OZZ Dance Radio",
      "url": baseUrl
    }
  };

  // Generate WebSite structured data with search functionality
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OZZ Dance Radio",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/news?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Script
        id="news-listing-itemlist-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListStructuredData),
        }}
      />
      <Script
        id="news-listing-collection-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageStructuredData),
        }}
      />
      <Script
        id="news-listing-website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
    </>
  );
}

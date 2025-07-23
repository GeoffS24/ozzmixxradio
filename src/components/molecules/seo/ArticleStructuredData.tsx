import Script from 'next/script'
import { urlFor } from '@/sanity/lib/image'
import type { BlogPost } from '@/types/sanity'

interface ArticleStructuredDataProps {
  post: BlogPost
  baseUrl?: string
}

export function ArticleStructuredData({ post, baseUrl = '' }: ArticleStructuredDataProps) {
  // Generate article image URL
  const articleImageUrl = post.mainImage?.asset?._ref 
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : null;

  // Generate author image URL
  const authorImageUrl = post.author?.image?.asset?._ref 
    ? urlFor(post.author.image).width(400).height(400).url()
    : null;

  // Calculate reading time (approximate)
  const calculateReadingTime = (body: any[]) => {
    if (!body || !Array.isArray(body)) return 5;
    
    const wordCount = body.reduce((count, block) => {
      if (block._type === 'block' && block.children) {
        const blockText = block.children
          .filter((child: any) => child._type === 'span')
          .map((child: any) => child.text)
          .join(' ');
        return count + blockText.split(' ').length;
      }
      return count;
    }, 0);
    
    return Math.ceil(wordCount / 200); // Average reading speed
  };

  // Generate article excerpt
  const generateExcerpt = (body: any[]) => {
    if (!body || !Array.isArray(body)) return '';
    
    const firstParagraph = body.find((block: any) => block._type === 'block')?.children
      ?.filter((child: any) => child._type === 'span')
      ?.map((child: any) => child.text)
      ?.join(' ');
    
    return firstParagraph?.substring(0, 300) + '...' || '';
  };

  const readingTime = calculateReadingTime(post.body || []);
  const excerpt = generateExcerpt(post.body || []);
  const articleUrl = `${baseUrl}/news/${post.slug?.current}`;

  // Article structured data
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": excerpt,
    "image": articleImageUrl ? [articleImageUrl] : undefined,
    "datePublished": post.publishedAt,
    "dateModified": post._updatedAt || post.publishedAt,
    "author": post.author ? {
      "@type": "Person",
      "name": post.author.name,
      "image": authorImageUrl ? {
        "@type": "ImageObject",
        "url": authorImageUrl
      } : undefined,
      "url": post.author.slug?.current ? `${baseUrl}/authors/${post.author.slug.current}` : undefined
    } : {
      "@type": "Organization",
      "name": "OZZ Dance Radio"
    },
    "publisher": {
      "@type": "Organization",
      "name": "OZZ Dance Radio",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.jpg` // You can update this with actual logo URL
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "url": articleUrl,
    "wordCount": post.body ? post.body.reduce((count: number, block: any) => {
      if (block._type === 'block' && block.children) {
        const blockText = block.children
          .filter((child: any) => child._type === 'span')
          .map((child: any) => child.text)
          .join(' ');
        return count + blockText.split(' ').length;
      }
      return count;
    }, 0) : undefined,
    "timeRequired": `PT${readingTime}M`, // ISO 8601 duration format
    "articleSection": post.categories?.[0]?.title || "Music News",
    "keywords": post.categories?.map(cat => cat.title).filter(Boolean).join(', '),
    "about": post.categories?.map(category => ({
      "@type": "Thing",
      "name": category.title
    })) || []
  };

  // BreadcrumbList structured data
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
        "name": "News",
        "item": `${baseUrl}/news`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": articleUrl
      }
    ]
  };

  return (
    <>
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
    </>
  );
}

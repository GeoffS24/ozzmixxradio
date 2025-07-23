import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import {  CATEGORIES_QUERY } from '@/sanity/lib/queries/newsQueries'
import type { BlogPost, Category, LegalPage } from '@/types/sanity'
import { POSTS_QUERY } from '@/sanity/lib/queries/homeQueries'
import { LEGAL_PAGES_QUERY } from '@/sanity/lib/queries/legalQueries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ozzmixxradio.com/'

  // Fetch all blog posts, categories, and legal pages
  const [postsData, categoriesData, legalPagesData] = await Promise.all([
    sanityFetch({
      query: POSTS_QUERY,
      params: { limit: 1000 }, // Get all posts
    }),
    sanityFetch({
      query: CATEGORIES_QUERY,
    }),
    sanityFetch({
      query: LEGAL_PAGES_QUERY,
    }),
  ])

  const posts = postsData.data as BlogPost[] | null
  const categories = categoriesData.data as Category[] | null
  const legalPages = legalPagesData.data as LegalPage[] | null

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Dynamic blog post pages
  const postPages = (posts || []).map((post) => ({
    url: `${baseUrl}/news/${post.slug?.current}`,
    lastModified: new Date(post._updatedAt || post.publishedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Category pages (if you have them)
  const categoryPages = (categories || []).map((category) => ({
    url: `${baseUrl}/news?category=${category.slug?.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Legal pages
  const legalPageUrls = (legalPages || []).map((page) => ({
    url: `${baseUrl}/legal/${page.slug?.current}`,
    lastModified: new Date(page.lastUpdated || page.effectiveDate || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    ...staticPages,
    ...postPages,
    ...categoryPages,
    ...legalPageUrls,
  ]
}

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { ABOUT_PAGE_QUERY } from '@/sanity/lib/queries/aboutQueries'
import { AboutPageDetail } from '@/components/organisms/about/AboutPageDetail'
import type { AboutPageData } from '@/types/sanity'

export const revalidate = 1500

export async function generateMetadata(): Promise<Metadata> {
  const aboutPageData = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
  })

  const page = aboutPageData.data as AboutPageData | null

  if (!page) {
    return {
      title: 'About - OZZ Dance Radio',
      description: 'Learn more about OZZ Dance Radio, our mission, and the team behind the music.',
    }
  }

  const seoSettings = page.seoSettings
  const heroSection = page.heroSection

  return {
    title: seoSettings?.metaTitle || page.title || 'About - OZZ Dance Radio',
    description: seoSettings?.metaDescription || heroSection?.description || 'Learn more about OZZ Dance Radio, our mission, and the team behind the music.',
    keywords: seoSettings?.keywords || [
      'about',
      'OZZ Dance Radio',
      'radio station',
      'team',
      'mission',
      'dance music',
      'electronic music',
    ],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: seoSettings?.metaTitle || page.title || 'About - OZZ Dance Radio',
      description: seoSettings?.metaDescription || heroSection?.description || 'Learn more about OZZ Dance Radio',
      type: 'website',
      siteName: 'OZZ Dance Radio',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoSettings?.metaTitle || page.title || 'About - OZZ Dance Radio',
      description: seoSettings?.metaDescription || heroSection?.description || 'Learn more about OZZ Dance Radio',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    },
  }
}

export default async function AboutPage() {
  const aboutPageData = await sanityFetch({
    query: ABOUT_PAGE_QUERY,
  })

  const page = aboutPageData.data as AboutPageData | null

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <AboutPageDetail page={page} />
    </div>
  )
}

import { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/live'
import { SCHEDULE_QUERY } from '@/sanity/lib/queries/homeQueries'
import { SchedulePageDetail } from '@/components/organisms/schedule/SchedulePageDetail'
import type { ScheduleData } from '@/types/sanity'

export const revalidate = 1500

export async function generateMetadata(): Promise<Metadata> {
  const scheduleData = await sanityFetch({
    query: SCHEDULE_QUERY,
  })

  const schedule = scheduleData.data as ScheduleData | null

  return {
    title: 'Schedule - OZZ Dance Radio',
    description: 'Check out our weekly radio schedule featuring the best dance music shows, live DJ sets, and exclusive mixes. Tune in to your favorite programs.',
    keywords: [
      'schedule',
      'radio schedule',
      'OZZ Dance Radio',
      'dance music shows',
      'DJ sets',
      'live radio',
      'weekly schedule',
      'radio programs',
    ],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Schedule - OZZ Dance Radio',
      description: 'Check out our weekly radio schedule featuring the best dance music shows and live DJ sets.',
      type: 'website',
      siteName: 'OZZ Dance Radio',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Schedule - OZZ Dance Radio',
      description: 'Check out our weekly radio schedule featuring the best dance music shows and live DJ sets.',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/schedule`,
    },
  }
}

export default async function SchedulePage() {
  const scheduleData = await sanityFetch({
    query: SCHEDULE_QUERY,
  })

  const schedule = scheduleData.data as ScheduleData | null

  return (
    <div className="min-h-screen bg-background">
      <SchedulePageDetail schedule={schedule} />
    </div>
  )
}

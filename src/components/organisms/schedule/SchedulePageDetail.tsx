import { ScheduleSection } from '@/components/organisms/home/scheduleSection'
import { HeroSection } from '@/components/molecules/hero/HeroSection'
import type { ScheduleData } from '@/types/sanity'

interface SchedulePageDetailProps {
  schedule: ScheduleData | null
}

export function SchedulePageDetail({ schedule }: SchedulePageDetailProps) {
  // Fallback hero data if not configured in Sanity
  const defaultHeroData = {
    enabled: true,
    title: 'Radio Schedule',
    description: 'Tune in to our weekly schedule for engaging shows and insightful discussions that keep you entertained.',
    backgroundType: 'gradient' as const,
    gradientColors: {
      from: { hex: '#3b82f6' },
      to: { hex: '#1e40af' },
      direction: 'to-br',
    },
    textColor: 'white' as const,
    minHeight: '40vh',
  }

  const heroData = schedule?.heroSection || defaultHeroData

  return (
    <>
      {/* Dynamic Hero Section */}
      <HeroSection heroData={heroData} />

      {/* Schedule Section */}
      <ScheduleSection
        data={{
          enabled: true,
          badge: 'Schedule',
          title: 'Weekly Schedule',
          description: 'Check out our complete weekly programming schedule. All times are shown in your local timezone.',
          displayFormat: 'list',
          showCurrentTime: true,
        }}
        scheduleData={schedule}
      />
    </>
  )
}

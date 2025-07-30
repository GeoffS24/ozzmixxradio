import { ScheduleSection } from '@/components/organisms/home/scheduleSection'
import type { ScheduleData } from '@/types/sanity'

interface SchedulePageDetailProps {
  schedule: ScheduleData | null
}

export function SchedulePageDetail({ schedule }: SchedulePageDetailProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[40vh] bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-5 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Radio Schedule
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Tune in to our weekly schedule for engaging shows and insightful discussions that keep you entertained.
          </p>
        </div>
      </section>

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

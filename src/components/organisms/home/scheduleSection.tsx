"use client"

import { useState } from 'react'
import { SectionHeader } from '@/components/atoms/ui/SectionHeader'
import { FilterButton } from '@/components/atoms/ui/FilterButton'
import { ScheduleItem } from '@/components/molecules/cards/ScheduleItem'

export function ScheduleSection() {
  const [activeFilter, setActiveFilter] = useState('Fri 09 Feb')

  const scheduleItems = [
    {
      time: '8:00 am',
      title: 'Morning Show',
      host: 'Host',
      location: 'Studio',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/5a085be3383805be7bc24b67346caed01172c0e0?width=300'
    },
    {
      time: '9:00 am',
      title: 'Talk Show',
      host: 'Guest',
      location: 'Location',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/5a085be3383805be7bc24b67346caed01172c0e0?width=300'
    },
    {
      time: '10:00 am',
      title: 'Music Hour',
      host: 'DJ',
      location: 'Venue',
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/5a085be3383805be7bc24b67346caed01172c0e0?width=300'
    }
  ]

  const filters = ['Fri 09 Feb', 'Sat 10 Feb', 'Sun 11 Feb', 'Category four']

  return (
    <section className="flex py-16 lg:py-16 flex-col px-5 items-start gap-12 lg:gap-20 bg-white ">
      <div className="flex flex-col items-start gap-12 lg:gap-20 container mx-auto w-full">
        <SectionHeader
          badge="Schedule"
          title="Schedule"
          description="Tune in to our weekly schedule for engaging shows and insightful discussions that keep you entertained."
          alignment="left"
        />

        {/* Content */}
        <div className="flex flex-col items-start gap-12 w-full">
          {/* Filters */}
          <div className="flex items-center gap-0">
            {filters.map((filter, index) => (
              <FilterButton
                key={filter}
                isActive={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                isFirst={index === 0}
              >
                {filter}
              </FilterButton>
            ))}
          </div>

          {/* Schedule Items */}
          <div className="flex flex-col items-start w-full">
            {scheduleItems.map((item, index) => (
              <ScheduleItem
                key={index}
                time={item.time}
                title={item.title}
                host={item.host}
                location={item.location}
                image={item.image}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

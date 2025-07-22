"use client"

import { useState } from 'react'
import { MapPin } from 'lucide-react'

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
    <section className="flex py-16 lg:py-16 px-5 flex-col items-start gap-12 lg:gap-20 bg-white">
      <div className="flex max-w-7xl flex-col items-start gap-12 lg:gap-20 w-full">
        {/* Section Header */}
        <div className="flex max-w-[768px] flex-col items-start lg:items-start gap-3 lg:gap-4 w-full">
          <div className="flex items-center w-full">
            <span className="text-base font-bold text-foreground">Schedule</span>
          </div>
          <div className="flex flex-col items-center lg:items-start gap-5 lg:gap-6 w-full">
            <h2 className="text-4xl lg:text-5xl font-normal leading-[120%] tracking-[-0.36px] lg:tracking-[-0.48px] text-foreground w-full">
              Schedule
            </h2>
            <p className="text-sm lg:text-lg font-normal leading-[150%] text-foreground w-full">
              Tune in to our weekly schedule for engaging shows and insightful discussions that keep you entertained.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-12 w-full">
          {/* Filters */}
          <div className="flex items-center gap-0">
            {filters.map((filter, index) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex px-4 py-2.5 justify-center items-center gap-2 text-sm lg:text-base font-medium ${
                  activeFilter === filter
                    ? 'border border-border bg-muted text-foreground'
                    : 'text-foreground hover:bg-muted/50'
                } ${index === 0 ? '' : ''} transition-colors`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Schedule Items */}
          <div className="flex flex-col items-start w-full">
            {scheduleItems.map((item, index) => (
              <div
                key={index}
                className={`flex lg:flex-row flex-col py-6 lg:py-8 ${
                  index === 0 ? '' : 'lg:items-center'
                } items-start gap-4 lg:gap-8 w-full border-t border-border`}
              >
                {/* Time */}
                <div className="w-24 text-base lg:text-xl font-normal leading-[150%] text-foreground">
                  {item.time}
                </div>

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full lg:w-36 h-[335px] lg:h-36 aspect-square object-cover"
                />

                {/* Event Details */}
                <div className="flex lg:flex-row flex-col lg:items-center justify-center items-start gap-4 flex-1">
                  <div className="flex flex-col justify-center items-start flex-1">
                    <h3 className="text-xl lg:text-2xl font-normal leading-[140%] tracking-[-0.2px] lg:tracking-[-0.24px] text-foreground w-full">
                      {item.title}
                    </h3>
                    <p className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
                      {item.host}
                    </p>
                  </div>
                  <div className="flex lg:w-40 pr-4 items-center gap-2">
                    <MapPin className="w-6 h-6 text-foreground" />
                    <span className="text-xs lg:text-sm text-center font-normal leading-[150%] text-foreground">
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* View Details Button */}
                <button className="flex px-5 py-2 justify-center items-center gap-2 lg:w-auto w-full border border-border text-sm lg:text-base font-medium text-foreground hover:bg-muted transition-colors">
                  View details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

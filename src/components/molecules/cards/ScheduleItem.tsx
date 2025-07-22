import { MapPin } from 'lucide-react'

interface ScheduleItemProps {
  time: string
  title: string
  host: string
  location: string
  image: string
  isFirst?: boolean
}

export function ScheduleItem({ time, title, host, location, image, isFirst = false }: ScheduleItemProps) {
  return (
    <div
      className={`flex lg:flex-row flex-col py-6 lg:py-8 ${
        isFirst ? '' : 'lg:items-center'
      } items-start gap-4 lg:gap-8 w-full border-t border-border`}
    >
      {/* Time */}
      <div className="w-24 text-base lg:text-xl font-normal leading-[150%] text-foreground">
        {time}
      </div>

      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full lg:w-36 h-[335px] lg:h-36 aspect-square object-cover"
      />

      {/* Event Details */}
      <div className="flex lg:flex-row flex-col lg:items-center justify-center items-start gap-4 flex-1">
        <div className="flex flex-col justify-center items-start flex-1">
          <h3 className="text-xl lg:text-2xl font-normal leading-[140%] tracking-[-0.2px] lg:tracking-[-0.24px] text-foreground w-full">
            {title}
          </h3>
          <p className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
            {host}
          </p>
        </div>
        <div className="flex lg:w-40 pr-4 items-center gap-2">
          <MapPin className="w-6 h-6 text-foreground" />
          <span className="text-xs lg:text-sm text-center font-normal leading-[150%] text-foreground">
            {location}
          </span>
        </div>
      </div>
    </div>
  )
}

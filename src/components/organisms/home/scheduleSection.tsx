"use client";

import { useState, useEffect } from "react";
import { SectionHeader } from "@/components/atoms/ui/SectionHeader";
import { FilterButton } from "@/components/atoms/ui/FilterButton";
import { ScheduleItem } from "@/components/molecules/cards/ScheduleItem";
import { urlFor } from "@/sanity/lib/image";
import type {
  ScheduleSectionData,
  ScheduleData,
  DaySchedule,
  TimeSlot,
} from "@/types/sanity";

interface ScheduleSectionProps {
  data?: ScheduleSectionData;
  scheduleData?: ScheduleData | null;
}

export function ScheduleSection({ data, scheduleData }: ScheduleSectionProps) {
  const sectionData = {
    enabled: data?.enabled ?? true,
    badge: data?.badge ?? "Schedule",
    title: data?.title ?? "Schedule",
    description:
      data?.description ??
      "Tune in to our weekly schedule for engaging shows and insightful discussions that keep you entertained.",
    displayFormat: data?.displayFormat ?? "list",
    showCurrentTime: data?.showCurrentTime ?? true,
  };

  const [activeDay, setActiveDay] = useState<string>("monday");
  const [stationTime, setStationTime] = useState<Date>(new Date());

  // Get station timezone from schedule data, default to Melbourne
  // Clean and validate timezone string
  const rawTimezone = scheduleData?.timezone?.trim() || 'Australia/Melbourne';
  const stationTimezone = rawTimezone.replace(/,\s*Australia$/, '').trim() || 'Australia/Melbourne';

  console.log('Timezone processing:', {
    raw: scheduleData?.timezone,
    cleaned: stationTimezone,
    isValid: Intl.supportedValuesOf('timeZone').includes(stationTimezone)
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      try {
        // Validate timezone first
        const validTimezone = Intl.supportedValuesOf('timeZone').includes(stationTimezone)
          ? stationTimezone
          : 'Australia/Melbourne';

        // Get the current time in the station timezone
        const stationNow = new Date(now.toLocaleString("en-US", { timeZone: validTimezone }));
        setStationTime(stationNow);

        console.log('Timezone update:', {
          localTime: now.toLocaleString(),
          rawTimezone: scheduleData?.timezone,
          cleanedTimezone: stationTimezone,
          validTimezone,
          stationTime: stationNow.toLocaleString(),
          dayIndex: stationNow.getDay(),
          dayName: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][stationNow.getDay()]
        });
      } catch (error) {
        console.warn('Invalid timezone:', stationTimezone, 'falling back to local time');
        setStationTime(now);
      }
    };

    updateTimes(); // Initial update
    const interval = setInterval(updateTimes, 60000);

    return () => clearInterval(interval);
  }, [stationTimezone]);


  const dayNames = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  // Fix day calculation: getDay() returns 0=Sunday, 1=Monday, etc.
  // We need to map this to our dayNames object keys
  const dayMapping = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDayIndex = stationTime.getDay();
  const currentDayName = dayMapping[currentDayIndex];

  useEffect(() => {
    setActiveDay(currentDayName);
  }, [currentDayName]);

  const activeDaySchedule = scheduleData?.weeklySchedule?.find(
    (day: DaySchedule) => day.dayOfWeek === activeDay
  );

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isCurrentShow = (timeSlot: TimeSlot) => {
    if (!sectionData.showCurrentTime) return false;

    try {
      // Get current time in station timezone
      const now = new Date();
      const validTimezone = Intl.supportedValuesOf('timeZone').includes(stationTimezone)
        ? stationTimezone
        : 'Australia/Melbourne';

      const stationNow = new Date(now.toLocaleString("en-US", { timeZone: validTimezone }));
      const currentTimeString = `${stationNow.getHours().toString().padStart(2, "0")}:${stationNow.getMinutes().toString().padStart(2, "0")}`;

      const isLive = currentTimeString >= timeSlot.startTime && currentTimeString < timeSlot.endTime;

      if (isLive) {
        console.log('Live show detected:', {
          showName: timeSlot.showName,
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          currentTime: currentTimeString,
          stationTime: stationNow.toLocaleString(),
          dayName: currentDayName,
          timezone: validTimezone
        });
      }

      return isLive;
    } catch (error) {
      console.warn('Error checking current show:', error);
      return false;
    }
  };

  if (!sectionData.enabled) {
    return null;
  }

  return (
    <section className="flex py-16 lg:py-16 flex-col px-5 items-start gap-12 lg:gap-20 bg-white">
      <div className="flex flex-col items-start gap-12 lg:gap-20 container mx-auto w-full">
        <SectionHeader
          badge={sectionData.badge}
          title={sectionData.title}
          description={sectionData.description}
          alignment="left"
        />

        {/* Current Time Display */}
        {sectionData.showCurrentTime && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Station Time:</span>
            <span className="font-medium text-primary">
              {(() => {
                try {
                  // Validate timezone first
                  if (!Intl.supportedValuesOf('timeZone').includes(stationTimezone)) {
                    console.warn('Unsupported timezone:', stationTimezone, 'using Australia/Melbourne');
                    const now = new Date();
                    return now.toLocaleTimeString('en-AU', {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: 'Australia/Melbourne',
                      timeZoneName: "short",
                    });
                  }

                  // Get current time in station timezone
                  const now = new Date();
                  return now.toLocaleTimeString('en-AU', {
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: stationTimezone,
                    timeZoneName: "short",
                  });
                } catch (error) {
                  console.warn('Timezone display error:', error);
                  // Fallback to Melbourne time
                  const now = new Date();
                  try {
                    return now.toLocaleTimeString('en-AU', {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: 'Australia/Melbourne',
                      timeZoneName: "short",
                    });
                  } catch (fallbackError) {
                    return stationTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                  }
                }
              })()}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col items-start gap-12 w-full">
          {/* Day Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(dayNames).map(([dayKey, dayLabel], index) => (
              <FilterButton
                key={dayKey}
                isActive={activeDay === dayKey}
                onClick={() => setActiveDay(dayKey)}
                isFirst={index === 0}
              >
                {dayLabel}
                {dayKey === currentDayName && (
                  <span className="ml-1 text-xs text-primary">•</span>
                )}
              </FilterButton>
            ))}
          </div>

          {/* Schedule Display */}
          {activeDaySchedule?.timeSlots &&
          activeDaySchedule.timeSlots.length > 0 ? (
            <div className="flex flex-col items-start w-full">
              {activeDaySchedule.timeSlots.map(
                (timeSlot: TimeSlot, index: number) => {
                  const imageUrl = timeSlot.showImage?.asset?._ref
                    ? urlFor(timeSlot.showImage).width(300).height(300).url()
                    : "https://api.builder.io/api/v1/image/assets/TEMP/5a085be3383805be7bc24b67346caed01172c0e0?width=300";

                  return (
                    <div
                      key={index}
                      className={`w-full ${isCurrentShow(timeSlot) ? "bg-primary/5 border-l-4 border-primary pl-4" : ""}`}
                    >
                      <ScheduleItem
                        time={`${formatTime(timeSlot.startTime)} - ${formatTime(timeSlot.endTime)}`}
                        title={timeSlot.showName || "Untitled Show"}
                        host={timeSlot.hostName || "Unknown Host"}
                        location={timeSlot.genre || "Music"}
                        image={imageUrl}
                        isFirst={index === 0}
                      />
                      {timeSlot.description && (
                        <div className="sm:ml-24 lg:ml-44 pb-4 text-sm text-muted-foreground">
                          {timeSlot.description}
                        </div>
                      )}
                      {isCurrentShow(timeSlot) && (
                        <div className="ml-24 lg:ml-44 pb-4">
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            LIVE NOW
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">
                No shows scheduled for{" "}
                {dayNames[activeDay as keyof typeof dayNames]}.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

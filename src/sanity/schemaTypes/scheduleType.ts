import { CalendarIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const scheduleType = defineType({
  name: 'schedule',
  title: 'Radio Schedule',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Schedule Title',
      type: 'string',
      initialValue: 'Weekly Radio Schedule',
    }),
    defineField({
      name: 'timezone',
      title: 'Station Timezone',
      type: 'string',
      initialValue: 'America/New_York',
      description: 'Timezone for the radio station (e.g., America/New_York, Europe/London)',
    }),
    defineField({
      name: 'weeklySchedule',
      title: 'Weekly Schedule',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'daySchedule',
          title: 'Day Schedule',
          fields: [
            defineField({
              name: 'dayOfWeek',
              title: 'Day of Week',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: 'monday' },
                  { title: 'Tuesday', value: 'tuesday' },
                  { title: 'Wednesday', value: 'wednesday' },
                  { title: 'Thursday', value: 'thursday' },
                  { title: 'Friday', value: 'friday' },
                  { title: 'Saturday', value: 'saturday' },
                  { title: 'Sunday', value: 'sunday' },
                ],
              },
            }),
            defineField({
              name: 'timeSlots',
              title: 'Time Slots',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'timeSlot',
                  title: 'Time Slot',
                  fields: [
                    defineField({
                      name: 'startTime',
                      title: 'Start Time',
                      type: 'string',
                      description: 'Format: HH:MM (24-hour format)',
                      validation: (Rule) =>
                        Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                          name: 'time',
                          invert: false,
                        }).error('Please use HH:MM format (24-hour)'),
                    }),
                    defineField({
                      name: 'endTime',
                      title: 'End Time',
                      type: 'string',
                      description: 'Format: HH:MM (24-hour format)',
                      validation: (Rule) =>
                        Rule.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
                          name: 'time',
                          invert: false,
                        }).error('Please use HH:MM format (24-hour)'),
                    }),
                    defineField({
                      name: 'showName',
                      title: 'Show Name',
                      type: 'string',
                    }),
                    defineField({
                      name: 'hostName',
                      title: 'Host Name',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Show Description',
                      type: 'text',
                      rows: 3,
                    }),
                    defineField({
                      name: 'showImage',
                      title: 'Show Image',
                      type: 'image',
                      options: {
                        hotspot: true,
                      },
                      fields: [
                        defineField({
                          name: 'alt',
                          type: 'string',
                          title: 'Alternative text',
                        }),
                      ],
                    }),
                    defineField({
                      name: 'genre',
                      title: 'Music Genre/Show Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Dance', value: 'dance' },
                          { title: 'Electronic', value: 'electronic' },
                          { title: 'Hip Hop', value: 'hiphop' },
                          { title: 'Rock', value: 'rock' },
                          { title: 'Pop', value: 'pop' },
                          { title: 'Jazz', value: 'jazz' },
                          { title: 'Classical', value: 'classical' },
                          { title: 'Talk Show', value: 'talk' },
                          { title: 'News', value: 'news' },
                          { title: 'Mixed', value: 'mixed' },
                        ],
                      },
                    }),
                    defineField({
                      name: 'isLive',
                      title: 'Live Show',
                      type: 'boolean',
                      description: 'Is this a live show or pre-recorded?',
                      initialValue: true,
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'showName',
                      subtitle: 'hostName',
                      startTime: 'startTime',
                      endTime: 'endTime',
                      media: 'showImage',
                    },
                    prepare(selection) {
                      const { title, subtitle, startTime, endTime } = selection
                      return {
                        title: title || 'Untitled Show',
                        subtitle: `${startTime} - ${endTime} | ${subtitle || 'No Host'}`,
                        media: selection.media,
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'dayOfWeek',
              timeSlots: 'timeSlots',
            },
            prepare(selection) {
              const { title, timeSlots } = selection
              const dayName = title?.charAt(0).toUpperCase() + title?.slice(1)
              const showCount = timeSlots?.length || 0
              return {
                title: dayName || 'Day',
                subtitle: `${showCount} show${showCount !== 1 ? 's' : ''}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      weeklySchedule: 'weeklySchedule',
    },
    prepare(selection) {
      const { title, weeklySchedule } = selection
      const totalShows = weeklySchedule?.reduce(
        (total: number, day: any) => total + (day.timeSlots?.length || 0),
        0
      ) || 0
      return {
        title: title || 'Radio Schedule',
        subtitle: `${totalShows} total shows across the week`,
      }
    },
  },
})

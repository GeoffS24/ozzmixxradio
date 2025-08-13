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
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      description: 'Configure the hero section that appears at the top of the schedule page',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Hero Section',
          type: 'boolean',
          initialValue: true,
          description: 'Show or hide the hero section on the schedule page',
        }),
        defineField({
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          initialValue: 'Radio Schedule',
          description: 'Main heading displayed in the hero section',
        }),
        defineField({
          name: 'description',
          title: 'Hero Description',
          type: 'text',
          rows: 3,
          initialValue: 'Tune in to our weekly schedule for engaging shows and insightful discussions that keep you entertained.',
          description: 'Subtitle/description text displayed below the title',
        }),
        defineField({
          name: 'backgroundType',
          title: 'Background Type',
          type: 'string',
          options: {
            list: [
              { title: 'Gradient', value: 'gradient' },
              { title: 'Image', value: 'image' },
              { title: 'Solid Color', value: 'color' },
            ],
          },
          initialValue: 'gradient',
          description: 'Choose the type of background for the hero section',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for accessibility and SEO',
            }),
          ],
          hidden: ({ parent }) => parent?.backgroundType !== 'image',
          description: 'Background image for the hero section (only shown when Background Type is set to Image)',
        }),
        defineField({
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'color',
          options: {
            disableAlpha: false,
          },
          hidden: ({ parent }) => parent?.backgroundType !== 'color',
          description: 'Solid background color (only shown when Background Type is set to Solid Color)',
        }),
        defineField({
          name: 'gradientColors',
          title: 'Gradient Colors',
          type: 'object',
          fields: [
            defineField({
              name: 'from',
              title: 'From Color',
              type: 'color',
              options: {
                disableAlpha: false,
              },
              initialValue: { hex: '#3b82f6' }, // primary color
            }),
            defineField({
              name: 'to',
              title: 'To Color',
              type: 'color',
              options: {
                disableAlpha: false,
              },
              initialValue: { hex: '#1e40af' }, // primary/80
            }),
            defineField({
              name: 'direction',
              title: 'Gradient Direction',
              type: 'string',
              options: {
                list: [
                  { title: 'Top to Bottom', value: 'to-b' },
                  { title: 'Bottom to Top', value: 'to-t' },
                  { title: 'Left to Right', value: 'to-r' },
                  { title: 'Right to Left', value: 'to-l' },
                  { title: 'Top-Left to Bottom-Right', value: 'to-br' },
                  { title: 'Top-Right to Bottom-Left', value: 'to-bl' },
                  { title: 'Bottom-Left to Top-Right', value: 'to-tr' },
                  { title: 'Bottom-Right to Top-Left', value: 'to-tl' },
                ],
              },
              initialValue: 'to-br',
            }),
          ],
          hidden: ({ parent }) => parent?.backgroundType !== 'gradient',
          description: 'Gradient colors and direction (only shown when Background Type is set to Gradient)',
        }),
        defineField({
          name: 'textColor',
          title: 'Text Color',
          type: 'string',
          options: {
            list: [
              { title: 'White', value: 'white' },
              { title: 'Black', value: 'black' },
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
            ],
          },
          initialValue: 'white',
          description: 'Color of the text in the hero section',
        }),
        defineField({
          name: 'minHeight',
          title: 'Minimum Height',
          type: 'string',
          options: {
            list: [
              { title: 'Small (30vh)', value: '30vh' },
              { title: 'Medium (40vh)', value: '40vh' },
              { title: 'Large (50vh)', value: '50vh' },
              { title: 'Extra Large (60vh)', value: '60vh' },
              { title: 'Full Screen (100vh)', value: '100vh' },
            ],
          },
          initialValue: '40vh',
          description: 'Minimum height of the hero section',
        }),
      ],
    }),
    defineField({
      name: 'timezone',
      title: 'Station Timezone',
      type: 'string',
      initialValue: 'Australia/Melbourne',
      description: 'Timezone for the radio station (e.g., Australia/Melbourne, America/New_York, Europe/London)',
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

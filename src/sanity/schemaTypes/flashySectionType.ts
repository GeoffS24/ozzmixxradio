import { SparklesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const flashySectionType = defineType({
  name: 'flashySection',
  title: 'Flashy Section',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
      description: 'Unique identifier for this section',
    }),
    defineField({
      name: 'style',
      title: 'Section Style',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Banner', value: 'hero' },
          { title: 'Feature Highlight', value: 'feature' },
          { title: 'Stats Counter', value: 'stats' },
          { title: 'Call to Action', value: 'cta' },
          { title: 'Image Gallery', value: 'gallery' },
          { title: 'Video Background', value: 'video' },
          { title: 'Parallax Section', value: 'parallax' },
          { title: 'Testimonials', value: 'testimonials' },
        ],
      },
      initialValue: 'hero',
    }),
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          { title: 'Gradient', value: 'gradient' },
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: 'Pattern', value: 'pattern' },
          { title: 'Solid Color', value: 'solid' },
        ],
      },
      initialValue: 'gradient',
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
        }),
      ],
      hidden: ({ parent }) => parent?.backgroundType !== 'image',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video URL',
      type: 'url',
      hidden: ({ parent }) => parent?.backgroundType !== 'video',
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
          initialValue: { hex: '#ff6b35' },
        }),
        defineField({
          name: 'to',
          title: 'To Color',
          type: 'color',
          initialValue: { hex: '#f7931e' },
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
            ],
          },
          initialValue: 'to-br',
        }),
      ],
      hidden: ({ parent }) => parent?.backgroundType !== 'gradient',
    }),
    defineField({
      name: 'overlay',
      title: 'Background Overlay',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Overlay',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'color',
          title: 'Overlay Color',
          type: 'color',
          initialValue: { hex: '#000000' },
        }),
        defineField({
          name: 'opacity',
          title: 'Overlay Opacity',
          type: 'number',
          validation: (rule) => rule.min(0).max(100),
          initialValue: 50,
        }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Section Content',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Section Subtitle',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'blockContent',
        }),
        defineField({
          name: 'buttons',
          title: 'Action Buttons',
          type: 'array',
          of: [
            defineField({
              name: 'button',
              title: 'Button',
              type: 'object',
              fields: [
                defineField({
                  name: 'text',
                  title: 'Button Text',
                  type: 'string',
                }),
                defineField({
                  name: 'url',
                  title: 'Button URL',
                  type: 'url',
                }),
                defineField({
                  name: 'style',
                  title: 'Button Style',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Primary', value: 'primary' },
                      { title: 'Secondary', value: 'secondary' },
                      { title: 'Outline', value: 'outline' },
                      { title: 'Ghost', value: 'ghost' },
                    ],
                  },
                  initialValue: 'primary',
                }),
              ],
            }),
          ],
          validation: (rule) => rule.max(3),
        }),
      ],
    }),
    defineField({
      name: 'animation',
      title: 'Animation Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Animations',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'type',
          title: 'Animation Type',
          type: 'string',
          options: {
            list: [
              { title: 'Fade In', value: 'fadeIn' },
              { title: 'Slide Up', value: 'slideUp' },
              { title: 'Slide Down', value: 'slideDown' },
              { title: 'Slide Left', value: 'slideLeft' },
              { title: 'Slide Right', value: 'slideRight' },
              { title: 'Zoom In', value: 'zoomIn' },
              { title: 'Bounce', value: 'bounce' },
            ],
          },
          initialValue: 'fadeIn',
        }),
        defineField({
          name: 'duration',
          title: 'Animation Duration (ms)',
          type: 'number',
          initialValue: 1000,
        }),
        defineField({
          name: 'delay',
          title: 'Animation Delay (ms)',
          type: 'number',
          initialValue: 0,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'content.title',
      subtitle: 'style',
      media: 'backgroundImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title || 'Flashy Section',
        subtitle: subtitle ? `Style: ${subtitle}` : 'No style selected',
        media,
      }
    },
  },
})

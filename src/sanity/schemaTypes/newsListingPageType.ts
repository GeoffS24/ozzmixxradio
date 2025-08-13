import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const newsListingPageType = defineType({
  name: 'newsListingPage',
  title: 'News Listing Page',
  type: 'document',
  icon: DocumentTextIcon,
  description: 'Configure the header section and content for the news listing page',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'News & Blog',
      validation: (rule) => rule.required(),
      description: 'Internal title for this document (not displayed on the page)',
    }),
    defineField({
      name: 'headerSection',
      title: 'Header Section',
      type: 'object',
      description: 'Configure the header section that appears at the top of the news listing page',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Header Section',
          type: 'boolean',
          initialValue: true,
          description: 'Show or hide the header section on the news listing page',
        }),
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          initialValue: 'News & Blog',
          description: 'Small badge text displayed above the title',
        }),
        defineField({
          name: 'title',
          title: 'Header Title',
          type: 'string',
          initialValue: 'Latest Music Industry Insights',
          description: 'Main heading displayed in the header section',
        }),
        defineField({
          name: 'description',
          title: 'Header Description',
          type: 'text',
          rows: 3,
          initialValue: 'Stay updated with the latest in music, radio, and the entertainment industry.',
          description: 'Subtitle/description text displayed below the title',
        }),
        defineField({
          name: 'alignment',
          title: 'Text Alignment',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'center',
          description: 'Alignment of the header text',
        }),
        defineField({
          name: 'backgroundType',
          title: 'Background Type',
          type: 'string',
          options: {
            list: [
              { title: 'Default (White)', value: 'default' },
              { title: 'Gradient', value: 'gradient' },
              { title: 'Image', value: 'image' },
              { title: 'Solid Color', value: 'color' },
            ],
          },
          initialValue: 'default',
          description: 'Choose the type of background for the header section',
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
          description: 'Background image for the header section (only shown when Background Type is set to Image)',
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
              initialValue: { hex: '#f8fafc' }, // slate-50
            }),
            defineField({
              name: 'to',
              title: 'To Color',
              type: 'color',
              options: {
                disableAlpha: false,
              },
              initialValue: { hex: '#e2e8f0' }, // slate-200
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
              { title: 'Default (Dark)', value: 'default' },
              { title: 'White', value: 'white' },
              { title: 'Black', value: 'black' },
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
            ],
          },
          initialValue: 'default',
          description: 'Color of the text in the header section',
        }),
        defineField({
          name: 'spacing',
          title: 'Section Spacing',
          type: 'object',
          fields: [
            defineField({
              name: 'paddingTop',
              title: 'Top Padding',
              type: 'string',
              options: {
                list: [
                  { title: 'Small (4rem)', value: 'pt-16' },
                  { title: 'Medium (5rem)', value: 'pt-20' },
                  { title: 'Large (6rem)', value: 'pt-24' },
                  { title: 'Extra Large (8rem)', value: 'pt-32' },
                ],
              },
              initialValue: 'pt-16',
            }),
            defineField({
              name: 'paddingBottom',
              title: 'Bottom Padding',
              type: 'string',
              options: {
                list: [
                  { title: 'Small (4rem)', value: 'pb-16' },
                  { title: 'Medium (5rem)', value: 'pb-20' },
                  { title: 'Large (6rem)', value: 'pb-24' },
                  { title: 'Extra Large (8rem)', value: 'pb-32' },
                ],
              },
              initialValue: 'pb-20',
            }),
          ],
          description: 'Control the spacing around the header section',
        }),
      ],
    }),
    defineField({
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      description: 'Search engine optimization settings for the news listing page',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (rule) => rule.max(60),
          description: 'Page title for search engines (max 60 characters)',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.max(160),
          description: 'Page description for search engines (max 160 characters)',
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'SEO keywords for the news listing page',
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Media Image',
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
          description: 'Image used when sharing the page on social media',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      headerTitle: 'headerSection.title',
    },
    prepare(selection) {
      const { title, headerTitle } = selection
      return {
        title: title || 'News Listing Page',
        subtitle: headerTitle ? `Header: ${headerTitle}` : 'Configure news listing page',
      }
    },
  },
})

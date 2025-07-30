import { CreditCardIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const googleAdsType = defineType({
  name: 'googleAds',
  title: 'Google Ads',
  type: 'object',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enable Ads',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to enable/disable ads globally',
    }),
    defineField({
      name: 'adClient',
      title: 'Google AdSense Client ID',
      type: 'string',
      description: 'Your Google AdSense client ID (ca-pub-xxxxxxxxxx)',
      validation: (rule) => rule.regex(/^ca-pub-\d+$/).error('Must be a valid AdSense client ID (ca-pub-xxxxxxxxxx)'),
    }),
    defineField({
      name: 'adSlots',
      title: 'Ad Slots',
      type: 'array',
      of: [
        defineField({
          name: 'adSlot',
          title: 'Ad Slot',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Ad Slot Name',
              type: 'string',
              description: 'Internal name for this ad slot',
            }),
            defineField({
              name: 'slotId',
              title: 'Ad Slot ID',
              type: 'string',
              description: 'Google AdSense slot ID',
            }),
            defineField({
              name: 'format',
              title: 'Ad Format',
              type: 'string',
              options: {
                list: [
                  { title: 'Auto (Responsive)', value: 'auto' },
                  { title: 'Rectangle (300x250)', value: 'rectangle' },
                  { title: 'Large Rectangle (336x280)', value: 'large-rectangle' },
                  { title: 'Leaderboard (728x90)', value: 'leaderboard' },
                  { title: 'Banner (468x60)', value: 'banner' },
                  { title: 'Skyscraper (120x600)', value: 'skyscraper' },
                  { title: 'Wide Skyscraper (160x600)', value: 'wide-skyscraper' },
                  { title: 'Mobile Banner (320x50)', value: 'mobile-banner' },
                  { title: 'Large Mobile Banner (320x100)', value: 'large-mobile-banner' },
                ],
              },
              initialValue: 'auto',
            }),
            defineField({
              name: 'placement',
              title: 'Ad Placement',
              type: 'string',
              options: {
                list: [
                  { title: 'Header', value: 'header' },
                  { title: 'Sidebar', value: 'sidebar' },
                  { title: 'Content Top', value: 'content-top' },
                  { title: 'Content Middle', value: 'content-middle' },
                  { title: 'Content Bottom', value: 'content-bottom' },
                  { title: 'Footer', value: 'footer' },
                  { title: 'Between Sections', value: 'between-sections' },
                  { title: 'Article Top', value: 'article-top' },
                  { title: 'Article Bottom', value: 'article-bottom' },
                ],
              },
            }),
            defineField({
              name: 'enabled',
              title: 'Enable This Ad Slot',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'showOnMobile',
              title: 'Show on Mobile',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'showOnDesktop',
              title: 'Show on Desktop',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'customCSS',
              title: 'Custom CSS Classes',
              type: 'string',
              description: 'Additional CSS classes for styling',
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'placement',
              format: 'format',
            },
            prepare(selection) {
              const { title, subtitle, format } = selection
              return {
                title: title || 'Unnamed Ad Slot',
                subtitle: `${subtitle || 'No placement'} - ${format || 'auto'}`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'settings',
      title: 'Ad Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'lazyLoading',
          title: 'Enable Lazy Loading',
          type: 'boolean',
          initialValue: true,
          description: 'Load ads only when they come into view',
        }),
        defineField({
          name: 'refreshInterval',
          title: 'Ad Refresh Interval (seconds)',
          type: 'number',
          description: 'How often to refresh ads (0 = no refresh)',
          initialValue: 0,
          validation: (rule) => rule.min(0).max(300),
        }),
        defineField({
          name: 'testMode',
          title: 'Test Mode',
          type: 'boolean',
          initialValue: false,
          description: 'Enable test ads for development',
        }),
        defineField({
          name: 'blockedCategories',
          title: 'Blocked Ad Categories',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
          description: 'Ad categories to block (e.g., gambling, adult content)',
        }),
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Ad Analytics',
      type: 'object',
      fields: [
        defineField({
          name: 'trackClicks',
          title: 'Track Ad Clicks',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'trackImpressions',
          title: 'Track Ad Impressions',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'customEvents',
          title: 'Custom Analytics Events',
          type: 'array',
          of: [
            defineField({
              name: 'event',
              title: 'Event',
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Event Name',
                  type: 'string',
                }),
                defineField({
                  name: 'trigger',
                  title: 'Trigger',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Ad Load', value: 'load' },
                      { title: 'Ad Click', value: 'click' },
                      { title: 'Ad View', value: 'view' },
                      { title: 'Ad Error', value: 'error' },
                    ],
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      enabled: 'enabled',
      adClient: 'adClient',
      adSlots: 'adSlots',
    },
    prepare(selection) {
      const { enabled, adClient, adSlots } = selection
      const slotCount = adSlots ? adSlots.length : 0
      return {
        title: 'Google Ads Configuration',
        subtitle: `${enabled ? 'Enabled' : 'Disabled'} - ${slotCount} ad slots - ${adClient || 'No client ID'}`,
      }
    },
  },
})

import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const radioStationType = defineType({
  name: 'radioStation',
  title: 'Radio Station Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Station Name',
      type: 'string',
      initialValue: 'OZZ Dance Radio',
    }),
    defineField({
      name: 'tagline',
      title: 'Station Tagline',
      type: 'string',
      initialValue: 'Your favorite dance music station',
    }),
    defineField({
      name: 'description',
      title: 'Station Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'logo',
      title: 'Station Logo',
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
    
    // Radio Stream Configuration
    defineField({
      name: 'radioConfig',
      title: 'Radio Stream Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'streamUrl',
          title: 'Main Stream URL',
          type: 'url',
          description: 'Primary radio stream URL',
          initialValue: 'https://a2.asurahosting.com/listen/ozzmixx_dance_radio/radio.mp3',
        }),
        defineField({
          name: 'statusApiUrl',
          title: 'Status API URL',
          type: 'url',
          description: 'API endpoint for current track information',
          initialValue: 'https://a2.asurahosting.com:7330/status-json.xsl',
        }),
        defineField({
          name: 'backupStreamUrl',
          title: 'Backup Stream URL',
          type: 'url',
          description: 'Fallback stream URL if main stream fails',
        }),
        defineField({
          name: 'defaultVolume',
          title: 'Default Volume',
          type: 'number',
          description: 'Default volume level (0-100)',
          initialValue: 50,
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: 'autoPlay',
          title: 'Auto Play',
          type: 'boolean',
          description: 'Should the radio start playing automatically?',
          initialValue: false,
        }),
      ],
    }),

    // Contact Information
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'address',
          title: 'Station Address',
          type: 'text',
          rows: 3,
          initialValue: 'Level 1, 12 Sample St, Sydney NSW 2000',
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          initialValue: '1800 123 4567',
        }),
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'email',
          initialValue: 'info@radiostation.com',
        }),
        defineField({
          name: 'businessHours',
          title: 'Business Hours',
          type: 'string',
          initialValue: 'Mon-Fri: 9AM-6PM, Sat-Sun: 10AM-4PM',
        }),
      ],
    }),

    // Social Media Links
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
        }),
      ],
    }),

    // SEO Settings
    defineField({
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines and social media',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search engines and social media',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'SEO keywords for the website',
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Media Image',
          type: 'image',
          description: 'Image for social media sharing',
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
      ],
    }),

    // Analytics
    defineField({
      name: 'analytics',
      title: 'Analytics & Tracking',
      type: 'object',
      fields: [
        defineField({
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'Google Analytics tracking ID (e.g., GA-XXXXXXXXX)',
        }),
        defineField({
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
          description: 'Facebook Pixel tracking ID',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'logo',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Radio Station Settings',
        subtitle: selection.subtitle || 'Station configuration',
        media: selection.media,
      }
    },
  },
})

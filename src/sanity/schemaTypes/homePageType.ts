import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home Page Content',
    }),
    
    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Hero Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          initialValue: 'Tune In to Your Favorite Radio Station',
        }),
        defineField({
          name: 'description',
          title: 'Hero Description',
          type: 'text',
          rows: 3,
          initialValue: 'Welcome to our vibrant radio community, where music and news come alive. Join us for an unforgettable listening experience, tailored just for you!',
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
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Listen',
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '#listen',
            }),
          ],
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Button Text',
              type: 'string',
              initialValue: 'Join',
            }),
            defineField({
              name: 'link',
              title: 'Button Link',
              type: 'string',
              initialValue: '#join',
            }),
          ],
        }),
      ],
    }),

    // Music/Radio Section
    defineField({
      name: 'musicSection',
      title: 'Music/Radio Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Music Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: 'Listen',
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Your Favorite Music, Anytime, Anywhere',
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 3,
          initialValue: 'Tune in to our station for a diverse mix of music. Enjoy seamless listening with our easy-to-use radio player.',
        }),
        defineField({
          name: 'radioStreamUrl',
          title: 'Radio Stream URL',
          type: 'url',
          description: 'Direct URL to the radio stream',
        }),
        defineField({
          name: 'statusApiUrl',
          title: 'Status API URL',
          type: 'url',
          description: 'URL to get current playing track information',
        }),
        defineField({
          name: 'fallbackImage',
          title: 'Fallback Player Image',
          type: 'image',
          description: 'Image to show when no track artwork is available',
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

    // Schedule Section
    defineField({
      name: 'scheduleSection',
      title: 'Schedule Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Schedule Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: 'Schedule',
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Schedule',
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 3,
          initialValue: 'Tune in to our weekly schedule for engaging shows and insightful discussions that keep you entertained.',
        }),
        defineField({
          name: 'displayFormat',
          title: 'Display Format',
          type: 'string',
          options: {
            list: [
              { title: 'List View', value: 'list' },
              { title: 'Grid View (Calendar)', value: 'grid' },
            ],
          },
          initialValue: 'list',
        }),
        defineField({
          name: 'showCurrentTime',
          title: 'Show Current Time Indicator',
          type: 'boolean',
          initialValue: true,
          description: 'Display a moving timeline indicator for current time',
        }),
      ],
    }),

    // Blog Section
    defineField({
      name: 'blogSection',
      title: 'Blog Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Blog Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: 'Blog',
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Latest Music Industry Insights',
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 3,
          initialValue: 'Stay updated with the latest in music and radio.',
        }),
        defineField({
          name: 'postsToShow',
          title: 'Number of Posts to Show',
          type: 'number',
          initialValue: 3,
          validation: (Rule) => Rule.min(1).max(6),
        }),
      ],
    }),

    // Contact Section
    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Contact Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: 'Contact',
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Get in Touch',
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 3,
          initialValue: 'Have questions or want to get involved? We\'d love to hear from you!',
        }),
        defineField({
          name: 'emailRecipient',
          title: 'Form Email Recipient',
          type: 'email',
          description: 'Email address where form submissions will be sent',
        }),
      ],
    }),

    // Flashy Sections
    defineField({
      name: 'flashySections',
      title: 'Flashy Sections',
      type: 'array',
      of: [{ type: 'flashySection' }],
      description: 'Add engaging sections with cool backgrounds and animations',
    }),

    // Google Ads Configuration
    defineField({
      name: 'googleAds',
      title: 'Google Ads',
      type: 'googleAds',
      description: 'Configure Google AdSense ads for the homepage',
    }),

    // App Download Section
    defineField({
      name: 'appDownloadSection',
      title: 'App Download Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable App Download Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'badge',
          title: 'Section Badge',
          type: 'string',
          initialValue: 'Download App',
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Take OZZ Dance Radio With You',
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 3,
          initialValue: 'Download our mobile app and enjoy your favorite dance music anywhere, anytime. Available for both Android and iOS devices.',
        }),
        defineField({
          name: 'androidUrl',
          title: 'Android App URL',
          type: 'url',
          description: 'Google Play Store URL',
          initialValue: 'https://play.google.com/store/apps/details?id=com.ozzmix.radio&pcampaignid=web_share',
        }),
        defineField({
          name: 'iosUrl',
          title: 'iOS App URL',
          type: 'url',
          description: 'Apple App Store URL',
          initialValue: 'https://apps.apple.com/us/app/ozzmixx-dance-radio/id6477762868?platform=iphone',
        }),
        defineField({
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          description: 'Optional background image for the section',
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
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Home Page Content',
      }
    },
  },
})

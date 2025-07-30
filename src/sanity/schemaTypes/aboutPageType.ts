import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Us',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      initialValue: { current: 'about' },
      validation: (rule) => rule.required(),
    }),
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
          initialValue: 'About OZZ Dance Radio',
        }),
        defineField({
          name: 'description',
          title: 'Hero Description',
          type: 'text',
          rows: 3,
          initialValue: 'Learn more about our station, our mission, and the team behind the music.',
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
      ],
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'blockContent',
      description: 'The main content of the about page using rich text',
    }),
    defineField({
      name: 'teamSection',
      title: 'Team Section',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Team Section',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Meet Our Team',
        }),
        defineField({
          name: 'description',
          title: 'Section Description',
          type: 'text',
          rows: 2,
          initialValue: 'Get to know the passionate people behind OZZ Dance Radio.',
        }),
        defineField({
          name: 'teamMembers',
          title: 'Team Members',
          type: 'array',
          of: [
            defineField({
              name: 'teamMember',
              title: 'Team Member',
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'role',
                  title: 'Role/Position',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'bio',
                  title: 'Biography',
                  type: 'text',
                  rows: 3,
                }),
                defineField({
                  name: 'image',
                  title: 'Profile Image',
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
                  name: 'socialLinks',
                  title: 'Social Links',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'twitter',
                      title: 'Twitter URL',
                      type: 'url',
                    }),
                    defineField({
                      name: 'instagram',
                      title: 'Instagram URL',
                      type: 'url',
                    }),
                    defineField({
                      name: 'linkedin',
                      title: 'LinkedIn URL',
                      type: 'url',
                    }),
                  ],
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  subtitle: 'role',
                  media: 'image',
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines (50-60 characters)',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Description for search engines (150-160 characters)',
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'keywords',
          title: 'SEO Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            layout: 'tags',
          },
        }),
        defineField({
          name: 'ogImage',
          title: 'Social Media Image',
          type: 'image',
          description: 'Image for social media sharing (1200x630px recommended)',
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
      subtitle: 'slug.current',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: `/${subtitle}`,
      }
    },
  },
})

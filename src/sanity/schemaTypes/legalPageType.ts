import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const legalPageType = defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(100),
      description: 'The main title of the legal page (e.g., "Privacy Policy")',
    }),
    defineField({
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 50,
        slugify: (input) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 50),
      },
      validation: (Rule) => Rule.required(),
      description: 'URL path for the page (e.g., "privacy-policy")',
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Privacy Policy', value: 'privacy' },
          { title: 'Terms of Service', value: 'terms' },
          { title: 'Cookie Policy', value: 'cookies' },
          { title: 'Disclaimer', value: 'disclaimer' },
          { title: 'DMCA Policy', value: 'dmca' },
          { title: 'Other Legal Document', value: 'other' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      description: 'Type of legal document for better organization',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      description: 'SEO description for search engines (max 160 characters)',
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
      description: 'The main content of the legal page using rich text editor',
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
      description: 'When this version of the document became effective',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'When this document was last modified',
    }),
    defineField({
      name: 'version',
      title: 'Version Number',
      type: 'string',
      initialValue: '1.0',
      validation: (Rule) => Rule.required(),
      description: 'Version number for tracking document changes (e.g., "1.0", "2.1")',
    }),
    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
      description: 'Email address for legal inquiries related to this document',
    }),
    defineField({
      name: 'jurisdiction',
      title: 'Legal Jurisdiction',
      type: 'string',
      initialValue: 'Australia',
      description: 'The legal jurisdiction that governs this document',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Keywords for SEO optimization',
    }),
  ],
  orderings: [
    {
      title: 'Page Type',
      name: 'pageTypeAsc',
      by: [{ field: 'pageType', direction: 'asc' }],
    },
    {
      title: 'Last Updated',
      name: 'lastUpdatedDesc',
      by: [{ field: 'lastUpdated', direction: 'desc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pageType',
      status: 'status',
      version: 'version',
      lastUpdated: 'lastUpdated',
    },
    prepare(selection) {
      const { title, subtitle, status, version, lastUpdated } = selection
      const statusEmoji = {
        draft: '📝',
        published: '✅',
        archived: '📦',
      }[status] || '📄'
      
      const formattedDate = lastUpdated 
        ? new Date(lastUpdated).toLocaleDateString()
        : 'No date'
      
      return {
        title: `${statusEmoji} ${title}`,
        subtitle: `${subtitle} • v${version} • Updated: ${formattedDate}`,
      }
    },
  },
})

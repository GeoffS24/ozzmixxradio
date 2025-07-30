import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const contactSubmissionType = defineType({
  name: 'contactSubmission',
  title: 'Contact Form Submissions',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'string',
      options: {
        list: [
          { title: 'General Inquiry', value: 'general' },
          { title: 'Technical Support', value: 'support' },
          { title: 'Partnership', value: 'partnership' },
          { title: 'Feedback', value: 'feedback' },
        ],
      },
    }),
    defineField({
      name: 'userType',
      title: 'User Type',
      type: 'string',
      options: {
        list: [
          { title: 'Listener', value: 'listener' },
          { title: 'Advertiser', value: 'advertiser' },
          { title: 'Artist', value: 'artist' },
          { title: 'Sponsor', value: 'sponsor' },
          { title: 'Other Inquiry', value: 'other-inquiry' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'acceptedTerms',
      title: 'Accepted Terms',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'submissionDate',
      title: 'Submission Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Resolved', value: 'resolved' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes for staff use',
      rows: 3,
    }),
    defineField({
      name: 'emailSent',
      title: 'Email Sent Successfully',
      type: 'boolean',
      initialValue: false,
      readOnly: true,
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP Address',
      type: 'string',
      readOnly: true,
      description: 'IP address of the submitter',
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      readOnly: true,
      description: 'Browser information',
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      topic: 'topic',
      status: 'status',
      submissionDate: 'submissionDate',
    },
    prepare(selection) {
      const { firstName, lastName, email, topic, status, submissionDate } = selection
      const date = submissionDate ? new Date(submissionDate).toLocaleDateString() : 'Unknown date'
      
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${email} - ${topic || 'No topic'} (${status || 'new'})`,
        description: `Submitted: ${date}`,
      }
    },
  },
  orderings: [
    {
      title: 'Submission Date (Newest First)',
      name: 'submissionDateDesc',
      by: [{ field: 'submissionDate', direction: 'desc' }],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'name',
      by: [{ field: 'firstName', direction: 'asc' }],
    },
  ],
})

"use client"

import { useState } from 'react'
import { sendContactEmail, initEmailJS, type ContactFormData } from '@/lib/services/emailjs'

interface UseContactFormResult {
  isSubmitting: boolean
  submitForm: (formData: ContactFormData) => Promise<{
    success: boolean
    message: string
    error?: string
  }>
}

export function useContactForm(): UseContactFormResult {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitForm = async (formData: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      console.log('🚀 Starting contact form submission...')
      
      // Step 1: Save to Sanity via API route (server-side)
      console.log('📝 Saving to database...')
      const apiResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const apiResult = await apiResponse.json()

      if (!apiResult.success) {
        throw new Error(apiResult.error || 'Failed to save contact submission')
      }

      console.log('✅ Saved to database successfully')
      const recipientEmail = apiResult.recipientEmail

      // Step 2: Send email via EmailJS (frontend)
      console.log('📧 Sending email...')
      
      // Initialize EmailJS
      initEmailJS()
      
      const emailResult = await sendContactEmail(formData, recipientEmail)

      if (emailResult.success) {
        console.log('✅ Email sent successfully')
        return {
          success: true,
          message: 'Thank you for your message! We have received your submission and will get back to you soon.',
        }
      } else {
        console.warn('⚠️ Email sending failed, but data was saved')
        return {
          success: true,
          message: 'Your message has been saved successfully. However, there was an issue sending the email notification. We will still get back to you soon.',
          error: emailResult.error,
        }
      }

    } catch (error) {
      console.error('❌ Contact form submission failed:', error)
      return {
        success: false,
        message: 'Sorry, there was an error submitting your message. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    submitForm,
  }
}

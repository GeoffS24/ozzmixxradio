"use client"

import { useState, useEffect } from 'react'
import { ChevronDown, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { SectionHeader } from '@/components/atoms/ui/SectionHeader'
import { Button } from '@/components/atoms/ui/Button'
import { initEmailJS, validateEmailJSConfig } from '@/lib/services/emailjs'
import type { ContactSectionData } from '@/types/sanity'

interface ContactSectionProps {
  data?: ContactSectionData
}

export function ContactSection({ data }: ContactSectionProps) {
  // Default values
  const sectionData = {
    enabled: data?.enabled ?? true,
    badge: data?.badge ?? 'Contact',
    title: data?.title ?? 'Get in Touch',
    description: data?.description ?? 'Have questions or want to get involved? We\'d love to hear from you!',
    emailRecipient: data?.emailRecipient ?? 'info@radiostation.com',
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: '',
    userType: '',
    message: '',
    acceptTerms: false
  })

  const [isTopicOpen, setIsTopicOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const [emailConfigValid, setEmailConfigValid] = useState(false)

  // Initialize EmailJS and check configuration
  useEffect(() => {
    initEmailJS()
    const config = validateEmailJSConfig()
    setEmailConfigValid(config.isValid)

    if (!config.isValid) {
      console.warn('EmailJS configuration incomplete:', config.missingFields)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleUserTypeChange = (type: string) => {
    setFormData(prev => ({ ...prev, userType: type }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset status
    setSubmitStatus({ type: null, message: '' })
    setIsSubmitting(true)

    try {
      // Submit form data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Thank you! Your message has been sent successfully.'
        })

        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          topic: '',
          userType: '',
          message: '',
          acceptTerms: false
        })
        setIsTopicOpen(false)
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.'
        })
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!sectionData.enabled) {
    return null
  }

  return (
    <section id='join' className="flex py-16 px-5 flex-col items-center gap-8 bg-white">
      <div className="flex container mx-auto flex-col items-center gap-8 w-full">
        <SectionHeader
          badge={sectionData.badge}
          title={sectionData.title}
          description={sectionData.description}
          alignment="center"
        />

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="flex max-w-[768px] flex-col items-center gap-6 w-full">
          {/* Name Fields */}
          <div className="flex lg:flex-row flex-col items-start gap-6 w-full">
            <div className="flex flex-col items-start gap-2 flex-1 w-full">
              <label htmlFor="firstName" className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="flex h-12 px-3 py-2 items-center gap-2 w-full border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-2 flex-1 w-full">
              <label htmlFor="lastName" className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="flex h-12 px-3 py-2 items-center gap-2 w-full border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="flex lg:flex-row flex-col items-start gap-6 w-full">
            <div className="flex flex-col items-start gap-2 flex-1 w-full">
              <label htmlFor="email" className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="flex h-12 px-3 py-2 items-center gap-2 w-full border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-2 flex-1 w-full">
              <label htmlFor="phone" className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex h-12 px-3 py-2 items-center gap-2 w-full border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Topic Selector */}
          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
              Choose a Topic
            </label>
            <div className="relative w-full">
              <button
                type="button"
                onClick={() => setIsTopicOpen(!isTopicOpen)}
                className="flex px-3 py-2 items-center gap-4 w-full border border-border bg-muted text-left"
              >
                <span className="flex-1 text-sm lg:text-base font-normal leading-[150%] text-foreground">
                  {formData.topic || 'Select one...'}
                </span>
                <ChevronDown className="w-6 h-6 text-foreground/60" />
              </button>
              {isTopicOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-border shadow-lg z-10">
                  {['General Inquiry', 'Technical Support', 'Partnership', 'Feedback'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, topic: option }))
                        setIsTopicOpen(false)
                      }}
                      className="block w-full px-3 py-2 text-left text-sm lg:text-base hover:bg-muted"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex py-4 flex-col items-start gap-4 w-full">
            <span className="text-sm lg:text-base font-normal leading-[150%] text-foreground">
              Which best describes you?
            </span>
            <div className="flex flex-col items-start gap-3.5 w-full">
              <div className="flex h-6 items-start gap-6 w-full">
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="radio"
                    id="listener"
                    name="userType"
                    value="listener"
                    checked={formData.userType === 'listener'}
                    onChange={() => handleUserTypeChange('listener')}
                    className="w-4.5 h-4.5 rounded-full border border-border bg-muted accent-primary"
                  />
                  <label htmlFor="listener" className="text-sm lg:text-base font-normal leading-[150%] text-foreground">
                    Listener
                  </label>
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="radio"
                    id="advertiser"
                    name="userType"
                    value="advertiser"
                    checked={formData.userType === 'advertiser'}
                    onChange={() => handleUserTypeChange('advertiser')}
                    className="w-4.5 h-4.5 rounded-full border border-border bg-muted accent-primary"
                  />
                  <label htmlFor="advertiser" className="text-sm lg:text-base font-normal leading-[150%] text-foreground">
                    Advertiser
                  </label>
                </div>
              </div>
              <div className="flex h-6 items-start gap-6 w-full">
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="radio"
                    id="artist"
                    name="userType"
                    value="artist"
                    checked={formData.userType === 'artist'}
                    onChange={() => handleUserTypeChange('artist')}
                    className="w-4.5 h-4.5 rounded-full border border-border bg-muted accent-primary"
                  />
                  <label htmlFor="artist" className="text-sm lg:text-base font-normal leading-[150%] text-foreground">
                    Artist
                  </label>
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="radio"
                    id="sponsor"
                    name="userType"
                    value="sponsor"
                    checked={formData.userType === 'sponsor'}
                    onChange={() => handleUserTypeChange('sponsor')}
                    className="w-4.5 h-4.5 rounded-full border border-border bg-muted accent-primary"
                  />
                  <label htmlFor="sponsor" className="text-sm lg:text-base font-normal leading-[150%] text-foreground">
                    Sponsor
                  </label>
                </div>
              </div>
              <div className="flex h-6 items-start gap-6 w-full">
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="radio"
                    id="other-inquiry"
                    name="userType"
                    value="other-inquiry"
                    checked={formData.userType === 'other-inquiry'}
                    onChange={() => handleUserTypeChange('other-inquiry')}
                    className="w-4.5 h-4.5 rounded-full border border-border bg-muted accent-primary"
                  />
                  <label htmlFor="other-inquiry" className="text-sm lg:text-base font-normal leading-[150%] text-foreground">
                    Other Inquiry
                  </label>
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="radio"
                    id="other"
                    name="userType"
                    value="other"
                    checked={formData.userType === 'other'}
                    onChange={() => handleUserTypeChange('other')}
                    className="w-4.5 h-4.5 rounded-full border border-border bg-muted accent-primary"
                  />
                  <label htmlFor="other" className="text-sm lg:text-base font-normal leading-[150%] text-foreground">
                    Other
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col items-start gap-2 w-full">
            <label className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={8}
              placeholder="Type your message..."
              className="flex h-45 px-3 py-3 items-start w-full border border-border bg-muted resize-none focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-foreground/60"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex pb-4 items-center gap-2 w-full">
            <input
              type="checkbox"
              id="terms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="w-4.5 h-4.5 border border-border bg-muted accent-primary"
            />
            <label htmlFor="terms" className="text-xs lg:text-sm font-normal leading-[150%] text-foreground">
              I accept the Terms
            </label>
          </div>

          {/* Status Message */}
          {submitStatus.type && (
            <div className={`flex items-center gap-2 p-4 rounded-lg w-full ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {submitStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="text-sm">{submitStatus.message}</span>
            </div>
          )}

          {/* Configuration Warning */}
          {!emailConfigValid && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-lg w-full">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">
                Email configuration incomplete. Messages will be saved but may not be delivered.
              </span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex px-6 py-2.5 justify-center items-center gap-2 border border-persimmon bg-persimmon text-sm lg:text-base font-medium text-white hover:bg-persimmon-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, type ContactFormData } from '@/lib/services/emailjs'
import { saveContactSubmission, getClientIP, getUserAgent } from '@/lib/services/sanity-contact'
import { sanityFetch } from '@/sanity/lib/live'
import { RADIO_STATION_QUERY } from '@/sanity/lib/queries/homeQueries'
import type { RadioStationData } from '@/types/sanity'

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData: ContactFormData = await request.json()

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate terms acceptance
    if (!formData.acceptTerms) {
      return NextResponse.json(
        { success: false, error: 'Terms must be accepted' },
        { status: 400 }
      )
    }

    // Get recipient email from Sanity
    const stationData = await sanityFetch({
      query: RADIO_STATION_QUERY,
    })

    const station = stationData.data as RadioStationData | null
    const recipientEmail = station?.contactInfo?.email || 'info@ozzradio.com'

    // Get client information
    const clientIP = getClientIP(request)
    const userAgent = getUserAgent(request)

    // Send email via EmailJS
    let emailSent = false
    let emailError = ''

    try {
      const emailResult = await sendContactEmail(formData, recipientEmail)
      emailSent = emailResult.success
      if (!emailResult.success) {
        emailError = emailResult.error || 'Unknown email error'
        console.error('Email sending failed:', emailError)
      }
    } catch (error) {
      console.error('Email sending error:', error)
      emailError = error instanceof Error ? error.message : 'Email service error'
    }

    // Save to Sanity (regardless of email success)
    const sanityResult = await saveContactSubmission(
      formData,
      emailSent,
      {
        ipAddress: clientIP,
        userAgent: userAgent,
      }
    )

    if (!sanityResult.success) {
      console.error('Failed to save to Sanity:', sanityResult.error)
      // Still return success if email was sent, but log the error
      if (emailSent) {
        return NextResponse.json({
          success: true,
          message: 'Message sent successfully, but failed to save to database',
          emailSent: true,
          savedToDatabase: false,
        })
      } else {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Failed to send email and save to database',
            details: {
              emailError,
              sanityError: sanityResult.error
            }
          },
          { status: 500 }
        )
      }
    }

    // Return success response
    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Message sent successfully!',
        emailSent: true,
        savedToDatabase: true,
        submissionId: sanityResult.id,
      })
    } else {
      return NextResponse.json({
        success: true,
        message: 'Message saved successfully, but email delivery failed. We will contact you soon.',
        emailSent: false,
        savedToDatabase: true,
        submissionId: sanityResult.id,
        emailError,
      })
    }

  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  )
}

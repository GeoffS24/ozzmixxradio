import { NextRequest, NextResponse } from 'next/server'
import { saveContactSubmission, getClientIP, getUserAgent } from '@/lib/services/sanity-contact'
import { RADIO_STATION_QUERY } from '@/sanity/lib/queries/homeQueries'
import type { RadioStationData } from '@/types/sanity'
import { client } from '@/sanity/lib/client'

// Contact form data interface (moved from emailjs service)
export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  topic: string
  userType: string
  message: string
  acceptTerms: boolean
}

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

    // Get recipient email from Sanity (for frontend EmailJS use)
    const station = await client.fetch(RADIO_STATION_QUERY) as RadioStationData | null
    const recipientEmail = station?.contactInfo?.email || 'info@ozzradio.com'

    // Get client information
    const clientIP = getClientIP(request)
    const userAgent = getUserAgent(request)

    // Save to Sanity (server-side only)
    const sanityResult = await saveContactSubmission(
      formData,
      false, // Email will be sent from frontend
      {
        ipAddress: clientIP,
        userAgent: userAgent,
      }
    )

    if (!sanityResult.success) {
      console.error('Failed to save to Sanity:', sanityResult.error)
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save to database',
          details: {
            sanityError: sanityResult.error
          }
        },
        { status: 500 }
      )
    }

    // Return success with recipient email for frontend EmailJS
    return NextResponse.json({
      success: true,
      message: 'Contact submission saved successfully',
      savedToDatabase: true,
      submissionId: sanityResult.id,
      recipientEmail: recipientEmail, // For frontend EmailJS
    })

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

import { writeClient } from '@/sanity/lib/client'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

// Contact form data interface
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

// Interface for contact submission data
export interface ContactSubmissionData extends Omit<ContactFormData, 'acceptTerms'> {
  acceptTerms: boolean
  submissionDate: string
  status: 'new' | 'in-progress' | 'resolved' | 'closed'
  emailSent: boolean
  ipAddress?: string
  userAgent?: string
  notes?: string
}

// Save contact form submission to Sanity
export const saveContactSubmission = async (
  formData: ContactFormData,
  emailSent: boolean = false,
  additionalData?: {
    ipAddress?: string
    userAgent?: string
  }
): Promise<{ success: boolean; id?: string; error?: string }> => {
  try {
    console.log('🔧 Attempting to save contact submission to Sanity...')

    // Create a fresh client with explicit configuration
    const sanityWriteClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token: process.env.SANITY_VIEWER_TOKEN,
      useCdn: false,

    })

    console.log('🔧 Created fresh Sanity client with token:', {
      projectId,
      dataset,
      apiVersion,
      hasToken: !!process.env.SANITY_VIEWER_TOKEN,
      tokenLength: process.env.SANITY_VIEWER_TOKEN?.length || 0
    })

    // Prepare submission data
    const submissionData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || '',
      topic: formData.topic || 'general',
      userType: formData.userType || 'other',
      message: formData.message,
      acceptedTerms: formData.acceptTerms, // ✅ Fixed field name to match schema
      submissionDate: new Date().toISOString(),
      status: 'new',
      emailSent,
      ipAddress: additionalData?.ipAddress,
      userAgent: additionalData?.userAgent,
    }

    console.log('📝 Submission data prepared:', {
      firstName: submissionData.firstName,
      email: submissionData.email,
      topic: submissionData.topic,
      dataKeys: Object.keys(submissionData)
    })

    // Create document in Sanity
    console.log('📝 Creating document in Sanity...')
    const result = await sanityWriteClient.create({
      _type: 'contactSubmission',
      ...submissionData,
    })

    console.log('✅ Successfully saved to Sanity:', result._id)

    return {
      success: true,
      id: result._id,
    }
  } catch (error) {
    console.error('Error saving contact submission to Sanity:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Update contact submission status
export const updateContactSubmissionStatus = async (
  id: string,
  status: 'new' | 'in-progress' | 'resolved' | 'closed',
  notes?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const updateData: any = { status }
    if (notes) {
      updateData.notes = notes
    }

    await writeClient.patch(id).set(updateData).commit()

    return { success: true }
  } catch (error) {
    console.error('Error updating contact submission status:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Get contact submissions with filtering
export const getContactSubmissions = async (
  status?: string,
  limit: number = 50
): Promise<{ success: boolean; data?: any[]; error?: string }> => {
  try {
    let query = '*[_type == "contactSubmission"]'
    
    if (status) {
      query += ` && status == "${status}"`
    }
    
    query += ` | order(submissionDate desc)[0...${limit}]`

    const submissions = await writeClient.fetch(query)

    return {
      success: true,
      data: submissions,
    }
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Get client IP address (for server-side use)
export const getClientIP = (request: Request): string => {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const remoteAddr = request.headers.get('x-remote-addr')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  return realIP || remoteAddr || 'unknown'
}

// Get user agent
export const getUserAgent = (request: Request): string => {
  return request.headers.get('user-agent') || 'unknown'
}

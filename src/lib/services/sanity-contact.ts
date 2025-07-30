import { client } from '@/sanity/lib/client'
import type { ContactFormData } from './emailjs'

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
    // Prepare submission data
    const submissionData: Omit<ContactSubmissionData, 'id'> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || '',
      topic: formData.topic || 'general',
      userType: formData.userType || 'other',
      message: formData.message,
      acceptTerms: formData.acceptTerms,
      submissionDate: new Date().toISOString(),
      status: 'new',
      emailSent,
      ipAddress: additionalData?.ipAddress,
      userAgent: additionalData?.userAgent,
    }

    // Create document in Sanity
    const result = await client.create({
      _type: 'contactSubmission',
      ...submissionData,
    })

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

    await client.patch(id).set(updateData).commit()

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

    const submissions = await client.fetch(query)

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

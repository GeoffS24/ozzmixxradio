import emailjs from '@emailjs/browser'

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
}

// Initialize EmailJS
export const initEmailJS = () => {
  if (EMAILJS_CONFIG.publicKey) {
    emailjs.init(EMAILJS_CONFIG.publicKey)
  }
}

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

// Send email using EmailJS
export const sendContactEmail = async (
  formData: ContactFormData,
  recipientEmail: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Validate configuration
    if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
      throw new Error('EmailJS configuration is incomplete. Please check your environment variables.')
    }

    // Prepare template parameters
    const templateParams = {
      // Form data
      first_name: formData.firstName,
      last_name: formData.lastName,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      topic: formData.topic || 'General Inquiry',
      user_type: formData.userType || 'Not specified',
      message: formData.message,
      
      // Recipient
      to_email: recipientEmail,
      
      // Additional info
      submission_date: new Date().toLocaleString(),
      full_name: `${formData.firstName} ${formData.lastName}`,
      
      // Email subject
      subject: `New Contact Form Submission - ${formData.topic || 'General Inquiry'}`,
      
      // Reply-to
      reply_to: formData.email,
    }

    // Send email
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    )

    if (response.status === 200) {
      return { success: true }
    } else {
      throw new Error(`EmailJS returned status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

// Validate EmailJS configuration
export const validateEmailJSConfig = (): { isValid: boolean; missingFields: string[] } => {
  const missingFields: string[] = []
  
  if (!EMAILJS_CONFIG.serviceId) missingFields.push('NEXT_PUBLIC_EMAILJS_SERVICE_ID')
  if (!EMAILJS_CONFIG.templateId) missingFields.push('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID')
  if (!EMAILJS_CONFIG.publicKey) missingFields.push('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY')
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  }
}

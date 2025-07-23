// Export all Sanity types
export * from './sanity'

// Radio Player types
export interface RadioPlayerState {
  isPlaying: boolean
  isLoading: boolean
  volume: number
  currentTrack: RadioStatus | null
  error: string | null
  isConnected: boolean
}

export interface RadioStatus {
  title?: string
  artist?: string
  album?: string
  listeners?: number
  bitrate?: string
  genre?: string
  server_description?: string
  stream_start?: string
}

export interface UseRadioPlayerProps {
  streamUrl: string
  statusApiUrl: string
  defaultVolume?: number
  autoPlay?: boolean
  updateInterval?: number
}

// Component Props types
export interface ComponentWithSanityData<T = any> {
  data?: T
}

// Common UI types
export interface ButtonVariant {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export interface SectionAlignment {
  alignment?: 'left' | 'center'
}

// Form types
export interface FormFieldData {
  name: string
  value: string | boolean
  type?: string
  required?: boolean
  validation?: (value: any) => string | null
}

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

// Schedule types
export interface ScheduleDisplayProps {
  displayFormat: 'list' | 'grid'
  showCurrentTime: boolean
  timezone?: string
}

// Navigation types
export interface NavLinkVariant {
  variant?: 'desktop' | 'mobile' | 'footer'
}

// Media types
export interface ImageWithAlt {
  src: string
  alt: string
  width?: number
  height?: number
}

// API Response types
export interface SanityResponse<T> {
  data: T | null
  error?: string
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

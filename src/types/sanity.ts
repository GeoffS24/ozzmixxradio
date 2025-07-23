// Base Sanity types
export interface SanityImage {
  asset?: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SanityReference {
  _ref: string
  _type: 'reference'
}

// Home Page Types
export interface HomePageData {
  _id: string
  _type: 'homePage'
  title?: string
  heroSection?: HeroSectionData
  musicSection?: MusicSectionData
  scheduleSection?: ScheduleSectionData
  blogSection?: BlogSectionData
  contactSection?: ContactSectionData
}

export interface HeroSectionData {
  enabled?: boolean
  title?: string
  description?: string
  backgroundImage?: SanityImage
  primaryButton?: {
    text?: string
    link?: string
  }
  secondaryButton?: {
    text?: string
    link?: string
  }
}

export interface MusicSectionData {
  enabled?: boolean
  badge?: string
  title?: string
  description?: string
  radioStreamUrl?: string
  statusApiUrl?: string
  fallbackImage?: SanityImage
}

export interface ScheduleSectionData {
  enabled?: boolean
  badge?: string
  title?: string
  description?: string
  displayFormat?: 'list' | 'grid'
  showCurrentTime?: boolean
}

export interface BlogSectionData {
  enabled?: boolean
  badge?: string
  title?: string
  description?: string
  postsToShow?: number
}

export interface ContactSectionData {
  enabled?: boolean
  badge?: string
  title?: string
  description?: string
  emailRecipient?: string
}

// Schedule Types
export interface ScheduleData {
  _id: string
  _type: 'schedule'
  title?: string
  timezone?: string
  weeklySchedule?: DaySchedule[]
}

export interface DaySchedule {
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  timeSlots?: TimeSlot[]
}

export interface TimeSlot {
  startTime: string
  endTime: string
  showName?: string
  hostName?: string
  description?: string
  showImage?: SanityImage
  genre?: 'dance' | 'electronic' | 'hiphop' | 'rock' | 'pop' | 'jazz' | 'classical' | 'talk' | 'news' | 'mixed'
  isLive?: boolean
}

// Radio Station Settings Types
export interface RadioStationData {
  _id: string
  _type: 'radioStation'
  title?: string
  tagline?: string
  description?: string
  logo?: SanityImage
  radioConfig?: RadioConfig
  contactInfo?: ContactInfo
  socialMedia?: SocialMedia
  seoSettings?: SEOSettings
  analytics?: Analytics
}

export interface RadioConfig {
  streamUrl?: string
  statusApiUrl?: string
  backupStreamUrl?: string
  defaultVolume?: number
  autoPlay?: boolean
}

export interface ContactInfo {
  address?: string
  phone?: string
  email?: string
  businessHours?: string
}

export interface SocialMedia {
  facebook?: string
  instagram?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  tiktok?: string
}

export interface SEOSettings {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: SanityImage
}

export interface Analytics {
  googleAnalyticsId?: string
  facebookPixelId?: string
}

// Blog Types (extending existing)
export interface BlogPost {
  _id: string
  _type: 'post'
  title?: string
  slug?: {
    current: string
  }
  author?: Author
  mainImage?: SanityImage
  categories?: Category[]
  publishedAt?: string
  body?: any[] // Block content
  _createdAt?: string
  _updatedAt?: string
  _rev?: string
}

export interface Author {
  _id: string
  _type: 'author'
  name?: string
  slug?: {
    current: string
  }
  image?: SanityImage
  bio?: any[] // Block content
}

export interface Category {
  _id: string
  _type: 'category'
  title?: string
  slug?: {
    current: string
  }
  description?: string
}

// Legal Page Types
export interface LegalPage {
  _id: string
  _type: 'legalPage'
  title?: string
  slug?: {
    current: string
  }
  pageType?: 'privacy' | 'terms' | 'cookies' | 'disclaimer' | 'dmca' | 'other'
  metaDescription?: string
  content?: any[] // Block content
  effectiveDate?: string
  lastUpdated?: string
  version?: string
  status?: 'draft' | 'published' | 'archived'
  contactEmail?: string
  jurisdiction?: string
  seoKeywords?: string[]
}

// Utility types for queries
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export type WithSanityDocument<T> = T & SanityDocument

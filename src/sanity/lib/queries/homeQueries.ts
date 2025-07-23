import { defineQuery } from "next-sanity";

// Home Page Queries
export const HOME_PAGE_QUERY = defineQuery(`*[_type == 'homePage' && _id == 'homePage'][0] {
  _id,
  title,
  heroSection {
    enabled,
    title,
    description,
    backgroundImage {
      asset,
      alt,
      hotspot,
      crop
    },
    primaryButton {
      text,
      link
    },
    secondaryButton {
      text,
      link
    }
  },
  musicSection {
    enabled,
    badge,
    title,
    description,
    radioStreamUrl,
    statusApiUrl,
    fallbackImage {
      asset,
      alt,
      hotspot,
      crop
    }
  },
  scheduleSection {
    enabled,
    badge,
    title,
    description,
    displayFormat,
    showCurrentTime
  },
  blogSection {
    enabled,
    badge,
    title,
    description,
    postsToShow
  },
  contactSection {
    enabled,
    badge,
    title,
    description,
    emailRecipient
  }
}`);

// Schedule Queries
export const SCHEDULE_QUERY = defineQuery(`*[_type == 'schedule' && _id == 'weeklySchedule'][0] {
  _id,
  title,
  timezone,
  weeklySchedule[] {
    dayOfWeek,
    timeSlots[] {
      startTime,
      endTime,
      showName,
      hostName,
      description,
      showImage {
        asset,
        alt,
        hotspot,
        crop
      },
      genre,
      isLive
    }
  }
}`);

// Radio Station Settings Query
export const RADIO_STATION_QUERY = defineQuery(`*[_type == 'radioStation' && _id == 'radioStationSettings'][0] {
  _id,
  title,
  tagline,
  description,
  logo {
    asset,
    alt,
    hotspot,
    crop
  },
  radioConfig {
    streamUrl,
    statusApiUrl,
    backupStreamUrl,
    defaultVolume,
    autoPlay
  },
  contactInfo {
    address,
    phone,
    email,
    businessHours
  },
  socialMedia {
    facebook,
    instagram,
    twitter,
    linkedin,
    youtube,
    tiktok
  },
  seoSettings {
    metaTitle,
    metaDescription,
    keywords,
    ogImage {
      asset,
      alt,
      hotspot,
      crop
    }
  },
  analytics {
    googleAnalyticsId,
    facebookPixelId
  }
}`);

// Blog Post Queries
export const POSTS_QUERY = defineQuery(`*[_type == 'post' && defined(slug.current)] | order(publishedAt desc)[0...$limit] {
  _id,
  title,
  slug,
  mainImage {
    asset,
    alt,
    hotspot,
    crop
  },
  categories[]-> {
    _id,
    title,
    slug
  },
  author-> {
    _id,
    name,
    image {
      asset,
      alt
    }
  },
  publishedAt,
  body[0...2]
}`);

export const POST_QUERY = defineQuery(`*[_type == 'post' && slug.current == $slug][0] {
  _id,
  title,
  slug,
  body,
  mainImage {
    asset,
    alt,
    hotspot,
    crop
  },
  categories[]-> {
    _id,
    title,
    slug,
    description
  },
  author-> {
    _id,
    name,
    slug,
    image {
      asset,
      alt
    },
    bio
  },
  publishedAt
}`);

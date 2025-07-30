import { defineQuery } from 'next-sanity'

// About Page Query
export const ABOUT_PAGE_QUERY = defineQuery(`*[_type == 'aboutPage' && _id == 'aboutPage'][0] {
  _id,
  title,
  slug,
  heroSection {
    enabled,
    title,
    description,
    backgroundImage {
      asset,
      alt,
      hotspot,
      crop
    }
  },
  content,
  teamSection {
    enabled,
    title,
    description,
    teamMembers[] {
      name,
      role,
      bio,
      image {
        asset,
        alt,
        hotspot,
        crop
      },
      socialLinks {
        twitter,
        instagram,
        linkedin
      }
    }
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
  }
}`)

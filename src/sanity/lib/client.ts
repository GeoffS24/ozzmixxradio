import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

function getStudioUrl(): string {
  // Production URL
  if (process.env.NODE_ENV === 'production') {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}/studio`;
    }
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return `${process.env.NEXT_PUBLIC_SITE_URL}/studio`;
    }
    return 'https://ozz-ebon.vercel.app/studio';
  }

  // Development URL
  const studioUrl = 'http://localhost:3000/studio';

  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 Sanity Client Studio URL:', studioUrl);
  }

  return studioUrl;
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_VIEWER_TOKEN,
  useCdn: true,
  stega: {
    studioUrl: getStudioUrl(),
  },
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_VIEWER_TOKEN,
  useCdn: false,
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_VIEWER_TOKEN,
  useCdn: false,
})

// Debug logging for write client
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Sanity Write Client Config:', {
    projectId,
    dataset,
    apiVersion,
    hasWriteToken: !!process.env.SANITY_VIEWER_TOKEN,
    tokenLength: process.env.SANITY_VIEWER_TOKEN?.length || 0
  })
}

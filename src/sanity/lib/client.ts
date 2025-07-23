import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

function getStudioUrl(): string {
  // Check if we're on Vercel
  const isVercel = process.env.VERCEL || process.env.VERCEL_URL;

  if (isVercel) {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}/studio`;
    }
    return 'https://ozz.vercel.app/studio';
  }

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

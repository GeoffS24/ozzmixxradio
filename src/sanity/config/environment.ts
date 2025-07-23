
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

export const previewOrigin = process.env.NEXT_PUBLIC_SITE_URL ;

console.log("previewOrigin",previewOrigin)

// Debug logging (only in development)
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Sanity Preview Origin:', previewOrigin);
  console.log('🔧 Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_URL: process.env.VERCEL_URL,
    SANITY_STUDIO_PREVIEW_ORIGIN: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
  });
}

export const studioConfig = {
  previewOrigin,
  isDevelopment,
  isProduction,
};

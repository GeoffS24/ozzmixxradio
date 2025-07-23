import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OZZ Dance Radio - Your Favorite Dance Music Station',
    short_name: 'OZZ Radio',
    description: 'Listen to the best dance, electronic, and house music 24/7. Join OZZ Dance Radio for non-stop beats and the latest hits.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ff6b35',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['music', 'entertainment', 'news'],
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-256x256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Listen Live',
        short_name: 'Live',
        description: 'Start listening to live radio',
        url: '/#listen',
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
      },
      {
        name: 'News & Blog',
        short_name: 'News',
        description: 'Read latest music news',
        url: '/news',
        icons: [{ src: '/icon-192x192.png', sizes: '192x192' }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  }
}

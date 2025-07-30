import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OZZ Dance Radio - Your Favorite Dance Music Station',
    short_name: 'OZZ Radio',
    description: 'Listen to the best dance, electronic, and house music 24/7. Join OZZ Dance Radio for non-stop beats and the latest hits.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['music', 'entertainment', 'news'],
    shortcuts: [
      {
        name: 'Listen Live',
        short_name: 'Live',
        description: 'Start listening to live radio',
        url: '/#listen',
        icons: [{ src: '/logo.jpg', sizes: '192x192' }],
      },
      {
        name: 'News & Blog',
        short_name: 'News',
        description: 'Read latest music news',
        url: '/news',
        icons: [{ src: '/logo.jpg', sizes: '192x192' }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  }
}

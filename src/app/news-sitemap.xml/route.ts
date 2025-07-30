import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY } from '@/sanity/lib/queries/homeQueries'
import type { BlogPost } from '@/types/sanity'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ozzmixxradio.com'

  // Fetch recent blog posts (last 2 days for news sitemap)
  const postsData = await sanityFetch({
    query: POSTS_QUERY,
    params: { limit: 1000 },
  })

  const posts = postsData.data as BlogPost[] | null

  // Filter posts from last 2 days
  const twoDaysAgo = new Date()
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)

  const recentPosts = (posts || []).filter(post => {
    const publishDate = new Date(post.publishedAt || post._createdAt)
    return publishDate >= twoDaysAgo
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentPosts.map(post => `  <url>
    <loc>${baseUrl}/news/${post.slug?.current}</loc>
    <news:news>
      <news:publication>
        <news:name>OZZ Dance Radio</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.publishedAt || post._createdAt).toISOString()}</news:publication_date>
      <news:title><![CDATA[${post.title}]]></news:title>
      <news:keywords><![CDATA[${post.categories?.map(cat => cat.title).join(', ') || 'dance music, electronic music, radio'}]]></news:keywords>
    </news:news>
    <lastmod>${new Date(post._updatedAt || post.publishedAt || post._createdAt).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}

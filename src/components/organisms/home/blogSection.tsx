import Link from 'next/link'
import { SectionHeader } from '@/components/atoms/ui/SectionHeader'
import { BlogCard } from '@/components/molecules/cards/BlogCard'
import { Button } from '@/components/atoms/ui/Button'
import { urlFor } from '@/sanity/lib/image'
import type { BlogSectionData, BlogPost } from '@/types/sanity'

interface BlogSectionProps {
  data?: BlogSectionData
  posts?: BlogPost[]
}

export function BlogSection({ data, posts = [] }: BlogSectionProps) {
  // Default values
  const sectionData = {
    enabled: data?.enabled ?? true,
    badge: data?.badge ?? 'Blog',
    title: data?.title ?? 'Latest Music Industry Insights',
    description: data?.description ?? 'Stay updated with the latest in music and radio.',
    postsToShow: data?.postsToShow ?? 3,
  }

  // Don't render if disabled
  if (!sectionData.enabled) {
    return null
  }

  // Helper function to calculate reading time
  const calculateReadingTime = (body: any[]) => {
    if (!body || !Array.isArray(body)) return '5 min read'

    const wordCount = body.reduce((count, block) => {
      if (block._type === 'block' && block.children) {
        const blockText = block.children
          .filter((child: any) => child._type === 'span')
          .map((child: any) => child.text)
          .join(' ')
        return count + blockText.split(' ').length
      }
      return count
    }, 0)

    const readingTime = Math.ceil(wordCount / 200) // Average reading speed
    return `${readingTime} min read`
  }

  // Transform Sanity posts to BlogCard format
  const blogPosts = posts
    .slice(0, sectionData.postsToShow)
    .map((post) => {
      const imageUrl = post.mainImage?.asset?._ref
        ? urlFor(post.mainImage).width(400).height(300).url()
        : 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg'

      const primaryCategory = post.categories?.[0]?.title || 'News'
      const readTime = calculateReadingTime(post.body || [])

      // Create excerpt from body
      const excerpt = post.body?.find((block: any) => block._type === 'block')?.children
        ?.filter((child: any) => child._type === 'span')
        ?.map((child: any) => child.text)
        ?.join(' ')
        ?.substring(0, 150) + '...' || 'Read more about this post.'

      return {
        id: post._id,
        slug: post.slug?.current,
        image: imageUrl,
        tag: primaryCategory,
        readTime,
        title: post.title || 'Untitled Post',
        description: excerpt,
      }
    })

  return (
    <section className="flex py-16 lg:py-16 px-5 flex-col items-center gap-12 lg:gap-20 bg-white">
      <div className="flex container mx-auto flex-col items-center gap-12 lg:gap-20 w-full">
        <SectionHeader
          badge={sectionData.badge}
          title={sectionData.title}
          description={sectionData.description}
          alignment="center"
        />

        {/* Content */}
        <div className="flex flex-col items-start gap-16 lg:gap-16 w-full">
          {/* Blog Posts */}
          {blogPosts.length > 0 ? (
            <div className="flex lg:flex-row flex-col items-start gap-8 w-full">
              {blogPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="flex-1 hover:scale-105 transition-transform duration-200"
                >
                  <BlogCard
                    image={post.image}
                    tag={post.tag}
                    readTime={post.readTime}
                    title={post.title}
                    description={post.description}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center w-full">
              <p className="text-muted-foreground">No blog posts available at the moment.</p>
            </div>
          )}

          {/* View All Button */}
          {blogPosts.length > 0 && (
            <div className="flex flex-col items-start gap-4">
              <Link href="/news">
                <Button variant="outline" size="md">
                  View all
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

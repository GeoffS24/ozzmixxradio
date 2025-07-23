import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowLeft, Tag } from 'lucide-react'
import { PortableText } from '@/components/molecules/content/PortableText'
import { BlogCard } from '@/components/molecules/cards/BlogCard'
import { Button } from '@/components/atoms/ui/Button'
import { Breadcrumb } from '@/components/molecules/navigation/Breadcrumb'
import { urlFor } from '@/sanity/lib/image'
import type { BlogPost } from '@/types/sanity'

interface NewsDetailProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export function NewsDetail({ post, relatedPosts }: NewsDetailProps) {
  // Helper function to calculate reading time
  const calculateReadingTime = (body: any[]) => {
    if (!body || !Array.isArray(body)) return 5
    
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
    
    return Math.ceil(wordCount / 200)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const readingTime = calculateReadingTime(post.body || [])
  const mainImageUrl = post.mainImage?.asset?._ref 
    ? urlFor(post.mainImage).width(1200).height(600).url()
    : null

  const transformedRelatedPosts = relatedPosts.slice(0, 3).map((relatedPost) => {
    const imageUrl = relatedPost.mainImage?.asset?._ref 
      ? urlFor(relatedPost.mainImage).width(400).height(300).url()
      : 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg'

    const primaryCategory = relatedPost.categories?.[0]?.title || 'News'
    const relatedReadTime = calculateReadingTime(relatedPost.body || [])
    
    // Create excerpt from body
    const excerpt = relatedPost.body?.find((block: any) => block._type === 'block')?.children
      ?.filter((child: any) => child._type === 'span')
      ?.map((child: any) => child.text)
      ?.join(' ')
      ?.substring(0, 150) + '...' || 'Read more about this post.'

    return {
      id: relatedPost._id,
      slug: relatedPost.slug?.current,
      image: imageUrl,
      tag: primaryCategory,
      readTime: `${relatedReadTime} min read`,
      title: relatedPost.title || 'Untitled Post',
      description: excerpt,
    }
  })

  return (
    <article className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <nav className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-5 py-4">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'News', href: '/news' },
              { label: post.title || 'Article', isActive: true },
            ]}
          />
        </div>
      </nav>

      {/* Back Button */}
      <div className="container mx-auto px-5 py-6">
        <Link href="/news">
          <Button variant="ghost" size="sm" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <header className="container mx-auto px-5 mb-12">
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {post.categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/news?category=${category.slug?.current}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full hover:bg-primary/20 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground mb-6">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>By {post.author.name}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Featured Image */}
          {mainImageUrl && (
            <div className="relative w-full h-96 lg:h-[500px] rounded-xl overflow-hidden mb-12">
              <Image
                src={mainImageUrl}
                alt={post.mainImage?.alt || post.title || 'Article image'}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-5 mb-16">
        <div className="max-w-4xl mx-auto">
          <PortableText 
            value={post.body || []} 
            className="prose prose-lg lg:prose-xl max-w-none"
          />
        </div>
      </div>

      {/* Related Posts */}
      {transformedRelatedPosts.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-5">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {transformedRelatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id} 
                    href={`/news/${relatedPost.slug}`}
                    className="transition-transform duration-200"
                  >
                    <BlogCard
                      image={relatedPost.image}
                      tag={relatedPost.tag}
                      readTime={relatedPost.readTime}
                      title={relatedPost.title}
                      description={relatedPost.description}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  )
}

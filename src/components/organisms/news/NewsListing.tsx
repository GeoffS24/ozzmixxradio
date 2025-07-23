"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { SectionHeader } from '@/components/atoms/ui/SectionHeader'
import { FilterButton } from '@/components/atoms/ui/FilterButton'
import { BlogCard } from '@/components/molecules/cards/BlogCard'
import { SearchInput } from '@/components/molecules/forms/SearchInput'
import { Pagination } from '@/components/molecules/navigation/Pagination'
import { urlFor } from '@/sanity/lib/image'
import type { BlogPost, Category } from '@/types/sanity'

interface NewsListingProps {
  posts: BlogPost[]
  categories: Category[]
  currentPage: number
  postsPerPage: number
  searchQuery: string
  categoryFilter: string
}

export function NewsListing({
  posts,
  categories,
  currentPage,
  postsPerPage,
  searchQuery,
  categoryFilter,
}: NewsListingProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const [localCategoryFilter, setLocalCategoryFilter] = useState(categoryFilter)

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
    
    const readingTime = Math.ceil(wordCount / 200)
    return `${readingTime} min read`
  }

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = !localSearchQuery || 
        post.title?.toLowerCase().includes(localSearchQuery.toLowerCase())
      
      const matchesCategory = !localCategoryFilter || 
        post.categories?.some(cat => cat.slug?.current === localCategoryFilter)
      
      return matchesSearch && matchesCategory
    })
  }, [posts, localSearchQuery, localCategoryFilter])

  // Paginate filtered posts
  const totalPosts = filteredPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  // Transform posts for BlogCard
  const transformedPosts = paginatedPosts.map((post) => {
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
    <section className="flex py-16 lg:py-20 px-5 flex-col items-center gap-12 lg:gap-20 bg-white">
      <div className="flex container mx-auto flex-col items-center gap-12 lg:gap-16 w-full">
        <SectionHeader
          badge="News & Blog"
          title="Latest Music Industry Insights"
          description="Stay updated with the latest in music, radio, and the entertainment industry."
          alignment="center"
        />

        <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
          <SearchInput
            value={localSearchQuery}
            onChange={setLocalSearchQuery}
            placeholder="Search articles..."
            className="w-full max-w-md"
          />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <FilterButton
              isActive={!localCategoryFilter}
              onClick={() => setLocalCategoryFilter('')}
              isFirst={true}
            >
              All Categories
            </FilterButton>
            {categories.map((category) => (
              <FilterButton
                key={category._id}
                isActive={localCategoryFilter === category.slug?.current}
                onClick={() => setLocalCategoryFilter(category.slug?.current || '')}
              >
                {category.title}
              </FilterButton>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          <p className="text-sm text-muted-foreground">
            {totalPosts === 0 
              ? 'No articles found'
              : `Showing ${startIndex + 1}-${Math.min(startIndex + postsPerPage, totalPosts)} of ${totalPosts} articles`
            }
          </p>
        </div>

        {transformedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {transformedPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/news/${post.slug}`}
                className=" transition-transform duration-200"
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
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
            <p className="text-muted-foreground max-w-md">
              Try adjusting your search terms or category filters to find what you&apos;re looking for.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={localSearchQuery}
            categoryFilter={localCategoryFilter}
          />
        )}
      </div>
    </section>
  )
}

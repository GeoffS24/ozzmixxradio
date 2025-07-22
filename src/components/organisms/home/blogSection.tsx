import { SectionHeader } from '@/components/atoms/ui/SectionHeader'
import { BlogCard } from '@/components/molecules/cards/BlogCard'
import { Button } from '@/components/atoms/ui/Button'

export function BlogSection() {
  const blogPosts = [
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/248c95d39327c7e626c6ac649c9bd4000baedada?width=400',
      tag: 'News',
      readTime: '5 min read',
      title: 'Top 10 Songs of the Month',
      description: 'Discover the most popular tracks that are trending this month.'
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/248c95d39327c7e626c6ac649c9bd4000baedada?width=400',
      tag: 'Music',
      readTime: '5 min read',
      title: 'Interview with a Rising Star',
      description: 'An exclusive chat with the next big thing in music.'
    },
    {
      image: 'https://api.builder.io/api/v1/image/assets/TEMP/248c95d39327c7e626c6ac649c9bd4000baedada?width=400',
      tag: 'Artist',
      readTime: '5 min read',
      title: 'The Evolution of Radio',
      description: 'A look back at how radio has transformed over the years.'
    }
  ]

  return (
    <section className="flex py-16 lg:py-16 px-5 flex-col items-center gap-12 lg:gap-20 bg-white">
      <div className="flex container mx-auto flex-col items-center gap-12 lg:gap-20 w-full">
        <SectionHeader
          badge="Blog"
          title="Latest Music Industry Insights"
          description="Stay updated with the latest in music and radio."
          alignment="center"
        />

        {/* Content */}
        <div className="flex flex-col items-start gap-16 lg:gap-16 w-full">
          {/* Blog Posts */}
          <div className="flex lg:flex-row flex-col items-start gap-8 w-full">
            {blogPosts.map((post, index) => (
              <BlogCard
                key={index}
                image={post.image}
                tag={post.tag}
                readTime={post.readTime}
                title={post.title}
                description={post.description}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="flex flex-col items-start gap-4">
            <Button variant="outline" size="md">
              View all
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

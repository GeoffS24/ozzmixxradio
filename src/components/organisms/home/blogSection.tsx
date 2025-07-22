import { ChevronRight } from 'lucide-react'

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
      <div className="flex max-w-7xl flex-col items-center gap-12 lg:gap-20 w-full">
        {/* Section Header */}
        <div className="flex max-w-[768px] flex-col items-center gap-3 lg:gap-4 w-full">
          <div className="flex items-center w-full">
            <span className="text-base font-bold text-foreground text-center w-full">Blog</span>
          </div>
          <div className="flex flex-col items-center gap-5 lg:gap-6 w-full">
            <h2 className="text-4xl lg:text-5xl font-normal leading-[120%] tracking-[-0.36px] lg:tracking-[-0.48px] text-foreground text-center w-full">
              Latest Music Industry Insights
            </h2>
            <p className="text-sm lg:text-lg font-normal leading-[150%] text-foreground text-center w-full">
              Stay updated with the latest in music and radio.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-16 lg:gap-16 w-full">
          {/* Blog Posts */}
          <div className="flex lg:flex-row flex-col items-start gap-8 w-full">
            {blogPosts.map((post, index) => (
              <div key={index} className="flex flex-col items-start gap-6 flex-1">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-[221px] lg:h-auto w-full aspect-[335/221] lg:aspect-[1/0.67] object-cover"
                />
                <div className="flex flex-col items-start gap-4 w-full">
                  {/* Info */}
                  <div className="flex items-center gap-4">
                    <div className="flex px-2.5 py-1 items-start border border-border bg-muted">
                      <span className="text-xs lg:text-sm font-bold leading-[150%] text-foreground">
                        {post.tag}
                      </span>
                    </div>
                    <span className="text-xs lg:text-sm font-bold leading-[150%] text-foreground">
                      {post.readTime}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col items-start gap-2 w-full">
                    <h3 className="text-xl lg:text-2xl font-normal leading-[140%] tracking-[-0.2px] lg:tracking-[-0.24px] text-foreground w-full">
                      {post.title}
                    </h3>
                    <p className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
                      {post.description}
                    </p>
                  </div>
                </div>
                
                {/* Read More Link */}
                <button className="flex justify-center items-center gap-2 text-sm lg:text-base font-normal text-foreground hover:text-primary transition-colors">
                  Read more
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex flex-col items-start gap-4">
            <button className="flex px-6 py-2.5 justify-center items-center gap-2 border border-border text-sm lg:text-base font-medium text-foreground hover:bg-muted transition-colors">
              View all
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

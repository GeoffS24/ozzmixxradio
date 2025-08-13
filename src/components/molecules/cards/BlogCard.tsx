import Image from 'next/image'
import { ChevronRight } from 'lucide-react'

interface BlogCardProps {
  image: string
  tag: string
  readTime: string
  title: string
  description: string
}

export function BlogCard({ image, tag, readTime, title, description }: BlogCardProps) {
  return (
    <div className="flex flex-col items-start gap-6 flex-1">
      <div className="relative h-[221px] sm:h-[350px] lg:h-auto w-full lg:aspect-[1/0.67] overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="object-cover transition-transform duration-300 hover:scale-105 w-full"
        />
      </div>
      <div className="flex flex-col items-start gap-4 w-full">
        {/* Info */}
        <div className="flex items-center gap-4">
          <div className="flex px-2.5 py-1 items-start border border-border bg-muted">
            <span className="text-xs lg:text-sm font-bold leading-[150%] text-foreground">
              {tag}
            </span>
          </div>
          <span className="text-xs lg:text-sm font-bold leading-[150%] text-foreground">
            {readTime}
          </span>
        </div>
        
        {/* Content */}
        <div className="flex flex-col items-start gap-2 w-full">
          <h3 className="text-xl lg:text-2xl font-normal leading-[140%] tracking-[-0.2px] lg:tracking-[-0.24px] text-foreground w-full">
            {title}
          </h3>
          <p className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
            {description}
          </p>
        </div>
      </div>
      
      {/* Read More Link */}
      <button className="flex justify-center items-center gap-2 text-sm lg:text-base font-normal text-foreground hover:text-primary transition-colors">
        Read more
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}

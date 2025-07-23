import { PortableText as BasePortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

// Custom components for different block types
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null

      const imageUrl = urlFor(value).width(800).height(600).url()
      
      return (
        <figure className="my-8">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || 'Article image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            />
          </div>
          {value.alt && (
            <figcaption className="text-sm text-muted-foreground text-center mt-2">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    // Headings
    h1: ({ children }: any) => (
      <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground mt-12 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-foreground mt-10 mb-5">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl lg:text-3xl font-semibold leading-tight text-foreground mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl lg:text-2xl font-semibold leading-tight text-foreground mt-6 mb-3">
        {children}
      </h4>
    ),
    h5: ({ children }: any) => (
      <h5 className="text-lg lg:text-xl font-semibold leading-tight text-foreground mt-6 mb-3">
        {children}
      </h5>
    ),
    h6: ({ children }: any) => (
      <h6 className="text-base lg:text-lg font-semibold leading-tight text-foreground mt-4 mb-2">
        {children}
      </h6>
    ),
    
    // Paragraphs
    normal: ({ children }: any) => (
      <p className="text-base lg:text-lg leading-relaxed text-foreground mb-6">
        {children}
      </p>
    ),
    
    // Blockquotes
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 bg-muted/50 rounded-r-lg">
        <div className="text-lg lg:text-xl leading-relaxed text-foreground italic">
          {children}
        </div>
      </blockquote>
    ),
  },
  list: {
    // Bullet lists
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-base lg:text-lg leading-relaxed text-foreground ml-4">
        {children}
      </ul>
    ),
    // Numbered lists
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-base lg:text-lg leading-relaxed text-foreground ml-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    // Bullet list items
    bullet: ({ children }: any) => (
      <li className="mb-1">{children}</li>
    ),
    // Numbered list items
    number: ({ children }: any) => (
      <li className="mb-1">{children}</li>
    ),
  },
  marks: {
    // Strong/bold text
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    // Emphasis/italic text
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    // Code spans
    code: ({ children }: any) => (
      <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground border">
        {children}
      </code>
    ),
    // Links
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : undefined}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
  },
}

interface PortableTextProps {
  value: any[]
  className?: string
}

export function PortableText({ value, className }: PortableTextProps) {
  if (!value || !Array.isArray(value)) {
    return null
  }

  return (
    <div className={cn("prose prose-lg max-w-none", className)}>
      <BasePortableText
        value={value}
        components={portableTextComponents}
      />
    </div>
  )
}

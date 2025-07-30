import { X, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'
import type { SanityImage } from '@/types/sanity'

interface TeamMemberCardProps {
  name: string
  role: string
  bio?: string
  image?: SanityImage
  socialLinks?: {
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  className?: string
}

export function TeamMemberCard({
  name,
  role,
  bio,
  image,
  socialLinks,
  className,
}: TeamMemberCardProps) {
  const imageUrl = image?.asset?._ref
    ? urlFor(image).width(400).height(400).url()
    : 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg'

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300",
      className
    )}>
      {/* Profile Image */}
      <div className="aspect-square overflow-hidden relative">
        <Image
          src={imageUrl}
          alt={image?.alt || `${name} profile picture`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {name}
        </h3>
        <p className="text-primary font-medium mb-3">
          {role}
        </p>
        
        {bio && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {bio}
          </p>
        )}

        {/* Social Links */}
        {socialLinks && (socialLinks.twitter || socialLinks.instagram || socialLinks.linkedin) && (
          <div className="flex items-center gap-3">
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`${name}'s Twitter/X`}
              >
                <X size={20} />
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`${name}'s Instagram`}
              >
                <Instagram size={20} />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`${name}'s LinkedIn`}
              >
                <Linkedin size={20} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

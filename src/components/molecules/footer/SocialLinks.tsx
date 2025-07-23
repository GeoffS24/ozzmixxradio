import { Facebook, Instagram, Twitter, Linkedin, Youtube, Music } from 'lucide-react'
import { SocialIcon } from '@/components/atoms/ui/SocialIcon'
import type { SocialMedia } from '@/types/sanity'

interface SocialLinksProps {
  socialMedia?: SocialMedia | null
}

export function SocialLinks({ socialMedia }: SocialLinksProps) {
  // Define social platforms with their icons and fallback URLs
  const socialPlatforms = [
    {
      icon: Facebook,
      label: 'Facebook',
      url: socialMedia?.facebook,
      fallback: '#'
    },
    {
      icon: Instagram,
      label: 'Instagram',
      url: socialMedia?.instagram,
      fallback: '#'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      url: socialMedia?.twitter,
      fallback: '#'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      url: socialMedia?.linkedin,
      fallback: '#'
    },
    {
      icon: Youtube,
      label: 'YouTube',
      url: socialMedia?.youtube,
      fallback: '#'
    },
    {
      icon: Music,
      label: 'TikTok',
      url: socialMedia?.tiktok,
      fallback: '#'
    }
  ]

  return (
    <div className="flex items-center gap-4">
      {socialPlatforms
        .filter((platform) => platform.url && platform.url !== '#')
        .map((platform) => (
          <SocialIcon
            key={platform.label}
            Icon={platform.icon}
            href={platform.url!}
            label={platform.label}
          />
        ))}
    </div>
  )
}

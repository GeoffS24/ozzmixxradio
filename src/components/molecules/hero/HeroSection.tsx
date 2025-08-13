"use client"

import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import type { ScheduleHeroSectionData } from '@/types/sanity'

interface HeroSectionProps {
  heroData: ScheduleHeroSectionData
  className?: string
}

export function HeroSection({ heroData, className }: HeroSectionProps) {
  if (!heroData?.enabled) {
    return null
  }

  const getBackgroundStyles = () => {
    const { backgroundType, backgroundImage, backgroundColor, gradientColors } = heroData

    switch (backgroundType) {
      case 'image':
        if (backgroundImage?.asset) {
          const imageUrl = urlFor(backgroundImage).width(1920).height(800).url()
          return {
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }
        }
        // Fallback to gradient if no image
        return {}

      case 'color':
        if (backgroundColor?.hex) {
          const alpha = backgroundColor.alpha !== undefined ? backgroundColor.alpha : 1
          return {
            backgroundColor: `${backgroundColor.hex}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`,
          }
        }
        return {}

      case 'gradient':
      default:
        const fromColor = gradientColors?.from?.hex || '#3b82f6'
        const toColor = gradientColors?.to?.hex || '#1e40af'
        const direction = gradientColors?.direction || 'to-br'
        
        const fromAlpha = gradientColors?.from?.alpha !== undefined ? gradientColors.from.alpha : 1
        const toAlpha = gradientColors?.to?.alpha !== undefined ? gradientColors.to.alpha : 0.8
        
        const fromColorWithAlpha = `${fromColor}${Math.round(fromAlpha * 255).toString(16).padStart(2, '0')}`
        const toColorWithAlpha = `${toColor}${Math.round(toAlpha * 255).toString(16).padStart(2, '0')}`
        
        return {
          background: `linear-gradient(${direction.replace('to-', '')}, ${fromColorWithAlpha}, ${toColorWithAlpha})`,
        }
    }
  }

  const getTextColorClass = () => {
    switch (heroData.textColor) {
      case 'black':
        return 'text-black'
      case 'primary':
        return 'text-primary'
      case 'secondary':
        return 'text-secondary'
      case 'white':
      default:
        return 'text-white'
    }
  }

  const getMinHeightClass = () => {
    switch (heroData.minHeight) {
      case '30vh':
        return 'min-h-[30vh]'
      case '50vh':
        return 'min-h-[50vh]'
      case '60vh':
        return 'min-h-[60vh]'
      case '100vh':
        return 'min-h-screen'
      case '40vh':
      default:
        return 'min-h-[40vh]'
    }
  }

  return (
    <section
      className={cn(
        'relative flex items-center justify-center',
        getMinHeightClass(),
        className
      )}
      style={getBackgroundStyles()}
    >
      {/* Overlay for better text readability when using images */}
      {heroData.backgroundType === 'image' && (
        <div className="absolute inset-0 bg-black/30" />
      )}
      
      <div className={cn(
        'container mx-auto px-5 text-center relative z-10',
        getTextColorClass()
      )}>
        {heroData.title && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {heroData.title}
          </h1>
        )}
        {heroData.description && (
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {heroData.description}
          </p>
        )}
      </div>
    </section>
  )
}

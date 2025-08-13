"use client"

import { cn } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import type { NewsListingHeaderSectionData } from '@/types/sanity'

interface DynamicSectionHeaderProps {
  headerData: NewsListingHeaderSectionData
  className?: string
}

export function DynamicSectionHeader({ headerData, className }: DynamicSectionHeaderProps) {
  if (!headerData?.enabled) {
    return null
  }

  const getBackgroundStyles = () => {
    const { backgroundType, backgroundImage, backgroundColor, gradientColors } = headerData

    switch (backgroundType) {
      case 'image':
        if (backgroundImage?.asset) {
          const imageUrl = urlFor(backgroundImage).width(1920).height(600).url()
          return {
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }
        }
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
        const fromColor = gradientColors?.from?.hex || '#f8fafc'
        const toColor = gradientColors?.to?.hex || '#e2e8f0'
        const direction = gradientColors?.direction || 'to-br'
        
        const fromAlpha = gradientColors?.from?.alpha !== undefined ? gradientColors.from.alpha : 1
        const toAlpha = gradientColors?.to?.alpha !== undefined ? gradientColors.to.alpha : 1
        
        const fromColorWithAlpha = `${fromColor}${Math.round(fromAlpha * 255).toString(16).padStart(2, '0')}`
        const toColorWithAlpha = `${toColor}${Math.round(toAlpha * 255).toString(16).padStart(2, '0')}`
        
        return {
          background: `linear-gradient(${direction.replace('to-', '')}, ${fromColorWithAlpha}, ${toColorWithAlpha})`,
        }

      case 'default':
      default:
        return {}
    }
  }

  const getTextColorClass = () => {
    switch (headerData.textColor) {
      case 'white':
        return 'text-white'
      case 'black':
        return 'text-black'
      case 'primary':
        return 'text-primary'
      case 'secondary':
        return 'text-secondary'
      case 'default':
      default:
        return 'text-foreground'
    }
  }

  const getAlignmentClass = () => {
    switch (headerData.alignment) {
      case 'left':
        return 'text-left'
      case 'right':
        return 'text-right'
      case 'center':
      default:
        return 'text-center'
    }
  }

  const getSpacingClasses = () => {
    const { spacing } = headerData
    const paddingTop = spacing?.paddingTop || 'pt-16'
    const paddingBottom = spacing?.paddingBottom || 'pb-20'
    return `${paddingTop} ${paddingBottom}`
  }

  const isDefaultBackground = headerData.backgroundType === 'default' || !headerData.backgroundType

  return (
    <section
      className={cn(
        'flex py-16 lg:py-20 px-5 flex-col items-center gap-12 lg:gap-20',
        isDefaultBackground ? 'bg-white' : 'relative',
        getSpacingClasses(),
        className
      )}
      style={getBackgroundStyles()}
    >
      {/* Overlay for better text readability when using images */}
      {headerData.backgroundType === 'image' && (
        <div className="absolute inset-0 bg-black/20" />
      )}
      
      <div className={cn(
        'flex container mx-auto flex-col items-center gap-12 lg:gap-16 w-full relative z-10',
        getTextColorClass()
      )}>
        <div className={cn(
          'flex flex-col gap-4 max-w-4xl',
          getAlignmentClass()
        )}>
          {headerData.badge && (
            <div className={cn(
              'inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full border',
              headerData.textColor === 'white' 
                ? 'bg-white/10 border-white/20 text-white' 
                : 'bg-primary/10 border-primary/20 text-primary',
              headerData.alignment === 'center' ? 'mx-auto' : '',
              headerData.alignment === 'right' ? 'ml-auto' : ''
            )}>
              {headerData.badge}
            </div>
          )}
          
          {headerData.title && (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              {headerData.title}
            </h1>
          )}
          
          {headerData.description && (
            <p className="text-lg md:text-xl leading-relaxed opacity-90">
              {headerData.description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

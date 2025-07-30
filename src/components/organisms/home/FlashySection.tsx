"use client"

import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { Button } from '@/components/atoms/ui/Button'
import { StatsSection } from '@/components/molecules/sections/StatsSection'
import { urlFor } from '@/sanity/lib/image'
import { cn } from '@/lib/utils'

interface FlashySectionData {
  enabled?: boolean
  sectionId?: string
  style?: string
  backgroundType?: string
  backgroundImage?: any
  backgroundVideo?: string
  gradientColors?: {
    from?: { hex: string }
    to?: { hex: string }
    direction?: string
  }
  overlay?: {
    enabled?: boolean
    color?: { hex: string }
    opacity?: number
  }
  content?: {
    badge?: string
    title?: string
    subtitle?: string
    description?: any[]
    buttons?: Array<{
      text: string
      url: string
      style: string
    }>
  }
  animation?: {
    enabled?: boolean
    type?: string
    duration?: number
    delay?: number
  }
}

interface FlashySectionProps {
  data: FlashySectionData
  className?: string
}

export function FlashySection({ data, className }: FlashySectionProps) {
  if (!data?.enabled) return null

  const getBackgroundStyle = () => {
    const styles: any = {}

    switch (data.backgroundType) {
      case 'image':
        if (data.backgroundImage?.asset?._ref) {
          const imageUrl = urlFor(data.backgroundImage).width(1920).height(1080).url()
          styles.backgroundImage = `url(${imageUrl})`
          styles.backgroundSize = 'cover'
          styles.backgroundPosition = 'center'
          styles.backgroundRepeat = 'no-repeat'
        }
        break
      case 'video':
        // Video background will be handled separately
        break
      case 'gradient':
        if (data.gradientColors) {
          const from = data.gradientColors.from?.hex || '#ff6b35'
          const to = data.gradientColors.to?.hex || '#f7931e'
          const direction = data.gradientColors.direction || 'to-br'
          styles.background = `linear-gradient(${direction.replace('to-', '')}, ${from}, ${to})`
        }
        break
      case 'solid':
        styles.backgroundColor = data.gradientColors?.from?.hex || '#ff6b35'
        break
      default:
        styles.background = 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'
    }

    return styles
  }

  const getAnimationVariants = () => {
    if (!data.animation?.enabled) return {}

    const type = data.animation.type || 'fadeIn'
    const duration = (data.animation.duration || 1000) / 1000
    const delay = (data.animation.delay || 0) / 1000

    const variants = {
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      },
      slideUp: {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
      },
      slideDown: {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
      },
      slideLeft: {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
      },
      slideRight: {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
      },
      zoomIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
      },
      bounce: {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
      },
    }

    return {
      initial: variants[type]?.initial || variants.fadeIn.initial,
      animate: variants[type]?.animate || variants.fadeIn.animate,
      transition: { duration, delay, ease: "easeOut" as const },
    }
  }

  const getSectionClasses = () => {
    const baseClasses = 'relative overflow-hidden'
    
    switch (data.style) {
      case 'hero':
        return cn(baseClasses, 'min-h-screen flex items-center justify-center py-20')
      case 'feature':
        return cn(baseClasses, 'py-16 lg:py-20')
      case 'stats':
        return cn(baseClasses, 'py-12 lg:py-16')
      case 'cta':
        return cn(baseClasses, 'py-16 lg:py-20 text-center')
      case 'gallery':
        return cn(baseClasses, 'py-16 lg:py-20')
      case 'video':
        return cn(baseClasses, 'min-h-[60vh] flex items-center justify-center py-20')
      case 'parallax':
        return cn(baseClasses, 'min-h-[80vh] flex items-center justify-center py-20')
      case 'testimonials':
        return cn(baseClasses, 'py-16 lg:py-20')
      default:
        return cn(baseClasses, 'py-16 lg:py-20')
    }
  }

  return (
    <section
      id={data.sectionId}
      className={cn(getSectionClasses(), className)}
      style={getBackgroundStyle()}
    >
      {/* Background Video */}
      {data.backgroundType === 'video' && data.backgroundVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={data.backgroundVideo} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      {data.overlay?.enabled && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: data.overlay.color?.hex || '#000000',
            opacity: (data.overlay.opacity || 50) / 100,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-5">
        <motion.div
          {...getAnimationVariants()}
          className="max-w-4xl mx-auto text-center"
        >
          {data.content?.badge && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-6"
            >
              {data.content.badge}
            </motion.span>
          )}

          {data.content?.title && (
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            >
              {data.content.title}
            </motion.h2>
          )}

          {data.content?.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/90 mb-8"
            >
              {data.content.subtitle}
            </motion.p>
          )}

          {data.content?.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="prose prose-lg !prose-invert invert mx-auto mb-8"
            >
              <PortableText value={data.content.description} />
            </motion.div>
          )}

          {data.content?.buttons && data.content.buttons.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              {data.content.buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={'primary'}
                  size="lg"
                  onClick={() => window.open(button.url, '_blank')}
                >
                  {button.text}
                </Button>
              ))}
            </motion.div>
          )}

          {/* Stats Section for stats style */}
          {data.style === 'stats' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-12"
            >
              <StatsSection
                stats={[
                  { label: 'Hours of Music', value: 24, suffix: '/7' },
                  { label: 'Active Listeners', value: 5000, suffix: '+' },
                  { label: 'DJ Shows Weekly', value: 15, suffix: '+' },
                  { label: 'Years Broadcasting', value: 5, suffix: '+' },
                ]}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Music, Play } from 'lucide-react'
import { useGlobalRadioPlayer } from '@/contexts/RadioPlayerContext'
import { cn } from '@/lib/utils'

interface ShowPlayerButtonProps {
  className?: string
  variant?: 'floating' | 'inline'
  size?: 'sm' | 'md' | 'lg'
}

export function ShowPlayerButton({
  className,
  variant = 'floating',
  size = 'md'
}: ShowPlayerButtonProps) {
  const pathname = usePathname()
  const { showPlayer, setShowPlayer, isPlaying, togglePlay } = useGlobalRadioPlayer()

  // Don't show on home page or if player is already visible
  const isHomePage = pathname === '/'
  if (isHomePage || showPlayer) return null

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-14 h-14 text-lg'
  }

  const variantClasses = {
    floating: 'fixed bottom-4 right-4 z-40 shadow-lg',
    inline: 'relative'
  }

  return (
    <motion.button
      onClick={() => {
        setShowPlayer(true)
        if (!isPlaying) {
          togglePlay?.()
        }
      }}
      className={cn(
        "rounded-full bg-primary text-primary-foreground",
        "flex items-center justify-center",
        "hover:bg-primary/90 transition-all duration-200",
        "border-2 border-background shadow-xl",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{
        scale: 0,
        opacity: 0,
        y: 20,
        rotate: -180
      }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
        rotate: 0
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 400,
        delay: 1.2,
        duration: 0.6
      }}
      whileHover={{
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.2 }
      }}
      whileTap={{
        scale: 0.9,
        rotate: -5
      }}
    >
      {isPlaying ? (
        <Music className="w-1/2 h-1/2" />
      ) : (
        <Play className="w-1/2 h-1/2 ml-0.5" />
      )}
    </motion.button>
  )
}

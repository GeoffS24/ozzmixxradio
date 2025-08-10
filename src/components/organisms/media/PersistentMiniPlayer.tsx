"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, VolumeX, Volume1, Volume2, ChevronUp, ChevronDown, X, Users } from 'lucide-react'
import { useGlobalRadioPlayer } from '@/contexts/RadioPlayerContext'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function PersistentMiniPlayer() {
  const pathname = usePathname()
  const {
    isPlaying,
    isLoading,
    volume,
    currentTrack,
    error,
    isConnected,
    nowPlaying,
    listeners,
    isLive,
    streamerName,
    togglePlay,
    volumeUp,
    volumeDown,
    isMinimized,
    setIsMinimized,
    showPlayer,
    setShowPlayer,
  } = useGlobalRadioPlayer()

  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const [shouldShowPlayer, setShouldShowPlayer] = useState(false)
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false)

  // Check if we should show the player based on current route
  const isHomePage = pathname === '/'

  useEffect(() => {
    // Only show player on non-home pages and when showPlayer is true
    const shouldShow = !isHomePage && showPlayer
    setShouldShowPlayer(shouldShow)

    // Trigger animation when player should show for the first time
    if (shouldShow && !hasAnimatedIn) {
      setHasAnimatedIn(true)
    }
  }, [isHomePage, showPlayer, hasAnimatedIn])

  // Don't render if we shouldn't show the player
  if (!shouldShowPlayer) return null

  const getVolumeIcon = () => {
    if (volume === 0) return VolumeX
    if ((volume || 0) < 50) return Volume1
    return Volume2
  }

  const VolumeIcon = getVolumeIcon()

  // Use new API data if available, fallback to legacy
  const displayTitle = nowPlaying?.song?.title || currentTrack?.title || 'OZZ Dance Radio'
  const displayArtist = nowPlaying?.song?.artist || currentTrack?.artist || 'Live Stream'
  const displayArt = nowPlaying?.song?.art || currentTrack?.art || 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg'
  const displayListeners = listeners?.current || listeners?.total || 
    (typeof currentTrack?.listeners === 'number' ? currentTrack.listeners : 0) || 0

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="persistent-player"
        initial={{
          y: 120,
          opacity: 0,
          scale: 0.95
        }}
        animate={{
          y: isMinimized ? 0 : 0,
          opacity: 1,
          scale: 1,
          transition: {
            type: "spring",
            damping: 30,
            stiffness: 300,
            mass: 0.8,
            delay: hasAnimatedIn ? 0 : 0.3
          }
        }}
        exit={{
          y: 120,
          opacity: 0,
          scale: 0.95,
          transition: {
            duration: 0.3,
            ease: "easeInOut"
          }
        }}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border",
          "shadow-2xl shadow-primary/5",
          "transform transition-transform duration-300 ease-in-out",
          isMinimized && "translate-y-[calc(100%-60px)]"
        )}
        style={{
          boxShadow: isPlaying
            ? "0 -4px 20px rgba(var(--primary), 0.1), 0 -1px 3px rgba(0, 0, 0, 0.1)"
            : "0 -4px 20px rgba(0, 0, 0, 0.1)"
        }}
      >
        {/* Minimized Header Bar */}
        <motion.div
          className="flex items-center justify-between p-3 cursor-pointer"
          onClick={() => setIsMinimized(!isMinimized)}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.4, duration: 0.3 }
          }}
          whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            className="flex items-center gap-3 flex-1 min-w-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.5, duration: 0.3 }
            }}
          >
            {/* Album Art */}
            <motion.div
              className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Image
                src={displayArt}
                alt={`${displayTitle} artwork`}
                width={40}
                height={40}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg'
                }}
              />
              {isPlaying && (
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-lg"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </motion.div>

            {/* Track Info */}
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.6, duration: 0.3 }
              }}
            >
              <motion.h4
                className="font-semibold text-sm text-foreground truncate"
                key={displayTitle}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {displayTitle}
              </motion.h4>
              <motion.p
                className="text-xs text-muted-foreground truncate"
                key={displayArtist}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {displayArtist}
              </motion.p>
            </motion.div>

            {/* Live Indicator */}
            {isLive && (
              <motion.div
                className="flex items-center gap-1 px-2 py-1 bg-red-500/10 rounded-full border border-red-500/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.7, duration: 0.3 }
                }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-xs text-red-600 font-medium">LIVE</span>
              </motion.div>
            )}
          </motion.div>

          {/* Quick Controls */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.8, duration: 0.3 }
            }}
          >
            {/* Play/Pause Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                togglePlay?.()
              }}
              disabled={isLoading || !togglePlay}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                "bg-primary text-primary-foreground hover:bg-primary/90",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isPlaying ? "Pause radio" : "Play radio"}
            >
              {isLoading ? (
                <motion.div 
                  className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 ml-0.5" />
              )}
            </motion.button>

            {/* Expand/Collapse Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setIsMinimized(!isMinimized)
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMinimized ? "Expand player" : "Minimize player"}
            >
              {isMinimized ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </motion.button>

            {/* Close Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                setShowPlayer(false)
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close player"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Expanded Content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-4">
                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => volumeDown?.()}
                    disabled={(volume || 0) === 0 || !volumeDown}
                    className="p-2 rounded-full hover:bg-muted transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Decrease volume"
                  >
                    <Volume1 className="w-4 h-4 text-muted-foreground" />
                  </motion.button>

                  <div className="flex-1 relative">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${volume || 0}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  <motion.button
                    onClick={() => volumeUp?.()}
                    disabled={(volume || 0) === 100 || !volumeUp}
                    className="p-2 rounded-full hover:bg-muted transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Increase volume"
                  >
                    <VolumeIcon className="w-4 h-4 text-muted-foreground" />
                  </motion.button>

                  <span className="text-sm font-medium text-primary w-8 text-right">
                    {volume || 0}
                  </span>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  {/* Connection Status */}
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      isConnected ? "bg-green-500" : "bg-red-500"
                    )} />
                    <span>{isConnected ? "Connected" : "Disconnected"}</span>
                  </div>
                  {/* Live Streamer */}
                  {isLive && streamerName && (
                    <div className="flex items-center gap-1">
                      <span>with {streamerName}</span>
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-xs text-destructive text-center">{error}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}

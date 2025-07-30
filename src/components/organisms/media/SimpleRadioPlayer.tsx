"use client"

import { motion } from 'framer-motion'
import { Play, Pause, VolumeX, Volume1, Volume2, Users, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface SimpleRadioPlayerProps {
  radioPlayerData: {
    isPlaying?: boolean
    isLoading?: boolean
    volume?: number
    currentTrack?: any
    error?: string | null
    isConnected?: boolean
    nowPlaying?: any
    listeners?: any
    isLive?: boolean
    streamerName?: string
    togglePlay?: () => void
    volumeUp?: () => void
    volumeDown?: () => void
  }
  fallbackImage?: string
  className?: string
  showListenerCount?: boolean
}

export function SimpleRadioPlayer({
  radioPlayerData,
  fallbackImage = 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg',
  className,
  showListenerCount = false,
}: SimpleRadioPlayerProps) {
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
  } = radioPlayerData

  // Debug logging
  console.log('SimpleRadioPlayer state:', {
    isPlaying,
    isLoading,
    volume,
    hasTogglePlay: !!togglePlay,
    hasVolumeControls: !!(volumeUp && volumeDown)
  })

  const getVolumeIcon = () => {
    if (volume === 0) return VolumeX
    if ((volume || 0) < 50) return Volume1
    return Volume2
  }

  const VolumeIcon = getVolumeIcon()

  // Use new API data if available, fallback to legacy
  const displayTitle = nowPlaying?.song?.title || currentTrack?.title || 'Unknown Track'
  const displayArtist = nowPlaying?.song?.artist || currentTrack?.artist || 'Unknown Artist'
  const displayArt = nowPlaying?.song?.art || currentTrack?.art || fallbackImage
  const displayListeners = listeners?.current || listeners?.total || 
    (typeof currentTrack?.listeners === 'number' ? currentTrack.listeners : 0) || 0

  return (
    <div className={cn("w-full max-w-md mx-auto bg-card border rounded-xl shadow-lg overflow-hidden", className)}>
      <div className="p-6">
        <div className="space-y-6">
          {/* Album Art */}
          <div className="relative group">
            <motion.div
              className="relative overflow-hidden rounded-xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 blur-xl scale-110 opacity-50" />
              
              {/* Main album art */}
              <div className="relative">
                <Image
                  src={displayArt}
                  alt={`${displayTitle} artwork`}
                  width={400}
                  height={400}
                  className={cn(
                    "w-full aspect-square object-cover rounded-xl transition-all duration-500",
                    isPlaying && "shadow-lg shadow-primary/25"
                  )}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = fallbackImage
                  }}
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl" />
                
                {/* Playing animation overlay */}
                {isPlaying && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </div>
            </motion.div>
            
            {/* Live Indicator */}
            {isLive && (
              <motion.div 
                className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <motion.div 
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                LIVE
              </motion.div>
            )}

            {/* Connection Status */}
            <motion.div 
              className={cn(
                "absolute top-3 right-3 w-3 h-3 rounded-full shadow-lg",
                isConnected ? "bg-green-500" : "bg-red-500"
              )}
              animate={{
                scale: isConnected ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isConnected ? Infinity : 0,
              }}
            />
          </div>

          {/* Track Info */}
          <motion.div 
            className="text-center space-y-3"
            key={`${displayTitle}-${displayArtist}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-1">
              <motion.h3 
                className="font-bold text-xl text-foreground leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  {displayTitle}
                </span>
              </motion.h3>
              <motion.p 
                className="text-muted-foreground font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {displayArtist}
              </motion.p>
            </div>
            
            {/* Live Streamer Info */}
            {isLive && streamerName && (
              <motion.div
                className="flex items-center justify-center gap-2 px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-red-600 font-medium">
                  Live with {streamerName}
                </span>
              </motion.div>
            )}

            {/* Listener Count */}
            {showListenerCount && displayListeners > 0 && (
              <motion.div 
                className="flex items-center justify-center gap-2 px-3 py-1 bg-primary/10 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">
                  {displayListeners.toLocaleString()} listening
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <motion.button
              onClick={() => {
                console.log('Volume down clicked')
                volumeDown?.()
              }}
              className="p-3 rounded-full hover:bg-muted transition-all duration-200 disabled:opacity-50"
              disabled={(volume || 0) === 0 || !volumeDown}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Volume1 className="w-5 h-5 text-muted-foreground" />
            </motion.button>

            <motion.button
              onClick={() => {
                console.log('Toggle play clicked, isPlaying:', isPlaying)
                togglePlay?.()
              }}
              disabled={isLoading || !togglePlay}
              className={cn(
                "relative p-5 rounded-full transition-all duration-300",
                "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
                "hover:from-primary/90 hover:to-primary/70",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "shadow-xl hover:shadow-2xl",
                "border-2 border-primary/20"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <motion.div 
                  className="w-7 h-7 border-2 border-current border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : isPlaying ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.3 }}
                >
                  <Pause className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.3 }}
                >
                  <Play className="w-7 h-7 ml-0.5" />
                </motion.div>
              )}
            </motion.button>

            <motion.button
              onClick={() => {
                console.log('Volume up clicked')
                volumeUp?.()
              }}
              className="p-3 rounded-full hover:bg-muted transition-all duration-200 disabled:opacity-50"
              disabled={(volume || 0) === 100 || !volumeUp}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <VolumeIcon className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          </div>

          {/* Volume Indicator */}
          <motion.div 
            className="flex items-center gap-3 px-4 py-3 bg-muted/30 rounded-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <VolumeIcon className="w-5 h-5 text-primary" />
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
            <motion.span 
              className="text-sm font-medium text-primary w-8 text-right"
              key={volume}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {volume || 0}
            </motion.span>
          </motion.div>

          {/* Error Message */}
          {error && (
            <div className="w-full p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive text-center">{error}</p>
            </div>
          )}

          {/* Audio Visualization */}
          {isPlaying && (
            <motion.div 
              className="flex items-center justify-center gap-1 h-12 px-6 py-3 bg-primary/5 rounded-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(7)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-primary to-primary/60 rounded-full"
                  animate={{
                    height: [
                      `${10 + Math.random() * 15}px`,
                      `${20 + Math.random() * 25}px`,
                      `${10 + Math.random() * 15}px`,
                    ],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

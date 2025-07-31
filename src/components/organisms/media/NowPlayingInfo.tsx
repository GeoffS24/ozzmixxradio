"use client"

import { motion } from 'framer-motion'
import { Clock, Music, SkipForward, History, Users, Radio } from 'lucide-react'
import { SongHistoryList } from '@/components/molecules/media/SongHistoryList'
import { NextPlayingCard } from '@/components/molecules/media/NextPlayingCard'
import Image from 'next/image'

interface NowPlayingInfoProps {
  radioPlayerData: {
    currentTrack?: any
    nowPlaying?: any
    playingNext?: any
    songHistory?: any[]
    listeners?: any
    isLive?: boolean
    streamerName?: string
  }
  fallbackImage?: string
}

export function NowPlayingInfo({
  radioPlayerData,
  fallbackImage = 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg',
}: NowPlayingInfoProps) {
  const {
    currentTrack,
    nowPlaying,
    playingNext,
    songHistory,
    listeners,
    isLive,
    streamerName,
    
  } = radioPlayerData

  // Use new API data if available, fallback to legacy
  const displayTitle = nowPlaying?.song?.title || currentTrack?.title || 'Unknown Track'
  const displayArtist = nowPlaying?.song?.artist || currentTrack?.artist || 'Unknown Artist'
  const displayArt = nowPlaying?.song?.art || currentTrack?.art || fallbackImage
  const displayListeners = listeners?.current || listeners?.total || 
    (typeof currentTrack?.listeners === 'number' ? currentTrack.listeners : 0) || 0

  return (
    <div className="w-full space-y-4">
      {/* Top Row - Now Playing & Next Playing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Now Playing Section */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <Music className="w-3 h-3 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Now Playing</h3>
            {isLive && (
              <div className="flex items-center gap-1 px-2 py-0.5 bg-red-500/10 rounded-full border border-red-500/20">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs text-red-600 font-medium">LIVE</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            {/* Album Art */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={displayArt}
                alt={`${displayTitle} artwork`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = fallbackImage
                }}
              />
            </div>

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-foreground truncate">{displayTitle}</h4>
              <p className="text-xs text-muted-foreground truncate">{displayArtist}</p>

              {/* Live Streamer Info */}
              {isLive && streamerName && (
                <p className="text-xs text-primary font-medium mt-1">
                  with {streamerName}
                </p>
              )}

              {/* Progress Info */}
              {nowPlaying?.duration && nowPlaying?.elapsed && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Clock className="w-3 h-3" />
                  <span>
                    {Math.floor(nowPlaying.elapsed / 60)}:{(nowPlaying.elapsed % 60).toString().padStart(2, '0')} / {Math.floor(nowPlaying.duration / 60)}:{(nowPlaying.duration % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}

           
            </div>
          </div>
        </motion.div>

        {/* Next Playing Section */}
        <motion.div
          className="bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <SkipForward className="w-3 h-3 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Coming Up Next</h3>
          </div>

          <div className="min-h-[64px]">
            <NextPlayingCard playingNext={playingNext} />
          </div>
        </motion.div>
      </div>

      {/* Bottom Row - Song History & Station Info */}
      <div className="grid grid-cols-1 gap-4 w-full">
        {/* Song History Section - Takes 2/3 width */}
        <motion.div
          className="lg:col-span-2 bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <History className="w-3 h-3 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">Recently Played</h3>
          </div>

          <div className="max-h-64 overflow-y-auto">
            <SongHistoryList songHistory={songHistory || []} maxItems={8} />
          </div>
        </motion.div>

       
      </div>
    </div>
  )
}

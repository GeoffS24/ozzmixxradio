"use client"

import { Clock, Music, PlayCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface Song {
  id: string
  text: string
  title: string
  artist: string
  album: string
  art: string
  genre: string
}

interface PlayingNext {
  cued_at: number
  played_at: number
  duration: number
  playlist: string
  is_request: boolean
  song: Song
}

interface NextPlayingCardProps {
  playingNext: PlayingNext | null
  className?: string
  showCountdown?: boolean
}

export function NextPlayingCard({ 
  playingNext, 
  className,
  showCountdown = true
}: NextPlayingCardProps) {
  if (!playingNext) {
    return (
      <div className={cn("text-center py-4 text-muted-foreground", className)}>
        <PlayCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No upcoming track</p>
      </div>
    )
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = (seconds % 60).toFixed(2);
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.padStart(5, '0')}`;
    } else {
      return `${minutes}:${remainingSeconds.padStart(5, '0')}`;
    }
  }

  const getTimeUntilPlay = () => {
    const now = Math.floor(Date.now() / 1000)
    const timeUntil = playingNext.played_at - now
    
    if (timeUntil <= 0) return 'Playing now'
    
    const minutes = Math.floor(timeUntil / 60)
    const seconds = timeUntil % 60
    
    if (minutes > 0) {
      return `in ${minutes}m ${seconds}s`
    } else {
      return `in ${seconds}s`
    }
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-4">
        <PlayCircle className="w-4 h-4" />
        Coming Up Next
      </div>
      
      <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <div className="flex-shrink-0">
            {playingNext.song.art ? (
              <Image
                width={256}
                height={256}
                src={playingNext.song.art}
                alt={`${playingNext.song.title} artwork`}
                className="w-16 h-16 rounded-lg object-cover shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.nextElementSibling?.classList.remove('hidden')
                }}
              />
            ) : null}
            <div className={cn(
              "w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center shadow-md",
              playingNext.song.art && "hidden"
            )}>
              <Music className="w-8 h-8 text-primary/60" />
            </div>
          </div>

          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-foreground mb-1 truncate">
              {playingNext.song.title || 'Unknown Title'}
            </div>
            <div className="text-sm text-muted-foreground mb-2 truncate">
              {playingNext.song.artist || 'Unknown Artist'}
            </div>
            
            {playingNext.song.album && (
              <div className="text-xs text-muted-foreground/80 truncate mb-2">
                {playingNext.song.album}
              </div>
            )}

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {showCountdown && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {getTimeUntilPlay()}
                </div>
              )}
              
              <div>
                Duration: {formatDuration(playingNext.duration)}
              </div>
              
              {playingNext.is_request && (
                <div className="text-primary font-medium">
                  Requested
                </div>
              )}
            </div>

            {playingNext.playlist && (
              <div className="text-xs text-muted-foreground/70 mt-1 truncate">
                From: {playingNext.playlist}
              </div>
            )}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-3 pt-3 border-t border-primary/10">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Scheduled for {formatTime(playingNext.played_at)}</span>
            {playingNext.song.genre && (
              <span className="px-2 py-1 bg-primary/10 rounded-full">
                {playingNext.song.genre}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

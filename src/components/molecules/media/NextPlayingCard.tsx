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
      <div className={cn("text-center py-2 text-muted-foreground", className)}>
        <PlayCircle className="w-6 h-6 mx-auto mb-1 opacity-50" />
        <p className="text-xs">No upcoming track</p>
      </div>
    )
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
    <div className={cn("", className)}>
      <div className="flex items-center gap-2">
        {/* Album Art */}
        <div className="flex-shrink-0">
          {playingNext.song.art ? (
            <Image
              width={48}
              height={48}
              src={playingNext.song.art}
              alt={`${playingNext.song.title} artwork`}
              className="w-12 h-12 rounded object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <div className={cn(
            "w-12 h-12 rounded bg-primary/10 flex items-center justify-center",
            playingNext.song.art && "hidden"
          )}>
            <Music className="w-6 h-6 text-primary/60" />
          </div>
        </div>

        {/* Song Info */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-foreground truncate">
            {playingNext.song.title || 'Unknown Title'}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {playingNext.song.artist || 'Unknown Artist'}
          </div>

          {showCountdown && (
            <div className="flex items-center gap-1 text-xs text-primary mt-1">
              <Clock className="w-3 h-3" />
              {getTimeUntilPlay()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { Clock, Music } from 'lucide-react'
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

interface SongHistoryItem {
  sh_id: number
  played_at: number
  duration: number
  playlist: string
  is_request: boolean
  song: Song
  streamer: string
}

interface SongHistoryListProps {
  songHistory: SongHistoryItem[]
  className?: string
  maxItems?: number
  showPlaylist?: boolean
  showDuration?: boolean
}

export function SongHistoryList({ 
  songHistory, 
  className,
  maxItems = 5,
  showPlaylist = false,
  showDuration = true
}: SongHistoryListProps) {
  if (!songHistory || songHistory.length === 0) {
    return (
      <div className={cn("text-center py-4 text-muted-foreground", className)}>
        <Music className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No recent tracks</p>
      </div>
    )
  }

  const displayItems = songHistory.slice(0, maxItems)

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-4">
        <Clock className="w-4 h-4" />
        Recently Played
      </div>
      
      <div className="space-y-2">
        {displayItems.map((item, index) => (
          <div
            key={item.sh_id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-colors",
              "bg-muted/50 hover:bg-muted",
              index === 0 && "ring-1 ring-primary/20"
            )}
          >
            {/* Album Art */}
            <div className="flex-shrink-0">
              {item.song.art ? (
                <Image
                  width={256}
                  height={256}
                  src={item.song.art}
                  alt={`${item.song.title} artwork`}
                  className="w-10 h-10 rounded object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.nextElementSibling?.classList.remove('hidden')
                  }}
                />
              ) : null}
              <div className={cn(
                "w-10 h-10 rounded bg-primary/10 flex items-center justify-center",
                item.song.art && "hidden"
              )}>
                <Music className="w-5 h-5 text-primary/60" />
              </div>
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-foreground truncate">
                {item.song.title || 'Unknown Title'}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {item.song.artist || 'Unknown Artist'}
              </div>
              {showPlaylist && item.playlist && (
                <div className="text-xs text-muted-foreground/80 truncate">
                  {item.playlist}
                </div>
              )}
            </div>

            {/* Time & Duration */}
            <div className="flex-shrink-0 text-right">
              <div className="text-xs text-muted-foreground">
                {formatTime(item.played_at)}
              </div>
              {showDuration && (
                <div className="text-xs text-muted-foreground/80">
                  {formatDuration(item.duration)}
                </div>
              )}
              {item.is_request && (
                <div className="text-xs text-primary font-medium">
                  Request
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {songHistory.length > maxItems && (
        <div className="text-center pt-2">
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            View all {songHistory.length} tracks
          </button>
        </div>
      )}
    </div>
  )
}

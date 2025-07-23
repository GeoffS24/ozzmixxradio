"use client"

import { Play, Pause, VolumeX, Volume1, Volume2 } from 'lucide-react'
import { useRadioPlayer } from '@/lib/hooks/useRadioPlayer'
import { cn } from '@/lib/utils'

interface RadioPlayerProps {
  streamUrl: string
  statusApiUrl: string
  fallbackImage?: string
  className?: string
  defaultVolume?: number
  autoPlay?: boolean
}

export function RadioPlayer({
  streamUrl,
  statusApiUrl,
  fallbackImage = 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg',
  className,
  defaultVolume = 50,
  autoPlay = false,
}: RadioPlayerProps) {
  const {
    isPlaying,
    isLoading,
    volume,
    currentTrack,
    error,
    isConnected,
    togglePlay,
    volumeUp,
    volumeDown,
  } = useRadioPlayer({
    streamUrl,
    statusApiUrl,
    defaultVolume,
    autoPlay,
  })

  const getVolumeIcon = () => {
    if (volume === 0) return VolumeX
    if (volume < 50) return Volume1
    return Volume2
  }

  const VolumeIcon = getVolumeIcon()

  return (
    <div className={cn("flex flex-col items-center justify-center gap-6 w-full", className)}>
      

      {/* Player Image with Play Button Overlay */}
      <div className="relative w-full max-w-[400px] aspect-square">
        <img
          src={fallbackImage}
          alt="Radio Player"
          className={cn(
            "w-full h-full object-cover rounded-lg transition-all duration-300",
            isPlaying && "animate-pulse"
          )}
        />
        
        {/* Play/Pause Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => {
              console.log('Play button clicked, current state:', { isPlaying, isLoading })
              togglePlay()
            }}
            disabled={isLoading}
            className={cn(
              "flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300",
              "bg-white/90 hover:bg-white shadow-lg hover:shadow-xl",
              "border-2 border-white/20 hover:border-primary/20",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
            aria-label={isPlaying ? "Pause radio" : "Play radio"}
          >
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-8 h-8 text-primary ml-0" />
            ) : (
              <Play className="w-8 h-8 text-primary ml-1" />
            )}
          </button>
        </div>

        {/* Connection Status Indicator */}
        <div className="absolute top-4 right-4">
          <div
            className={cn(
              "w-3 h-3 rounded-full transition-colors duration-300",
              isConnected ? "bg-green-500" : "bg-red-500"
            )}
            title={isConnected ? "Connected" : "Disconnected"}
          />
        </div>

        {/* Live Indicator */}
        {isPlaying && (
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        )}
      </div>

      {/* Track Information */}
      <div className="flex flex-col items-center gap-2 w-full text-center">
        {/* Now Playing */}
        <div className="text-sm font-medium text-muted-foreground">
          {isPlaying ? "Now Playing" : "Ready to Play"}
        </div>

        {/* Track Title */}
        <h3 className="text-xl lg:text-2xl font-semibold text-foreground max-w-full truncate">
          {currentTrack?.title || "OZZ Dance Radio"}
        </h3>

        {/* Artist */}
        <p className="text-base lg:text-lg text-muted-foreground max-w-full truncate">
          {currentTrack?.artist ? `Artist: ${currentTrack.artist}` : "Your favorite dance music station"}
        </p>

        {/* Additional Info */}
        {currentTrack?.genre && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="px-2 py-1 bg-muted rounded-full">
              {currentTrack.genre}
            </span>
            {currentTrack.listeners && (
              <span>{currentTrack.listeners} listeners</span>
            )}
          </div>
        )}
      </div>

      {/* Volume Controls */}
      <div className="flex items-center gap-4 w-full max-w-[200px]">
        <button
          onClick={volumeDown}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Volume down"
        >
          <VolumeIcon className="w-5 h-5 text-foreground" />
        </button>

        {/* Volume Bar */}
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${volume}%` }}
          />
        </div>

        <button
          onClick={volumeUp}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Volume up"
        >
          <Volume2 className="w-5 h-5 text-foreground" />
        </button>

        {/* Volume Percentage */}
        <span className="text-sm text-muted-foreground w-10 text-center">
          {volume}%
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="w-full p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive text-center">{error}</p>
        </div>
      )}

      {/* Audio Visualization */}
      {isPlaying && (
        <div className="flex items-center justify-center gap-1 h-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1 bg-primary rounded-full transition-all duration-300",
                "animate-pulse"
              )}
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

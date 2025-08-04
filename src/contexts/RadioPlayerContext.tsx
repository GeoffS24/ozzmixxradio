"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRadioPlayer } from '@/lib/hooks/useRadioPlayer'

interface RadioPlayerContextType {
  // Player state
  isPlaying: boolean
  isLoading: boolean
  volume: number
  currentTrack: any
  error: string | null
  isConnected: boolean
  nowPlaying: any
  playingNext: any
  songHistory: any[]
  listeners: any
  isLive: boolean
  streamerName: string
  station: any
  
  // Player controls
  togglePlay: () => void
  volumeUp: () => void
  volumeDown: () => void
  
  // UI state
  isMinimized: boolean
  setIsMinimized: (minimized: boolean) => void
  showPlayer: boolean
  setShowPlayer: (show: boolean) => void
}

const RadioPlayerContext = createContext<RadioPlayerContextType | undefined>(undefined)

interface RadioPlayerProviderProps {
  children: React.ReactNode
  streamUrl?: string
  statusApiUrl?: string
  defaultVolume?: number
  autoPlay?: boolean
}

export function RadioPlayerProvider({
  children,
  streamUrl = 'https://stream.ozzmixxradio.com/hls/ozzmixxradio/live.m3u8',
  statusApiUrl = 'https://stream.ozzmixxradio.com/api/nowplaying',
  defaultVolume = 50,
  autoPlay = false,
}: RadioPlayerProviderProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [showPlayer, setShowPlayer] = useState(true)

  // Use the existing radio player hook with faster updates
  const radioPlayerData = useRadioPlayer({
    streamUrl,
    statusApiUrl,
    defaultVolume,
    autoPlay,
    updateInterval: 1000, // Update every 1 second for real-time updates
  })

  const contextValue: RadioPlayerContextType = {
    ...radioPlayerData,
    isMinimized,
    setIsMinimized,
    showPlayer,
    setShowPlayer,
  }

  return (
    <RadioPlayerContext.Provider value={contextValue}>
      {children}
    </RadioPlayerContext.Provider>
  )
}

export function useRadioPlayerContext() {
  const context = useContext(RadioPlayerContext)
  if (context === undefined) {
    throw new Error('useRadioPlayerContext must be used within a RadioPlayerProvider')
  }
  return context
}

// Hook for components that want to control the global player
export function useGlobalRadioPlayer() {
  return useRadioPlayerContext()
}

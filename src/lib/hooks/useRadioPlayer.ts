"use client"

import { useState, useEffect, useRef, useCallback } from 'react'

interface RadioStatus {
  title?: string
  artist?: string
  album?: string
  listeners?: number
  bitrate?: string
  genre?: string
  server_description?: string
  stream_start?: string
}

interface RadioPlayerState {
  isPlaying: boolean
  isLoading: boolean
  volume: number
  currentTrack: RadioStatus | null
  error: string | null
  isConnected: boolean
}

interface UseRadioPlayerProps {
  streamUrl: string
  statusApiUrl: string
  defaultVolume?: number
  autoPlay?: boolean
  updateInterval?: number
}

export function useRadioPlayer({
  streamUrl,
  statusApiUrl,
  defaultVolume = 50,
  autoPlay = false,
  updateInterval = 10000, // 10 seconds
}: UseRadioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const statusIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [state, setState] = useState<RadioPlayerState>({
    isPlaying: false,
    isLoading: false,
    volume: defaultVolume,
    currentTrack: null,
    error: null,
    isConnected: false,
  })

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio()
      // Configure for streaming
      audioRef.current.preload = 'none'
      audioRef.current.volume = defaultVolume / 100

      // Try without crossOrigin first for better compatibility
      // audioRef.current.crossOrigin = 'anonymous'

      // Add additional attributes for better streaming support
      audioRef.current.setAttribute('controls', 'false')
      audioRef.current.setAttribute('autoplay', 'false')

      console.log('Audio element initialized')

      // Audio event listeners
      const audio = audioRef.current

      const handleLoadStart = () => {
        console.log('Audio load started')
        setState(prev => ({ ...prev, isLoading: true, error: null }))
      }

      const handleCanPlay = () => {
        console.log('Audio can play')
        setState(prev => ({ ...prev, isLoading: false, isConnected: true }))
      }

      const handlePlay = () => {
        console.log('Audio playing')
        setState(prev => ({ ...prev, isPlaying: true, isLoading: false }))
      }

      const handlePause = () => {
        console.log('Audio paused')
        setState(prev => ({ ...prev, isPlaying: false }))
      }

      const handleWaiting = () => {
        console.log('Audio waiting/buffering')
        setState(prev => ({ ...prev, isLoading: true }))
      }

      const handlePlaying = () => {
        console.log('Audio resumed playing')
        setState(prev => ({ ...prev, isLoading: false, isPlaying: true }))
      }

      const handleError = (e: Event) => {
        const error = (e.target as HTMLAudioElement)?.error
        console.error('Audio error:', error, 'Event:', e)
        
        let errorMessage = 'Failed to load radio stream'
        
        if (error) {
          switch (error.code) {
            case error.MEDIA_ERR_NETWORK:
              errorMessage = 'Network error - please check your connection'
              break
            case error.MEDIA_ERR_DECODE:
              errorMessage = 'Audio decode error'
              break
            case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage = 'Audio format not supported'
              break
            case error.MEDIA_ERR_ABORTED:
              errorMessage = 'Audio loading aborted'
              break
            default:
              errorMessage = `Unknown audio error (code: ${error.code})`
          }
        }

        setState(prev => ({ 
          ...prev, 
          isPlaying: false, 
          isLoading: false, 
          error: errorMessage,
          isConnected: false 
        }))
      }

      const handleLoadedMetadata = () => {
        console.log('Audio metadata loaded')
        setState(prev => ({ ...prev, isConnected: true }))
      }

      // Add event listeners
      audio.addEventListener('loadstart', handleLoadStart)
      audio.addEventListener('canplay', handleCanPlay)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('error', handleError)
      audio.addEventListener('waiting', handleWaiting)
      audio.addEventListener('playing', handlePlaying)

      return () => {
        audio.removeEventListener('loadstart', handleLoadStart)
        audio.removeEventListener('canplay', handleCanPlay)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('error', handleError)
        audio.removeEventListener('waiting', handleWaiting)
        audio.removeEventListener('playing', handlePlaying)
      }
    }
  }, [defaultVolume])

  // Fetch current track information
  const fetchTrackInfo = useCallback(async () => {
    try {
      const response = await fetch(statusApiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Parse the response based on common radio API formats
      let trackInfo: RadioStatus = {}
      
      if (data.icestats && data.icestats.source) {
        // Icecast format
        const source = Array.isArray(data.icestats.source) 
          ? data.icestats.source[0] 
          : data.icestats.source
          
        trackInfo = {
          title: source.title || source.yp_currently_playing,
          artist: source.artist,
          album: source.album,
          listeners: source.listeners,
          bitrate: source.bitrate,
          genre: source.genre,
          server_description: source.server_description,
          stream_start: source.stream_start,
        }
      } else if (data.title || data.artist) {
        // Direct format
        trackInfo = data
      }

      setState(prev => ({ ...prev, currentTrack: trackInfo }))
    } catch (error) {
      console.warn('Failed to fetch track info:', error)
      // Don't update error state for track info failures
    }
  }, [statusApiUrl])

  // Start/stop track info updates
  useEffect(() => {
    if (state.isPlaying) {
      fetchTrackInfo() // Fetch immediately
      statusIntervalRef.current = setInterval(fetchTrackInfo, updateInterval)
    } else {
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current)
        statusIntervalRef.current = null
      }
    }

    return () => {
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current)
      }
    }
  }, [state.isPlaying, fetchTrackInfo, updateInterval])

  // Player controls
  const play = useCallback(async () => {
    if (!audioRef.current) {
      console.error('Audio element not initialized')
      return
    }

    try {
      console.log('Attempting to play stream:', streamUrl)
      setState(prev => ({ ...prev, error: null, isLoading: true }))

      // Stop any current playback
      audioRef.current.pause()

      // Set the stream URL
      audioRef.current.src = streamUrl

      // Try to play
      const playPromise = audioRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Playback started successfully')
          })
          .catch((error) => {
            console.error('Play promise rejected:', error)

            let errorMessage = 'Failed to start playback'

            if (error.name === 'NotAllowedError') {
              errorMessage = 'Playback blocked by browser. User interaction required.'
            } else if (error.name === 'NotSupportedError') {
              errorMessage = 'Audio format not supported'
            } else if (error.name === 'AbortError') {
              errorMessage = 'Playback was interrupted'
            } else if (error.message) {
              errorMessage = error.message
            }

            setState(prev => ({
              ...prev,
              isLoading: false,
              error: errorMessage,
              isConnected: false
            }))
          })
      }

    } catch (error) {
      console.error('Play failed with exception:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: `Playback error: ${error.message}`,
        isConnected: false
      }))
    }
  }, [streamUrl])

  const pause = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
  }, [])

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause()
    } else {
      play()
    }
  }, [state.isPlaying, play, pause])

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(100, newVolume))
    setState(prev => ({ ...prev, volume: clampedVolume }))
    
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume / 100
    }
  }, [])

  const volumeUp = useCallback(() => {
    setVolume(state.volume + 10)
  }, [state.volume, setVolume])

  const volumeDown = useCallback(() => {
    setVolume(state.volume - 10)
  }, [state.volume, setVolume])

  // Cleanup
  useEffect(() => {
    return () => {
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current)
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  return {
    ...state,
    play,
    pause,
    togglePlay,
    setVolume,
    volumeUp,
    volumeDown,
    refreshTrackInfo: fetchTrackInfo,
  }
}

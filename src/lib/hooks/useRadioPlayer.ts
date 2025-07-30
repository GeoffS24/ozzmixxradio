"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import Hls from 'hls.js'

interface Song {
  id: string
  text: string
  title: string
  artist: string
  album: string
  art: string
  genre: string
  isrc: string
  lyrics: string
  custom_fields: any[]
}

interface NowPlaying {
  sh_id: number
  played_at: number
  duration: number
  elapsed: number
  remaining: number
  playlist: string
  is_request: boolean
  song: Song
  streamer: string
}

interface PlayingNext {
  cued_at: number
  played_at: number
  duration: number
  playlist: string
  is_request: boolean
  song: Song
}

interface SongHistory {
  sh_id: number
  played_at: number
  duration: number
  playlist: string
  is_request: boolean
  song: Song
  streamer: string
}

interface Station {
  id: number
  name: string
  shortcode: string
  description: string
  frontend: string
  backend: string
  hls_enabled: boolean
  hls_is_default: boolean
  hls_listeners: number
  hls_url: string
  timezone: string
  url: string
  is_public: boolean
  listen_url: string | null
  playlist_m3u_url: string
  playlist_pls_url: string
  public_player_url: string
  mounts: any[]
  remotes: any[]
}

interface Live {
  is_live: boolean
  streamer_name: string
  broadcast_start: string | null
  art: string | null
}

interface Listeners {
  total: number
  unique: number
  current: number
}

interface RadioStatus {
  is_online?: boolean
  listeners?: Listeners
  live?: Live
  now_playing?: NowPlaying
  playing_next?: PlayingNext
  song_history?: SongHistory[]
  station?: Station
  // Legacy fields for backward compatibility
  title?: string
  artist?: string
  album?: string
  art?: string
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
  nowPlaying: NowPlaying | null
  playingNext: PlayingNext | null
  songHistory: SongHistory[]
  listeners: Listeners | null
  isLive: boolean
  streamerName: string
  station: Station | null
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
  autoPlay = false, // TODO: Implement autoPlay functionality
  updateInterval = 10000, // 10 seconds
}: UseRadioPlayerProps) {
  // Suppress unused variable warning for autoPlay - will be implemented later
  void autoPlay;
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hlsRef = useRef<Hls | null>(null)
  const statusIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [state, setState] = useState<RadioPlayerState>({
    isPlaying: false,
    isLoading: false,
    volume: defaultVolume,
    currentTrack: null,
    error: null,
    isConnected: false,
    nowPlaying: null,
    playingNext: null,
    songHistory: [],
    listeners: null,
    isLive: false,
    streamerName: '',
    station: null,
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

      // Parse the response based on the new API format
      let trackInfo: RadioStatus = {}

      // Check if it's the new API format (array with station data)
      if (Array.isArray(data) && data.length > 0 && data[0].now_playing && data[0].station) {
        // New API format - array with station data
        const stationData = data[0]
        const nowPlaying = stationData.now_playing
        const playingNext = stationData.playing_next
        const songHistory = stationData.song_history || []
        const listeners = stationData.listeners
        const live = stationData.live
        const station = stationData.station

        console.log('Radio Player - Parsed API data:', {
          nowPlaying: nowPlaying?.song?.title,
          artist: nowPlaying?.song?.artist,
          art: nowPlaying?.song?.art,
          playingNext: playingNext?.song?.title,
          songHistoryCount: songHistory.length,
          hls_url: station?.hls_url
        })

        // Build the complete track info
        trackInfo = {
          // New structured data
          is_online: stationData.is_online || false,
          listeners: listeners,
          live: live,
          now_playing: nowPlaying,
          playing_next: playingNext,
          song_history: songHistory,
          station: station,

          // Legacy fields for backward compatibility
          title: nowPlaying?.song?.title || '',
          artist: nowPlaying?.song?.artist || '',
          album: nowPlaying?.song?.album || '',
          art: nowPlaying?.song?.art || '',
          genre: nowPlaying?.song?.genre || '',
          server_description: station?.description || '',
          stream_start: live?.broadcast_start || '',
        }

        // Update the extended state with new data
        setState(prev => ({
          ...prev,
          currentTrack: trackInfo,
          nowPlaying: nowPlaying,
          playingNext: playingNext,
          songHistory: songHistory,
          listeners: listeners,
          isLive: live?.is_live || false,
          streamerName: live?.streamer_name || '',
          station: station,
        }))

        // Update stream URL if we have HLS URL from station data
        if (station?.hls_url && station.hls_url !== streamUrl) {
          console.log('Updating stream URL from API:', station.hls_url)
          // We could potentially update the stream URL here, but it's better to handle this at the component level
        }

        return // Exit early since we handled the new format
      } else if (data.now_playing && data.station) {
        // New API format - direct object (fallback)
        const nowPlaying = data.now_playing
        const playingNext = data.playing_next
        const songHistory = data.song_history || []
        const listeners = data.listeners
        const live = data.live
        const station = data.station

        // Build the complete track info
        trackInfo = {
          // New structured data
          is_online: data.is_online || false,
          listeners: listeners,
          live: live,
          now_playing: nowPlaying,
          playing_next: playingNext,
          song_history: songHistory,
          station: station,

          // Legacy fields for backward compatibility
          title: nowPlaying?.song?.title || '',
          artist: nowPlaying?.song?.artist || '',
          album: nowPlaying?.song?.album || '',
          art: nowPlaying?.song?.art || '',
          genre: nowPlaying?.song?.genre || '',
          server_description: station?.description || '',
          stream_start: live?.broadcast_start || '',
        }

        // Update the extended state with new data
        setState(prev => ({
          ...prev,
          currentTrack: trackInfo,
          nowPlaying: nowPlaying,
          playingNext: playingNext,
          songHistory: songHistory,
          listeners: listeners,
          isLive: live?.is_live || false,
          streamerName: live?.streamer_name || '',
          station: station,
        }))

        return // Exit early since we handled the new format
      } else if (Array.isArray(data) && data.length > 0) {
        // Legacy array format
        const stationData = data[0]
        const nowPlaying = stationData.now_playing
        const listeners = stationData.listeners

        if (nowPlaying && nowPlaying.song) {
          trackInfo = {
            title: nowPlaying.song.title || '',
            artist: nowPlaying.song.artist || '',
            album: nowPlaying.song.album || '',
            listeners: listeners?.current || listeners?.total || 0,
            bitrate: '', // Not provided in new API
            genre: nowPlaying.song.genre || '',
            server_description: stationData.station?.description || '',
            stream_start: stationData.live?.broadcast_start || '',
          }
        }
      } else if (data.icestats && data.icestats.source) {
        // Icecast format (legacy)
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
        // Direct format (legacy)
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

      // Clean up existing HLS instance
      if (hlsRef.current) {
        hlsRef.current.destroy()
        hlsRef.current = null
      }

      // Check if it's an HLS stream
      const isHLS = streamUrl.includes('.m3u8')

      if (isHLS && Hls.isSupported()) {
        // Use HLS.js for HLS streams
        console.log('Using HLS.js for HLS stream')
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90,
        })

        hlsRef.current = hls
        hls.loadSource(streamUrl)
        hls.attachMedia(audioRef.current)

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('HLS manifest parsed, starting playback')
          audioRef.current?.play()
        })

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS error:', data)
          if (data.fatal) {
            setState(prev => ({
              ...prev,
              isLoading: false,
              error: `HLS error: ${data.details}`,
              isConnected: false
            }))
          }
        })
      } else if (isHLS && audioRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        console.log('Using native HLS support')
        audioRef.current.src = streamUrl
        await audioRef.current.play()
      } else {
        // Regular audio stream (MP3, AAC, etc.)
        console.log('Using regular audio element')
        audioRef.current.src = streamUrl
        await audioRef.current.play()
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

    // Clean up HLS if it exists
    if (hlsRef.current) {
      hlsRef.current.destroy()
      hlsRef.current = null
    }
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
      const statusInterval = statusIntervalRef.current
      const retryTimeout = retryTimeoutRef.current
      const hls = hlsRef.current
      const audio = audioRef.current

      if (statusInterval) {
        clearInterval(statusInterval)
      }
      if (retryTimeout) {
        clearTimeout(retryTimeout)
      }
      if (hls) {
        hls.destroy()
      }
      if (audio) {
        audio.pause()
        audio.src = ''
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

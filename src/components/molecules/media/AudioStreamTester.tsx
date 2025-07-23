"use client"

import { useState, useRef } from 'react'
import { Play, Pause, AlertCircle, CheckCircle } from 'lucide-react'

interface AudioStreamTesterProps {
  streamUrl: string
}

export function AudioStreamTester({ streamUrl }: AudioStreamTesterProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const testStream = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Create a new audio element for testing
      const audio = new Audio()
      audio.crossOrigin = 'anonymous'
      audio.preload = 'none'
      
      // Set up event listeners
      const handleCanPlay = () => {
        setSuccess('Stream URL is accessible and can be played!')
        setIsLoading(false)
      }

      const handleError = (e: Event) => {
        const audioError = (e.target as HTMLAudioElement)?.error
        let errorMessage = 'Failed to load stream'
        
        if (audioError) {
          switch (audioError.code) {
            case audioError.MEDIA_ERR_NETWORK:
              errorMessage = 'Network error - stream may be down or blocked by CORS'
              break
            case audioError.MEDIA_ERR_DECODE:
              errorMessage = 'Audio decode error - invalid format'
              break
            case audioError.MEDIA_ERR_SRC_NOT_SUPPORTED:
              errorMessage = 'Audio format not supported by browser'
              break
            case audioError.MEDIA_ERR_ABORTED:
              errorMessage = 'Audio loading aborted'
              break
            default:
              errorMessage = `Unknown error (code: ${audioError.code})`
          }
        }
        
        setError(errorMessage)
        setIsLoading(false)
      }

      const handleLoadStart = () => {
        console.log('Load started for:', streamUrl)
      }

      // Add event listeners
      audio.addEventListener('canplay', handleCanPlay)
      audio.addEventListener('error', handleError)
      audio.addEventListener('loadstart', handleLoadStart)

      // Set source and load
      audio.src = streamUrl
      audio.load()

      // Clean up after 10 seconds
      setTimeout(() => {
        audio.removeEventListener('canplay', handleCanPlay)
        audio.removeEventListener('error', handleError)
        audio.removeEventListener('loadstart', handleLoadStart)
        audio.pause()
        audio.src = ''
        
        if (isLoading) {
          setError('Test timed out - stream may be slow to respond')
          setIsLoading(false)
        }
      }, 10000)

    } catch (err) {
      setError(`Test failed: ${err.message}`)
      setIsLoading(false)
    }
  }

  const playTest = async () => {
    if (isPlaying) {
      // Stop
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
      setIsPlaying(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Create audio element
      const audio = new Audio()
      audio.crossOrigin = 'anonymous'
      audio.volume = 0.3 // Lower volume for testing
      
      audioRef.current = audio

      // Event listeners
      audio.addEventListener('play', () => {
        setIsPlaying(true)
        setIsLoading(false)
        setSuccess('Playing successfully!')
      })

      audio.addEventListener('pause', () => {
        setIsPlaying(false)
      })

      audio.addEventListener('error', (e) => {
        const audioError = (e.target as HTMLAudioElement)?.error
        setError(`Playback error: ${audioError?.code || 'Unknown'}`)
        setIsLoading(false)
        setIsPlaying(false)
      })

      // Set source and play
      audio.src = streamUrl
      await audio.play()

    } catch (err) {
      setError(`Play failed: ${err.message}`)
      setIsLoading(false)
      setIsPlaying(false)
    }
  }

  return (
    <div className="p-4 border border-border rounded-lg bg-card">
      <h3 className="text-lg font-semibold mb-4">Audio Stream Tester</h3>
      
      <div className="space-y-4">
        <div className="text-sm">
          <strong>Stream URL:</strong>
          <div className="font-mono text-xs bg-muted p-2 rounded mt-1 break-all">
            {streamUrl}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={testStream}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Stream URL'}
          </button>

          <button
            onClick={playTest}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Stop' : 'Play Test'}
          </button>

          <button
            onClick={() => window.open(streamUrl, '_blank')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Open in Browser
          </button>
        </div>

        {success && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded text-green-800">
            <CheckCircle className="w-4 h-4" />
            {success}
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded text-red-800">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded text-blue-800">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            Testing stream connection...
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { motion } from 'framer-motion'
import { Music } from 'lucide-react'
import { SectionHeader } from '@/components/atoms/ui/SectionHeader'
import { SimpleRadioPlayer } from '@/components/organisms/media/SimpleRadioPlayer'
import { NowPlayingInfo } from '@/components/organisms/media/NowPlayingInfo'
import { useRadioPlayer } from '@/lib/hooks/useRadioPlayer'
import { urlFor } from '@/sanity/lib/image'
import type { RadioStationData } from '@/types/sanity'

interface MusicSectionData {
  enabled?: boolean
  badge?: string
  title?: string
  description?: string
  radioStreamUrl?: string
  statusApiUrl?: string
  fallbackImage?: {
    asset?: {
      _ref: string
    }
    alt?: string
  }
}

interface MusicSectionProps {
  data?: MusicSectionData
  radioStationData?: RadioStationData | null
}

export function MusicSection({ data, radioStationData }: MusicSectionProps) {
  // PRIORITY: Use radio station config first, then home page data, then fallback
  // This ensures the radio station settings always take precedence
  const streamUrl = radioStationData?.radioConfig?.streamUrl ?? data?.radioStreamUrl ?? 'https://stream.ozzmixxradio.com/hls/ozzmixxradio/live.m3u8'
  const statusApiUrl = radioStationData?.radioConfig?.statusApiUrl ?? data?.statusApiUrl ?? 'https://stream.ozzmixxradio.com/api/nowplaying'

  // Default values - prioritize radio station data
  const sectionData = {
    enabled: data?.enabled ?? true,
    badge: data?.badge ?? 'Listen',
    title: data?.title ?? 'Your Favorite Dance Music, Anytime, Anywhere',
    description: data?.description ?? 'Tune in to OzzMixx for the best in Dance Music 24/7.',
    radioStreamUrl: streamUrl,
    statusApiUrl: statusApiUrl,
  }

  // Single radio player hook to share data between components
  const radioPlayerData = useRadioPlayer({
    streamUrl: sectionData.radioStreamUrl,
    statusApiUrl: sectionData.statusApiUrl,
    defaultVolume: radioStationData?.radioConfig?.defaultVolume ?? 50,
    autoPlay: radioStationData?.radioConfig?.autoPlay ?? false,
  })

  console.log('Radio Player Data:', {
    nowPlaying: radioPlayerData.nowPlaying,
    playingNext: radioPlayerData.playingNext,
    songHistory: radioPlayerData.songHistory,
    songHistoryLength: radioPlayerData.songHistory?.length
  })

  if (!sectionData.enabled) {
    return null
  }

  // Get fallback image URL
  const fallbackImageUrl = data?.fallbackImage?.asset?._ref
    ? urlFor(data.fallbackImage).width(640).height(640).url()
    : 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg'

  return (
    <section id='listen' className="relative py-20 px-5 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Music Notes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/10"
            initial={{ y: "100vh", x: Math.random() * 100 + "%", rotate: 0 }}
            animate={{
              y: "-100vh",
              rotate: 360,
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2
            }}
          >
            <Music className="w-8 h-8" />
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-500/20 to-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Sound Wave Lines */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{ top: `${20 + i * 15}%` }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex container mx-auto flex-col items-center gap-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            badge={sectionData.badge}
            title={sectionData.title}
            description={sectionData.description}
            alignment="center"
          />
        </motion.div>

        {/* Music Player Section */}
        <div className="flex lg:flex-row flex-col items-start gap-8 w-full max-w-7xl">
          {/* Left Side - Radio Player */}
          <motion.div
            className="lg:w-96 w-full flex flex-col items-center justify-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <SimpleRadioPlayer
              radioPlayerData={radioPlayerData}
              fallbackImage={fallbackImageUrl}
              className="w-full shadow-2xl"
              showListenerCount={radioStationData?.radioConfig?.showListenerCount ?? false}
            />
          </motion.div>

          {/* Right Side - Song Information */}
          <motion.div
            className="flex-1 flex w-full flex-col"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <NowPlayingInfo
              radioPlayerData={radioPlayerData}
              fallbackImage={fallbackImageUrl}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

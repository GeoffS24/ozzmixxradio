"use client"

import { motion } from 'framer-motion'
import { Music, Radio, Headphones, Volume2, Waves, Zap } from 'lucide-react'
import { SectionHeader } from '@/components/atoms/ui/SectionHeader'
import { EnhancedRadioPlayer } from '@/components/organisms/media/EnhancedRadioPlayer'
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

  console.log('MusicSection configuration:', {
    radioStationStreamUrl: radioStationData?.radioConfig?.streamUrl,
    homePageStreamUrl: data?.radioStreamUrl,
    finalStreamUrl: sectionData.radioStreamUrl,
    radioStationStatusUrl: radioStationData?.radioConfig?.statusApiUrl,
    homePageStatusUrl: data?.statusApiUrl,
    finalStatusUrl: sectionData.statusApiUrl
  })

  // Don't render if disabled
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
        <div className="flex lg:flex-row flex-col items-center gap-16 w-full max-w-7xl">
          {/* Left Side - Visual Elements & Features */}
          <motion.div
            className="flex-1 flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Main Visual */}
            <div className="relative">
              <motion.div
                className="w-80 h-80 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center relative overflow-hidden"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Vinyl Record Effect */}
                <div className="absolute inset-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                    <Radio className="w-8 h-8 text-primary" />
                  </div>
                  {/* Vinyl grooves */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute border border-gray-600/30 rounded-full"
                      style={{
                        width: `${60 + i * 15}%`,
                        height: `${60 + i * 15}%`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Floating Icons */}
              {[
                { icon: Headphones, position: "top-0 left-0", delay: 0 },
                { icon: Volume2, position: "top-0 right-0", delay: 1 },
                { icon: Waves, position: "bottom-0 left-0", delay: 2 },
                { icon: Zap, position: "bottom-0 right-0", delay: 3 },
              ].map(({ icon: Icon, position, delay }, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${position} -translate-x-1/2 -translate-y-1/2`}
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-12 h-12 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/20">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              {[
                { icon: Music, title: "Live Streaming", desc: "High-quality audio" },
                { icon: Radio, title: "Song History", desc: "Track what's played" },
                { icon: Headphones, title: "Next Playing", desc: "See what's coming" },
                { icon: Volume2, title: "Live Shows", desc: "DJ broadcasts" },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="p-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <feature.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm text-foreground">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Radio Player */}
          <motion.div
            className="flex-1 flex w-full flex-col gap-6 justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <EnhancedRadioPlayer
              streamUrl={sectionData.radioStreamUrl}
              statusApiUrl={sectionData.statusApiUrl}
              fallbackImage={fallbackImageUrl}
              className="max-w-[450px] mx-auto shadow-2xl"
              defaultVolume={radioStationData?.radioConfig?.defaultVolume ?? 50}
              autoPlay={radioStationData?.radioConfig?.autoPlay ?? false}
              showListenerCount={radioStationData?.radioConfig?.showListenerCount ?? false}
              showSongHistory={true}
              showNextPlaying={true}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

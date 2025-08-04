import Image from 'next/image'
import { SectionHeader } from '@/components/atoms/ui/SectionHeader'
import { AppDownloadButton } from '@/components/molecules/app/AppDownloadButton'
import { Smartphone, Download } from 'lucide-react'

import { urlFor } from '@/sanity/lib/image'
import type { SanityImage } from '@/types/sanity'

interface AppDownloadSectionData {
  enabled?: boolean
  badge?: string
  title?: string
  description?: string
  androidUrl?: string
  iosUrl?: string
  backgroundImage?: SanityImage
  backgroundColor?: string
  visualElementImage?: SanityImage
}

interface AppDownloadSectionProps {
  data?: AppDownloadSectionData
}

export function AppDownloadSection({ data }: AppDownloadSectionProps) {
  // Default values
  const sectionData = {
    enabled: data?.enabled ?? true,
    badge: data?.badge ?? 'Download App',
    title: data?.title ?? 'Take OZZ Dance Radio With You',
    description: data?.description ?? 'Download our mobile app and enjoy your favorite dance music anywhere, anytime. Available for both Android and iOS devices.',
    androidUrl: data?.androidUrl ?? 'https://play.google.com/store/apps/details?id=com.ozzmix.radio&pcampaignid=web_share',
    iosUrl: data?.iosUrl ?? 'https://apps.apple.com/us/app/ozzmixx-dance-radio/id6477762868?platform=iphone',
    backgroundImage: data?.backgroundImage,
    backgroundColor: data?.backgroundColor,
    visualElementImage: data?.visualElementImage,
  }

  // Don't render if disabled
  if (!sectionData.enabled) {
    return null
  }

  // Determine background styling
  const getBackgroundStyle = () => {
    if (sectionData.backgroundImage?.asset) {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${urlFor(sectionData.backgroundImage).url()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    }
    if (sectionData.backgroundColor) {
      return { backgroundColor: sectionData.backgroundColor }
    }
    return {
      background: 'linear-gradient(to bottom right, hsl(var(--primary) / 0.1), hsl(var(--background)), hsl(var(--primary) / 0.05))'
    }
  }

  return (
    <section className="relative py-16 lg:py-20 px-5 overflow-hidden" style={getBackgroundStyle()}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.primary)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.primary)_0%,transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/8 rounded-full blur-lg animate-pulse delay-500" />

      <div className="relative container mx-auto">
        <div className="flex lg:flex-row flex-col items-center gap-12 lg:gap-20 w-full">
          {/* Content */}
          <div className="flex flex-col items-start gap-8 flex-1 text-center lg:text-left">
            <SectionHeader
              badge={sectionData.badge}
              title={sectionData.title}
              description={sectionData.description}
              alignment="left"
              className='invert'
              invert={true}
            />

            {/* App Download Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <AppDownloadButton
                platform="android"
                url={sectionData.androidUrl}
                className="w-full sm:w-auto invert"
              />
              <AppDownloadButton
                platform="ios"
                url={sectionData.iosUrl}
                className="w-full sm:w-auto invert"
              />
            </div>

            {/* Features List */}
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 ">
                <Download className="w-4 h-4 text-primary" />
                <span className='invert'>Free Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary" />
                <span className='invert'>Works Offline</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
                <span className='invert'>Live Streaming</span>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {sectionData.visualElementImage?.asset ? (
                // Custom Image
                <div className="relative w-64 h-[500px] flex items-center justify-center">
                  <Image
                    src={urlFor(sectionData.visualElementImage)
                      .width(256)
                      .height(500)
                      .format('webp')
                      .quality(85)
                      .url()}
                    alt={sectionData.visualElementImage.alt || 'App Visual Element'}
                    width={256}
                    height={500}
                    className="max-w-full max-h-full object-contain"
                    priority={false}
                    loading="lazy"
                    sizes="(max-width: 768px) 200px, 256px"
                  />
                </div>
              ) : (
                // Default Phone Mockup
                <>
                  {/* Phone Mockup */}
                  <div className="relative w-64 h-[500px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl">
                    {/* Screen */}
                    <div className="w-full h-full bg-gradient-to-b from-primary/20 to-primary/10 rounded-[2.5rem] p-6 flex flex-col items-center justify-center relative overflow-hidden">
                      {/* App Interface Mockup */}
                      <div className="text-center space-y-4">
                        {/* Logo */}
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto">
                          <span className="text-white font-bold text-xl">OZ</span>
                        </div>
                        
                        {/* App Name */}
                        <div className="text-white">
                          <h3 className="font-bold text-lg">OZZ Dance Radio</h3>
                          <p className="text-white/70 text-sm">Live Electronic Music</p>
                        </div>
    
                        {/* Play Button */}
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1" />
                        </div>
    
                        {/* Track Info */}
                        <div className="text-center text-white/80 text-xs">
                          <p className="font-medium">Now Playing</p>
                          <p className="text-white/60">Electronic Vibes Mix</p>
                        </div>
    
                        {/* Visualizer */}
                        <div className="flex items-center justify-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-white/60 rounded-full animate-pulse"
                              style={{
                                height: `${Math.random() * 20 + 10}px`,
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: `${0.5 + Math.random() * 0.5}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
    
                      {/* Floating Music Notes */}
                      <div className="absolute top-4 right-4 text-white/30 animate-bounce">♪</div>
                      <div className="absolute bottom-20 left-4 text-white/20 animate-bounce delay-300">♫</div>
                      <div className="absolute top-1/3 left-2 text-white/25 animate-bounce delay-700">♪</div>
                    </div>
    
                    {/* Phone Details */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full" />
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-700 rounded-full" />
                  </div>
    
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl -z-10 animate-pulse" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

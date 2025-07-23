import { SectionHeader } from '@/components/atoms/ui/SectionHeader'
import { RadioPlayer } from '@/components/molecules/media/RadioPlayer'
import { urlFor } from '@/sanity/lib/image'

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
}

export function MusicSection({ data }: MusicSectionProps) {
  // Default values
  const sectionData = {
    enabled: data?.enabled ?? true,
    badge: data?.badge ?? 'Listen',
    title: data?.title ?? 'Your Favorite Music, Anytime, Anywhere',
    description: data?.description ?? 'Tune in to our station for a diverse mix of music. Enjoy seamless listening with our easy-to-use radio player.',
    radioStreamUrl: data?.radioStreamUrl ?? 'https://a2.asurahosting.com/listen/ozzmixx_dance_radio/radio.mp3',
    statusApiUrl: data?.statusApiUrl ?? 'https://a2.asurahosting.com:7330/status-json.xsl',
  }

  // Don't render if disabled
  if (!sectionData.enabled) {
    return null
  }

  // Get fallback image URL
  const fallbackImageUrl = data?.fallbackImage?.asset?._ref
    ? urlFor(data.fallbackImage).width(640).height(640).url()
    : 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg'

  return (
    <section className="flex py-16 lg:py-16 px-5 flex-col items-center gap-12 lg:gap-20 bg-white">
      <div className="flex container w-full mx-auto flex-col items-start gap-12 lg:gap-20">
        <div className="flex lg:flex-row flex-col items-center gap-12 lg:gap-20 w-full">
          {/* Content */}
          <div className="flex flex-col items-start gap-8 flex-1">
            <SectionHeader
              badge={sectionData.badge}
              title={sectionData.title}
              description={sectionData.description}
              alignment="left"
            />
          </div>

          {/* Radio Player */}
          <div className="flex-1 flex justify-center">
            <RadioPlayer
              streamUrl={sectionData.radioStreamUrl}
              statusApiUrl={sectionData.statusApiUrl}
              fallbackImage={fallbackImageUrl}
              className="max-w-[400px]"
              defaultVolume={50}
              autoPlay={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

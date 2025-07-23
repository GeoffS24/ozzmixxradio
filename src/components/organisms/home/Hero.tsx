import { Button } from '@/components/atoms/ui/Button'
import { urlFor } from '@/sanity/lib/image'
import type { HeroSectionData } from '@/types/sanity'

interface HeroProps {
  data?: HeroSectionData
}

export function Hero({ data }: HeroProps) {
  // Default values
  const heroData = {
    enabled: data?.enabled ?? true,
    title: data?.title ?? 'Tune In to Your Favorite Radio Station',
    description: data?.description ?? 'Welcome to our vibrant radio community, where music and news come alive. Join us for an unforgettable listening experience, tailored just for you!',
    primaryButton: {
      text: data?.primaryButton?.text ?? 'Listen',
      link: data?.primaryButton?.link ?? '#listen',
    },
    secondaryButton: {
      text: data?.secondaryButton?.text ?? 'Join',
      link: data?.secondaryButton?.link ?? '#join',
    },
  }

  // Don't render if disabled
  if (!heroData.enabled) {
    return null
  }

  // Get background image URL
  const backgroundImageUrl = data?.backgroundImage?.asset?._ref
    ? urlFor(data.backgroundImage).width(1920).height(1080).url()
    : 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg'

  return (
    <section
      className="flex min-h-[812px] lg:min-h-[900px] px-5 flex-col justify-center items-center gap-12 lg:gap-20 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url('${backgroundImageUrl}')`
      }}
    >
      <div className="flex container mx-auto w-full flex-col items-start gap-12 lg:gap-20">
        <div className="flex max-w-[560px] flex-col items-start gap-8 lg:gap-8 w-full">
          <div className="flex flex-col items-start gap-6 w-full">
            <h1 className="text-4xl lg:text-[56px] font-normal leading-[120%] lg:leading-[120%] tracking-[-0.4px] lg:tracking-[-0.56px] text-white w-full">
              {heroData.title}
            </h1>
            <p className="text-sm lg:text-lg font-normal leading-[150%] text-white w-full">
              {heroData.description}
            </p>
          </div>
          <div className="flex items-start gap-4">
            <Button variant="secondary" size="md">
              {heroData.primaryButton.text}
            </Button>
            <Button variant="ghost" size="md" className="border border-white/20 text-white hover:bg-white/10 hover:border-primary">
              {heroData.secondaryButton.text}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

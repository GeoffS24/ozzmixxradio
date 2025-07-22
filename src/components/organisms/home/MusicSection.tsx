import { ChevronRight } from 'lucide-react'
import { SectionHeader } from '@/components/atoms/ui/SectionHeader'
import { Button } from '@/components/atoms/ui/Button'

export function MusicSection() {
  return (
    <section className="flex py-16 lg:py-16 px-5 flex-col items-center gap-12 lg:gap-20 bg-white">
      <div className="flex container w-full mx-auto flex-col items-start gap-12 lg:gap-20 ">
        <div className="flex lg:flex-row flex-col items-center gap-12 lg:gap-20 w-full">
          {/* Content */}
          <div className="flex flex-col items-start gap-8 flex-1">
            <div className="flex flex-col items-start gap-8 w-full">
              <SectionHeader
                badge="Listen"
                title="Your Favorite Music, Anytime, Anywhere"
                description="Tune in to our station for a diverse mix of music. Enjoy seamless listening with our easy-to-use radio player."
                alignment="left"
              />

              {/* Content Items */}
              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex lg:flex-row flex-col py-2 items-start gap-6 lg:gap-6 w-full">
                  <div className="flex flex-col items-start gap-4 flex-1">
                    <h3 className="text-lg lg:text-xl font-normal leading-[140%] tracking-[-0.18px] lg:tracking-[-0.2px] text-primary w-full">
                      Now Playing
                    </h3>
                    <p className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
                      Catch the latest hits and timeless classics on our station.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-4 flex-1">
                    <h3 className="text-lg lg:text-xl font-normal leading-[140%] tracking-[-0.18px] lg:tracking-[-0.2px] text-primary w-full">
                      Join Us
                    </h3>
                    <p className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
                      Become part of our community and share your music passion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <Button variant="primary" size="md">
                Play
              </Button>
              <button className="flex justify-center items-center gap-2 text-sm lg:text-base font-medium text-foreground hover:text-primary transition-colors">
                Pause
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 lg:block hidden">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/fe588bac4b942144462e3a9a910d396ca0278214?width=640" 
              alt="Radio Music Player" 
              className="w-full h-auto aspect-[335/348] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

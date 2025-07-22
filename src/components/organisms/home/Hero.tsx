import { Button } from '@/components/atoms/ui/Button'

export function Hero() {
  return (
    <section
      className="flex min-h-[812px] lg:min-h-[900px] px-5 flex-col justify-center items-center gap-12 lg:gap-20 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), url('https://api.builder.io/api/v1/image/assets/TEMP/91fa682dcc87178627fa7d9323ad04b994e87705?width=1920')`
      }}
    >
      <div className="flex container mx-auto w-full flex-col items-start gap-12 lg:gap-20 w-full">
        <div className="flex max-w-[560px] flex-col items-start gap-8 lg:gap-8 w-full">
          <div className="flex flex-col items-start gap-6 w-full">
            <h1 className="text-4xl lg:text-[56px] font-normal leading-[120%] lg:leading-[120%] tracking-[-0.4px] lg:tracking-[-0.56px] text-white w-full">
              Tune In to Your Favorite Radio Station
            </h1>
            <p className="text-sm lg:text-lg font-normal leading-[150%] text-white w-full">
              Welcome to our vibrant radio community, where music and news come alive. Join us for an unforgettable listening experience, tailored just for you!
            </p>
          </div>
          <div className="flex items-start gap-4">
            <Button variant="secondary" size="md">
              Listen
            </Button>
            <Button variant="ghost" size="md" className="border border-white/20 text-white hover:bg-white/10 hover:border-primary">
              Join
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

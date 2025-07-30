import { PortableText } from '@portabletext/react'
import { SectionHeader } from '@/components/atoms/ui/SectionHeader'
import { urlFor } from '@/sanity/lib/image'
import type { AboutPageData } from '@/types/sanity'
import { TeamMemberCard } from '@/components/molecules/cards/TeamMemberCard'

interface AboutPageDetailProps {
  page: AboutPageData
}

export function AboutPageDetail({ page }: AboutPageDetailProps) {
  const heroSection = page.heroSection
  const teamSection = page.teamSection

  // Get background image URL
  const backgroundImageUrl = heroSection?.backgroundImage?.asset?._ref
    ? urlFor(heroSection.backgroundImage).width(1920).height(1080).url()
    : 'https://images.pexels.com/photos/1876279/pexels-photo-1876279.jpeg'

  return (
    <>
      {/* Hero Section */}
      {heroSection?.enabled && (
        <section 
          className="relative flex items-center justify-center min-h-[60vh] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 container mx-auto px-5 text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {heroSection.title || page.title || 'About Us'}
            </h1>
            {heroSection.description && (
              <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                {heroSection.description}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Content Section */}
      {page.content && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-5">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <PortableText 
                value={page.content}
                components={{
                  block: {
                    h1: ({ children }) => (
                      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                        {children}
                      </h3>
                    ),
                    normal: ({ children }) => (
                      <p className="mb-4 text-gray-700 leading-relaxed">
                        {children}
                      </p>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-bold text-gray-900">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    link: ({ children, value }) => (
                      <a 
                        href={value.href}
                        className="text-primary hover:text-primary/80 underline"
                        target={value.blank ? '_blank' : undefined}
                        rel={value.blank ? 'noopener noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2">
                        {children}
                      </ol>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => (
                      <li className="text-gray-700">{children}</li>
                    ),
                    number: ({ children }) => (
                      <li className="text-gray-700">{children}</li>
                    ),
                  },
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {teamSection?.enabled && teamSection.teamMembers && teamSection.teamMembers.length > 0 && (
        <section className="py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto w-full px-5 flex items-center justify-center flex-col">
            <SectionHeader
              badge="Team"
              title={teamSection.title || 'Meet Our Team'}
              description={teamSection.description || 'Get to know the passionate people behind OZZ Dance Radio.'}
              alignment="center"
              className='w-full text-center'
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full">
              {teamSection.teamMembers.map((member, index) => (
                <TeamMemberCard
                  key={index}
                  name={member.name}
                  role={member.role}
                  bio={member.bio}
                  image={member.image}
                  socialLinks={member.socialLinks}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

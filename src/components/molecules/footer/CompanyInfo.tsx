import { LogoLink } from '@/components/molecules/navigation/LogoLink'
import { ContactInfo } from './ContactInfo'
import { SocialLinks } from './SocialLinks'
import type { RadioStationData } from '@/types/sanity'

interface CompanyInfoProps {
  stationData?: RadioStationData | null
}

export function CompanyInfo({ stationData }: CompanyInfoProps) {
  // Default values with fallbacks
  const contactInfo = stationData?.contactInfo
  const address = contactInfo?.address || 'Level 1, 12 Sample St, Sydney NSW 2000'
  const phone = contactInfo?.phone || '1800 123 4567'
  const email = contactInfo?.email || 'info@radiostation.com'
  const businessHours = contactInfo?.businessHours
  return (
    <div className="flex flex-col items-start gap-8 flex-1">
      <LogoLink variant="mobile" />

      <ContactInfo title="Address:">
        <p className="text-xs lg:text-sm font-normal leading-[150%] text-foreground">
          {address}
        </p>
      </ContactInfo>

      <ContactInfo title="Contact:">
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="text-xs lg:text-sm font-normal leading-[150%] text-foreground underline hover:text-primary"
        >
          {phone}
        </a>
        <a
          href={`mailto:${email}`}
          className="text-xs lg:text-sm font-normal leading-[150%] text-foreground underline hover:text-primary"
        >
          {email}
        </a>
        {businessHours && (
          <p className="text-xs lg:text-sm font-normal leading-[150%] text-muted-foreground">
            {businessHours}
          </p>
        )}
      </ContactInfo>

      <div className="flex flex-col items-start gap-4 w-full">
        <span className="text-xs lg:text-sm font-bold leading-[150%] text-foreground">Follow Us:</span>
        <SocialLinks socialMedia={stationData?.socialMedia} />
      </div>
    </div>
  )
}

import { LogoLink } from '@/components/molecules/navigation/LogoLink'
import { ContactInfo } from './ContactInfo'
import { SocialLinks } from './SocialLinks'

export function CompanyInfo() {
  return (
    <div className="flex flex-col items-start gap-8 flex-1">
      <LogoLink variant="mobile" />

      <ContactInfo title="Address:">
        <p className="text-xs lg:text-sm font-normal leading-[150%] text-foreground">
          Level 1, 12 Sample St, Sydney NSW 2000
        </p>
      </ContactInfo>

      <ContactInfo title="Contact:">
        <a 
          href="tel:18001234567" 
          className="text-xs lg:text-sm font-normal leading-[150%] text-foreground underline hover:text-primary"
        >
          1800 123 4567
        </a>
        <a 
          href="mailto:info@radiostation.com" 
          className="text-xs lg:text-sm font-normal leading-[150%] text-foreground underline hover:text-primary"
        >
          info@radiostation.com
        </a>
      </ContactInfo>

      <div className="flex flex-col items-start gap-4 w-full">
        <h4 className="text-xs lg:text-sm font-bold leading-[150%] text-foreground">Follow Us:</h4>
        <SocialLinks />
      </div>
    </div>
  )
}

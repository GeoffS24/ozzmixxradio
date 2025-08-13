import { LogoLink } from "@/components/molecules/navigation/LogoLink";
import { ContactInfo } from "./ContactInfo";
import { SocialLinks } from "./SocialLinks";
import type { RadioStationData } from "@/types/sanity";

interface CompanyInfoProps {
  stationData?: RadioStationData | null;
}

export function CompanyInfo({ stationData }: CompanyInfoProps) {
  // Default values with fallbacks
  const contactInfo = stationData?.contactInfo;
  const address =
    contactInfo?.address ;
  const phone = contactInfo?.phone ;
  const email = contactInfo?.email ;
  const businessHours = contactInfo?.businessHours;
  return (
    <div className="flex flex-col items-start gap-4 flex-1">
      <LogoLink variant="mobile" />

      <ContactInfo title="Address:">
        <p className="text-xs lg:text-sm font-normal leading-[150%] text-foreground">
          {address}
        </p>
      </ContactInfo>

      {phone && (
        <ContactInfo title="Phone:">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="text-xs lg:text-sm font-normal leading-[150%] text-foreground underline hover:text-primary min-h-[44px] flex items-center"
          >
            {phone}
          </a>
        </ContactInfo>
      )}
      {email && (
        <ContactInfo title="Email:">
          <a
            href={`mailto:${email}`}
            className="text-xs lg:text-sm font-normal leading-[150%] text-foreground underline hover:text-primary  min-h-[44px] flex items-center"
          >
            {email}
          </a>
        </ContactInfo>
      )}
      {businessHours && (
        <ContactInfo title="Business Hours:">
          <p className="text-xs lg:text-sm font-normal leading-[150%] text-foreground">
            {businessHours}
          </p>
        </ContactInfo>
      )}

      <div className="flex flex-col items-start gap-4 w-full">
        <span className="text-xs lg:text-sm font-bold leading-[150%] text-foreground">
          Follow Us:
        </span>
        <SocialLinks socialMedia={stationData?.socialMedia} />
      </div>
    </div>
  );
}

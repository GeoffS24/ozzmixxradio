import { CompanyInfo } from '@/components/molecules/footer/CompanyInfo'
import { FooterNavLinks } from '@/components/molecules/footer/FooterNavLinks'
import { FooterBottom } from '@/components/molecules/footer/FooterBottom'

export function Footer() {
  return (
    <footer className="flex py-12 lg:py-12 px-5 flex-col items-center gap-12 lg:gap-20 bg-white">
      <div className="flex container mx-auto flex-col items-start gap-12 lg:gap-20 w-full">
        {/* Main Footer Content */}
        <div className="flex lg:flex-row flex-col items-start gap-12 lg:gap-16 w-full">
          <CompanyInfo />
          <FooterNavLinks />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border"></div>

        <FooterBottom />
      </div>
    </footer>
  )
}
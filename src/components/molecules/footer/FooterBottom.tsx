import Link from 'next/link'

export function FooterBottom() {
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between lg:items-start items-start gap-8 w-full">
      <p className="text-xs lg:text-sm font-normal leading-[150%] text-foreground">
        © 2025 Radio Station. All rights reserved.
      </p>
      <div className="flex lg:flex-row flex-col items-start gap-4 lg:gap-6">
        <Link 
          href="/privacy" 
          className="text-xs lg:text-sm font-normal leading-[150%] text-foreground underline hover:text-primary transition-colors"
        >
          Privacy Policy
        </Link>
        <Link 
          href="/terms" 
          className="text-xs lg:text-sm font-normal leading-[150%] text-foreground underline hover:text-primary transition-colors"
        >
          Terms of Service
        </Link>
        <Link 
          href="/cookies" 
          className="text-xs lg:text-sm font-normal leading-[150%] text-foreground underline hover:text-primary transition-colors"
        >
          Cookie Policy
        </Link>
      </div>
    </div>
  )
}

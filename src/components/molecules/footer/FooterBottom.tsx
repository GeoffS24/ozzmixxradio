
interface FooterBottomProps {
  copyrightText?: string
}

export function FooterBottom({ copyrightText }: FooterBottomProps) {
  const defaultText = '© 2025 Radio Station. All rights reserved.'
  
  return (
    <div className="flex lg:flex-row flex-col lg:justify-between lg:items-start items-start gap-8 w-full">
      <p className="text-xs lg:text-sm font-normal leading-[150%] text-foreground">
        {copyrightText || defaultText}
      </p>
    </div>
  )
}

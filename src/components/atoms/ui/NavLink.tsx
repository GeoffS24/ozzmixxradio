import Link from 'next/link'
import { cn } from "@/lib/utils"

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  variant?: 'desktop' | 'mobile' | 'footer'
}

export function NavLink({ href, children, className, variant = 'desktop' }: NavLinkProps) {
  const variants = {
    desktop: "text-base font-normal leading-[150%] text-foreground hover:text-primary transition-colors",
    mobile: "flex flex-col justify-center items-start py-3 gap-2.5 text-base font-normal text-foreground min-h-[44px]",
    footer: "flex-1 text-xs lg:text-sm font-bold leading-[150%] text-foreground hover:text-primary transition-colors py-2 min-h-[44px] flex items-center"
  }
  
  return (
    <Link href={href} className={cn(variants[variant], className)}>
      {children}
    </Link>
  )
}

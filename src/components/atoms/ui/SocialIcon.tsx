import { LucideIcon } from 'lucide-react'
import { cn } from "@/lib/utils"

interface SocialIconProps {
  Icon: LucideIcon
  href: string
  label: string
  className?: string
}

export function SocialIcon({ Icon, href, label, className }: SocialIconProps) {
  return (
    <a 
      href={href}
      aria-label={label}
      className={cn(
        "flex w-6 h-6 items-center justify-center text-foreground hover:text-primary transition-colors",
        className
      )}
    >
      <Icon className="w-6 h-6" />
    </a>
  )
}

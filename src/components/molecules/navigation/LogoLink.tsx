import Link from 'next/link'
import { Logo } from '@/components/atoms/icons/Logo'

interface LogoLinkProps {
  variant?: 'desktop' | 'mobile'
}

export function LogoLink({ variant = 'desktop' }: LogoLinkProps) {
  const containerClasses = variant === 'desktop' 
    ? "w-[84px] h-9 flex items-center justify-center px-[7.333px] px-[6.667px]"
    : "w-21 h-9 flex items-center justify-center"
    
  return (
    <Link href="/" className="flex items-center">
      <div className={containerClasses}>
        <Logo />
      </div>
    </Link>
  )
}

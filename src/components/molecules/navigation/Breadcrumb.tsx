import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav 
      className={cn("flex items-center gap-2 text-sm", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !item.isActive ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span 
                  className={cn(
                    item.isActive || isLast 
                      ? "text-foreground font-medium" 
                      : "text-muted-foreground"
                  )}
                  aria-current={item.isActive || isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <ChevronRight 
                  className="w-4 h-4 text-muted-foreground" 
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  alignment?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ 
  badge, 
  title, 
  description, 
  alignment = 'center',
  className 
}: SectionHeaderProps) {
  const alignmentClasses = {
    left: "items-start lg:items-start text-left",
    center: "items-center text-center"
  }
  
  return (
    <div className={cn(
      "flex max-w-[768px] flex-col gap-3 lg:gap-4 w-full",
      alignmentClasses[alignment],
      className
    )}>
      {badge && (
        <div className="flex items-center w-full">
          <span className={cn(
            "text-base font-bold text-primary",
            alignment === 'center' && "text-center w-full"
          )}>
            {badge}
          </span>
        </div>
      )}
      <div className={cn(
        "flex flex-col gap-5 lg:gap-6 w-full",
        alignmentClasses[alignment]
      )}>
        <h2 className="text-4xl lg:text-5xl font-normal leading-[120%] tracking-[-0.36px] lg:tracking-[-0.48px] text-foreground w-full">
          {title}
        </h2>
        {description && (
          <p className="text-sm lg:text-lg font-normal leading-[150%] text-foreground w-full">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

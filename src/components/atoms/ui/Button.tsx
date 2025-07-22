import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = "flex justify-center items-center gap-2 font-medium transition-colors cursor-pointer"
  
  const variants = {
    primary: "bg-persimmon border border-persimmon text-white hover:bg-persimmon-600",
    secondary: "bg-white border border-white text-foreground hover:bg-primary hover:text-white hover:border-primary",
    outline: "border border-border text-foreground hover:bg-muted",
    ghost: "text-foreground hover:text-brand-primary"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-sm lg:text-base",
    lg: "px-8 py-3 text-base lg:text-lg"
  }
  
  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}

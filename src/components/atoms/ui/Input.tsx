import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {label && (
        <label className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
          {label}
        </label>
      )}
      <input
        className={cn(
          "flex h-12 px-3 py-2 items-center gap-2 w-full border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary",
          error && "border-destructive",
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-sm text-destructive">{error}</span>
      )}
    </div>
  )
}

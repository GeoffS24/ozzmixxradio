import { cn } from "@/lib/utils"

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function TextArea({ label, error, className, ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {label && (
        <label className="text-sm lg:text-base font-normal leading-[150%] text-foreground w-full">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "flex min-h-[120px] px-3 py-2 items-start gap-2 w-full border border-border bg-muted focus:outline-none focus:ring-2 focus:ring-primary resize-vertical",
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
